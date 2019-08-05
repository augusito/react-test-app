import React, {Component} from 'react';
import Navigation from "./Navigation";
import {connect} from "react-redux";

class Home extends Component {
    componentDidMount() {
        if(!this.props.auth.loggedIn){
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <div className="container-fluid">
                    <h1>Welcome to Mawingu</h1>
                    <p>
                        Click <a href="/tasks">Tasks</a> to find tasks assigned to you.
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps)(Home);