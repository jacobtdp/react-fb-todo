import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props){
        super(props);
        this.message = "Hello ((Note))";
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
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
    handleRemoveNote(id){
        console.log('content: ' + this.noteContent);
        this.props.removeNote(id);
    }



    render(props){
        return(
            <div className="note">
                <p className="noteContent">{ this.noteContent }</p>
                <button className="removeButton"
                onClick={() => this.handleRemoveNote(this.noteId)}>X</button>
            </div>
        )
    }
}


Note.propTypes = {
    noteContent: PropTypes.string
}
export default Note;