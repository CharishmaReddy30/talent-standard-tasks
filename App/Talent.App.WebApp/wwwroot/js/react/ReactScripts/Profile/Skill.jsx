/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Button } from 'semantic-ui-react';
import { Select } from '../Form/Select.jsx';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const skills = this.props.skillData;
        this.state = {
            showEditSection: false,
            newSkills: skills,
            skillLevels: [],
            name: '',
            level: '',
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
        this.updateSkill = this.updateSkill.bind(this);
    }

    updateSkill(e) {
        e.preventDefault();
        const data = this.props.skillData.map(e => e.id).indexOf(this.state.updateId);
        let updatedData = this.props.skillData;
        updatedData[data].name = this.state.name;
        updatedData[data].level = this.state.level;
        this.setState({ newSkills: updatedData });
        this.props.updateProfileData(updatedData);
        this.cancelEdit();
    }

    cancelEdit() {
        this.setState({ updateId: '' })
    }

    handleUpdate(id) {
        this.setState({ updateId: id });
        let data = this.props.skillData;
        let updateData = data.filter(l => l.id == id);
        this.setState({ name: updateData[0].name, level: updateData[0].level })
    }

    handleDelete(id) {
        const skills = this.props.skillData;
        const data = this.props.skillData.map(e => e.id).indexOf(id);
        const updatedData = skills.splice(data, 1);
        this.setState({ newSkills: updatedData });
        this.props.updateProfileData(updatedData);
    }

    handleChange(event) {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        const levels = [{ value: 'Beginner', title: 'Beginner' },
            { value: 'Intermediate', title: 'Intermediate' },
            { value: 'Expert', title: 'Expert' }
        ];
        this.setState({ skillLevels: levels });
    }

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    saveDetails() {
        let name = this.state.name;
        let level = this.state.level;
        const data = this.state.newSkills.push({ name, level });
        console.log(level)
        this.setState({ newSkills: data });
        console.log()
        this.props.updateProfileData(data);
        this.closeEdit();
    }

    openEdit(e) {
        e.preventDefault();
        const skills = this.props.skillData;
        this.setState({
            showEditSection: true,
            newSkills: skills
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
                            <div className="five wide field">
                                <SingleInput
                                    inputType="text"
                                    name="name"
                                    content={this.state.name}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add Skill"
                                    errorMessage="Please enter a valid Skill"
                                    isError={false}
                                />
                            </div>
                            <div className="five wide field">
                                <Select
                                    name="level"
                                    options={this.state.skillLevels}
                                    controlFunc={this.handleChange}
                                    placeholder="level"
                                    selectedOption={this.state.level}
                                />
                            </div>
                            <div className="six wide field">
                                <button type="button" className="ui black button" onClick={this.saveDetails} >Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit} > Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay() {
        let list = this.props.skillData;
        let tableData = null;
        if (list != '') {
            tableData = list.map((skill, index) => {
                if (this.state.updateId != skill.id) {
                    return (
                        <tr key={index}>
                            <td>{skill.name}</td>
                            <td>{skill.level}</td>
                            <td className="four wide right aligned">
                                <i className="pencil icon" onClick={this.handleUpdate.bind(this, skill.id)}></i>
                                <i className="remove icon" onClick={this.handleDelete.bind(this, skill.id)}></i>
                            </td>
                        </tr>
                    )
                }
                else {
                    return (
                        <tr key={index}>
                            <td>
                                <SingleInput
                                    inputType="text"
                                    name="name"
                                    content={this.state.name}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add Skill"
                                    errorMessage="Please enter a valid Skill"
                                    isError={false}
                                />
                            </td>
                            <td>
                                <Select
                                    name="level"
                                    options={this.state.skillLevels}
                                    controlFunc={this.handleChange}
                                    placeholder="Experience Level"
                                    selectedOption={this.state.level}
                                />
                            </td>
                            <td>
                                <button className="ui blue basic button" onClick={this.updateSkill}>Update</button>
                                <button className="ui red basic button" onClick={this.cancelEdit}>Cancel</button>
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
                                    <th className="five wide">Skill</th>
                                    <th className="four wide">Level</th>
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

