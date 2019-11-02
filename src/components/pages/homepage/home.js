import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Images
import logo from '../../../images/logo.png';
import threedots from '../../../images/threedots.png';

// Component
import Homeheader from '../../headerComponent/homeHeader';
import Searchbar from '../../headerComponent/searchBar';


class Home extends Component {
  constructor(props){
    super(props);
      this.state = { 
        show : false,
        top_banner:"",
        footer_banner:"",
        promotion_right:"",
        promotion_left:"",
        category: [],
        second:[],
        third:[],
        homecategory:[],
        options: {
          responsive:{
              0: {
                  items: 1,
              },
              600: {
                  items: 3,
              },
              1000: {
                  items: 5,
              },
          },
      }
    }
    this.handleLoad = this.handleLoad.bind(this);
    localStorage.setItem('search',"" );
    localStorage.setItem('keyword',"" );
    localStorage.setItem('place',"" );
    };
    componentDidMount() {
      window.addEventListener('load', this.handleLoad);
      navigator.geolocation.getCurrentPosition(
        (position) => {
           //const initialPosition = JSON.stringify(position);
           //console.log(position.coords.latitude);
           //console.log(position.coords.longitude);
           let store = this.state;
           store.lat = position.coords.latitude;
           store.long = position.coords.longitude;
           this.setState(store);
           this.latChange();
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     );
   }
   
   handleLoad(e) {
    localStorage.setItem('search',"" );
    localStorage.setItem('keyword',"" );
    localStorage.setItem('place',"" );
    
    e.preventDefault();
 this.type= 'Category';  
 let uri = "https://teamdev.co.in/welpedia/main/public/service.php";

  let h = new Headers();
  h.append('Accept', 'application/json');

  let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify({'type':this.type})
  });

