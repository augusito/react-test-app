import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../actions/userActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            phone: "",
            password: "",
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.loggedIn) {
            this.props.history.push("/tasks");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.loggedIn) {
            this.props.history.push("/tasks");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit (e){
        e.preventDefault();
        const user = {
            phone: this.state.phone,
            password: this.state.password
        };
        this.props.login(user, this.props.history);
    };

    render() {
        const {errors} = this.state;
        return (
            <React.Fragment>
                <div className="mt-5 d-flex justify-content-center">
                    <div className="mt-5 p-3 login-container shadow">
                        <div className="login-header">
                            <img
                                src={require("../assets/img/mawingu.png")}
                                alt="Mawingu Logo"
                            />
                            <h1 className="my-3">Admin Login</h1>
                        </div>
                        <div className="login-body">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fa fa-phone" aria-hidden="true"/>
                                        </span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={this.state.phone}
                                        placeholder="Phone"
                                        onChange={this.handleChange}
                                        className={classnames("form-control", {
                                            "is-invalid": errors.phone
                                        })}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fa fa-lock" aria-hidden="true"/>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={this.handleChange} id="password"
                                        className={classnames("form-control", {
                                            "is-invalid": errors.password
                                        })}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapState = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
};

export default connect(mapState, {login})(withRouter(Login));
