import React, { Component } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLinkedinIn, faInstagram, faTwitterSquare, faYoutubeSquare} from '@fortawesome/free-brands-svg-icons';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


// Component 
import Innerpagehaeder from '../../headerComponent/innerPageheader';
import Starrating from '../starRating';

// Images
import welpverif from '../../../images/welpedia-verified.png';
import welptrust from '../../../images/welpedia-trusted.png';
import offer from '../../../images/discount.png';
import paid from '../../../images/paid.png';

// images
import adsban1 from '../../../images/ads-banner1.jpg';
import adsban2 from '../../../images/ads-banner2.jpg';

var truncate = function (elem, limit, after) {
	if (!elem || !limit) return;
	var content = elem.textContent.trim();
	content = content.split(' ').slice(0, limit);
	content = content.join(' ') + (after ? after : '');
	elem.textContent = content;
	
};
var elem = document.querySelector('.truncate');
truncate(elem, 15, '...');
  
class Listpage extends Component {
  constructor(props) {
    super(props);
    this.city=localStorage.getItem('city');
    this.states=localStorage.getItem('state');
    this.state = { 
      lists: [],
      packages:[],
      freelist:[],
      national:[],
      related:[]
    }
    //alert(this.props.match.params.id);
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }
 handleLoad(e) {
  e.preventDefault();
this.type= 'List by Keywords';  
this.category= this.props.match.params.id; 
this.keyword= this.props.match.params.key;  
localStorage.setItem('keyword',this.keyword);
this.location=localStorage.getItem('pincode');
let uri = "https://teamdev.co.in/welpedia/main/public/service.php";

let h = new Headers();
h.append('Accept', 'application/json');

let req = new Request(uri, {
  method: 'POST',
  headers: h,
  body: JSON.stringify({'type':this.type,'category':this.category,'keyword':this.keyword,'pincode':this.location})
});

fetch(req).then((response)=> response.json())
.then((res) => {
  let store = this.state;
  store.lists= res.data;
  store.packages= res.data1;
  store.freelist=res.data2;
  store.national=res.data3;
  store.related=res.related;
  this.setState(store);

})
.catch((error) => {
 console.log('Error');
})

}
  render(){
    const elements = this.state.lists;
     const items = []
     for (const [indexx, value] of elements.entries()) {
       const img=[];
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
       }else {verify.push(<img key={0} src={welpverif} alt="verify" className="welptr-ver" />); }
       const trust=[];
       if(value.trusted!=="1"){
       }else {trust.push(<img key={0} src={welptrust} alt="trust" className="welptr-ver ml-2" />); }
      items.push(<div key={indexx} className="stores-box">
      <Row>
      <Col lg="5">
        <Carousel className="shop-carousel">
          {img}
        </Carousel>
      </Col>

        <Col lg="7">
              <h5>
                <a href={"/Shopview/"+value.name+"/"+value.id}>{value.name}</a> 
                {trust}
              </h5>
              <div><span className="mr-2"><Starrating /></span>{value.review_count} Reviews</div>
              {/* <p><Link to="#">Tags: Related to shops</Link></p> */}
              {value.year ?  <p><FontAwesomeIcon className="mr-1 theme-txt" icon={faCertificate} /> {value.year} yrs in Business</p>:""}
              {/* <p><FontAwesomeIcon className="mr-1 text-primary" icon={faHourglassHalf} /> 24/7 Availability</p> */}
              { value.offer ? <p class="offers my-1"><img alt="shoplist" src={offer} className="shoplist-icon" /> {value.offer}% offer</p> : ""}
          
              {verify}

              <p className="my-2 truncate">{value.tagline}</p>


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

              
            {/* <Col lg="8" className="bg-drk-light p-2">
              <Button variant="link" className="request-btn">Request a Quote</Button>
              <p className="d-inblock mb-0 ml-3">Responds in about <b>2 hrs</b></p>
            </Col> */}

          <img className="paid-icon" alt="paid" src={paid} />
        </Col>
      </Row>
    </div>)

    
          }
          const rel=[]
    const hots=this.state.related;
    for (const [index, ht] of hots.entries()) {
    rel.push(
      <li key={index}><a href={"/Search/"+ht.keyword}>{ht.keyword}</a></li>
   );
    }
   
const elemen= this.state.packages;
const items1 = []
for (const [indexx, value] of elemen.entries()) {
  const img=[];
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
  }else {trust.push(<img key={indexx} alt="trust" src={welptrust} className="welptr-ver ml-2" />); }
 items1.push(<div key={indexx} className="stores-box">
 <Row>
 <Col lg="5">
  <Carousel className="shop-carousel">
    {img}
  </Carousel>
</Col>
   <Col lg="7">
         <h5>
           <a href={"/Shopview/"+value.name+"/"+value.id}>{value.name}</a>
          {trust}
         </h5>
         <div><span className="mr-2"><Starrating /></span>{value.review_count} Reviews</div>
         {/* <p><Link to="#">Tags: Related to shops</Link></p> */}
         {value.year ?  <p><FontAwesomeIcon className="mr-1 theme-txt" icon={faCertificate} /> {value.year} yrs in Business</p>:""}
         {/* <p><FontAwesomeIcon className="mr-1 text-primary" icon={faHourglassHalf} /> 24/7 Availability</p> */}
         { value.offer ? <p class="offers my-1"><img alt="shop-list" src={offer} className="shoplist-icon" /> {value.offer}% offer</p> : ""}
          
         {verify}

         <p className="my-2 truncate">{value.tagline}</p>

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

         

       {/* <Col lg="8" className="bg-drk-light p-2">
         <Button variant="link" className="request-btn">Request a Quote</Button>
         <p className="d-inblock mb-0 ml-3">Responds in about <b>2 hrs</b></p>
       </Col> */}
     <img className="paid-icon" alt="paid" src={paid} />
     </Col>
 </Row>
</div>)

  
    }
    const elem= this.state.freelist;
