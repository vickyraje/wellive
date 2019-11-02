import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import $ from "jquery";

// Images
import logo2 from '../../images/logo2.png';
import freeads from '../../images/free-ads.png';
import callback from '../../images/call-back.png';
import scrollbtn from '../../images/scroll-btn.png';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalShow: false,
          setModalShow: true
        };
      }
      componentDidMount(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 600) 
            {
                $('.scroll_To_Top').fadeIn();
            }else 
            {
                $('.scroll_To_Top').fadeOut();
            }
        });
        $('.scroll_To_Top').click(function(){
            $('html, body').animate({scrollTop : 0},700);
            return false;
        });
      }
  render(){

    return (
      <>
        <div className="footer-style pt-5 mt-5" id="footer">
            <Container>
                <Row>
                    <Col lg="3">
                        <h5 className="theme-txt bold">About</h5>
                        <ul className="footer-menu-list">
                            <li>
                            <a href="/about">About Welpedia</a>
                            </li>
                            {/* <li>
                                <Link to="#">Investor Relations</Link>
                            </li>
                            <li>
                                <Link to="#">Content Guidelines</Link>
                            </li> */}
                            <li>
                                <a href="/terms">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/privacy">Privacy Policy</a>
                            </li>
                            {/* <li>
                                <Link to="#">Ad Choices</Link>
                            </li> */}
                        </ul>
                    </Col>

                    <Col lg="3">
                        <h5 className="theme-txt bold">Discover</h5>
                        <ul className="footer-menu-list">
                            {/* <li>
                                <Link to="#">Talk</Link>
                            </li>
                            <li>
                                <Link to="#">Events</Link>
                            </li> */}
                            <li>
                                <Link to="#">The Local Welpedia</Link>
                            </li>
                            {/* <li>
                                <Link to="#">Welpedia Blog</Link>
                            </li> */}
                            <li>
                                <Link to="#">Support</Link>
                            </li>
                        </ul>
                    </Col>

                    <Col lg="3">
                    <h5 className="theme-txt bold">Welpedia for Business Owners</h5>
                        <ul className="footer-menu-list">
                            <li>
                                <Link to="#">Advertise on Welpedia</Link>
                            </li>
                            {/* <li>
                                <Link to="#">Welpedia Reservations</Link>
                            </li>
                            <li>
                                <Link to="#">Welpedia Waitlist</Link>
                            </li>
                            <li>
                                <Link to="#">Business Success Stories</Link>
                            </li> */}
                            <li>
                                <Link to="#">Business Support</Link>
                            </li>

                            {/* <li>
                                <Link to="#">Welpedia Blog for Business Owners</Link>
                            </li> */}
                        </ul>
                    </Col>

                    <Col lg="12" className="mt-5">
                        <p className="text-center py-4 mb-0">Copyright © 2019 Welpedia.<img src={logo2} className="px-1" width="30px" alt="logo2" /> Welpedia burst and related marks are registered trademarks of Welpedia.</p>
                    </Col>

                </Row>
            </Container>
        </div>

        {/* <div className="free-ads">
           <a href="/Freelist"><img src={freeads} alt="free ads"/></a> 
        </div> */}

        <div className="call-back">
           <Button variant="link" onClick={() => this.setState({modalShow: this.state.setModalShow})}><img src={callback} alt="call back"/></Button>
        </div>

        <Modal
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow: false})}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="callnow-pop"
        >
          <Modal.Body>
              <h5 className="text-secondary text-center mb-4">Save Time! Get finest Deal for "Category Name"</h5>
             <Form className="px-3">
                <Form.Group>
                        <Form.Label>Name <span className="required">*</span></Form.Label>
                        <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group>
                        <Form.Label>Mobile Number <span className="required">*</span></Form.Label>
                        <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group>
                        <Form.Label>Email <span className="required">*</span></Form.Label>
                        <Form.Control type="email" placeholder="" />
                </Form.Group>

                <div className="text-center mt-4 mb-4">
                    <Button variant="link" className="theme-btn font-14 px-4 medium">Submit Requirement</Button>
                </div>
             </Form>

             <ul className="mb-0 condition-list">
                    <li>Your Request will be sent to the Top 3 Listers from the obtained results.</li>
                    <li>Incase of any anonymous calls or messages, Welpedia will not be responsible.</li>
                    <li>Details will be sent by SMS/EMAIL.</li>
                </ul>
            <Button variant="link" className="modal-close text-deco-none" onClick={() => this.setState({modalShow: false})}></Button>
          </Modal.Body>
        </Modal>

        <a href="#" className="scroll_To_Top"><img src={scrollbtn} /></a>

      </>
      
    );
  }
}

export default Footer;