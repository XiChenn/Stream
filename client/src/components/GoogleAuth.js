import React from 'react';
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1055096037106-psekh0h13utaumpm4m5qe2r6754pfrd3.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        } else if (this.props.isSignedIn) {
            return(
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        return(
            <button className="ui blue google button" onClick={this.onSignInClick}>
                <i className="google icon"/>
                Sign In with Google
            </button>
        );
    };

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
