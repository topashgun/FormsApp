import React, { Component } from 'react'

class addForm extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="row m-0 py-3">
                <div className="col-lg-8 offset-lg-2">
                    <h5 className="text-center">Forms</h5>
                </div>
                <div className="col-lg-2">
                    <button type="button" class="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target="#addFormModal" onClick={() => this.props.editTypeIndex('add', '-')}>
                        Add Form
                    </button>
                </div>
            </div>

        )
    }
}

export default addForm