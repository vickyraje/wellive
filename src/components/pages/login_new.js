import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    e.persist();
    let store = this.state;
    store.form[e.target.name] = e.target.value;
    this.setState(store);
  }
  handleLogin(e) { 
    e.preventDefault();
    console.log(this.state.form);
    axios({
      headers: {'Access-Control-Allow-Origin': 'http://localhost/test/','Access-Control-Allow-Methods': 'GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Content-Type','Content-Type': 'multipart/form-data' },
      method: 'post',
      url: 'http://localhost/test/contacts.php',
      data: this.state.form
    })
    .then(function (response) {
      //handle success
      console.log(response)
    })
    .catch(function (response) {
        //handle error
        console.log(response)
    });
  }
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.handleChange} placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.handleChange} placeholder="password placeholder" />
        </FormGroup>
        <Button type="button" onClick={this.handleLogin}>Submit</Button>
      </Form>
    );
  }
}
export default Login;