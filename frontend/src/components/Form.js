
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CustomForm extends React.Component {


    render() {
        return (
            <div className="w-45">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={this.props[this.props.type].email}
                            onChange={(e) => this.props.handleChange(e, this.props.type, "email")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={this.props[this.props.type].password}
                            onChange={(e) => this.props.handleChange(e, this.props.type, "password")}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={(e) => this.props.handleSubmit(e, this.props.type)}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CustomForm;