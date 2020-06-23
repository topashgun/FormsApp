import React, { Component } from 'react'
import AddFormHeader from './addFormHeader'
import ShowForms from './showForms'
import AddForm from './addForm'
class Body extends Component {
    constructor() {
        super()
        this.state = {
            type: 'add',
            index: '-',
            formData: '',
            populateForms: false
        }
        this.editTypeIndex = this.editTypeIndex.bind(this);
        this.populateData = this.populateData.bind(this);

    }
    editTypeIndex(type, index, data) {
        this.setState({
            type: type,
            index: index,
            formData: data
        })
    }
    populateData(populateFlag) {
        this.setState({
            populateForms: populateFlag
        })
    }
    render() {
        return (
            <div>
                <AddFormHeader editTypeIndex={this.editTypeIndex}></AddFormHeader>
                <ShowForms editTypeIndex={this.editTypeIndex} editTypeData={this.editTypeData} populateForms={this.state.populateForms} populateData={this.populateData}></ShowForms>
                <AddForm type={this.state.type} index={this.state.index} data={this.state.formData} populateData={this.populateData}></AddForm>
            </div>
        )
    }
}


export default Body;