import React from "react"
import logo from "./assets/dfinity.svg"
import {
  createActor,
  counter,
} from "../src/declarations/counter";
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
import * as counter_all from "../.dfx/local/canisters/counter"
/*
 * Some examples to get you started
 */
import { Counter } from "./components/Counter"
import { Transfer } from "./components/Transfer"
import { Profile } from "./components/Profile"
import Button from '@mui/material/Button';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

function App() {
  let actor = counter;

  return (
    <div className="App">
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <Button 
      variant="contained"
      onClick={async (e) => {
        e.preventDefault();
        let authClient = await AuthClient.create();
        // start the login process and wait for it to finish
        await new Promise((resolve : any) => {
            authClient.login({
                identityProvider:
                    process.env.REACT_APP_DFX_NETWORK === "ic"
                        ? "https://identity.ic0.app"
                        : `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
                onSuccess: resolve,
            });
        });
      
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        actor = createActor(process.env.REACT_APP_CANISTER_ID_II_INTEGRATION_BACKEND, {
            agent,
        });
        
        return false;
      }}
      >login</Button>;

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="slogan">
          React+TypeScript Template
        </p>
        <p className="twitter">by <a href="https://twitter.com/miamaruq">@miamaruq</a></p>
      </header>

      <p className="examples-title">
        Examples
      </p>
      <div className="examples">
        <Counter />
        <Profile />
        <Transfer />
      </div>
    </div>
  )
}

const client = createClient({
  canisters: {
    counter_all,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
