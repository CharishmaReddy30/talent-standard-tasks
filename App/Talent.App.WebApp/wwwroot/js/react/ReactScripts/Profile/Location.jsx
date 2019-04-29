import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';
import { SingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props);
        const addressData = props.addressData;
        this.state = {
            countries: [],
            cities: [],
            showEditSection: false,
            newAddress: addressData
        }
        this.handleChange = this.handleChange.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.saveDetails = this.saveDetails.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this);
        this.populateCities = this.populateCities.bind(this);
    }
    componentDidMount() {
        let countries = {};
        const keys = Object.keys(Countries);
        let val = 0;
        for (const key in keys) {
            countries[val] = {
                value: keys[key],
                title: keys[key]
            }
            val++;
        }
        let optionsCountry = Object.assign([], countries);
        this.setState({ countries: optionsCountry });
    }
    handleChange(event) {
        const data = this.state.newAddress;
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
        if (event.target.name === 'country') {
            let count = this.state.countries.map(e => e.value).indexOf(event.target.value);
            this.populateCities(count);
        }
    }

    populateCities(c) {
        let count = c;
        let cities = Object.values(Countries);
        let val = 0;
        let city = {};
        let optionsCities = [...new Set(cities[count])];
        for (const value in optionsCities) {
            city[val] = {
                value: optionsCities[value],
                title: optionsCities[value]
            }
            val++;
        }
        let optionsCity = Object.assign([], city);
        this.setState({ cities: optionsCity })
    }

    openEdit() {
        const address = this.props.addressData;
        if (address.country !== "") {
            let count = this.state.countries.map(e => e.value).indexOf(address.country);
            this.populateCities(count);
        }
        this.setState({
            showEditSection: true,
            newAddress: address
        })
    }

    saveDetails() {
        const data = this.state.newAddress;
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    render() {
        return this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
    }

    renderEdit() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="four wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Number"
                                    name="number"
                                    value={this.state.newAddress.number}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter your Number"
                                    errorMessage="Please enter a valid Number"
                                />
                            </div>
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Street"
                                    name="street"
                                    value={this.state.newAddress.street}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter your Street"
                                    errorMessage="Please enter a valid Street"
                                />
                            </div>
                            <div className="four wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Suburb"
                                    name="suburb"
                                    value={this.state.newAddress.suburb}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter your Suburb"
                                    errorMessage="Please enter a valid Suburb"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="six wide field">
                                <label>Country</label>
                                <Select
                                    name="country"
                                    options={this.state.countries}
                                    controlFunc={this.handleChange}
                                    placeholder="Enter your Country"
                                    selectedOption={this.state.newAddress.country}
                                />
                            </div>

                            <div className="six wide field">
                                <label>City</label>
                                <Select
                                    name="city"
                                    options={this.state.cities}
                                    controlFunc={this.handleChange}
                                    placeholder="Enter your city"
                                    selectedOption={this.state.newAddress.city}
                                />
                            </div>
                            <div className="four wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Post Code"
                                    name="postCode"
                                    value={this.state.newAddress.postCode}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter your PostCode"
                                    errorMessage="Please enter a valid Post Code"
                                />
                            </div>
                        </div>
                        <button type="button" className="ui black button" onClick={this.saveDetails} >Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit} > Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )

    }

    renderDisplay() {
        let city = this.props.addressData ? this.props.addressData.city : null;
        let country = this.props.addressData ? this.props.addressData.country : null;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {this.props.addressData.number} , {this.props.addressData.street} , {this.props.addressData.suburb} , {this.props.addressData.postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}


export class Nationality extends React.Component {
    constructor(props) {
        super(props);
        const nationalityData = props.nationalityData;
        this.state = {
            showEditSection: false,
            nationality: {
                nationality: this.props.nationalityData 
            },
            countries: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let countries = {};
        const keys = Object.keys(Countries);
        let val = 0;
        for (const key in keys) {
            countries[val] = {
                value: keys[key],
                title: keys[key]
            }
            val++;
        }
        let optionsCountry = Object.assign([], countries);
        this.setState({ countries: optionsCountry });
    }
    
    handleChange(event) {
        const data = this.state.nationality;
        data[event.target.name] = event.target.value
        this.setState({
            nationality: data
        }, this.props.saveProfileData(data))
    }

    render() {
        return (
            <div className="row">
                <div className="ui sixteen wide column">
                    <div className="fields">
                        <div className="eight wide field">
                            <Select
                                name="nationality"
                                options={this.state.countries}
                                controlFunc={this.handleChange}
                                placeholder="Select your Nationality"
                                selectedOption={this.props.nationalityData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}