import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, ButtonGroup, Form, Carousel } from 'react-bootstrap';
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// Component
import Innerpagehaeder from '../../headerComponent/innerPageheader';
import Shopviewrght from './shopviewRght';
import Shopviewreview from './shopViewReview';
import Starrating from '../starRating';
import {InlineShareButtons} from 'sharethis-reactjs';
// images
import welpverif from '../../../images/welpedia-verified.png';
import welptrust from '../../../images/welpedia-trusted.png';

import Modal from 'react-modal';
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
class Shopview extends Component {
  constructor(props) {
    super(props);
    this.user=localStorage.getItem('user_id');
    this.company=this.props.match.params.company; 
    this.city=localStorage.getItem('city');
    this.states=localStorage.getItem('state');
    this.state = { 
      lists: [],
      images:[],
      landline:[],
      mobile:[],
      emails:[],
      today:'',
      hours:[],
      review_count:'',
      ratings:'',
      payment:[],
      keywords:[],
      related:[],
      near:[],
      awards:[],
      awards1:[],
      testimonials:[],
      otp:'',
      flag:'',
      verifyotp:'',
      form:{
        type:'',
        user_id:'',
        company_id:''
      },
      items: [],
      paid:[],
      attributes:'',
	  options: {
		responsive:{
			0: {
				items: 1,
			},
			600: {
				items: 3,
			},
			1000: {
				items: 3,
			},
		},
	  },
    }
    this.handleLoad = this.handleLoad.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.contact=this.contact.bind(this);
    this.verifyOTP=this.verifyOTP.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e){
    e.persist();
    let store = this.state;
    store.verifyotp = e.target.value;
	  this.setState(store);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  contact() {
    this.type= 'OTP';  
    let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
    let h = new Headers();
    h.append('Accept', 'application/json');
    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({'type':this.type,'user_id':this.user})
    });  
    fetch(req).then((response)=> response.json())
    .then((res) => {
      let store = this.state;
      store.otp= res.otp;
      if(res.otp!=''){
      store.alert_content='';
      store.flag="1";
      this.setState({modalIsOpen: true});
      } else {
        store.alert_content="Otp failed.";
      }
      this.setState(store);
    })
    .catch((error) => {
      console.log('Error');
    })
  }

  verifyOTP() {
    this.type= 'verifyOTP';
    this.company_id= this.props.match.params.id;
    if(this.state.otp===this.state.verifyotp){
      let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
      let h = new Headers();
      h.append('Accept', 'application/json');
      let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({'type':this.type,'company_id':this.company_id,'user_id':this.user})
      });
      fetch(req).then((response)=> response.json())
      .then((res) => {
        let store = this.state;
        store.alert_content="Contact details sent to your registered mobile number.";
        store.flag='';
        this.setState({modalIsOpen: true});
        this.setState(store);
      
      })
      .catch((error) => {
        console.log('Error');
      })
    } else {
      let store = this.state;
      store.alert_content="Please enter correct OTP";
      this.setState({modalIsOpen: true});
    }
  }
 
  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
    // $(document).ready(function (){
    //   $(".top-image").hover(function(){ 
    //     $('.top-image').removeClass('zoomActive');
    //     $(this).addClass("zoomActive");
    //   });
    //   $('#zoomHover').mouseleave(function(){
    //     $('.owl-item').removeClass('zoom-index');
    //   });
    //   $('#zoomHover .owl-nav button').click(function(){
    //     $('.top-image').removeClass('zoomActive');
    //     $('.owl-stage .center .top-image').addClass('zoomActive');
    //     $('.owl-item').removeClass('zoom-index');
    //   });
    // });
    // $('.top-image').hover(
    //   function(){ 
    //     $('.top-image').removeClass('zoomActive'); $(this).addClass('zoomActive');
    //   }
    // )
    // $('#zoomHover .owl-item').hover(
    //   function(){ 
    //     $('.owl-item').removeClass('zoom-index'); $(this).addClass('zoom-index');
    //   }
    // )


    $(document).ready(function() {
      var showChar = 200;
      var ellipsestext = "...";
      var moretext = "Read More";
      var lesstext = "Less";
      $('.more').each(function() {
        var content = $(this).html();    
        if(content.length > showChar) {    
          var c = content.substr(0, showChar);
          var h = content.substr(showChar-1, content.length - showChar);    
          var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';    
          $(this).html(html);
        }    
      });
    
      $(".morelink").click(function(){
        if($(this).hasClass("less")) {
          $(this).removeClass("less");
          $(this).html(moretext);
        } else {
          $(this).addClass("less");
          $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
      });
    });
  }

  handleLoad(e) {
    e.preventDefault();
    this.type= 'Company View';  
    this.company_id= this.props.match.params.id;
    this.keyword=localStorage.getItem('keyword');
    this.pincode=localStorage.getItem('pincode');
    this.city=localStorage.getItem('city');
    let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
    let h = new Headers();
    h.append('Accept', 'application/json');
    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({'type':this.type,'company_id':this.company_id,'user_id':this.user,'keyword':this.keyword,'pincode':this.pincode,'city':this.city})
    });
    fetch(req).then((response)=> response.json())
      .then((res) => {
        let store = this.state;
        store.lists= res.data;
        store.images= res.images;
        store.landline=res.landline;
        store.mobile=res.mobile;
        store.email=res.email;
        store.today=res.today;
        store.hours=res.hours;
        store.review_count=res.review_count;
        store.ratings=res.ratings;
        store.payment=res.payment;
        store.keywords=res.keywords;
        store.related=res.related;
        store.near=res.near;
        store.awards=res.awards;
        store.testimonials=res.testimonials;
        store.latitude=res.data.latitude;
        store.latitudes=Number(res.data.latitude);
        store.longitude=res.data.longitude;
        store.longitudes=Number(res.data.longitude);
        store.paid=res.paid;
        store.attributes=res.attributes;
        const elements= res.images;
        for (const [index, value] of elements.entries()) {
          var cls='';
          if(index==1){ cls="";}
          this.state.items.push(<div key={index} className={"item top-image "+cls}>
              <img className="img-fluid" src={value.images} alt="shop-images" />
              <div className="top-img-over">{value.title}</div>
            </div>
          );
        }
        this.setState(store);
      }
    )
    .catch((error) => {
      console.log('Error');
    })
  }

  wishlist(e){
    let valid=1;
    e.preventDefault();
    let store = this.state;
    store.form['type'] = 'Wishlist';
    store.form['user_id']=this.user;
    store.form['company_id']=this.props.match.params.id; 
    this.setState(store);

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
          if(res.msg==='Wishlist added successfully.'){
            window.location.reload();
          }
          console.log('Success');
        }
      )
     .catch((error) => {
        let store = this.state;
        store.alert_content="Failed to add.";
        this.setState(store);
        this.openModal();
        console.log('Error');
      })
    }
  }

  static defaultProps = {
    center: { lat:11.0168,lng:76.9558 },
    zoom: 12
  };

  render(){
    const shop= this.state.lists;
    const near=this.state.near ? this.state.near : "";
    const ner=[]   
    for (const [index, value] of near.entries()){
      if(index==0){
        ner.push(
          <h5 className="theme-txt bold mb-3">Near me</h5>
        )
      }
      ner.push(       
        <div className="people-viewed">
          <div className="w-25 float-left">
            <a href={"/Shopview/"+value.name+"/"+value.id}><img src={value.images} alt="people viewed shop" /></a>
          </div>
          <div className="w-75 float-left pl-1">
          <a href={"/Shopview/"+value.name+"/"+value.id} className="bold font-18">{value.name}</a>
            <div className="text-secondary"><span className="mr-2 font-14"><Starrating /></span>{value.review_count} Reviews</div>
            <p>{value.city}</p>
          </div>
        </div>
      )
    }

    const relat=this.state.related;
    const slide=[]
   
    if(this.state.paid!='1'){
      
    for (const [index, value] of relat.entries()){
      slide.push(  <Col lg="4">
      <div className="best-recom-box">
        <a href={"/Shopview/"+value.name+"/"+value.id}>   <img src={value.images} alt="best of welpedia" /></a>
        <div className="best-recom-over">
          <h6>{value.name}</h6>
          <div><span className="mr-2 font-14"><Starrating /></span><small>{value.review_count} Review</small></div>
          <p>{value.city}</p>
        </div>
      </div>
    </Col>)}
    }

    const elements= this.state.images;
    const imgs = []; const slides=[]; const imgss=[];

    for (const [index, value] of elements.entries()) {
      var cls='';
      if(index=='1'){ cls="";}
      imgs.push(
        <div className={"item top-image "+cls}>
          <img className="img-fluid" src={value.images} alt="shop-images" />
          <div className="top-img-over">{value.title}</div>
        </div>
      );
      slides.push(
        <div key={index} className={"item top-image "+cls}>
          <img className="img-fluid" src={value.images} alt="shop-images" />
         
        </div>
      );
    }
    imgss.push(<OwlCarousel
      className="owl-theme shop-hover-img"
      center={true}
      loop
      nav
      dots={false}
      items={3}
	  {...this.state.options}
    >{this.state.items}</OwlCarousel>);

    const elements1= this.state.landline;
    const landline = [];

    for (const [index, value] of elements1.entries()) {
      if(value.landline!==''){
        landline.push( <li key={index} className="list-phone">{value.landline}</li>);
      }
    }

    const elements2= this.state.mobile;
    const mobile = [];
  
    for (const [index, value] of elements2.entries()) {
      if(value.mobile!==''){
        mobile.push(
        <li key={index} className="list-whatsapp"><a target="_BLANK" href={"https://web.whatsapp.com/send?phone=91"+value.mobile+"&text="}
        >+91 {value.mobile}</a></li>)
      }
    }

    const elements3= this.state.payment;
    
    const pays = [];

    for (const [index,value] of elements3.entries()) {
      pays.push(<dl key={index}>
        <dt>{value.payment_mode}</dt>
         
        </dl>
      )
    }
   

    const elements4= this.state.keywords;
    const keys = [];

    for (const [index, value] of elements4.entries()) {
      keys.push(<dl key={index}>
        <dt><a href={"/Search/"+value.keyword}>{value.keyword}</a></dt>
        </dl>
      )
    }

    const elements5= this.state.email ? this.state.email : [] ;
    const emails = [];

    for (const [index, value] of elements5.entries()) {
      if(value.emails!==''){
        emails.push( <li key={index} className="list-mail">{value.email}</li>);
      }
    }

    const elements6= this.state.awards ;
    const awards1 = [];
    const awards=[];
 
    for (const [index, value] of elements6.entries()) {
      if(index=="0"){awards1.push(<h3 key={index} class="Section-title mb-2">Awards</h3>)}
      if(value.name!==''){
        awards1.push(<div key={index} className="item">
        <Row>
          <Col lg="5" className="awards-lft">
            <img src={value.photo} class="img-fluid" alt="restaurant"/>
          </Col>
          <Col lg="6" className="d-flex align-items-center awards-rgt">
            <div className="text-center">
              <h4>{value.name}</h4>
              <h5>{value.awarded_by}-{value.awarded_year}</h5>
              <p>{value.description}</p>
            </div>
          </Col>
        </Row>
      </div>)
      }
    }

    this.awrd_show="";
    const awd=[]
    for (const [index, value] of elements6.entries()) {
      this.awrd_show="1";
      if(value.name!==''){
        awd.push(<Carousel.Item key={index}>
          <Row>
            <Col lg="5" className="awards-lft">
              <img src={value.photo} className="img-fluid" alt="restaurant"/>
            </Col>
            <Col lg="6" className="d-flex align-items-center awards-rgt">
              <div className="text-center w-100">
                <h4>{value.name}</h4>
                <h5>{value.awarded_by}-{value.awarded_year}</h5>
                <p>{value.description}</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>)
      }
    }

  awards.push(<OwlCarousel
    className="owl-theme awards-slider mb-5"
    loop
    margin={10}
    nav
    autoplay
    items={1}>{awards1}</OwlCarousel>);
   
    const elements7= this.state.testimonials ;
    const testi1 = [];
    const testi=[];
   
    for (const [index, value] of elements7.entries()) {
      if(index=="0"){testi1.push(<h3 key={index} class="Section-title mb-2">Testimonials</h3>)}
      if(value.name!==''){
        testi1.push(<div key={index} className="item px-5">
          <div className="text-center">
            <h4>{value.name}</h4>
            <p className="mb-4">{value.testimonial}</p>
          </div>
        </div>)
      }
    }

    this.testi_show="";
    const tst=[]
    for (const [index, value] of elements7.entries()) {
      this.testi_show="1";
      if(value.name!==''){
        tst.push( <Carousel.Item key={index}>
          <div className="item px-5">
            <div className="text-center">
              <h4>{value.name}</h4>
              <p className="mb-4">{value.testimonial}</p>
            </div>
          </div>
        </Carousel.Item>)
      }
    }

    testi.push(<OwlCarousel
      className="owl-theme awards-slider mb-5"
      loop
      margin={10}
      nav
      autoplay
      items={1}>{testi1}</OwlCarousel>
    );
      
    const AnyReactComponent = ({ img_src }) => <div>{<img className="cusss" src="https://teamdev.co.in/welpedia/marker.png"/>}</div>;
    const verify=[];
    if(shop.verified!=="1"){
      verify.push('');
    } else {
      verify.push(<img key={0} src={welpverif} className="welptr-ver" />); 
    }
    const trust=[];
    if(shop.trusted!=="1"){
      trust.push('');
    } else {
      trust.push(<img key={0} src={welptrust} className="welptr-ver ml-2" />); 
    } //const elementsassa = this.state.images;
    return (
        <>
        <Innerpagehaeder />
        <div className="b-crumb b-crumb-h">
          <Container>
            <Row>
              <Col lg="6">
                <h3 className="bold">{shop.name}</h3>
                <div className="d-block">
                   <div className="d-inblock mr-2 font-20"><span className="mr-2"><Starrating /></span>{this.state.review_count} Reviews</div>  {/* <Button className="small-btn" variant="outline-secondary" size="sm"><FontAwesomeIcon className="mr-2" icon={faChartBar} />Details</Button> */}
                   {verify}{trust}
                </div>
                <div className="d-block">
                  {/* <Link to="#" className=" mr-2">Shop tags here</Link>  */}
                { this.state.paid ? "" : <a  href="https://teamdev.co.in/welpedia/admin/signin" target="_BLANK" ><Button className="small-btn" variant="outline-secondary" size="sm">Edit</Button></a>}
                </div>
              </Col>

              <Col lg="6" sm="5" className="text-lg-right text-sm-right text-center mt-3 mt-lg-0">
                 <Button variant="link" onClick={this.wishlist} className="theme-btn bold medium-btn font-14"><FontAwesomeIcon className="mr-2" icon={faBookmark} />Add to Wishlist</Button>
                
                 <ButtonGroup className="ml-3 bg-white">
                {/*  <Button variant="outline-secondary medium border"><FontAwesomeIcon className="mr-2" icon={faCamera} />Add Photo</Button>*/}
                   {/*<Button variant="outline-secondary medium border-left-0 border"><FontAwesomeIcon className="mr-2" icon={faShareSquare} />Share</Button>
                 <Button variant="outline-secondary medium border-left-0 border"><FontAwesomeIcon className="mr-2" icon={faBookmark} />Save</Button>*/}
                 </ButtonGroup> 
                 
        <style dangerouslySetInnerHTML={{__html: `
          
         
          .st-total{
            visibility: hidden;
          }
        `}} />
 
        
        <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'facebook',
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)
 
            // OPTIONAL PARAMETERS
            url: window.location.href, // (defaults to current url)
            image: 'https://welpedia.herokuapp.com/static/media/logo.327d7fff.png',  // (defaults to og:image or twitter:image)
            description: shop.description,       // (defaults to og:description or twitter:description)
            title: shop.name,            // (defaults to og:title or twitter:title)
            message: 'Welpedia',     // (only for email sharing)
            subject: shop.name,  // (only for email sharing)
            username: 'Welpedia' // (only for twitter sharing)
          }}
        />
        
              </Col>
            </Row>

            <Row className="mt-4">
              <Col lg="4" sm="6">
                <div className="map-address border">
                  <div className="map border">
                     {/* <img src={map} className="img-fluid" alt="map" /> */}
                     <div className="img-fluidmap">
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCkphuPbcn_BvsuJuZht7IqJAsWMoXoQ_M' }}
                        defaultCenter={this.state.center}
                        center={{lat:this.state.latitudes,lng:this.state.longitudes}}
                        defaultZoom={this.props.zoom}
                      >
                        <AnyReactComponent
                          lat={this.state.latitude}
                          lng={this.state.longitude}
                          text={shop.name}
                          img_src={'https://teamdev.co.in/welpedia/marker.png'}
                        />
                      </GoogleMapReact>
                    </div>
                  </div>
                  <Link to="#" className="float-right mt-2">{/*<FontAwesomeIcon className="mr-2" icon={faPencilAlt} />Edit*/}</Link>
                  <ul className="address-map list-map mt-2">
                    <li className="list-address">{shop.address1},{shop.address2},{shop.city}-{shop.pincode} </li>
                   {landline}
                   {mobile}
                  
                   {emails}
                   {this.user ? <li onClick={this.contact} className="list-send contact"><a href="#">Contact</a></li> : ""}
                  </ul>
                </div>
              </Col>

              <Col lg="8" sm="6" className="d-flex align-items-center">
                <div className="hover-zoom-img" id="zoomHover">
                <OwlCarousel
                  className="owl-theme shop-hover-img"
                  center={true}
                  loop
                  nav
                  dots={false}
                  items={3}
				  {...this.state.options}
                >{this.state.items}
                </OwlCarousel>
                </div>
              </Col>
            </Row>
          </Container>
          </div>
          <Container className="mt-5 pt-5">
            <Row>
              <Col lg="8" sm="7">
                <Shopviewreview company={shop.name} company_id={shop.id} desc={shop.description} reviews={shop.reviews}/>
                <div className="best-recom mb-5 mt-4">
                  <Row>
                    <Col lg="12">
                      {this.awrd_show ? <h3 className="Section-title mb-2">Awards</h3> : ""}
                      <Carousel className="list-rght-slider awards-slider">
                        {awd}
                      </Carousel>
                      <br/>
                      {this.testi_show ? <h3 className="Section-title mb-2">Testimonials</h3> : ""}
                      <Carousel className="list-rght-slider testi-slider">
                        {tst}
                      </Carousel>
                  {/* <OwlCarousel
                      className="owl-theme testi-slider mb-5"
                      loop
                      margin={10}
                      nav
                      autoplay
                      autoplayHoverPause
                      items={1}
                  >
                      <div className="item px-5">
                            <div className="text-center">
                              <h4>Praesent semper consectetur</h4>
                              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                 lorem ipsum dolor sit amet, consectetur adipiscing elit 
                                 lorem ipsum dolor sit amet.</p>
                              <p className="bold mb-0">Chris Evans</p>
                              <p><small><i>Profession here</i></small></p>
                            </div>
                      </div>

                      <div className="item px-5">
                            <div className="text-center">
                              <h4>Praesent semper consectetur</h4>
                              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                 lorem ipsum dolor sit amet, consectetur adipiscing elit 
                                 lorem ipsum dolor sit amet.</p>
                              <p className="bold mb-0">Chris Evans</p>
                              <p><small><i>Profession here</i></small></p>
                            </div>
                      </div>

                  </OwlCarousel> */}


                    </Col>
                  </Row>
                 
                 
                  { slide && !this.state.paid ?  <h5 className="theme-txt bold">Best of Welpedia <span className="regular normal-txt">{this.keyword}</span></h5> : ""}
         

         <Row className="mb-4">
         {slide}
     
           <Col lg="12">
           { slide  && !this.state.paid ? <a href={"/Search/"+this.keyword} className="bold d-inblock mt-2 w-100">See More</a> : ""}
           </Col>
         </Row>
                     
                     </div>

               { this.state.attributes ? <div className="quick-info">
                  <h3 className="Section-title mb-2">Quick Information</h3>
                  
                  <div dangerouslySetInnerHTML={{ __html: this.state.attributes}} />
                   
                </div> : "" }
              </Col>

              <Col lg="4" sm="5">
                 <Shopviewrght slides={slides} near={ner} today={this.state.today} hours={this.state.hours} payment={pays} year={shop.year}  keywords={keys}/>
              </Col>
            </Row>
          </Container>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}></h2>
            {this.state.alert_content }
            {this.state.flag ?  <Form>
              <Form.Group controlId="formBasicUser"><Form.Control type="text" name="verifyotp" onChange={this.handleChange} placeholder="Enter OTP" />
                <Button variant="link" type="button" onClick={this.verifyOTP} className="theme-btn text-white text-deco-none bold w-100 medium-btn font-18 mb-2">
                  Submit
                </Button>
              </Form.Group>
            </Form> : <button onClick={this.closeModal}>close</button>}
              {/* <button onClick={this.closeModal}>close</button> */}
          </Modal>
        </>
    );
  }
}
export default Shopview;