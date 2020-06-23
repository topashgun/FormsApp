import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CakeIcon from '@material-ui/icons/Cake';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DescriptionIcon from '@material-ui/icons/Description';

import EditIcon from '@material-ui/icons/Edit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteIcon from '@material-ui/icons/Note';


class UserCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary className="expansionPanelHead" expandIcon={<ExpandMoreIcon />}>
                    {this.props.userDetails.initial}. {this.props.userDetails.firstName} {this.props.userDetails.lastName} ({this.props.userDetails.age},{this.props.userDetails.sex})
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="expansionPanelDetails">
                    <div className="row">
                        <div className="col-12">
                            <table class="table table-borderless tableDetails">
                                <tbody>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <PersonIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.userName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <VpnKeyIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.password}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <CakeIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.dob}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <AttachmentIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.selectedFile}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <DescriptionIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <NoteIcon />
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {this.props.userDetails.notes}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="panelBodyTableIcon">
                                            <LocalOfferIcon></LocalOfferIcon>
                                        </td>
                                        <td className="panelBodyTableDesc">
                                            {
                                                this.props.userDetails.tags.split(',').map(tag => {
                                                    return (
                                                        <span class="badge badge-info mr-1 px-2">{tag}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12">
                            <div class="btn-group d-flex" role="group">
                                <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#addFormModal" onClick={() => this.props.editTypeIndex('edit', this.props.userDetails.id, this.props.userDetails)}><EditIcon></EditIcon></button>
                                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addTagModal" onClick={() => this.props.addNote(this.props.userDetails.id)}><LocalOfferIcon></LocalOfferIcon></button>
                                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addNoteModal" onClick={() => this.props.addNote(this.props.userDetails.id)}><NoteAddIcon></NoteAddIcon></button>
                                <button type="button" class="btn btn-danger btn-sm" onClick={() => this.props.deleteForm(this.props.userDetails.id)}><DeleteIcon></DeleteIcon></button>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


export default UserCard;