export const receivedPaymentsQuery = `
# Query: receivedPayments
# This query retrieves payments received by a specific Stellar account.
# It takes a single argument, $publicKey, which is the public key of the account.
# for example:
#   {"publicKey": "GCHR5WWPDFF3U3HP2NA6TI6FCQPYEWS3UOPIPJKZLAAFM57CEG4ZYBWP"}
# Fields:
# - amount: The amount of the asset transferred.
# - assetByAsset: Contains the code and issuer of the asset if it's not native (XLM).
# - accountByDestination: The public key of the destination account.
# - accountBySource: The public key of the source account.
# - muxedaccountByDestinationMuxed: Details of the muxed destination account, if applicable.
# - muxedaccountBySourceMuxed: Details of the muxed source account, if applicable.
# - ledgerByLedger: Contains the close time and sequence of the ledger the transaction is in.
# - assetNative: Boolean indicating if the transferred asset is native (XLM).
#
# The query is structured to provide comprehensive information about each payment,
# including details about the asset, the accounts involved, and the ledger context.

query receivedPayments($publicKey: String!) {
  paymentsToPublicKey(
    publicKeyText: $publicKey
  ) {
    edges {
      node {
        amount
        assetByAsset {
          code
          issuer
        }
        accountByDestination {
          publickey
        }
        accountBySource {
          publickey
        }
        muxedaccountByDestinationMuxed {
          publickey
          muxedaccountid
        }
        muxedaccountBySourceMuxed {
          publickey
          muxedaccountid
        }
        ledgerByLedger {
          closeTime
          sequence
        }
        assetNative
      }
    }
  }
}

`