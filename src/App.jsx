import { useState , useRef } from 'react';
import './App.css'
import './components/style.css'
import Auth from './components/Auth';
import { auth } from '../config';
import { signOut } from 'firebase/auth';
import Chat from './components/Chat';
import Cookies from 'universal-cookie' //importing library
const cookies = new Cookies();

// useRef -----> method of grabbing data or What user types in input instead writing onChange function inside input tag to get input value
 



function App() {
 const [isAuth, setIsAuth] = useState(cookies.get("auth-token")) // returns boolean TRUE, if variable "auth-token" present in Auth.jsx has some vallue stored? it verifies with that info
 const [room, setRoom] = useState("")

const signOutUser = async () =>{
  await signOut(auth)
  cookies.remove("auth-token")
  setRoom(null)
  setIsAuth(false)
}

 const roomInputRef = useRef(null)  //making input refernce initially sets to null
  if (!isAuth){ // if user is not authenticated show them authentictaion or signin page
    
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    )
  }
  return(
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <h3> Enter room name below: </h3>
          <input className='roomname-input' type="text" name="" id="" ref={roomInputRef}  />
          <button  onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div className="sign-out">
      <button onClick={signOutUser}> signout </button>
      </div>
    </div>
  )
}



export default App
