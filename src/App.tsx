import { configureChains, createConfig, disconnect, getAccount, mainnet } from '@wagmi/core';
import { connect, watchAccount } from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';
import { useEffect, useState } from 'react';

import { BlockNumber } from './components/BlockNumber.tsx';

const injectedConnector = new InjectedConnector();

const { publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);

createConfig({
  autoConnect: true,
  connectors: [injectedConnector],
  publicClient,
  webSocketPublicClient,
});

function App() {
  const [account, setAccount] = useState(getAccount());
  const handleConnect = async () => connect({ connector: injectedConnector });
  const handleDisconnect = async () => disconnect();

  useEffect(() => {
    const unwatch = watchAccount((account) => setAccount(account));

    return () => {
      unwatch();
    };
  }, []);

  return (
    <div>
      <div className="p-3 bg-gray-200 flex justify-end">
        <BlockNumber />
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col mt-3">
        <div>{account.status}</div>
        {account.isConnected ? (
          <>
            <div>{account.address}</div>
            <button className="mt-3 border py-1 px-3 rounded" onClick={handleDisconnect}>
              disconnect wallet
            </button>
          </>
        ) : (
          <button className="mt-3 border py-1 px-3 rounded" onClick={handleConnect}>
            connect wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
