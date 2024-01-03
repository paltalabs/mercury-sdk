import { Mercury } from "../../Mercury";
import { getContractEventsParser } from "../parsers/getContractEventsParser";

export const getSoroswapReserves = async (mercuryInstance: Mercury, contractId: string, tokenA: string, tokenB?: string) => {
    const getContractEventsRes = await mercuryInstance.getContractEvents({
        contractId: contractId,
    });

    const parsedContractEvents = getContractEventsParser(getContractEventsRes.data!);
    
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
        if (event.topic2 === "add" && event.token_a === tokenA && event.token_b === tokenB) {
            tokenAQuantity += parseFloat(event.amount_a);
            tokenBQuantity += parseFloat(event.amount_b);
            liquidity += parseFloat(event.liquidity);
        } else if (event.topic2 === "add" && event.token_a === tokenB && event.token_b === tokenA) {
            tokenAQuantity += parseFloat(event.amount_b);
            tokenBQuantity += parseFloat(event.amount_a);
            liquidity += parseFloat(event.liquidity);
        } else if (event.topic2 === "remove" && event.token_a === tokenA && event.token_b === tokenB) {
            tokenAQuantity -= parseFloat(event.amount_a);
            tokenBQuantity -= parseFloat(event.amount_b);
            liquidity -= parseFloat(event.liquidity);
        } else if (event.topic2 === "remove" && event.token_a === tokenB && event.token_b === tokenA) {
            tokenAQuantity -= parseFloat(event.amount_b);
            tokenBQuantity -= parseFloat(event.amount_a);
            liquidity -= parseFloat(event.liquidity);
        } else if (event.topic2 === "swap") {
            const amountA = parseFloat(event.amounts[0]);
            const amountB = parseFloat(event.amounts[event.amounts.length - 1]);
            
            if (event.path[0] === tokenA && event.path[event.path.length - 1] === tokenB) {
                tokenAQuantity -= amountA;
                tokenBQuantity += amountB;
            } else if (event.path[0] === tokenB && event.path[event.path.length - 1] === tokenA) {
                tokenAQuantity += amountB;
                tokenBQuantity -= amountA;
            }
        }
    });

    return {
        tokenAQuantity,
        tokenBQuantity,
        liquidity
    };
}