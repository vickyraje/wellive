import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLinkedinIn, faInstagram, faTwitterSquare, faYoutubeSquare} from '@fortawesome/free-brands-svg-icons';

// Component 
import Innerpagehaeder from '../../headerComponent/innerPageheader';
import Starrating from '../starRating';

// Images
import welpverif from '../../../images/welpedia-verified.png';
import welptrust from '../../../images/welpedia-trusted.png';
//import welptrusted from '../../../images/wel-trusted.png';
import offer from '../../../images/discount.png';
import paid from '../../../images/paid.png';

var truncate = function (elem, limit, after) {
	if (!elem || !limit) return;
	var content = elem.textContent.trim();
	content = content.split(' ').slice(0, limit);
	content = content.join(' ') + (after ? after : '');
	elem.textContent = content;
	
};
var elem = document.querySelector('.truncate');
truncate(elem, 15, '...');
  
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.user=localStorage.getItem('user_id');
  this.city=localStorage.getItem('city');
  this.states=localStorage.getItem('state');

    this.state = { 
      lists: [],
  }
    //alert(this.props.match.params.id);
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }
 handleLoad(e) {
  e.preventDefault();
this.type= 'Get Wishlist';   
this.user_id= this.user;  
let uri = "https://teamdev.co.in/welpedia/main/public/service.php";

let h = new Headers();
h.append('Accept', 'application/json');

let req = new Request(uri, {
  method: 'POST',
  headers: h,
  body: JSON.stringify({'type':this.type,'user_id':this.user_id})
});

fetch(req).then((response)=> response.json())
.then((res) => {
  let store = this.state;
  store.lists= res.data;
  this.setState(store);

  console.log('Success');
})
.catch((error) => {
 console.log('Error');
})

}
  render(){
    const elements = this.state.lists;
     const items = []
     for (const [indexx, value] of elements.entries()) {
       const img=[]
       const images=value.images;
       for (const [index, imgs] of images.entries()) {
       img.push(
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={imgs.images}
            alt="slider-images"
          />
        </Carousel.Item>
      );
       }
       const verify=[];
       if(value.verified!=="1"){
       }else {verify.push(<img key={indexx} alt="verify" src={welpverif} className="welptr-ver" />); }
       const trust=[];
       if(value.trusted!=="1"){
       }else {trust.push(<img key={indexx} alt="trust" src={welptrust} className="welptr-trust" />); }
      items.push(<div key={indexx} className="stores-box">
      <Row>
      <Col lg="5" sm="5">
       <Carousel className="shop-carousel">
         {img}
       </Carousel>
    </Col>

        <Col lg="7" sm="7">
              <h5>
                <Link to={"/Shopview/"+value.name+"/"+value.id}>{value.name}</Link>
                {/* <img src={welptrusted} className="welptr-trust ml-2" /> */}
              </h5>
              <div><span className="mr-2"><Starrating /></span>{value.review_count} Reviews</div>
              {/* <p><Link to="#">Tags: Related to shops</Link></p> */}
              {value.year ?  <p><FontAwesomeIcon className="mr-1 theme-txt" icon={faCertificate} /> {value.year} yrs in Business</p>:""}
              {/* <p><FontAwesomeIcon className="mr-1 text-primary" icon={faHourglassHalf} /> 24/7 Availability</p> */}
              <p className="offers my-1"><img alt="shoplist" src={offer} className="shoplist-icon" /> 50% offer</p>
              {verify}{trust}
 
              <p>{value.mobile}</p>
              <p>{value.address1}</p>
              <p>{value.address2}</p>

              <div className="social-links">
              {value.facebook ? <a onClick={(event) => {event.preventDefault(); window.open(value.facebook);}}  target="_BLANK">
                <FontAwesomeIcon icon={faFacebookSquare} />
                </a>: ""}

                {value.twitter ?  <a onClick={(event) => {event.preventDefault(); window.open(value.twitter);}}  target="_BLANK">
                <FontAwesomeIcon icon={faTwitterSquare} />
                </a>: ""}

                {value.linkedin ?  <a onClick={(event) => {event.preventDefault(); window.open(value.linkedin);}}  target="_BLANK">
                <FontAwesomeIcon icon={faLinkedinIn} />
                </a>: ""}

                 {value.instagram ?  <a onClick={(event) => {event.preventDefault(); window.open(value.instagram);}}  target="_BLANK">
                <FontAwesomeIcon icon={faInstagram} />
                </a>: ""}

                {value.youtube ?  <a onClick={(event) => {event.preventDefault(); window.open(value.youtube);}}  target="_BLANK">
                <FontAwesomeIcon icon={faYoutubeSquare} />
                </a>: ""}
              </div>

              <p className="mb-3 truncate">{value.tagline}</p>

            {/* <Col lg="8" className="bg-drk-light p-2">
              <Button variant="link" className="request-btn">Request a Quote</Button>
              <p className="d-inblock mb-0 ml-3">Responds in about <b>2 hrs</b></p>
            </Col> */}
          <img className="paid-icon" alt="paid" src={paid} />
        </Col>
      </Row>
    </div>)

    
          }
    return (
        <>
        <Innerpagehaeder />

        <div className="b-crumb">
          <Container>
            <Row>
              

              <Col lg="5" className="text-right">
                {/* <p>Showing 1 - 10 of 25006</p> */}
              </Col>
            </Row>
          </Container>
        </div>

        <Col lg="12" className="mt-4">
          <Row className="justify-content-center">
            <Col lg="9">
              {items}
            </Col>
          </Row>
        </Col>
        </>
    );
  }
}

export default Wishlist;