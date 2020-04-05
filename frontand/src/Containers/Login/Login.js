import React, {Component} from 'react';
import Form from "reactstrap/es/Form";
import FormElement from "../../Components/Ui/Form/FormElement";
import {Button, Col, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import {orderLogin} from "../../Store/Actions/actionUser";
import FacebookBtn from "../../Components/Ui/FacebookBtn/FacebookBtn";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitChangeHandler = (e) => {
        e.preventDefault();
        this.props.orderLogin({...this.state})
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
                title="Login"
                />
                <Form onSubmit={this.submitChangeHandler}>
                    <h1>Login</h1>
                    <FormElement
                        propertyName='username'
                        title='Username'
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        autoComplete="new-username"
                        error={this.getFieldError('username')}
                        required={true}
                        type='text'
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
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">Войти</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});
const mapDispatchToProps = dispatch => ({
    orderLogin: (user) => dispatch(orderLogin(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);