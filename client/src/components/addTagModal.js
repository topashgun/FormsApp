import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
class Tags extends Component {
    constructor() {
        super()
        this.state = {
            tag: '',
            allTags: [],
            selectedTags: [],
            existsTag: false
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.toggleTag = this.toggleTag.bind(this);
        this.updateAllTags = this.updateAllTags.bind(this);
        this.getAllTags()
    }
    addTag() {
        Axios.get("/addTag?tag=" + this.state.tag).then(response => {
            if (response.data == "exists") {
                this.setState({ existsTag: true })
                setTimeout(() => {
                    this.setState({ existsTag: false })
                }, 3000);
            } else {
                console.log("inside else");
                this.setState({
                    selectedTags: [...this.state.selectedTags, this.state.tag]
                })
                this.updateAllTags();
            }

        });
    }
    updateAllTags() {
        Axios.get("/updateTags?tags=" + this.state.selectedTags.join() + "&index=" + this.props.noteIndex).then(response => {
            this.setState({
                tag: ''
            })
            this.getAllTags();
            this.props.updateTags(this.state.selectedTags.join());
        })
    }
    getAllTags() {
        Axios.get("/getAllTags").then(response => {
            var tempTagArray = []
            response.data.map(tag => {
                tempTagArray.push(tag.tag)
            })
            this.setState({
                allTags: tempTagArray
            })
        });
    }
    onHandleChange(event) {
        this.setState({ tag: event.target.value });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.tags != this.state.selectedTags.join()) {
            if (nextProps.tags == null) {
                this.setState({
                    selectedTags: []
                })
            } else {
                this.setState({
                    selectedTags: nextProps.tags.split(',')
                })
            }

        }
    }
    toggleTag(tag) {
        var selectedTags = this.state.selectedTags;
        selectedTags.indexOf(tag) == -1
            ? selectedTags.push(tag)
            : selectedTags.splice(selectedTags.indexOf(tag), 1)
        this.setState({
            selectedTags: selectedTags
        })
        this.updateAllTags();
    }
    render() {
        return (
            <div>
                <div class="modal fade" id="addTagModal" tabindex="-1" role="dialog" aria-labelledby="addTagModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addFormModalLabel">Tags</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body pb-0">
                                <div className="row mb-2">
                                    <div className="col-lg-10 pr-lg-0 mb-lg-0 mb-2">
                                        <TextField id="tagsTextBox" label="Tag" variant="outlined" className="w-100 fileUploadBorderRadiusZero" onChange={this.onHandleChange} value={this.state.tag} />
                                    </div>
                                    <div className="col-lg-2 pl-lg-0 mb-0" style={{ 'display': 'flex' }}>
                                        <label className="w-100 mb-0" id="uploadButtonDiv">
                                            <Button variant="contained" color="primary" component="span" className="w-100 uploadButton" onClick={() => this.addTag()}>
                                                Add
                                            </Button>
                                        </label>
                                    </div>
                                    <div className={`col-12 text-center`} style={{ 'height': '30px' }}>
                                        <span class={`badge badge-danger ${this.state.existsTag == true ? 'd-inline-block' : 'd-none'}`}>Tag '{this.state.tag}' already exists'</span>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12 "><h6 className="selectedTags">Selected Tags</h6></div>
                                    <div className="col-12 selectedTagCenterAlign">
                                        {
                                            this.state.allTags.map(tag => {
                                                return (
                                                    <button type="button" class={`btn tagButton ${this.state.selectedTags.indexOf(tag) == -1 ? 'btn-outline-primary' : 'btn-primary'}`} onClick={() => this.toggleTag(tag)}>{tag}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default Tags;