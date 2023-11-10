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

  const [newObjectId, setNewObjectId] = useState(343);
  const [isNewObjectIdSeen, setIsNewObjectIdSeen] = useState(false);

  const [objectId, setObjectId] = useState("");
  const [searchObjectId, setSearchObjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [typeName, setTypeName] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  // const [state, setState] = useState("");

  const [resultRegisteredObjectInfo, setResultResgisteredObjectInfo] = useState([]);
  const [resultObjectInfo, setResultObjectInfo] = useState([]);
  const [resultObjectList, setResultObjectList] = useState([]);

  const [isResultInfoSeen, setIsResultInfoSeen] = useState(false);
  const [isSearchWithObjectResultInfoSeen, setIsSearchWithObjectResultInfoSeen] = useState(false);
  const [isSearchWithUserResultInfoSeen, setIsSearchWithUserResultInfoSeen] = useState(false);


  const [isLost, setIsLost] = useState(true)
  const [isFound, setIsFound] = useState(true)
  const [isReceived, setIsReceived] = useState(true)
  const [lostObjectId, setLostObjectId] = useState("")
  const [lostUserId, setLostUserId] = useState("")
  const [foundObjectId, setFoundObjectId] = useState("")
  const [receivedObjectId, setReceivedObjectId] = useState("")
  const [receivedUserId, setReceivedUserId] = useState("")




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
  // const stateHandleChange = (e) => {
  //   setState(e.target.value)
  // };
  
  const handleRegisterObject = async (e) => {
    setIsResultInfoSeen(false);
    setIsSearchWithObjectResultInfoSeen(false);
    setIsSearchWithUserResultInfoSeen(false);
    e.preventDefault();

    // await storage.store(id, input)
    await storage.register(objectId, userId, typeName, name, color);
    console.log("registered!!")
    let result = await storage.searchObjectId(objectId);
    setResultResgisteredObjectInfo(result);
    console.log("result:", result);

    setObjectId("");
    setUserId("");
    setTypeName("");
    setName("");
    setColor("");
    // setState("");


    setIsNewObjectIdSeen(false);
    setNewObjectId((prev)=>prev+123);
    setIsResultInfoSeen(true);
  };

  const searchWithObjectId = async (e) => {
    setIsResultInfoSeen(false);
    setIsSearchWithObjectResultInfoSeen(false);
    setIsSearchWithUserResultInfoSeen(false);
    e.preventDefault();

    let object = await storage.searchObjectId(searchObjectId);
    setResultObjectInfo(object);
    console.log("object result :", object);
    setSearchObjectId("");
    setIsSearchWithObjectResultInfoSeen(true);
  }

  const searchWithUserId = async (e) => {
    setIsResultInfoSeen(false);
    setIsSearchWithObjectResultInfoSeen(false);
    setIsSearchWithUserResultInfoSeen(false);
    e.preventDefault();

    let objectIds = await storage.searchUserId(searchUserId);
    setResultObjectList(objectIds);
    console.log("result Object list :", objectIds);
    setSearchUserId("");
    setIsSearchWithUserResultInfoSeen(true);
  }

  const changeToLost = async (e) =>{
    e.proventDefault
    setIsLost(await storage.changeStateLost(lostObjectId, lostUserId))
  } 

  const changeToFound = async (e) =>{
    e.proventDefault
    setIsFound(await storage.changeStateFound(lostObjectId))
  } 

  const changeToReceive = async (e) =>{
    e.proventDefault
    setIsReceived(await storage.changeStateReceived(lostObjectId, lostUserId))
  } 
  


  return (
    <div>
      {/* <div>
        <ConnectButton />
      </div> */}
      <Box sx={{mt: 2, mb:5, p:2, width: 500}} justifyContent={"space-around"} display={"flex"}>
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
            setUserId(principal_str);
            return false;
          }}>
            identity generate : 
        </Button>
        <Typography variant="h5">{myId}</Typography>
      </Box >
          <Box display={"flex"} justifyContent={"left"} sx={{width: 500}}>
              <Button
            onClick={()=>{
              setIsNewObjectIdSeen(true);
              setObjectId(newObjectId+"");
            }}
            variant="outlined"
            sx={{ml:2, mr: 3}}
            > 
            Generate Object Id
            </Button>
            <Typography variant="h5">{ isNewObjectIdSeen && newObjectId }</Typography>
          </Box>
       

        <Box sx={{my:1, ml:2}}>
          <Typography variant="h3">Register your object</Typography>
          <Box display={"flex"} justifyContent={"left"}>
            <Box sx={{mr: 5}}>  
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
              <Button
              onClick={handleRegisterObject}
              >REGISTER OBJECT</Button>
            </Box>
            {isResultInfoSeen && 
            <Box>
              <Typography variant="h6">REGISTERD OBJECT BELOW</Typography>
              <Typography>Object Id {resultRegisteredObjectInfo[0]}</Typography>
              <Typography>User Id {resultRegisteredObjectInfo[1]}</Typography>
              <Typography>Type Name {resultRegisteredObjectInfo[2]}</Typography>
              <Typography>Name {resultRegisteredObjectInfo[3]}</Typography>
              <Typography>Color {resultRegisteredObjectInfo[4]}</Typography>
              <Typography>State {resultRegisteredObjectInfo[5]}</Typography>
            </Box>}
            
          </Box>
      </Box>

      <Box sx={{my:1, ml:2}}>
        <Typography variant="h3">Search with object id</Typography>
        <Box display={"flex"} justifyContent={"left"}>
          <Box  sx={{mr: 5}}> 
            <Typography>objectId</Typography>
            <textarea
                value={searchObjectId}
                onChange={searchObjectIdHandleChange}
              />
              <Button
            onClick={searchWithObjectId}
            >SEARCH OBJECT</Button>
          </Box>
          {isSearchWithObjectResultInfoSeen && 
          <Box>
            <Typography variant="h6">OBJECT INFO</Typography>
            <Typography>Object Id {resultObjectInfo[0]}</Typography>
            <Typography>User Id {resultObjectInfo[1]}</Typography>
            <Typography>Type Name {resultObjectInfo[2]}</Typography>
            <Typography>Name {resultObjectInfo[3]}</Typography>
            <Typography>Color {resultObjectInfo[4]}</Typography>
            <Typography>State {resultObjectInfo[5]}</Typography>
          </Box>}
        </Box>
      </Box>
      
      <Box sx={{my:1, ml:2}}>
        <Typography variant="h3">Search with user id</Typography>
        <Box display={"flex"} justifyContent={"left"}>
          <Box sx={{mr: 5}}>
            <Typography>userId</Typography>
          <textarea
              value={searchUserId}
              onChange={searchUserIdHandleChange}
            />
            <Button
          onClick={searchWithUserId}
          >SEARCH OBJECTS USER OWN</Button>
          </Box>
          {isSearchWithUserResultInfoSeen && 
          <Box>
            <Typography variant="h6">OBJECT LIST</Typography>
            {resultObjectList.map((obj)=>(
              <Typography>{obj}</Typography>
            ))}
            {/* <Typography>OBJECT INFO</Typography>
            <Typography>Object Id</Typography>
            <Typography>User Id</Typography>
            <Typography>Type Name</Typography>
            <Typography>Name</Typography>
            <Typography>Color</Typography>
            <Typography>State</Typography> */}
          </Box>}
        </Box>
      </Box>



      <Box>
        <Box>
          <Typography>Lost Object</Typography>
            <Typography>Object Id: </Typography>
            <textarea
                value={lostObjectId}
                onChange={(e)=>setLostObjectId(e.target.value)}
              />
            <Typography>User Id: </Typography>
            <textarea
                value={lostUserId}
                onChange={(e)=>setLostUserId(e.target.value)}
              />
          <Button
            onClick={changeToLost}
            >LOST</Button>
          {isLost&&"Object Id and User Id not match or No matching Object Id found"}
        </Box>
        <Box>
          <Typography>Found Object</Typography>
            <Typography>Object Id</Typography>
            <textarea
                value={foundObjectId}
                onChange={(e)=>setFoundObjectId(e.target.value)}
              />
          <Button
            onClick={changeToFound}
            >FOUND</Button>
          {isFound&&"No mathching Object Id found"}
        </Box>
        <Box>
          <Typography>Received Object</Typography>
            <Typography>Object Id</Typography>
            <textarea
                value={receivedObjectId}
                onChange={(e)=>setReceivedObjectId(e.target.value)}
              />
            <Typography>User Id</Typography>
            <textarea
                value={receivedUserId}
                onChange={(e)=>setReceivedUserId(e.target.value)}
              />
          <Button
            onClick={changeToReceive}
            >RECEIVED</Button>
          {isReceived&&"Object Id and User Id not match or No matching Object Id found"}
        </Box>
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
