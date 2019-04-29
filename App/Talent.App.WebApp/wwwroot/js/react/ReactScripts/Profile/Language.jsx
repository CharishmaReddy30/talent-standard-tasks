/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Button } from 'semantic-ui-react';
import { Select } from '../Form/Select.jsx';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const languages = this.props.languageData;
        this.state = {
            showEditSection: false,
            newLanguages: languages,
            languageLevels: [],
            language: '',
            languageLevel: '',
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
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(e) {
        e.preventDefault();
        const data = this.props.languageData.map(e => e.id).indexOf(this.state.updateId);
        let updatedData = this.props.languageData;
        updatedData[data].name = this.state.language;
        updatedData[data].level = this.state.languageLevel;
        this.setState({ newLanguages: updatedData });
        this.props.updateProfileData(updatedData);
        this.cancelEdit();
    }

    cancelEdit() {
        this.setState({ updateId:'' })
    }

    handleUpdate(id) {
        this.setState({ updateId: id });
        let data = this.props.languageData;
        let updateData = data.filter(l => l.id == id);
        this.setState({ language: updateData[0].name, languageLevel: updateData[0].level })
    }

    handleDelete(id) {
        const languages = this.props.languageData;
        const data = this.props.languageData.map(e => e.id).indexOf(id);
        const updatedData = languages.splice(data, 1);
        this.setState({ newLanguages: updatedData });
        this.props.updateProfileData(updatedData);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        const levels = [{ value: 'Basic', title: 'Basic' },
            { value: 'Conversational', title: 'Conversational' },
            { value: 'Fluent', title: 'Fluent' },
            { value: 'Native/Bilingual', title: 'Native/Bilingual' }
        ];
        this.setState({ languageLevels: levels });
    }

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    saveDetails() {
        let name = this.state.language;
        let level = this.state.languageLevel;
        const data = this.state.newLanguages.push({ name, level });
        this.setState({ newLanguages: data });
        this.props.updateProfileData(data);
        this.closeEdit();
    }

    openEdit(e) {
        e.preventDefault();
        const languages = this.props.languageData;
        this.setState({
            showEditSection: true,
            newLanguages: languages
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
                                    name="language"
                                    content={this.state.language}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add Language"
                                    errorMessage="Please enter a valid Language"
                                    isError={false}
                                />  
                            </div>
                            <div className="five wide field">
                                <Select
                                    name="languageLevel"
                                    options={this.state.languageLevels}
                                    controlFunc={this.handleChange}
                                    placeholder="Language Level"
                                    selectedOption={this.state.languageLevel}
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
        let list = this.props.languageData;
        let tableData = null;
        if (list != '') {
            tableData = list.map((language, index) => {
                if (this.state.updateId != language.id) {
                    return (
                        <tr key={index}>
                            <td>{language.name}</td>
                            <td>{language.level}</td>
                            <td className="four wide right aligned">
                                <i className="pencil icon" onClick={this.handleUpdate.bind(this, language.id)}></i>
                                <i className="remove icon" onClick={this.handleDelete.bind(this, language.id)}></i>
                            </td>
                        </tr>
                    )
                }
                else {
                    return(
                        <tr key={index}>
                            <td>
                                <SingleInput
                                    inputType="text"
                                    name="language"
                                    content={this.state.language}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add Language"
                                    errorMessage="Please enter a valid Language"
                                    isError={false}
                                /> 
                            </td>
                            <td>
                                <Select
                                    name="languageLevel"
                                    options={this.state.languageLevels}
                                    controlFunc={this.handleChange}
                                    placeholder="Language Level"
                                    selectedOption={this.state.languageLevel}
                                />
                            </td>
                            <td>
                                <button className="ui blue basic button" onClick={this.updateLanguage}>Update</button>
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
                                    <th className="five wide">Language</th>
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