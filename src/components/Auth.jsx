import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth,provider } from '../../config'
// import { auth,provider } from '/config.jsx'
import { signInWithPopup } from 'firebase/auth'  //importing function(signInwithpopup) using firebase/auth
import Cookies from 'universal-cookie' //importing library
const cookies = new Cookies();



function Auth(props) {

  const signInWithGoogle = async() =>{
    try {
      const result= await signInWithPopup(auth,provider);
     console.log("result is", result)
    const token =cookies.set("auth-token", result.user.refreshToken) //page refresh krne k baad bhi user ki signin request rahe gi 
    props.setIsAuth(true)
    } catch (error) {
      console.error(error)
    }
 
  }

  //we want to keep user logged in even when they refresh or leave tge page for this we will use cookies

  return (
    <div className='auth'>
      
      <h1> CHIT-CHAT </h1>
      <div> <strong style={{color:'black', fontSize:'20px'}}> please sign in before using Chatapp </strong> </div>
      
      <button style={{marginTop:'4rem'}} onClick={signInWithGoogle}>  <FcGoogle style={{marginRight:'1rem', width:'2rem', height:'1.5rem'}}/>  Sign in with google </button>
      </div>
      
  )
}

export default Auth