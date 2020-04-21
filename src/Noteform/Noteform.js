import React, { Component } from 'react';

class NoteForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            newNoteContent: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value,
        })
    }
    writeNote(){
        if(this.state.newNoteContent != ''){
            this.props.addNote(this.state.newNoteContent);
            this.setState({
                newNoteContent: '',
            })
        } else {
            console.log('sorry dude');
        }
    }

    render(){
        return(
            <div>
                <input className="noteInput"
                placeholder="Write a new note..."
                value={this.state.newNoteContent}
                onChange={this.handleUserInput} />
                <button className="noteButton"
                onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }
}

export default NoteForm;