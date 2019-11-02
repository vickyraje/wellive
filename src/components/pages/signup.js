import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button, Form} from 'react-bootstrap';
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

 

class Signup extends Component {
	
	 constructor() {
    super();
	
    this.state = {
		 modalIsOpen: false,
		 alert_content:'',
      form: {
        email: '',
        password: '',
		cpassword: '',
		fname: '',
		lname: '',
		city: '',
		pincode: '',
		mobile: '',

}
    };
    this.handleSignup = this.handleSignup.bind(this);
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
	 store.form['type'] = 'Signup';
    store.form[e.target.name] = e.target.value;
	this.setState(store);
  }
  
  
  handleSignup(e) { 
  let valid=1;
    e.preventDefault();
    let store = this.state;
    store.form['type'] = 'Signup';
   this.setState(store);
    console.log(this.state.form);
	
	//city
	 if(!this.state.form['city']){
   let store = this.state;
	 store.alert_content="Please enter City.";
	this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }
	 
	//pincode
	 if(!this.state.form['pincode']){
    let store = this.state;
    store.alert_content="Please enter valid Pincode.";
   this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }
	 else if(this.state.form['pincode'].length!=6){
     let store = this.state;
	 store.alert_content="Pincode should be 6 numbers.";
	this.setState(store);
	 this.openModal(); 
	 valid = 0;
     }else if(!this.state.form['pincode'].match(/^[0-9]+$/)){
      let store = this.state;
      store.alert_content="Pincode should be 6 numbers.";
     this.setState(store);
	 this.openModal(); 
	 valid = 0;
     }
	
		 //mobile
	 if(!this.state.form['mobile']){
   let store = this.state;
	 store.alert_content="Please enter valid Mobile Number.";
	this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }else if(this.state.form['mobile'].length!=10){
     let store = this.state;
	 store.alert_content="Mobile number should be 10 numbers.";
	this.setState(store);
	 this.openModal(); 
	 valid = 0;
     }else if(!this.state.form['mobile'].match(/^[0-9]+$/)){
      let store = this.state;
      store.alert_content="Mobile number should be 10 numbers.";
     this.setState(store);
	 this.openModal(); 
	 valid = 0;
     }
	 

	
		 //cpassword
	 if(!this.state.form['cpassword']){
   let store = this.state;
	 store.alert_content="Please enter confirm Password.";
	this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }else if(this.state.form['cpassword']!==this.state.form['password']){
     let store = this.state;
	  store.alert_content="Password and confirm password mismatched.";
   	this.setState(store);  
	 this.openModal(); 
	 valid = 0;
     }
	 

	//password
	
	if(!this.state.form['password']){
   let store = this.state;
	  store.alert_content="Please enter Password.";
   	this.setState(store);  
	 this.openModal(); 
	 valid=0;
	 }else if(this.state.form['password'].length<6){
     let store = this.state;
     store.alert_content="Please enter atleast 6 characters in password.";
      this.setState(store);
	 this.openModal(); 
	 valid = 0;
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
	 //last name
	/* if(!this.state.form['lname'].match(/^[a-zA-Z]+$/)){
     this.state.alert_content="Please enter only letters in Last Name.";
	 this.openModal(); 
	 valid = 0;
     }*/
	 //first name
	if(!this.state.form['fname']){
   let store = this.state;
   store.alert_content="Please enter First Name.";
    this.setState(store);
	 this.openModal(); 
	 valid=0;
	 }else if(!this.state.form['fname'].match(/^[a-zA-Z]+$/)){
     let store = this.state;
     store.alert_content="Please enter only letters in First Name.";
      this.setState(store);
	 this.openModal(); 
	 valid = 0;
     }
	 
	if(valid===1){
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
	 if(res.msg==='You have signedup successfully.'){
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
                    <h3 className="Section-title">Sign Up for welpedia</h3>
                    <p className="bold">Connect with great local businesses</p>
                    <p><small>By logging in, you agree to Welpedia’s <Link to="/Terms">Terms of Service</Link> and <Link to="/Privacy">Privacy Policy</Link>.</small></p>
                  </div>

                  <Form>
                    <Form.Group>
                    
                        <Form.Row>
                       
                            <Col>
                            <Form.Control id="formBasicFname" onChange={this.handleChange} name="fname" placeholder="First name" />
                            </Col>
                            <Col>
                            <Form.Control id="formBasiclname"  onChange={this.handleChange} name="lname" placeholder="Last name" />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" name="password" onChange={this.handleChange}  placeholder="Password" />
                    </Form.Group>
					
					 <Form.Group controlId="formBasicCPassword">
                      <Form.Control type="password" name="cpassword" onChange={this.handleChange} placeholder="Confirm Password" />
                    </Form.Group>
					
					 <Form.Group controlId="formBasicMobile">
                      <Form.Control type="text" name="mobile" onChange={this.handleChange} placeholder="Mobile" />
                    </Form.Group>
					
					
					 <Form.Group controlId="formBasicCity">
                      <Form.Control type="text" name="city" onChange={this.handleChange} placeholder="City" />
                    </Form.Group>
				

                    <Form.Group controlId="formGridPincode">
                        <Form.Control type="text" name="pincode" onChange={this.handleChange} placeholder="Pincode" />
                    </Form.Group>

                   

                    <p><small>Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit. Cras sapien justo, scelerisque 
                    suscipit dictum non, rhoncus sit amet urna.
                    Sed dapibus commodo velit,</small></p>

                    <Button variant="link" type="submit" onClick={this.handleSignup} className="theme-btn text-white text-deco-none bold w-100 medium-btn font-18 mb-2">
                      Sign In
                    </Button>

                    <div className="text-right mb-3">
                    <p className="text-secondary">Already on Welpedia ? <Link to="/Login">Log In</Link></p>
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

export default Signup;