const items2 = []
for (const [indexx, value] of elem.entries()) {
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
  }else {trust.push(<img key={indexx} alt="trust" src={welptrust} className="welptr-ver ml-2" />); }
 items2.push(<div key={indexx} className="stores-box">
 <Row>
 <Col lg="5">
  <Carousel className="shop-carousel">
    {img}
  </Carousel>
</Col>
   <Col lg="7">
         <h5>
           <a href={"/Shopview/"+value.name+"/"+value.id}>{value.name}</a>
          {trust}
         </h5>
         <div><span className="mr-2"><Starrating /></span>{value.review_count} Reviews</div>
         {/* <p><Link to="#">Tags: Related to shops</Link></p> */}
         {value.year ?  <p><FontAwesomeIcon className="mr-1 theme-txt" icon={faCertificate} /> {value.year} yrs in Business</p>:""}
         {/* <p><FontAwesomeIcon className="mr-1 text-primary" icon={faHourglassHalf} /> 24/7 Availability</p> */}
         { value.offer ? <p class="offers my-1"><img alt="shop-list" src={offer} className="shoplist-icon" /> {value.offer}% offer</p> : ""}
          
         {verify}

         <p className="my-2 truncate">{value.tagline}</p>

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

         

       {/* <Col lg="8" className="bg-drk-light p-2">
         <Button variant="link" className="request-btn">Request a Quote</Button>
         <p className="d-inblock mb-0 ml-3">Responds in about <b>2 hrs</b></p>
       </Col> */}
    
   </Col>
 </Row>
</div>)

  
    }
    const elemn= this.state.national;
    const items3 = []
    for (const [indexx, value] of elemn.entries()) {
      const img=[];
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
      }else {trust.push(<img key={indexx} alt="trust" src={welptrust} className="welptr-ver ml-2" />); }
     items3.push(<div key={indexx} className="stores-box">
     <Row>
     <Col lg="5">
       <Carousel className="shop-carousel">
         {img}
       </Carousel>
     </Col>

       <Col lg="7">
             <h5>
               <a href={"/Shopview/"+value.name+"/"+value.id}>{value.name}</a> 
               {trust}
             </h5>
             <div><span className="mr-2"><Starrating /></span>{value.review_count} Reviews</div>
             {/* <p><Link to="#">Tags: Related to shops</Link></p> */}
             {value.year ?  <p><FontAwesomeIcon className="mr-1 theme-txt" icon={faCertificate} /> {value.year} yrs in Business</p>:""}
             {/* <p><FontAwesomeIcon className="mr-1 text-primary" icon={faHourglassHalf} /> 24/7 Availability</p> */}
             { value.offer ? <p class="offers my-1"><img alt="shop-list" src={offer} className="shoplist-icon" /> {value.offer}% offer</p> : ""}
         
             {verify}

             <p className="my-2 truncate">{value.tagline}</p>

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

        {/* <div className="b-crumb">
          <Container>
            {/* <Row>
              <Col lg="7">
                <h4><span className="bold">{this.category} in </span> {this.city}, {this.states}</h4>                          
                <ButtonToolbar className="filter-btn mt-3">
                <OverlayTrigger overlay={(<Tooltip id="tool">Top Results</Tooltip>)}  placement="top">
                     <Button variant="link" className="mr-2">Top Results</Button>
                  </OverlayTrigger>
                  
                  <OverlayTrigger overlay={(<Tooltip id="tool">Popularity</Tooltip>)} placement="top">
                     <Button variant="link" className="mr-2"><FontAwesomeIcon className="mr-2" icon={faSlidersH} />Popularity</Button>
                  </OverlayTrigger>

                  <OverlayTrigger overlay={(<Tooltip id="tool">Location</Tooltip>)} placement="top">
                     <Button variant="link" className="mr-2"><FontAwesomeIcon className="mr-2" icon={faSlidersH} />Location</Button>
                  </OverlayTrigger>

                  <OverlayTrigger overlay={(<Tooltip id="tool">Find Business that are open Now</Tooltip>)} placement="top">
                    <Button variant="link"><FontAwesomeIcon className="mr-2" icon={faClock} />Open Now</Button>
                  </OverlayTrigger>
                </ButtonToolbar>
                
              </Col>

              <Col lg="5" className="text-right">
                 <p>Showing 1 - 10 of 25006</p> 
              </Col>
            </Row>
          </Container>
        </div> */}

        <div className="keyword-ban">
        <OwlCarousel
                className="owl-theme mb-4"
                loop
                autoplay
                autoplayHoverPause
                margin={0}
                items={1}
            >
              <div className="item">
                <a href="#"><img alt="banner" src={adsban1} alt="shop banner" /></a>
              </div>

              <div className="item">
                <a href="#"><img alt="banner" src={adsban2} alt="shop banner" /></a>
              </div>
        </OwlCarousel>
        </div>


        <Col lg="12" className="mt-4">
          <Row className="d-flex justify-content-center">
            <Col lg="3" sm="4" className="order-2 order-lg-1 order-sm-1">
              <div className="sidebar">
                <h5 className="hot-relate-h">Related Search</h5>
                <div className="hot-relate bg-white">
                <ul>
                 {rel}
                </ul>
              </div>
              </div>
            </Col>
            <Col lg="7" sm="8" className="order-1 order-lg-2 order-sm-2">
              {items}{/*position*/}
              {items1}{/*package*/}
              {items3}{/*national*/}
              {items2}{/*free*/}
            </Col>
          </Row>
        </Col>
        </>
    );
  }
}

export default Listpage;