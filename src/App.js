import React, { Component } from 'react';
import {  firebaseConfig } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import Note from './Note/Note.js';
import Noteform from './Noteform/Noteform.js';


class App extends Component {
  
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : console.log(1);
    this.database = firebase.database().ref().child('notes');

    this.state = {
      notes: [],
    } 
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // when a new child is added to fb, a snapshot of the date is recorded
    // content and id of snapshot is snatched and pushed to notes array
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })

  }

  addNote(notes){
    this.database.push().set({ noteContent: notes })
  }

  removeNote(noteId){
    console.log('aa: ', noteId);
    this.database.child(noteId).remove();
  }

  render(){
    return (
      <div className="notesWrapper">

        <div className="notesHeader">
          <h1 className="heading">Heading and Title</h1>
        </div>

        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return(
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote}/>
              )
            })
          }
        </div>

        <div className="notesFooter">
          <Noteform addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
