import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

// Images
import logo from '../../images/logo.png';
import loginimg from '../../images/login-img.png';


class Login extends Component {
  render(){

    return (
      <>
        <div className="w-100 d-block theme-bg text-center py-3">
          <Link to="/"><img width="150px" src={logo} alt="Welpedia logo"/></Link>
        </div>

        <Container className="mt-5 pt-5">
          <Row>
            <Col lg="6" className="d-flex justify-content-center">
                <div className="w-65">
                  <div className="text-center mb-5">
                    <h3 className="Section-title">Log In to welpedia</h3>
                    <p className="bold">New to Welpedia ? <Link to="/Signup">Sign Up</Link></p>
                    <p><small>By logging in, you agree to Yelp’s <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>.</small></p>
                  </div>

                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-2">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div className="text-right mb-3">
                      <Link className="d-inblock" to="#">Forgot Password?</Link>
                    </div>
                    <Button variant="link" type="submit" className="theme-btn text-white text-deco-none bold w-100 medium-btn font-18 mb-2">
                      Log In
                    </Button>

                    <div className="text-right mb-3">
                    <p className="text-secondary">New to Welpedia ? <Link to="/Signup">Sign Up</Link></p>
                    </div>
                  </Form>
               </div>
            </Col>

            <Col lg="6">
              <img src={loginimg} alt="login signup" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </>
      
    );
  }
}

export default Login;