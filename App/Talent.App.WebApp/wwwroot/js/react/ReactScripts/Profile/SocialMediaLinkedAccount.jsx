/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';
export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts;
        this.state = {
            showEditSection: false,
            newLinkedAccount: linkedAccounts
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
        this.openLinkedAccount = this.openLinkedAccount.bind(this)
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        console.log(this.props.linkedAccounts)
        const linkedAccounts = this.props.linkedAccounts
        this.setState({
            showEditSection: true,
            newLinkedAccount: linkedAccounts
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = this.state.newLinkedAccount
        data[event.target.name] = event.target.value
        this.setState({
            newLinkedAccount: data
        })
    }
    saveDetails() {
        const data = this.state.newLinkedAccount
        this.props.saveProfileData({ "linkedAccounts":data })
        this.closeEdit()
    }
    openLinkedAccount(e) {
        e.preventDefault();
        if (e.target.name=='linkedIn') {
            window.location.replace("http://" + this.props.linkedAccounts.linkedIn);
        }
        else {
            window.location.replace("http://" + this.props.linkedAccounts.github);
        }
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinkedAccount.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinkedAccount.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid Url"
                />
                <button type="button" className="ui black button" onClick={this.saveDetails} >Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit} > Cancel</button>
            </div>
        )
    }
    renderDisplay() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <Button color='linkedin' className="ui blue button" onClick={this.openLinkedAccount} name='linkedIn'>
                            <Icon name='linkedin' /> LinkedIn
                    </Button>
                        <Button color='black' className="ui black button" onClick={this.openLinkedAccount} name='github'>
                            <Icon name='github' /> GitHub
                    </Button>
                        <Button color='black' className="ui right floated black button" onClick={this.openEdit}>
                            Edit
                    </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}