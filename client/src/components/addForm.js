import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
class AddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            initial: '',
            firstName: '',
            lastName: '',
            selectedDate: this.getDate(new Date()),
            selectedFile: '',
            sex: '',
            age: '',
            description: '',
            open: false
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.addForm = this.addForm.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onHandleChange(event) {
        var property = event.target.id == undefined ? event.target.name : event.target.id
        this.setState({ [`${property}`]: event.target.value });
    }

    addForm() {
        var queryParams = ""
        queryParams += "username=" + this.state.userName + "&";
        queryParams += "password=" + this.state.password + "&";
        queryParams += "initial=" + this.state.initial + "&";
        queryParams += "firstName=" + this.state.firstName + "&";
        queryParams += "lastName=" + this.state.lastName + "&";
        queryParams += "selectedDate=" + this.state.selectedDate + "&";
        queryParams += "selectedFile=" + this.state.selectedFile + "&";
        queryParams += "sex=" + this.state.sex + "&";
        queryParams += "age=" + this.state.age + "&";
        queryParams += "description=" + this.state.description + "&";
        queryParams += "type=" + this.props.type + "&";
        queryParams += "index=" + this.props.index;

        Axios.get("/add?" + queryParams).then(response => {
            this.setState({ open: true })
            setTimeout(() => {
                this.setState({ open: false });
            }, 6000);
            if (this.props.type != "edit") {
                this.setState({
                    userName: '',
                    password: '',
                    initial: '',
                    firstName: '',
                    lastName: '',
                    selectedDate: this.getDate(new Date()),
                    selectedFile: '',
                    sex: '',
                    age: '',
                    description: ''
                })
            }
            this.props.populateData(true)
        })
    }

    getDate(date) {
        var today = date
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    onFileChange(event) {
        this.setState({ selectedFile: event.target.files[0].name });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data == undefined) {
            console.log("inside if");
            this.setState({
                userName: '',
                password: '',
                initial: '',
                firstName: '',
                lastName: '',
                selectedDate: this.getDate(new Date()),
                selectedFile: '',
                sex: '',
                age: '',
                description: ''
            })
        } else {
            console.log("inside else");
            if (this.props.data == undefined || this.props.data == "") {
                this.setState({
                    userName: nextProps.data.userName,
                    password: nextProps.data.password,
                    initial: nextProps.data.initial,
                    firstName: nextProps.data.firstName,
                    lastName: nextProps.data.lastName,
                    selectedDate: nextProps.data.dob,
                    selectedFile: nextProps.data.selectedFile,
                    sex: nextProps.data.sex,
                    age: nextProps.data.age,
                    description: nextProps.data.description
                })
            }
        }
    }
    render() {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }
        return (
            <div class="modal fade" id="addFormModal" tabindex="-1" role="dialog" aria-labelledby="addFormModalLabel" aria-hidden="true">
                <div class="modal-dialog maxWidth80">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addFormModalLabel">{this.props.type == "add" ? "Add" : "Edit"} Form</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body pb-0"></div>
                        <div className="row m-0 addFormDiv pb-0" >
                            <div className="col-lg-4">
                                <TextField id="initial" label="Initial" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.initial} />
                            </div>
                            <div className="col-lg-4">
                                <TextField id="firstName" label="First Name" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.firstName} />
                            </div>
                            <div className="col-lg-4">
                                <TextField id="lastName" label="Last Name" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.lastName} />
                            </div>
                            <div className="col-lg-4">
                                <TextField id="userName" label="Username" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.userName} />
                            </div>
                            <div className="col-lg-4">
                                <TextField id="password" label="Password" type="password" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.password} />
                            </div>
                            <div className="col-lg-4">
                                <TextField
                                    id="selectedDate"
                                    label="Birthday"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={this.state.selectedDate}
                                    variant="outlined"
                                    className="w-100"
                                    onChange={this.onHandleChange}
                                />
                            </div>
                            <div className="col-lg-4">
                                <div className="row m-0">
                                    <div className="col-lg-10 pr-0 mb-0">
                                        <TextField id="selectFileName" label="File" variant="outlined" className="w-100 fileUploadBorderRadiusZero" value={this.state.selectedFile} />
                                    </div>
                                    <div className="col-lg-2 pr-0 mb-0" style={{ 'display': 'flex' }}>
                                        <input accept="image/*" className='d-none' id="fileUpload" type="file" onChange={this.onFileChange} />
                                        <label htmlFor="fileUpload" className="w-100 mb-0" id="uploadButtonDiv">
                                            <Button variant="contained" color="primary" component="span" className="w-100 uploadButton">
                                                <PublishIcon></PublishIcon>
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <FormControl variant="outlined" className="w-100">
                                    <InputLabel id="sex-label">Sex</InputLabel>
                                    <Select labelId="sex-label"
                                        id="sex"
                                        value={this.state.sex}
                                        onChange={this.onHandleChange}
                                        label="Sex"
                                        name="sex"
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-lg-4">
                                <TextField id="age" label="Age" type="text" variant="outlined" className="w-100" onChange={this.onHandleChange} value={this.state.age} />
                            </div>
                            <div className="col-12">
                                <TextField
                                    id="description"
                                    multiline
                                    rows={4}
                                    label="Description"
                                    variant="outlined"
                                    className="w-100"
                                    onChange={this.onHandleChange}
                                    value={this.state.description}
                                />
                            </div>
                            <div className="col-lg-12 text-center">
                                <Button variant="contained" color="primary" onClick={() => this.addForm()}>
                                    {this.props.type == "add" ? "Add" : "Edit"}
                                </Button>
                            </div>
                            <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}>
                                <Alert severity="success">
                                    Form {this.props.type == "add" ? "Added" : "Edited"} Succesfully
                                </Alert>
                            </Snackbar>
                        </div >
                    </div>
                </div>
            </div>
        )
    }
}

export default AddForm;