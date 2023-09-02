import * as chains from '@wagmi/chains';
import { configureChains, createConfig } from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';

export const injectedConnector = new InjectedConnector();

const { publicClient, webSocketPublicClient } = configureChains(
  [chains.mainnet],
  [publicProvider()],
);

createConfig({
  autoConnect: true,
  connectors: [injectedConnector],
  publicClient,
  webSocketPublicClient,
});
