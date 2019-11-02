import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/*import { faStar, faCamera, faShareSquare,
         faSearch, faUserFriends,
         faLightbulb, faLaughBeam, faSmile, faUserPlus, faCode, 
         faCertificate, faCommentAlt } from '@fortawesome/free-solid-svg-icons';*/
//import Starrating from '../starRating';
// images
//import user from '../../../images/user.jpg';
//import reivewstar from '../../../images/reivewstar.png';
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

class Shopviewreview extends Component {
  constructor(props) {
    super(props);
    this.user=localStorage.getItem('user_id');
    this.email=localStorage.getItem('email');
    this.fname=localStorage.getItem('fname')+' '+localStorage.getItem('lname');
    this.lname=localStorage.getItem('lname');
    this.state = {
      reviews:[],
      form: {
        user_id:'',
        rating:'',
        review:'',
        reviews:[],
        flag:'',
        count:'',
        company_id:''
       
      }
    };
    this.handleRating = this.handleRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    
  
   
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
  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }
   handleChange(e){
    e.persist();
    let store = this.state;
    store.form[e.target.name] = e.target.value;
	this.setState(store);
  }

  handleRating(e){
    let valid=1;
    e.preventDefault();
    let store = this.state;
    store.form['type'] = 'Review';
    store.form['user_id']=this.user;
    store.form['company_id']=this.props.company_id;
   this.setState(store);

    	//review
	 if(!this.state.form['review']){
    let store = this.state;
    store.alert_content="Please enter review.";
   this.setState(store);
    this.openModal(); 
    valid=0;
    }
	
	//rating
	 if(!this.state.form['rating']){
   let store = this.state;
	 store.alert_content="Please enter rating.";
	this.setState(store);
	 this.openModal(); 
	 valid=0;
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
    if(res.msg==='Reviews and Rating added successfully.'){
    window.location.reload();
   // window.location.href="/";
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
  handleLoad(e) {  
    e.preventDefault();
    let store = this.state;
    store.form['type']= 'Get Review';  
    store.form['user_id']=this.user;
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
    store.reviews= res.reviews;
    store.flag= res.flag;
    store.count= res.count;
    this.setState(store);
  })
  .catch((error) => {
   console.log('Error');
  })
  
  }
  
  render(){
    const rv=this.props.reviews;
    const shop_name=this.props.company;
    const desc=this.props.desc;
    const elements=rv ? rv : [];
     const rvw=[]

     for (const [index, value] of elements.entries()) {
      if(index===0){
        rvw.push(<h3 className="Section-title">Recommended Reviews <span className="regular normal-txt">for {shop_name}</span></h3>
      
      )}
     rvw.push(  <div className="review-list-box mb-2">
     <Row>
       <Col lg="12">
               <p><Link to="#" className="bold">{value.user_name}</Link></p>
                 <p className="bold">{value.city}</p>

         {/* <div dangerouslySetInnerHTML={{ __html: value.ratings }} /> */}
       <div className="rating">
          <input type="radio" id="star5b" value="5"  /><label className = "full" htmlFor="star5b" title="Awesome - 5 stars"></label>
          <input type="radio" id="star4halfb"  value="4.5" /><label className="half" htmlFor="star4halfb" title="Pretty good - 4.5 stars"></label>
          <input type="radio" id="star4b"  value="4" /><label className = "full" htmlFor="star4b" title="Pretty good - 4 stars"></label>
          <input type="radio" id="star3halfb"  value="3.5" /><label className="half" htmlFor="star3halfb" title="Meh - 3.5 stars"></label>
          <input type="radio" id="star3b"  value="3" /><label className = "full" htmlFor="star3b" title="Meh - 3 stars"></label>
          <input type="radio" id="star2halfb"  value="2.5" /><label className="half" htmlFor="star2halfb" title="Kinda bad - 2.5 stars"></label>
          <input type="radio" id="star2b"  value="2" /><label className = "full" htmlFor="star2b" title="Kinda bad - 2 stars"></label>
          <input type="radio" id="star1halfb"  value="1.5" /><label className="half" htmlFor="star1halfb" title="Meh - 1.5 stars"></label>
          <input type="radio" id="star1b"  value="1" /><label className = "full" htmlFor="star1b" title="Sucks big time - 1 star"></label>
          <input type="radio" id="starhalfb"  value="0.5" /><label className="half" htmlFor="starhalfb" title="Sucks big time - 0.5 stars"></label>
        </div>
         <p className="mb-1">{value.date}</p>
         {/* <p className="mb-1"><img width="20px" className="mr-2" src={reivewstar} alt="reivewstar"/><small>First Review</small></p> */}
         <p>{value.review}</p>
         {/* <div className="rate-review">
           <p className="bold mb-2">Was this Usefull...?</p>
           
           <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLightbulb} />Usefull</Button>
           <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLaughBeam} />Funny</Button>
           <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faSmile} />Cool</Button>
         </div> */}
       </Col>
     </Row>
   </div>
)
  }

    return (
        <><p>{desc}</p>
               <h5>Write a Review</h5>
               <hr />
                { this.user ? <Form>
                <Form.Group controlId="formBasicUser">
                      <Form.Control type="text" name="user" onChange={this.handleChange} value={this.fname} readOnly placeholder="User name" />
                </Form.Group>
                <div className="rating mb-3">
          <input type="radio" id="star5a" name="rating" value="5" onChange={this.handleChange} /><label className = "full" htmlFor="star5a" title="Awesome - 5 stars"></label>
          <input type="radio" id="star4halfa" name="rating" value="4.5" onChange={this.handleChange} /><label className="half" htmlFor="star4halfa" title="Pretty good - 4.5 stars"></label>
          <input type="radio" id="star4a" name="rating" value="4" onChange={this.handleChange} /><label className = "full" htmlFor="star4a" title="Pretty good - 4 stars"></label>
          <input type="radio" id="star3halfa" name="rating" value="3.5" onChange={this.handleChange} /><label className="half" htmlFor="star3halfa" title="Meh - 3.5 stars"></label>
          <input type="radio" id="star3a" name="rating" value="3" onChange={this.handleChange} /><label className = "full" htmlFor="star3a" title="Meh - 3 stars"></label>
          <input type="radio" id="star2halfa" name="rating" value="2.5" onChange={this.handleChange} /><label className="half" htmlFor="star2halfa" title="Kinda bad - 2.5 stars"></label>
          <input type="radio" id="star2a" name="rating" value="2" onChange={this.handleChange} /><label className = "full" htmlFor="star2a" title="Kinda bad - 2 stars"></label>
          <input type="radio" id="star1halfa" name="rating" value="1.5" onChange={this.handleChange} /><label className="half" htmlFor="star1halfa" title="Meh - 1.5 stars"></label>
          <input type="radio" id="star1a" name="rating" value="1" onChange={this.handleChange} /><label className = "full" htmlFor="star1a" title="Sucks big time - 1 star"></label>
          <input type="radio" id="starhalfa" name="rating" value="0.5" onChange={this.handleChange} /><label className="half" htmlFor="starhalfa" title="Sucks big time - 0.5 stars"></label>
        </div>
                <Form.Group controlId="formBasicReview">
                      <Form.Control as="textarea" rows="3" name="review" onChange={this.handleChange} placeholder="Review" />
                </Form.Group>
                <div className="text-right">
                <Button variant="link" type="submit" onClick={this.handleRating} className="theme-btn text-white text-deco-none bold medium-btn font-18 mb-2">
                     Submit
                    </Button>
                </div>
                </Form> : "Please login to write a review."}

                <div className="review-sec mt-4">
                
                {/* <Row>
                  <Col lg="8">
                    <InputGroup className="mb-3">
                      <FormControl
                      placeholder="Search within the reviews"
                      />
                      <InputGroup.Prepend>
                        <Button variant="link" className="theme-bg text-white text-dec-none theme-btn"><FontAwesomeIcon icon={faSearch} /></Button>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Col>
                  
                  <Col lg="4">
                    sort by
                    <Dropdown className="d-inblock ml-1">
                      <Dropdown.Toggle className="p-0 vertical-unset text-deco-none normal-txt bold" variant="link" id="dropdown-basic">
                        Welpedia Sort
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Newest First</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Oldest First</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Highest Rated</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Lowest Rated</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row> */}
               
                  {rvw}
                {/* <div className="review-list-box">
                  <Row>
                    <Col lg="5">
                    <div className="review-leftbox">
                      <div className="w-25 float-left">
                          <img src={user} alt="user pic" />
                      </div>
                      
                      <div className="w-75 pl-3 float-left">
                          <p className="dummy-txt"><span></span></p>
                          <p className="dummy-txt"><span></span></p>
                          <p className="dummy-txt"><FontAwesomeIcon className="mr-2 user-friend" icon={faUserFriends} /><span></span></p>
                          <p className="dummy-txt"><FontAwesomeIcon className="mr-2 review-box" icon={faStar} /><span></span></p>
                      </div>
                      </div>
                    </Col>

                    <Col lg="7">
                      <div className="bg-drk-light p-3 radius-5 text-center">
                        With so few reviews, your opinion of Aid Locksmith could be huge. Start your review today.
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="review-list-box mb-2">
                  <Row>
                    <Col lg="5">
                      <div className="review-leftbox">
                        <div className="w-25 float-left">
                            <img src={user} alt="user pic" />
                        </div>
                        
                        <div className="w-75 pl-3 float-left">
                            <p><Link to="#" className="bold">Name of Reviewer.</Link></p>
                              <p className="bold">City Name, TN</p>
                              <p><FontAwesomeIcon className="mr-2 user-friend" icon={faUserFriends} />0 Friends</p>
                              <p><FontAwesomeIcon className="mr-2 review-box" icon={faStar} />1 Review</p>
                              <p><FontAwesomeIcon className="mr-2 theme-txt" icon={faCamera} />5 Photos</p>
                        </div>

                        <div className="review-hide-box d-inblock w-100 mt-2">
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faShareSquare}></FontAwesomeIcon>Share Review</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCode}></FontAwesomeIcon>Embed Review</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCertificate}></FontAwesomeIcon>Compliment</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCommentAlt}></FontAwesomeIcon>Send Message</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faUserPlus}></FontAwesomeIcon>From Reviewer Name</Link>
                        </div>
                      </div>
                    </Col>

                    <Col lg="7">
                      <p className="mb-1">2/29/2019</p>
                      <p className="mb-1"><img width="20px" className="mr-2" src={reivewstar} alt="reivewstar" /><small>First Review</small></p>
                      <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Praesent varius turpis sed turpis semper sollicitudin. 
                          Duis nec tempus mauris, non posuere ante. Pellentesque mauris libero, 
                          vehicula at venenatis laoreet, blandit eget nibh. Sed vestibulum felis 
                          nisi, mattis venenatis ex mattis eget. Integer vel lectus quis erat
                          ullamcorper porta et ac risus.</p>
                      <div className="rate-review">
                        <p className="bold mb-2">Was this Usefull...?</p>
                        
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLightbulb} />Usefull</Button>
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLaughBeam} />Funny</Button>
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faSmile} />Cool</Button>
                      </div>
                    </Col>
                  </Row>
                </div>


                <div className="review-list-box mb-2">
                  <Row>
                    <Col lg="5">
                      <div className="review-leftbox">
                        <div className="w-25 float-left">
                            <img src={user} alt="user pic" />
                        </div>
                        
                        <div className="w-75 pl-3 float-left">
                            <p><Link to="#" className="bold">Name of Reviewer.</Link></p>
                              <p className="bold">City Name, TN</p>
                              <p><FontAwesomeIcon className="mr-2 user-friend" icon={faUserFriends} />0 Friends</p>
                              <p><FontAwesomeIcon className="mr-2 review-box" icon={faStar} />1 Review</p>
                              <p><FontAwesomeIcon className="mr-2 theme-txt" icon={faCamera} />5 Photos</p>
                        </div>

                        <div className="review-hide-box d-inblock w-100 mt-2">
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faShareSquare}></FontAwesomeIcon>Share Review</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCode}></FontAwesomeIcon>Embed Review</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCertificate}></FontAwesomeIcon>Compliment</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faCommentAlt}></FontAwesomeIcon>Send Message</Link>
                          <Link to="#"><FontAwesomeIcon className="mr-2" icon={faUserPlus}></FontAwesomeIcon>From Reviewer Name</Link>
                        </div>
                      </div>
                    </Col>

                    <Col lg="7">
                      <p className="mb-1">2/29/2019</p>
                      <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Praesent varius turpis sed turpis semper sollicitudin. 
                          Duis nec tempus mauris, non posuere ante. Pellentesque mauris libero, 
                          vehicula at venenatis laoreet, blandit eget nibh. Sed vestibulum felis 
                          nisi, mattis venenatis ex mattis eget. Integer vel lectus quis erat
                          ullamcorper porta et ac risus.</p>
                      <div className="rate-review">
                        <p className="bold mb-2">Was this Usefull...?</p>
                        
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLightbulb} />Usefull</Button>
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faLaughBeam} />Funny</Button>
                        <Button variant="outline-secondary" className="border bold mr-3"><FontAwesomeIcon className="mr-2" icon={faSmile} />Cool</Button>
                      </div>
                    </Col>
                  </Row>
                </div> */}
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
          
        </>
    );
  }
}

export default Shopviewreview;
