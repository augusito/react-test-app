import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <h1>Oops!</h1>
                    <h2>This is awkward.</h2>
                    <p>We encountered a 404 Not Found error.</p>
                    <p>
                        You are looking for something that doesn't exist or may have moved.
                        Check out one of the links on this page or head back to <a href="/">Home</a>.
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

export default NotFound;