import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
class AddNote extends Component {
    constructor() {
        super()
        this.state = {
            notes: '',
            open: false
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.addNote = this.addNote.bind(this);
    }
    onHandleChange(event) {
        this.setState({ notes: event.target.value });
    }

    addNote() {
        Axios.get("/addNote?notes=" + this.state.notes + "&noteIndex=" + this.props.noteIndex).then(response => {
            this.setState({ open: true });
            setTimeout(() => {
                this.setState({ open: false });
            }, 6000);
            this.props.showForms();
        })
    }
    render() {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }
        return (
            <div>
                <div class="modal fade" id="addNoteModal" tabindex="-1" role="dialog" aria-labelledby="addNoteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addFormModalLabel">{this.props.note == undefined ? 'Add' : 'Edit'} Note</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body pb-0">
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            id="addNote"
                                            multiline
                                            rows={4}
                                            label="Notes"
                                            variant="outlined"
                                            className="w-100"
                                            onChange={this.onHandleChange}
                                            value={this.state.notes.length == 0 ? this.props.note : this.state.notes}
                                        />
                                    </div>
                                    <div className="col-lg-12 text-center my-3">
                                        <Button variant="contained" color="primary" onClick={() => this.addNote()} data-dismiss="modal">
                                            {this.props.note == undefined ? 'Add' : 'Edit'} Note
                                    </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}>
                    <Alert onClose={this.handleClose} severity="success">
                        Note {this.props.note == undefined ? 'Added' : 'Edited'} Succesfully
                    </Alert>
                </Snackbar>
            </div>

        )
    }
}


export default AddNote;