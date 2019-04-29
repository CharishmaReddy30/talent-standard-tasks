import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { CheckBox } from '../Form/CheckBox.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        let jobSeekingStatus = props.status ? Object.assign({}, props.status) : { 'status': '', 'availableDate': null }
        //console.log(props.status)
        this.state = {
            status: [],
            jobSeekingStatus: jobSeekingStatus,
            status: this.props.status.status,
            availableDate: this.props.status.availableDate
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        const status = [{ title: 'Actively looking for a job' }, { title: 'Not looking for a job at the moment' },
            { title: 'Currently employed but open to offers' }, { title: 'Will be available on later date' }]
        this.setState({ status: status })
    }

    handleChange(val) {
        this.setState({status: val})
        if (val !== 'notNow') {
            let data = this.state.jobSeekingStatus;
            data['status'] = val;
            this.setState({ jobSeekingStatus: data, status: val }, this.props.saveProfileData({ "jobSeekingStatus": data }))
        }
        else {
            this.setState({ status: val })
        }
    }
    handleDateChange(event) {
        var data = event.target.value
        this.setState({
            availableDate: data
        })
    }
    saveDetails() {
        let data = this.state.jobSeekingStatus;
        this.props.saveProfileData({ "jobSeekingStatus": { 'status': this.state.status, 'availableDate': this.state.availableDate } })

    
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ui form">
                    <div className="grouped fields" style={{ marginTop:"15px" }}>
                        <label>Current Status</label>
                        <div className="field" style={{ marginTop: "10px" }}>
                            <div className="ui radio checkbox">
                                <input type="radio" name="status" checked={this.props.status.status === 'active'} onChange={this.handleChange.bind(this, 'active')} />
                                <label>Actively looking for a job</label>
                            </div>
                        </div>
                        <div className="field" style={{ marginTop: "10px" }}>
                            <div className="ui radio checkbox">
                                <input type="radio" name="status" checked={this.props.status.status === 'inactive'} onChange={this.handleChange.bind(this, 'inactive')} />
                                <label>Not looking for a job at the moment</label>
                            </div>
                        </div>
                        <div className="field" style={{ marginTop: "10px" }}>
                            <div className="ui radio checkbox">
                                <input type="radio" name="status" checked={this.props.status.status === 'employed'} onChange={this.handleChange.bind(this, 'employed')} />
                                <label>Currently employed but open to offers</label>
                            </div>
                        </div>
                        <div className="field" style={{ marginTop: "10px", marginBottom:"10px" }}>
                            <div className="ui radio checkbox">
                                <input type="radio" name="status" checked={this.props.status.status === 'notNow'} onChange={this.handleChange.bind(this, 'notNow')} />
                                <label>Will be available on later date</label>
                            </div>
                            {this.state.status === 'notNow' ? <div className="row">
                                <div className="ui six wide column">
                                    <SingleInput
                                        inputType="date"
                                        name="availableDate"
                                        content={this.state.availableDate ? this.state.availableDate:''}
                                        controlFunc={this.handleDateChange}
                                        maxLength={80}
                                        placeholder="Add Date"
                                        errorMessage="Please enter a valid date"
                                        isError={false}
                                    />
                                    
                                </div>
                                <button type="button" className="ui black button" onClick={this.saveDetails} >Save</button>
                            </div> : null}
                        </div>
                    </div>

                </div>
                
            </React.Fragment>
            )
    }
}