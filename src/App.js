import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Message from "./Message";
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move';

function App() {

  const [input, setinput] = useState('')
  const [Messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  console.log(Input)
  console.log(Messages)

  // Scroll to bottom
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  useEffect(() => {
    db.collection('Messages')
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc => ({id:doc.id,message: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Enter your name: '))
  }, [])

  const sendMessages = e =>{
    e.preventDefault()
    db.collection('Messages').add({
      username: username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setinput('')
  }

  return (
    <div className="App">
      <h3>Hey <span>{username}</span></h3>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter Message</InputLabel>
          <Input className="app__input" onClick={executeScroll} value={input} onChange={e => setinput(e.target.value)}/>
          <Button className="app__button" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessages}>Send Message</Button>
        </FormControl>
      </form>
      <FlipMove>
        <div style={{marginBottom: "110px"}}>
        {
          Messages.map(({id, message}) => (
            <Message ref={myRef} key={id} username={username} message= {message} />
          ))
        }
        </div>
      </FlipMove>
    </div>
  );
}

export default App;
