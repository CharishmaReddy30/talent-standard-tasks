/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        const imageFile = props.imageFile;
        const imageURL = props.imageURL;
        this.state = {
            imageFile: imageFile,
            imageURL: imageURL
        }
        this.changePhoto = this.changePhoto.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    };
    
    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                imageURL: this.props.imageURL,
                imageFile: this.props.imageFile
            }, console.log(this.props.imageFile))
            //console.log("load url", this.props.imageURL);
        }
    }


    handleUpload(e) {
        e.preventDefault();
        console.log('hello');
        var data = new FormData();
        data.append('ProfilePhoto', this.state.imageFile);
        data.append('ProfilePhotoUrl', this.state.imageURL);
        console.log(this.state.imageFile)
        console.log(this.props.savePhotoUrl)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                this.setState({ imageFile: '' }); 
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this)
        });
    }


    changePhoto(e) {
        console.log('hello',event);
        this.setState({ imageURL: URL.createObjectURL(event.target.files[0]) })
        this.setState({ imageFile: event.target.files[0] })
    }

    

    render() {
        return (<React.Fragment>
            <div className="row">
                <div className="two wide column">
                    <input type="file" onChange={this.changePhoto} className="inputfile" id="embedpollfileinput" style={{ display: 'none' }} />
                    <label htmlFor="embedpollfileinput" className="work-sample-photo">
                        {this.state.imageURL ?
                            (<img src={this.state.imageURL} className="ui small circular image"></img>) :
                            <i className="ui huge camera retro icon circular" ></i>}
                    </label>
                    <div className="four wide column">
                        {this.state.imageFile ?
                            <div><button onClick={this.handleUpload} className="medium ui black button ui upload button" style={{ marginLeft: "25px", marginTop: "25px" }}><i className="ui upload icon" ></i>Upload</button></div>
                            : null}
                    </div>
                </div>

            </div>
        </React.Fragment>)
        
    }
}
