import { Cluster } from '../providers/SolanaCluster';

/*
  Get Transaction URL via Solana Connection

  args:
    arweaveApiConfig: Connection at @solana/web3.js
    id: Solana Transaction ID
*/
export const getSolanaTransactionUrl = (connection, id) => {
  const explorerBaseUrl = 'https://explorer.solana.com/address/';
  console.log(connection.rpcEndpoint);
  switch(connection.rpcEndpoint) {
   
    case Cluster.devnet: {
      const url = explorerBaseUrl + id + '?cluster=devnet';
      return url;
    }
    case Cluster.testnet: {
      const url = explorerBaseUrl + id + '?cluster=testnet';
      return url;
    }
    case Cluster.mainnet: {
      const url = explorerBaseUrl + id;
      return url
    }
    
  }
};
