import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
    constructor(props) {
        super(props);
        // create refs
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { client, firestore, history } = this.props;
        
        // update client 
        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        };

        // update firestore
        firestore.update({collection: 'clients', doc: client.id}, updClient)
            .then(history.push('/'));
    }

    render() {
        const { client } = this.props;
        const {disableBalanceOnEdit} = this.props.settings;
        if(client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link mb-3">
                                <i className="fa fa-arrow-left"> Back To Dashboard</i>
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><h5>Edit Client</h5></div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="firstName"
                                        minLength="2"
                                        required
                                        ref={this.firstNameInput}
                                        defaultValue={client.firstName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="lastName"
                                        minLength="2"
                                        required
                                        ref={this.lastNameInput}
                                        defaultValue={client.lastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        name="email"
                                        ref={this.emailInput}
                                        defaultValue={client.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="phone"
                                        minLength="10"
                                        required
                                        ref={this.phoneInput}
                                        defaultValue={client.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="balance"
                                        ref={this.balanceInput}
                                        defaultValue={client.balance}
                                        disabled={disableBalanceOnEdit}
                                    />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-info btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <Spinner />
        }
    }
}

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]), 
    connect(({firestore: { ordered }, settings}) => ({ 
        client: ordered.client && ordered.client[0],
        settings
    })))(EditClient);