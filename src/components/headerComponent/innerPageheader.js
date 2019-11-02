import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

// Images
import logo from '../../images/logo.png';

// Component
import Searchbar from './searchBar';


class Innerpagehaeder extends Component {
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
        <div className="inner-page-header">
          <Container>
              <Row className="d-flex">
                  <Col lg="2" className="order-2 order-lg-1">
                    <a href="/"><img src={logo} className="img-fluid logo" alt="logo" /></a>
                  </Col>
                  <Col lg="8" className="order-3 order-lg-2">                      <Searchbar />
                  </Col>
                  <Col lg="2" className="pl-lg-0 order-1 order-lg-3 text-right text-lg-center">
                        {this.user ?   <Link to="#" onClick={this.logout}><Button variant="link" className="login-btn mr-2 bold"><FontAwesomeIcon icon={faPowerOff} /></Button></Link>:   <Link to="/Login"><Button variant="link" className="login-btn mr-2 bold">Log In</Button></Link> }
         {this.user ?  <a href="#" className="border-0">
                   <Dropdown className="common-dropdown d-inblock">
                     <Dropdown.Toggle className="p-0 text-white bold" variant="link" id="dropdown-basic">
                     My Account
                     </Dropdown.Toggle>
 
                     <Dropdown.Menu>
                      <a href="/Wishlist">My Profile</a>
                      <a href="/Wishlist">My Ratings</a>
                      <a href="/Wishlist">My Wishlist</a>
                     </Dropdown.Menu>
                   </Dropdown>
                 </a>:  <Link to="/Signup"><Button variant="light" className="bold">Sign Up</Button></Link> }
         
     
     
               
                  </Col>
              </Row>
          </Container>
        </div>

        <div className="header-dropdown">
          <Container>
            {/* <div className="dropdown-menu-bar">
              
              <div className="hover-dropdown">
                <Button variant="link" className="hover-dropbtn">
                <FontAwesomeIcon className="mr-2" icon={faUtensils} />Restaurants
                </Button>

                <div className="dropdown-content">
                    <ul>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faMotorcycle} />Delivery</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />Reservations</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faHamburger} />Burger</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faPizzaSlice} />Italian</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faShoppingBag} />Takeout</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faStopwatch} />Waitlist</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faBacon} />Chinese</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faDrumstickBite} />Mexican</Link></li>
                    </ul>
                </div>
               </div>

              <div className="hover-dropdown">
                <Button variant="link" className="hover-dropbtn">
                <FontAwesomeIcon className="mr-2" icon={faHome} />Home Services
                </Button>

                <div className="dropdown-content">
                    <ul>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faHammer} />Contractors</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faPlug} />Electricians</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faBroom} />Home Cleaners</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faSnowflake} />HVAC</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faChartArea} />Landscapers</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faLockOpen} />Locksmiths</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faDolly} />Movers</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faTint} />Plumbers</Link></li>
                    </ul>
                </div>
              </div>

              <div className="hover-dropdown">
                <Button variant="link" className="hover-dropbtn">
                <FontAwesomeIcon className="mr-2" icon={faCar} />Auto Services
                </Button>

                <div className="dropdown-content">
                    <ul>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faWrench} />Auto Repair</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faCar} />Auto Detailing</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faFill} />Body Shops</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faSprayCan} />Car Wash</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faTags} />Car Dealers</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faGasPump} />Oil Change</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faParking} />Parking</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faTruckPickup} />Towing</Link></li>
                    </ul>
                </div>
              </div>

              <div className="hover-dropdown">
                <Button variant="link" className="hover-dropbtn dropdown-border-rt">
                  More
                </Button>

                <div className="dropdown-content">
                    <ul>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faWind} />Dry Cleaning</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faMobileAlt} />Phone Repair</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faWineGlassAlt} />Bar</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faMoon} />Nightlife</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faCut} />Hair Salons</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faDumbbell} />Gym</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faHotTub} />Massage</Link></li>
                     <li><Link to="/"><FontAwesomeIcon className="mr-2" icon={faShoppingBag} />Shopping</Link></li>
                    </ul>
                </div>
              </div>
            
              <span className="float-right">
              <Button variant="link" className="hover-dropbtn after-none">
                  <FontAwesomeIcon className="mr-2" icon={faPenAlt} />
                    Write a Review
                </Button>

                <Button variant="link" className="hover-dropbtn after-none">
                  <FontAwesomeIcon className="mr-2" icon={faStore} />
                    For Businesses
                </Button>
            </span>

           </div> */}
          </Container>
        </div>
        </>
    );
  }
}

export default Innerpagehaeder;