import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);
        const visaStatus = props.visaStatus;
        const visaExpiryDate = props.visaExpiryDate;
        this.state = {
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate,
            visa: [{ value: 'Citizen', title: 'Citizen' }, { value: 'Permanent Resident', title: 'Permanent Resident' },
            { value: 'Work Visa', title: 'Work Visa' }, { value: 'Student Visa', title: 'Student Visa' }],
            expiryNeeded: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.DateConverterForUpdate = this.DateConverterForUpdate.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visaExpiryDate) {
            state.expiryNeeded = true;
        }
        return null;
    }

    DateConverterForUpdate(inputDate) {
        if (inputDate == null) {
            return ''
        }
        var temp = new Date(inputDate);
        var day = temp.getDate();
        var month = temp.getMonth() + 1;
        var year = temp.getFullYear();
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        if (year < 10) {
            year = "000" + year
        } else if (year < 100) {
            year = "00" + year
        } else if (year < 1000) {
            year = "0" + year
        }
        var date = (year + "-" + month + "-" + day);
        return date;
    }

    saveDetails() {
        const visaStatus = this.state.visaStatus;
        const visaExpiryDate = this.state.visaExpiryDate;
        const newVisaDetails = { visaStatus, visaExpiryDate };
        this.props.saveProfileData(newVisaDetails);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === 'visaStatus' && (event.target.value === 'Work Visa' || event.target.value === 'Student Visa')) {
            this.setState({ expiryNeeded: true });
            alert(this.state.visaExpiryDate)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.visaStatus !== this.state.visaStatus) {
            if (this.state.visaStatus === 'Citizen' || this.state.visaStatus === 'Permanent Resident') {
                this.setState({ expiryNeeded: false })
                this.saveDetails();
            }
        }
    }
    

    

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="six wide field">
                                <label>Visa type</label>
                                <Select
                                    name="visaStatus"
                                    options={this.state.visa}
                                    controlFunc={this.handleChange}
                                    placeholder="Enter your visaStatus"
                                    selectedOption={this.state.visaStatus ? this.state.visaStatus : this.props.visaStatus}
                                />
                            </div>
                            {this.state.expiryNeeded ?
                                <React.Fragment>
                                    <div className="six wide field">
                                        <label>Visa expiry date</label>
                                        <SingleInput
                                            inputType="date"
                                            name="visaExpiryDate"
                                            content={this.state.visaExpiryDate ? this.state.visaExpiryDate : this.DateConverterForUpdate(this.props.visaExpiryDate)}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            placeholder="Add Visa Expiry Date"
                                            errorMessage="Please enter a valid date"
                                            isError={false}
                                        />
                                    </div>
                                    <div className="two wide field">
                                        <button style={{ marginTop: '23px' }} type="button" className="ui black button" onClick={this.saveDetails} >Save</button>
                                    </div>
                                </React.Fragment>
                                : null}

                        </div>
                    </div>
                </div>
            </React.Fragment>
            )
    }
}