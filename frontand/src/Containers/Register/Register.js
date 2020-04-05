import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../Components/Ui/Form/FormElement";
import {connect} from "react-redux";
import {orderRegister} from "../../Store/Actions/actionUser";
import FacebookBtn from "../../Components/Ui/FacebookBtn/FacebookBtn";

class Register extends Component {
    state = {
        fullName: '',
        username: '',
        password: '',
        image: null
    };

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    submitChangeHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).map(key =>
            formData.append(key, this.state[key])
        );
        await this.props.orderRegister(formData)
    };
    getFieldError = fieldName => {
        try {
            return this.props.error[fieldName]
        } catch (e) {
            return undefined
        }
    };

    render() {
        return (
            <>
                <FacebookBtn
                title="Register"
                />
                <Form onSubmit={this.submitChangeHandler}>
                    <h1>Register new user!</h1>
                    <FormElement
                        propertyName='fullName'
                        type='text'
                        title='Full name'
                        value={this.state.fullName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('fullName')}
                        required={true}
                    />
                    <FormElement
                        propertyName='username'
                        type='text'
                        title='Username'
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        autoComplete="new-username"
                        error={this.getFieldError('username')}
                        required={true}
                    />
                    <FormElement
                        propertyName='password'
                        type='password'
                        title='Password'
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        autoComplete="new-password"
                        error={this.getFieldError('password')}
                        required={true}
                    />
                    <FormElement
                        propertyName='image'
                        type='file'
                        onChange={this.fileChangeHandler}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.error
});

const mapDispatchToProps = dispatch => ({
    orderRegister: (user) => dispatch(orderRegister(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);