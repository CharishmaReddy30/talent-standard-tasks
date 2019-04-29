import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {},
            talents: []
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadTalents = this.loadTalents.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData, });//comment this
    }

    componentDidMount() {
       // window.addEventListener('scroll', this.handleScroll);
        this.loadData();
        this.loadTalents();
        this.init();
    };

    loadData() {
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/GetEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.updateWithoutSave(res.employer.companyContact)
            }.bind(this)
        })
    }

    loadTalents() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentList',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.setState({ talents:res.data })
            }.bind(this)
        })
    }

    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.companyDetails, newValues)
        this.setState({
            companyDetails: newProfile
        }, function () { console.log(this.state.companyDetails) })
    }

    handleScroll() {
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            //load ajax and update states
            //call state and update state;
        }
    };
   
    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile companyDetails={this.state.companyDetails} />
                        </div>
                    <div className="eight wide column">
                        <TalentCard talents={this.state.talents} />
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion/>
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}