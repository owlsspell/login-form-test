
import React from 'react';
import CustomForm from './Form';
import { connect } from "react-redux";
import { registerUser, loginUser } from "../store/slice"
import Swal from 'sweetalert2/dist/sweetalert2.js'



class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: { email: '', password: '' }, login: { email: '', password: '' },
        };
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkEmail(email) {
        if (email.length === 0) {
            return false
        }
        const testEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!testEmail.test(String(email).toLowerCase())) {
            Swal.fire({
                icon: 'error',
                text: "Invalid email",
            })
            return false
        }
        return true
    }
    checkPassword(password) {
        if (password.length === 0) {
            return false
        }
        const testPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9](?=.*[!@#$%^&*]).{8,})$/
        if (!testPassword.test(String(password))) {
            Swal.fire({
                icon: 'error',
                text: "Invalid password. Password must contain at least 8 characters, 1 special character, 1 number,1 lowercase character and 1 uppercase character",
            })
            return false
        }
        return true

    }

    handleChange(event, type, field) {
        this.setState({ [type]: { ...this.state[type], [field]: event.target.value } });
    }

    handleSubmit(event, type) {
        event.preventDefault();

        if (type === 'register') {
            if (!this.checkEmail(this.state.register.email) || !this.checkPassword(this.state.register.password)) { return }
            try {
                this.props.registerUser(this.state.register).then(res => {
                    localStorage.setItem('token', 'res.payload.data.token');
                    this.setState({ login: this.props.login })
                    Swal.fire({
                        text: res.payload.data.message,
                    })
                })
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong",
                })
            }
        }
        if (type === 'login') {
            if (!this.checkEmail(this.state.login.email)) { return }
            try {
                this.props.loginUser(this.state.login).then(res => {
                    if (res.payload.status === 200) {
                        Swal.fire({
                            text: 'You have successfully logged in',
                        })
                    }
                    else {
                        Swal.fire({
                            text: res.payload,
                        })
                    }
                })
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong",
                })
            }
        }
    }

    render() {
        return (

            <>
                <div>
                    <h2>Register</h2>
                    <CustomForm key={'Register form'} {...this.state} handleChange={this.handleChange} type="register" handleSubmit={this.handleSubmit} />
                </div>
                <div>
                    <h2>Login</h2>

                    <CustomForm key={'Login form'} {...this.state} handleChange={this.handleChange} type="login" handleSubmit={this.handleSubmit} />
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    login: state.login
});
const mapDispatchToProps = { registerUser, loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);