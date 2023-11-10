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
import { Box, TextField, Typography } from '@mui/material';
import { storage } from "../src/declarations/storage";

function App() {
  let actor = counter;
  const [id, setId] = ("");
  const [myId, setMyId] = useState("user identity");
  const [identity, setIdentity] = useState<Identity>();

  const [newObjectId, setNewObjectId] = useState(24163);
  const [isNewObjectIdSeen, setIsNewObjectIdSeen] = useState(false);

  const [objectId, setObjectId] = useState("");
  const [searchObjectId, setSearchObjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [typeName, setTypeName] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");

  const [resultObjectInfo, setResultObjectInfo] = useState([]);
  const [resultObjectList, setResultObjectList] = useState([]);


  // const generateNewObjectId = () => {

  // }




  const objectIdHandleChange = (e) => {
    setObjectId(e.target.value)
  };
  const searchObjectIdHandleChange = (e) => {
    setSearchObjectId(e.target.value)
  };
  const userIdHandleChange = (e) => {
    setUserId(e.target.value)
  };
  const searchUserIdHandleChange = (e) => {
    setSearchUserId(e.target.value)
  };
  const typeNameHandleChange = (e) => {
    setTypeName(e.target.value)
  };
  const nameHandleChange = (e) => {
    setName(e.target.value)
  };
  const colorHandleChange = (e) => {
    setColor(e.target.value)
  };
  const stateHandleChange = (e) => {
    setState(e.target.value)
  };
  
  const handleRegisterObject = async (e) => {
    e.preventDefault();

    // await storage.store(id, input)
    await storage.register(objectId, userId, typeName, name, color, state);
    console.log("registered!!")
    let result = await storage.searchObjectId(objectId);
    console.log("result:", result);

    setObjectId("");
    setUserId("");
    setTypeName("");
    setName("");
    setColor("");
    setState("");


    setIsNewObjectIdSeen(false);
    setNewObjectId((prev)=>prev+123);
  };

  const searchWithObjectId = async (e) => {
    e.preventDefault();

    let object = await storage.searchObjectId(searchObjectId);
    setResultObjectInfo(object);
    console.log("object result :", object);
    setSearchObjectId("");
  }

  const searchWithUserId = async (e) => {
    e.preventDefault();

    let objectIds = await storage.searchUserId(searchUserId);
    setResultObjectList(objectIds);
    console.log("result Object list :", objectIds);
    setSearchUserId("");
  }

  


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
            identity generate : 
        </Button>
        <Typography>{myId}</Typography>
      </Box>
        <Button
        onClick={()=>{
          setIsNewObjectIdSeen(true);
        }}
        > 
        Generate Object Id
        </Button>
        <Typography>{ isNewObjectIdSeen && newObjectId }</Typography>

        <Box>
        <Typography>Register your object</Typography>
        <Typography>objectId</Typography>
        <textarea
            value={objectId}
            onChange={objectIdHandleChange}
          />
        <Typography>userId</Typography>
        <textarea
            value={userId}
            onChange={userIdHandleChange}
          />
        <Typography>typeName</Typography>
        <textarea
            value={typeName}
            onChange={typeNameHandleChange}
          />
        <Typography>name</Typography>
        <textarea
            value={name}
            onChange={nameHandleChange}
          />
        <Typography>color</Typography>
        <textarea
            value={color}
            onChange={colorHandleChange}
          />
        <Typography>state</Typography>
        <textarea
            value={state}
            onChange={stateHandleChange}
          />
        <Typography>{objectId}, {userId}, {name}, {state}</Typography>

        <Button
        onClick={handleRegisterObject}
        >REGISTER OBJECT</Button>
      </Box>

      <Box>
        <Typography>Search with object id</Typography>
        <Typography>objectId</Typography>
        <textarea
            value={searchObjectId}
            onChange={searchObjectIdHandleChange}
          />
          <Button
        onClick={searchWithObjectId}
        >SEARCH OBJECT</Button>
        <Typography>result : {resultObjectInfo}</Typography>
        
      </Box>
      
      <Box>
        <Typography>Search with user id</Typography>
        <Typography>userId</Typography>
        <textarea
            value={searchUserId}
            onChange={searchUserIdHandleChange}
          />
          <Button
        onClick={searchWithUserId}
        >SEARCH OBJECTS USER OWN</Button>
        <Typography>result : {resultObjectList}</Typography>
      </Box>



      {/* <Box>
        <Counter />
        <Profile />
        <Transfer />
        <Object id={"1111111"}/>
      </Box> */}
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
