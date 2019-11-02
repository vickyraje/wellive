import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Modal from 'react-modal';
// Images
import logo from '../../images/logo.png';
import loginimg from '../../images/login-img.png';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Login extends Component {
	 constructor() {
    super();
    this.state = {
		 modalIsOpen: false,
		 alert_content:'',
      form: {
        email: '',
        password: ''
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  handleChange(e){
    e.persist();
    let store = this.state;
    store.form[e.target.name] = e.target.value;
    this.setState(store);
  }
  handleLogin(e) { 
    let valid=1;
    e.preventDefault();
    
	//password
	
	if(!this.state.form['password']){
    let store = this.state;
   store.alert_content="Please enter Password.";
   this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }
	
	//email
	let lastAtPos = this.state.form['email'].lastIndexOf('@');
    let lastDotPos = this.state.form['email'].lastIndexOf('.');

	 if(!this.state.form['email']){
   let store = this.state;
   store.alert_content="Please enter valid email.";
   this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }else if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.form['email'].indexOf('@@') === -1 && lastDotPos > 2 && (this.state.form['email'].length - lastDotPos) > 2)) {
     valid=0;
   let store = this.state;
   store.alert_content="Please enter valid email.";
   this.setState(store);
	 this.openModal(); 
     }
	 
   if(valid===1){ 
   let store = this.state;
      store.form['type']='Login';
      this.setState(store);
   let uri = "https://teamdev.co.in/welpedia/main/public/service.php";

    let h = new Headers();
    h.append('Accept', 'application/json');

    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify(this.state.form)
    });

    fetch(req).then((response)=> response.json())
    .then((res) => {
      let store = this.state;
      store.alert_content=res.msg;
      this.setState(store);
	 this.openModal(); 
	 let myData=res.data;
	 localStorage.setItem('user_id',myData.id );
	 localStorage.setItem('fname',myData.fname );
	 localStorage.setItem('lname',myData.lname );
	 localStorage.setItem('mobile',myData.mobile );
	 localStorage.setItem('email',myData.email );
	 if(res.msg==='You have loggedin successfully.'){
	 //window.location.reload();
	 window.location.href="/";
	 }
    console.log('Success');
    })
    .catch((error) => {
   let store = this.state;
   store.alert_content="Please fill the required fields.";
   this.setState(store);
	this.openModal();
    console.log('Error');
    })
	}
  }
  render(){

    return (
      <>
        <div className="w-100 d-block theme-bg text-center py-3">
          <a href="/"><img width="150px" src={logo} alt="Welpedia logo"/></a>
        </div>

        <Container className="mt-5 pt-5">
          <Row>
            <Col lg="6" className="d-flex justify-content-center">
                <div className="w-65">
                  <div className="text-center mb-5">
                    <h3 className="Section-title">Log In to welpedia</h3>
                    <p><small>By logging in, you agree to Welpedia's <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>.</small></p>
                  </div>

                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-2">
                      <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                    </Form.Group>

                    <div className="text-right mb-3">
                      <Link className="d-inblock" to="#">Forgot Password?</Link>
                    </div>
                    <Button variant="link" type="submit" onClick={this.handleLogin} className="theme-btn text-white text-deco-none bold w-100 medium-btn font-18 mb-2">
                      Log In
                    </Button>

                    <div className="text-right mb-3">
                    <p className="text-secondary">New to Welpedia ? <Link to="/Signup">Sign Up</Link></p>
                    </div>
                  </Form>
               </div>
            </Col>

            <Col lg="6">
              <img src={loginimg} alt="login signup" className="img-fluid sign-img" />
            </Col>
          </Row>
		   <div>
      
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Alert</h2>
		  <div id="alert_content">
		  {this.state.alert_content}</div>
          <button onClick={this.closeModal}>close</button>
          
        </Modal>
      </div>
		  
        </Container>
      </>
      
    );
  }
}

export default Login;