import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../../config';

const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading status

  const messageReference = collection(db, 'messages');

  useEffect(() => {
    const queryMessage = query(messageReference, where('room', '==', room),orderBy('createdAt'));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return; // Check for empty or whitespace-only messages

    await addDoc(messageReference, {
      text: newMessage,
      createdAt: serverTimestamp(),
      userName: auth.currentUser.displayName,
      room: room // Add the room to which the message belongs
    });

    // Clear the input field after submitting the message
    setNewMessage('');
  };


  return (
    <div className='chat-app'>
      <h1> WELCOME TO {room.toUpperCase() } </h1>
      <div>
        {/* Conditional rendering for messages */}
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((message) => (
            <p key={message.id}>
              <h4>{message.userName}:</h4>
              <span>{message.text}</span>
              
            </p>
          ))
        )}
      </div>
      <form action='' onSubmit={handleSubmit} className='new-message-form'>
        <input
          type='text'
          name=''
          id=''
          placeholder='Enter Chat message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type='submit' className='send-button'>
          Submit
        </button>
      </form>
    
    </div>
  );
};

export default Chat;




// import React, { useEffect, useState } from 'react'
// import { addDoc, collection, onSnapshot, query, serverTimestamp, where} from 'firebase/firestore'
// import { db,auth } from '../../config'

// const  Chat = ({room}) => {
//   // const {room} = props;
//    const[newMessage, setNewMessage]= useState("");
//    const [messages, setMessage] = useState([]);
 

// const messageReference = collection(db, "messages")

// //automatically recieve message when msg appears in database
// // creating function that firestore will listen when data comes in firestore database
//    useEffect(()=>{
//     //writing query
//     const queryMessage = query(messageReference, where("room", '==', room))  // query(which collection will this query be exist in)
//     const unsubscribe = onSnapshot(queryMessage,(snapshot)=>{
//       let messages = [];
//             snapshot.forEach((doc)=>{
//               messages.push({...doc.data(), id: doc.id})
//             })
//             setMessage(messages);
//         })
// return ()=>unsubscribe()
//    },[room])

  
//   const handleSubmit = async(e) => {
//       e.preventDefault()
//       //dealing with empty message
//      if (newMessage == "") return; //means user doesnot input any message and press send /submit button

//      await addDoc(messageReference,{
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       userName: auth.currentUser.displayName

//      })
//   }
//   return (
//     <div className='chat-app' >
      
//         Chat component
//         <div>
//           {newMessage}
//         {messages.map((message)=> (
//           <h2 key={message.id}> {message.text} </h2>
//         ) )}
//         </div>
//         <form action="" onSubmit={handleSubmit} className='new-messsage-form'>
//         <input type="text" name="" id="" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} />
//        <button type='submit' className='send-button' > submit </button>
//         </form>
//     </div>
//   )
// }

//  export default  Chat 

