
function handleAddEvent(event: any, tokenA: string, tokenB: string) {
    let tokenAQuantity = 0;
    let tokenBQuantity = 0;
    let liquidity = parseFloat(event.liquidity);

    if (event.token_a === tokenA && event.token_b === tokenB) {
        tokenAQuantity += parseFloat(event.amount_a);
        tokenBQuantity += parseFloat(event.amount_b);
    } else if (event.token_a === tokenB && event.token_b === tokenA) {
        tokenAQuantity += parseFloat(event.amount_b);
        tokenBQuantity += parseFloat(event.amount_a);
    }

    return { tokenAQuantity, tokenBQuantity, liquidity };
}

function handleRemoveEvent(event: any, tokenA: string, tokenB: string) {
    let tokenAQuantity = 0;
    let tokenBQuantity = 0;
    let liquidity = -parseFloat(event.liquidity);

    if (event.token_a === tokenA && event.token_b === tokenB) {
        tokenAQuantity -= parseFloat(event.amount_a);
        tokenBQuantity -= parseFloat(event.amount_b);
    } else if (event.token_a === tokenB && event.token_b === tokenA) {
        tokenAQuantity -= parseFloat(event.amount_b);
        tokenBQuantity -= parseFloat(event.amount_a);
    }

    return { tokenAQuantity, tokenBQuantity, liquidity };
}

function handleSwapEvent(event: any, tokenA: string, tokenB: string) {
    let tokenAQuantity = 0;
    let tokenBQuantity = 0;

    const amountA = parseFloat(event.amounts[0]);
    const amountB = parseFloat(event.amounts[event.amounts.length - 1]);

    if (event.path[0] === tokenA && event.path[event.path.length - 1] === tokenB) {
        tokenAQuantity -= amountA;
        tokenBQuantity += amountB;
    } else if (event.path[0] === tokenB && event.path[event.path.length - 1] === tokenA) {
        tokenAQuantity += amountB;
        tokenBQuantity -= amountA;
    }

    return { tokenAQuantity, tokenBQuantity };
}

/**
   * Calculates balance of a given token pair based on add, remove and swap operations.
   * @param parsedContractEvents Object array with router contract events
   * @param tokenA String for token A address.
   * @param tokenB String for token B address.
   * @returns Object with the total amount of tokenA, tokenB and liquidity for the given pair.
   */
export const getSoroswapReserves = async (parsedContractEvents: any[], tokenA: string, tokenB: string) => {  
    const filteredEvents = parsedContractEvents.filter(event => {
        if (event.topic2 === "add" || event.topic2 === "remove") {
            return (event.token_a === tokenA && event.token_b === tokenB) || 
                   (event.token_a === tokenB && event.token_b === tokenA);
        } else if (event.topic2 === "swap") {
            return (event.path[0] === tokenA && event.path[event.path.length - 1] === tokenB) || 
                   (event.path[0] === tokenB && event.path[event.path.length - 1] === tokenA);
        }
        return false;
    });

    let tokenAQuantity = 0;
    let tokenBQuantity = 0;
    let liquidity = 0;

    filteredEvents.forEach(event => {
        let results;
        switch (event.topic2) {
            case "add":
            case "remove":
                results = event.topic2 === "add" ? handleAddEvent(event, tokenA, tokenB) : handleRemoveEvent(event, tokenA, tokenB);
                tokenAQuantity += results.tokenAQuantity;
                tokenBQuantity += results.tokenBQuantity;
                liquidity += results.liquidity;
                break;
            case "swap":
                results = handleSwapEvent(event, tokenA, tokenB);
                tokenAQuantity += results.tokenAQuantity;
                tokenBQuantity += results.tokenBQuantity;
                break;
        }
    });

    return {
        tokenAQuantity,
        tokenBQuantity,
        liquidity
    };
}