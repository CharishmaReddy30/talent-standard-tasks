import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Embed, Label } from 'semantic-ui-react'

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false
        };
        this.handleView = this.handleView.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.handleWeb = this.handleWeb.bind(this);
    }

    getProfile() {
        let talent = this.props.talent;
        let profilePhoto, currentEmployer, position, status;
        if (talent) {
            profilePhoto = talent.photoId ? talent.photoId : "http://semantic-ui.com/images/avatar/large/elliot.jpg";
            currentEmployer = talent.workExperience.length > 0 ? talent.workExperience[0].company : "No Recent Job";
            position = talent.workExperience.length > 0 ? talent.workExperience[0].position : "No Recent Job";
            status = talent.visaStatus ? talent.visaStatus : "No visa status";
        }

        return (<div className="ui two column grid fluid">
            <div className="row">
                <div className="eight wide column"><img className="ui large image" src={profilePhoto}/></div>
                <div className="column">
                    <div className="talent-profile">
                        <div style={{ fontWeight:'bold' }}>
                            Talent snapshot
                        </div>
                    </div>
                    <div className="talent-profile">
                        <div style={{ fontWeight: 'bold', fontSize:'4 px' }}>
                            Current Employer
                        </div>
                        <div>{currentEmployer}</div>
                    </div>
                    <div className="talent-profile">
                        <div style={{ fontWeight: 'bold' }}>
                            Visa Status
                        </div>
                        <div>{status}</div>
                    </div>
                    <div className="talent-profile">
                        <div style={{ fontWeight: 'bold' }}>
                            Position
                        </div>
                        <div>{position}</div>
                    </div>
                </div>
            </div>
        </div>);
    }

    handleView() {
        const showing = !this.state.showProfile;
        this.setState({ showProfile: showing });
    }

    handleWeb(account) {
        let website = this.props.talent.linkedAccounts[account];
        if (website) {
            website = "https://" + website;
            window.open(website);
        }
        else {
            alert(`No ${account} info provided`);
        }
    }

    render() {
        let talent = this.props.talent;
        let talentName = talent.name ? talent.name : "Name";
        let skills = talent.skills.length > 0 ? talent.skills.map(s => <Label basic color='blue' key={s.id}>{s.name}</Label>) : null;
        return (<React.Fragment>
            <div className="ui fluid card">
                <div className="content">
                    <div className="inline">
                        {talentName}
                        <div className="inline right floated"><i className="star icon"></i></div>
                    </div>
                </div>
                <div className="content">
                    {this.state.showProfile ? this.getProfile() : <Embed url="http://localhost:61771/images/video/demo.mp4"/>}
                </div>
                <div className="center aligned content" style={{ cursor:'pointer' }}>
                    <div className="ui grid">
                        <div className="four wide column">
                            {this.state.showProfile ? <i className="video icon" onClick={this.handleView}></i> :
                                <i className="user icon" onClick={this.handleView}></i>}
                        </div>
                        <div className="four wide column">
                            <i className="file pdf outline icon"></i>
                        </div>
                        <div className="four wide column">
                            <i className="linkedin icon" onClick={() => this.handleWeb('linkedIn')}></i>
                        </div>
                        <div className="four wide column">
                            <i className="github icon" onClick={() => this.handleWeb('github')}></i>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    <div>
                        {skills ? skills : 'No skills found'}
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
}