  fetch(req).then((response)=> response.json())
  .then((res) => {
    let store = this.state;
    store.category= res.data;
    store.second= res.second;
    store.third= res.third;
    let location=res.location;
    let banner=res.banners;
   
	 localStorage.setItem('country',location.country );
   localStorage.setItem('city',location.city );
   localStorage.setItem('state',location.state );
   localStorage.setItem('pincode',location.pincode );
   store.top_banner=banner.top;
   store.footer_banner=banner.footer;
   store.promotion_right=banner.promotion_right;
   store.promotion_left=banner.promotion_left;
   
   

   const elements= res.home_slide; var configcate = []; var configc = [];
   for (const [ind, value] of elements.entries()) {
     const images=value.keyword;
     for (const [index, imgs] of images.entries()) {
       configcate.push(<div key={index} className="item sub-item-box">
       <img src={imgs.image} className="img-fluid" alt="restaurant"/>
       <div className="sub-item-details">
         <h5>{imgs.keyword}</h5>
         {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
         <a href={"/Search/" + imgs.keyword } className="view-more">View More</a>
       </div>
     </div>);
     }
     configc.push(<div key={ind}><h3 key={ind} className="Section-title mb-3">{value.title}</h3>
     <OwlCarousel
         className="owl-theme shop-slider mb-5"
         loop
         margin={20}
         nav
         items={5}
		 {...this.state.options}
     >{configcate}</OwlCarousel></div>);
     configcate=[];
   }

   store.homecategory = configc;
   this.setState(store);
    console.log('Success');
  })
  .catch((error) => {
   console.log('Error');
  })
  
}
    hideMenu = () => {
      const {show} = this.state;
      this.setState({ show : !show})
    }
    latChange(){
   
      this.type= 'Geolocation';  
      let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
     
       let h = new Headers();
       h.append('Accept', 'application/json');
     
       let req = new Request(uri, {
         method: 'POST',
         headers: h,
         body: JSON.stringify({'type':this.type,'lat':this.state.lat,'lon':this.state.long})
       });
     
       fetch(req).then((response)=> response.json())
       .then((res) => {
         let store = this.state;
         let location=res.data;
        
        localStorage.setItem('country',location.country );
        localStorage.setItem('city',location.city );
        localStorage.setItem('state',location.province );
        localStorage.setItem('pincode',location.postal_code );
       
        this.city=localStorage.getItem('city');
        //store.form['place']=this.city;
        this.setState(store);
         console.log('Success');
       })
       .catch((error) => {
        console.log('Error');
       })
       
       }
  render(){
    const elements = this.state.category;
    const items = [];
    const elemnt= this.state.second;
    const items2 = [];
    const elemnt1= this.state.third;
    const items3 = [];

    for (const [index, value] of elemnt1.entries()) {
      items3.push(<li key={index}><a href={"/Keywords/" + value.title }><img src={value.image} className="img-fluid" alt={value.title} />{value.title}</a></li>)
  
    }

  for (const [index, value] of elements.entries()) {
    items.push(<Col key={index} lg="3" sm="6"><a href={"/Keywords/" + value.title } className="pop-serv-box">
                  <img src={value.image} className="img-fluid" alt={value.title} />
                  <h5>{value.title}</h5>
              </a>
            </Col>)

  }
  
  for (const [index, value] of elemnt.entries()) {
    items2.push(<Col key={index} lg="3" xs="6" sm="3" className="mb-4">
    <a href={"/Keywords/" + value.title } className="cat-box border">
      <div>
       <img src={value.image} alt={value.title} className="img-fluid" />
       <h5>{value.title}</h5>
      </div>
    </a>
  </Col>)
  }
  

 var bg_style={
  backgroundImage: 'url(' + this.state.top_banner + ')',
 }
 
    return (
      <>
      <div className="home-intro" style={bg_style}>
         <Homeheader />
          <Container>
            <Row>
              <Col className="text-center mb-5">
               <img src={logo} alt="logo" className="logo"/>
              </Col>
            </Row>
            <Searchbar />

            
          </Container>
      </div>

      <div className="Popular-service py-5">
        <Container>
          <Row>
            <Col lg="12">
               <h3 className="Section-title text-center mb-4">Trending</h3>
            </Col>
           {items}
          </Row>
        </Container>
      </div>


      <div className="py-5 bg-white">
          <Col lg="12" className="px-5">
            {this.state.homecategory}            
          </Col>
      </div>

      <div className="categories py-5">
        <Container>
          <Row>
            <Col lg="12">
               <h3 className="Section-title text-center mb-4">Browse Businesses by Category</h3>
            </Col>
           
           {items2}

           <Col lg="3" xs="6" sm="3" className="mb-4">
             <Link to="#" onClick={this.hideMenu}  className="cat-box border">
               <div>
                <img src={threedots} alt="restaurant icon" className="img-fluid" />
                <h5>Fewer Categories</h5>
               </div>
             </Link>
           </Col>
           
          {  this.state.show && 
           <div className="more-cat">
           <ul>
             {items3}
             
           </ul>
        </div>   }

         
           
          </Row>
        </Container>
      </div>

      <div className="py-5 bg-drk">
        <Col lg="12" className="px-5">
          <Row>
            <Col lg="6">
              <div className="explore-img">
                <img src={this.state.promotion_left} alt="explore" />
                <div className="exp-overlay text-white">
                   {/*<p class="medium text-warning">Electronics Shops</p>
                  <h2>Get Electronic product at any<br />range with good quality</h2>
                  <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim pretium rhoncus.
                   Etiam eget orci neque. Cras tincidunt, purus et porttitor placerat.</p> 
                    <Link to="#" className="exp-btn">Explore Now</Link> */}
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="explore-img">
                <img src={this.state.promotion_right} alt="explore" />
                <div className="exp-overlay text-white">
                   {/*<p class="medium text-warning">Hotels</p>
                  <h2>you can choose prefect room with<br />more options available</h2>
                  <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim pretium rhoncus.
                   Etiam eget orci neque. Cras tincidunt, purus et porttitor placerat.</p>
                    <Link to="#" className="exp-btn">Explore Now</Link> */}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </div>

      <div className="offer-banner">
        <img src={this.state.footer_banner} alt="offer_image" />
      </div>
      </>
      
    );
  }
}

export default Home;