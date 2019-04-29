/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Icon, Grid } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const experience = Object.assign({}, this.props.experienceData);
        this.state = {
            showEditSection: false,
            newExperience: experience,
            company: '',
            position: '',
            start: '',
            end: '',
            responsibilities:'',
            deleteId: '',
            updateId: ''
        }
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.DateConverter = this.dateConverter.bind(this);
        this.DateConverterForUpdate = this.DateConverterForUpdate.bind(this);
    }

    DateConverterForUpdate(inputDate) {
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
        //console.log(typeof date)
        return date;
    }

    dateConverter(tempdate) {
        var temp = new Date(tempdate);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var day = temp.getDate()+1;
        if (day < 10) {
            day = '0' + day;
        }
        var date = (day-1 + this.nth(temp.getDate()) + " " + monthNames[temp.getMonth()] + ", " + temp.getFullYear());
        return date;
    }
    nth(d) {
        if (d > 3 && d < 21) {
            return 'th';
        }
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    componentDidMount() {
        //console.log(this.state.newExperience)
    }

    updateExperience(e) {
        e.preventDefault();
        const data = this.props.experienceData.map(e => e.id).indexOf(this.state.updateId);
        let updatedData = this.props.experienceData;
        updatedData[data].company = this.state.company;
        updatedData[data].position = this.state.position;
        updatedData[data].start = this.state.start;
        updatedData[data].end = this.state.end;
        updatedData[data].responsibilities = this.state.responsibilities;
        this.setState({ newExperience: updatedData });
        this.props.updateProfileData(updatedData);
        this.cancelEdit();
    }


    cancelEdit() {
        this.setState({ updateId: '' })
    }

    handleUpdate(id) {
        this.setState({ updateId: id });
        let data = this.props.experienceData;
        let updateData = data.filter(l => l.id == id);
        this.setState({
            company: updateData[0].company, position: updateData[0].position,
            start: updateData[0].start, end: updateData[0].end, responsibilities: updateData[0].responsibilities
        })
    }

    handleDelete(id) {
        const experience = this.props.experienceData;
        const data = this.props.experienceData.map(e => e.id).indexOf(id);
        const updatedData = experience.splice(data, 1);
        this.setState({ newExperience: updatedData });
        this.props.updateProfileData(updatedData);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    saveDetails() {
        let company = this.state.company;
        let position = this.state.position;
        let start = this.state.start;
        let end = this.state.end;
        let responsibilities = this.state.responsibilities;
        const data = this.state.newExperience.push({ company, position, start, end, responsibilities });
        this.setState({ newExperience: data });
        this.props.updateProfileData(data);
        this.closeEdit();
        //console.log(this.state.endDate)
    }

    openEdit(e) {
        e.preventDefault();
        const experience = this.props.experienceData;
        //console.log(this.state.newExperience)
        this.setState({
            showEditSection: true,
            newExperience: experience
        });
    }

    render() {
        return this.renderDisplay()

    }

    renderEdit() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Company:"
                                    name="company"
                                    value={this.state.company}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Company"
                                    errorMessage="Please enter a valid company"
                                />
                            </div>
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Position:"
                                    name="position"
                                    value={this.state.position}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Position"
                                    errorMessage="Please enter a valid position"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="date"
                                    label="Start Date:"
                                    name="start"
                                    value={this.state.start}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Start date"
                                    errorMessage="Please enter a valid start date"
                                />
                            </div>
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="date"
                                    label="End Date:"
                                    name="end"
                                    value={this.state.end}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="End date"
                                    errorMessage="Please enter a valid end date"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="sixteen wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Responsibilities:"
                                    name="responsibilities"
                                    value={this.state.responsibilities}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Responsibilities"
                                    errorMessage="Please enter a valid responsibility"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="ui black button" onClick={this.saveDetails} >Add</button>
                <button type="button" className="ui button" onClick={this.closeEdit} > Cancel</button>
            </React.Fragment>
        )
    }

    renderDisplay() {
        let list = this.props.experienceData;
        let tableData = null;
        if (list != '') {
            tableData = list.map((experience, index) => {
                if (this.state.updateId != experience.id) {
                    return (
                        <tr key={index}>
                            <td>{experience.company}</td>
                            <td>{experience.position}</td>
                            <td>{experience.responsibilities}</td>
                            <td>{this.dateConverter(experience.start)}</td>
                            <td>{this.dateConverter(experience.end)}</td>
                            <td className="four wide right aligned">
                                <i className="pencil icon" onClick={this.handleUpdate.bind(this, experience.id)}></i>
                                <i className="remove icon" onClick={this.handleDelete.bind(this, experience.id)}></i>
                            </td>
                        </tr>
                    )
                }
                else {
                    return (
                        <tr key={index}>
                            <td colSpan={8}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Company</label>
                                                <input type="text" name="company" placeholder="Add Company" value={this.state.company} onChange={this.handleChange} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Position</label>
                                                <input type="text" name="position" placeholder="Add Position" value={this.state.position} onChange={this.handleChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Start</label>
                                                <input type="date" name="start" placeholder="Add Start Date" value={this.DateConverterForUpdate(this.state.start)} onChange={this.handleChange} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>End</label>
                                                <input type="date" name="end" placeholder="Add End Date" value={this.DateConverterForUpdate(this.state.end)} onChange={this.handleChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Responsibilities</label>
                                                <input type="text" name="responsibilities" placeholder="Responsibilities" value={this.state.responsibilities} onChange={this.handleChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <button className="ui black button" onClick={this.updateExperience}>Update</button>
                                                <button className="ui button" onClick={this.cancelEdit}>Cancel</button>
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </td>
                        </tr>
                    )
                }
            })
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        {this.state.showEditSection ? this.renderEdit() : null}
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th className="three wide">Company</th>
                                    <th className="three wide">Position</th>
                                    <th className="three wide">Responsibilities</th>
                                    <th className="three wide">Start Date</th>
                                    <th className="three wide">End Date</th>
                                    <th>
                                        <button className="ui black button ui right floated" onClick={this.openEdit}>+ Add New</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}