import React, { Component } from 'react'
import Axios from 'axios';
import AddNoteModal from './addNoteModal';
import AddTagModal from './addTagModal';
import UserCard from './userCard'
import Swal from 'sweetalert2'
import AddFormHeader from './addFormHeader'
class ShowForm extends Component {
    constructor() {
        super()
        this.state = {
            forms: [],
            noteIndex: '',
            note: '',
            tags: '',
            search: '',
            populateForms: []
        }
        this.addNote = this.addNote.bind(this);
        this.showForms = this.showForms.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.deleteFormId = this.deleteFormId.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        this.showForms()
    }

    addNote(getNoteIndex) {
        var index = this.state.forms.map(function (e) { return e.id; }).indexOf(getNoteIndex);
        this.setState({
            noteIndex: getNoteIndex,
            note: this.state.forms[index].notes,
            tags: this.state.forms[index].tags
        })
    }
    showForms() {
        Axios.get('/getAllForms').then(response => {
            this.setState({
                forms: response.data,
                populateForms: response.data
            })
            console.log(JSON.stringify(this.state.forms))
        })
    }
    updateTags(tags) {
        this.setState({
            tags: tags
        })
        this.showForms()
    }
    deleteForm(formIndex) {
        var index = this.state.forms.map(function (e) { return e.id; }).indexOf(formIndex);
        Swal.fire({
            title: 'Delete Confirmation?',
            text: "Are you sure you want to delete '" + this.state.forms[index].userName + "'?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.deleteFormId(formIndex)
            }
        })
    }
    deleteFormId(formIndex) {
        var index = this.state.forms.map(function (e) { return e.id; }).indexOf(formIndex);
        Axios.get('/deleteForm?index=' + formIndex).then(response => {
            Swal.fire('Deleted!', this.state.forms[index].userName + ' has been deleted.', 'success')
            this.showForms();
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps : " + nextProps.populateForms);
        if (nextProps.populateForms == true) {
            this.showForms();
            this.props.populateData(false);
        }
    }
    onChangeSearch(event) {
        this.setState({ search: event.target.value });
        const items = this.state.forms.filter((data) => {
            if (event.target.value == null)
                return data
            else if (data.age.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.description.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.dob.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.initial.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.lastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.sex.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.userName.toLowerCase().includes(event.target.value.toLowerCase()) ||
                data.tags.toLowerCase().includes(event.target.value.toLowerCase())) {
                return data
            }
        })
        this.setState({
            populateForms: items
        })
    }

    render() {
        return (
            <div className="row m-0">
                <AddFormHeader search={this.state.search} onChangeSearch={this.onChangeSearch} editTypeIndex={this.props.editTypeIndex}></AddFormHeader>
                <div class="col-12">
                    <div class="jumbotron" style={{ 'background': '#F1F7FC' }}>
                        <div className="row">
                            {
                                this.state.populateForms.length == 0
                                    ? <div className="col-12"><div class="alert alert-warning text-center" role="alert">No Forms to Show</div></div>
                                    : this.state.populateForms.map((form, index) => {
                                        return (
                                            <div className="col-lg-3 mb-2 pl-lg-0 col-12" >
                                                <UserCard userDetails={form} key={index} addNote={this.addNote} editTypeIndex={this.props.editTypeIndex} deleteForm={this.deleteForm}></UserCard>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
                <AddNoteModal note={this.state.note} noteIndex={this.state.noteIndex} showForms={this.showForms}></AddNoteModal>
                <AddTagModal tags={this.state.tags} noteIndex={this.state.noteIndex} updateTags={this.updateTags}></AddTagModal>
            </div >
        )
    }
}


export default ShowForm;