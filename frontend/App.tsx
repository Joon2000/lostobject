import React, { useEffect, useState } from "react"
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
import Object from "./components/Object"
import Button from '@mui/material/Button';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Identity } from "@dfinity/agent";
import { Box } from '@mui/material';

function App() {
  let actor = counter;
  const [id, setId] = ("");
  const [myId, setMyId] = useState("123");
  const [identity, setIdentity] = useState<Identity>();

  return (
    <div>
      {/* <div>
        <ConnectButton />
      </div> */}
      <Box sx={{my: 10}}>
        <Button 
        variant="contained"
        onClick={async (e) => {
          e.preventDefault();
          let authClient = await AuthClient.create();
          // start the login process and wait for it to finish
          await new Promise((resolve : any) => {
              authClient.login({
                  identityProvider:
                      process.env.DFX_NETWORK === "ic"
                          ? "https://identity.ic0.app"
                          : `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
                  onSuccess: resolve,
              });
          });
        
          // const identity = authClient.getIdentity();
          let id = authClient.getIdentity();
          setIdentity(id);
          const agent = new HttpAgent({ identity });
          actor = createActor(process.env.CANISTER_ID_COUNTER, {
              agent,
          });
          
          return false;
        }}
        >login</Button>

        <Button
          variant="contained"
          onClick={async (e) => {
            e.preventDefault();
            console.log("who am i button clicked!")
            // whoAmIButton.setAttribute("disabled", true);
            const principal = await actor.whoami();
            console.log("principal", principal)
            // whoAmIButton.removeAttribute("disabled");
            // document.getElementById("principal").innerText = principal.toString();
            let principal_str = principal.toString();
            setMyId(principal_str);
            return false;
          }}>
            who am i : {myId}
        </Button>
      </Box>

      <Box>
        {/* <Counter />
        <Profile />
        <Transfer /> */}
        <Object id={"1111111"}/>
      </Box>
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
