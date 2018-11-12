import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/firestore';



class App extends Component {

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this); 
   this.app = firebase.initializeApp(DB_CONFIG);
   
    this.state = {
      notes: [],
    }
  }
  componentWillMount(){
    const previousNotes = this.state.notes;
    const con = firebase.firestore();
  
      con.collection("note")
      .get()
      .then(querySnapshot => {
        const allIn = [];

        querySnapshot.forEach(function(doc) {
          allIn.push({
            previousNotes: doc.data().note, 
          });
        });
        this.setState({ allIn});
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });  
      this.state.allIn.map(v => {
      previousNotes: v.previousNotes
      })
         this.setState({
           notes: previousNotes
         })
       
     }
  
  
  

  addNote(note){
  const db = firebase.firestore();
 // this.db.settings({timestampsInSnapshots: true
 // });
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
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} />               
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