import { gql } from "graphql-request";

export const GET_PATH_PAYMENTS_STRICT_RECEIVE_BY_PUBLIC_KEY = gql`
  query FullQuery($publicKey: String!) {
    pathPaymentsStrictReceiveByPublicKey(publicKeyText: $publicKey) {
      nodes {
        ledgerByLedger {
          closeTime
          sequence
        }
        accountBySource {
          publickey
        }
        accountByDestination {
          publickey
        }
        assetByDestAsset {
          code
          issuer
        }
        assetByPath1Asset {
          code
          issuer
        }
        assetByPath2Asset {
          code
          issuer
        }
        assetByPath3Asset {
          issuer
          code
        }
        assetByPath4Asset {
          issuer
          code
        }
        assetByPath5Asset {
          issuer
          code
        }
        assetBySendAsset {
          code
          issuer
        }
        destAssetNative
        path1AssetNative
        path2AssetNative
        path3AssetNative
        path4AssetNative
        path5AssetNative
        sendAssetNative
        destAmount
        sendMax
      }
    }
  }
`;
