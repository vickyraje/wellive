import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Dropdown } from 'react-bootstrap';

class Homeheader extends Component {
	 constructor() {
     super();
	this.user=localStorage.getItem('user_id');
	this.email=localStorage.getItem('email');
	this.fname=localStorage.getItem('lname');
  this.lname=localStorage.getItem('fname');
	this.logout = this.logout.bind(this);

	 }
	 logout(){
		localStorage.removeItem('user_id');
		localStorage.removeItem('email');
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');
		localStorage.removeItem('mobile');
		//window.location.reload();
		window.location.href="/";
		
	}
	
  render(){
    return (
      <>
      <Container className="homeheader">
       <Row>
            <Col lg="6" xs="4" className="homehead-link">
              <li>
                <Link to="/Freelist">Free List</Link>
              </li>
              {/* <li>
                <Link to="#">Events</Link>
                </li>
                <li>
                <Link to="#">Talk</Link>
                </li> */}
            </Col>
            <Col lg="6" xs="8" className="text-right homehead-link">
              <ul>
              <li> {this.user ? <Link onClick={this.logout} to="#">Logout</Link>:  <Link to="/Login">Login</Link> }</li>
         
			  <li>
          
			  {this.user ?  <a href="#" className="border-0">
                  <Dropdown className="common-dropdown">
                    <Dropdown.Toggle className="p-0 text-white bold text-deco-none" variant="link" id="dropdown-basic">
                     My Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <a href="/Wishlist">My Profile</a>
                      <a href="/Wishlist">My Ratings</a>
                      <a href="/Wishlist">My Wishlist</a>
                    </Dropdown.Menu>
                  </Dropdown>
                </a>:  <Link to="/Signup" className="homehead-btn">Sign Up</Link> }</li>
			  
		
		
              
                </ul>
            </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Homeheader;