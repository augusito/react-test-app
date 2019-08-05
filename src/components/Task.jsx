import React, {Component} from "react";
import {connect} from "react-redux";
import Moment from "moment";
import PropTypes from "prop-types";
import Navigation from "./Navigation";
import {findAssignedTasks} from "../actions/taskActions";
import Pagination from './Pagination';

class Task extends Component {
    constructor() {
        super();
        this.state = {
            tasks: {},
            errors: "",
            page: 0,
            limit: 25,
            count: 0,
            errorMessage: ""
        };

        Task.decorateTaskStatus = Task.decorateTaskStatus.bind(this);
    }

    pageNext = e => {
        e.preventDefault();
        const {limit, page, count} = this.state;
        const totalPages = Math.ceil(count / limit);
        const pageNumber = page + 1;
        if (pageNumber <= totalPages) {
            this.setState({page: pageNumber});
            this.findTasks(pageNumber, limit);
        }
    };

    pagePrev = e => {
        e.preventDefault();
        const {page, limit} = this.state;
        const pageNumber = page - 1;
        if (pageNumber >= 0) {
            this.setState({page: pageNumber});
            this.findTasks(pageNumber, limit);
        }
    };

    pageInput = e => {
        const {limit, count} = this.state;
        const totalPages = Math.ceil(count / limit);
        const {value} = e.target;

        const pageNumber =
            value === undefined
                ? 0
                : value === null
                ? 0
                : value < 0
                    ? 0
                    : value > totalPages - 1
                        ? totalPages - 1 : parseInt(value);
        this.setState({page: pageNumber});
        this.findTasks(pageNumber, limit);
    };

    pageLimit = e => {
        e.preventDefault();
        const {page} = this.state;
        const {value} = e.target;
        const newLimit = parseInt(value);
        this.setState({limit: newLimit});
        this.findTasks(page, newLimit);
    };

    findTasks = (page, limit) => {
        this.props.findAssignedTasks(page * limit, limit);
    };

    componentDidMount() {
        if (!this.props.auth.loggedIn) {
            this.props.history.push("/login");
        }
        this.findTasks(
            this.state.page,
            this.state.limit
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tasks) {
            const newTasks = nextProps.tasks;
            this.setState({
                tasks: newTasks,
                count: newTasks.totalTasks,
            });
        }
        if (nextProps.errors.length > 0) {
            this.setState({errorMessage: nextProps.errors});
        }
    }

    static decorateTaskStatus(status) {
        let style = "badge badge-";
        if (status === "Assigned") {
            style += "primary";
        } else if (status === "In Progress") {
            style += "warning";
        } else if (status === "Completed") {
            style += "success";
        } else if (status === "Deferred") {
            style += "danger";
        } else {
            style += "default";
        }
        return style;
    };

    render() {
        const {tasks, limit, page, errorMessage,} = this.state;
        let taskCount = page * limit + 1;
        let assignedTasks;

        if (tasks.tasks) {
            assignedTasks = tasks.tasks.map(task => (
                <tr key={task.task_id}>
                    <td>{taskCount++}</td>
                    <td>{task.customer_first_name}</td>
                    <td>{task.customer_last_name}</td>
                    <td>{task.customer_phone}</td>
                    <td>{task.registration}</td>
                    <td><span className={Task.decorateTaskStatus(task.status)}>{task.status}</span></td>
                    <td>{Moment(task.assigned).format("YYYY-MM-DD")}</td>
                    <td>
                        <button type="button" className="btn btn-sm btn-primary">ID: {task.task_id}</button>
                    </td>
                </tr>
            ));
        } else {
            assignedTasks = null;
        }
        return (
            <React.Fragment>
                <Navigation/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            {errorMessage &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errorMessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            }
                            <div className="card">
                                <div className="card-header">
                                    <Pagination
                                        page={this.state.page}
                                        limit={this.state.limit}
                                        count={this.state.count}
                                        pagePrev={this.pagePrev}
                                        pageNext={this.pageNext}
                                        pageInput={this.pageInput}
                                        pageLimit={this.pageLimit}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Tasks</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped tabe-condensed">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Phone</th>
                                                <th>Registration</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th colSpan="3">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>{assignedTasks}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Task.propTypes = {
    findAssignedTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapState = state => ({
    tasks: state.tasks.assigned,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapState, {findAssignedTasks})(Task);
