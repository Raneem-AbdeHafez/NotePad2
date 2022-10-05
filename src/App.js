import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class App extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this); 
    this.app = firebase.initializeApp(DB_CONFIG);
   
    this.state = {
      notes: [],
    }
  }
  componentDidMount(){
    const db = firebase.firestore();
    var previousNotes = [];
  
      db.collection("note")
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(doc => {
          previousNotes.push(doc.data().noteContent);
        });
         this.setState({ 
          notes: previousNotes  
        })
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });  

  }
  

  addNote(note){
    const db = firebase.firestore();
    const noteRef = db.collection("note").add({
    noteContent: note
    });
    
  }

  render() {
    return (
      <div className="notes">
          <div className="headNotes">NotePad</div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note} noteId={note.id} key={note.id} />               
              )
            })
            
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;