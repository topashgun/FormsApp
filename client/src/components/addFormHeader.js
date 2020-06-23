import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
class addForm extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="col-12">
                <div className="row py-3" style={{ 'alignItems': 'flex-end' }}>
                    <div className="col-lg-4 col-12">
                        <TextField id="SearchBox" label="Search" variant="outlined" className="w-100" onChange={this.props.onChangeSearch} value={this.props.search} />
                    </div>
                    <div className="col-lg-4 col-6 mt-lg-0 mt-2">
                        <h5 className="text-lg-center mb-0 text-left">Forms</h5>
                    </div>
                    <div className="col-lg-2 offset-lg-2 col-6 mt-lg-0 mt-2">
                        <button type="button" class="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target="#addFormModal" onClick={() => this.props.editTypeIndex('add', '-')}>
                            Add Form
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default addForm