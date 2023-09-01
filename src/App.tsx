import './App.css'

import {
  createConfig,
  configureChains,
  mainnet, getAccount, disconnect,
} from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { connect, fetchEnsName } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'

const injectedConnector = new InjectedConnector()

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [injectedConnector],
  publicClient,
  webSocketPublicClient,
})

function App() {
  const account = getAccount()

  const handleConnect = async () => {
    const { account } = await connect({
      connector: injectedConnector
    })

    console.log(account)

    // const ensName = await fetchEnsName({ address: account })
  }

  const handleDisconnect = async () => {
    await disconnect()
  }


  return (
    <>
      {account.isConnected ? <>
        <div><strong>{account.address}</strong></div>
        <div><br /><button onClick={handleDisconnect}>disconnect</button></div>
      </> : <button onClick={handleConnect}>connect</button>}
    </>
  )
}

export default App
