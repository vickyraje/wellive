import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button, Form} from 'react-bootstrap';
import Modal from 'react-modal';
import Search from 'react-search';

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

 

class Freelist extends Component {
	
	 constructor() {
    super();
	
    this.state = {
		 modalIsOpen: false,
     alert_content:'',
     repos: [],
     flag:'',
     pincode:localStorage.getItem('pincode'),
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
    this.city=localStorage.getItem('city');
    this.pincode=localStorage.getItem('pincode');
    this.handleSignup = this.handleSignup.bind(this);
    this.handleFree= this.handleFree.bind(this);
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
   // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
   handleChange(e){
    e.persist();
    let store = this.state;
    store.form[e.target.name] = e.target.value;
	this.setState(store);
  }
  
  
  handleSignup(e) { 
  let valid=1;
    e.preventDefault();
    let store = this.state;
    store.form['type'] = 'Freelist';
   this.setState(store);
    console.log(this.state.form);
	
	 //pincode
    
   if(this.state.form['pincode']){
    if(this.state.form['pincode'].length!=6){
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
    }else {let store = this.state;
      store.form['pincode']=localStorage.getItem("pincode");
     this.setState(store);}
     	 //landline
	 if(this.state.form['landline']){
     if(this.state.form['landline'].length!=11){
      let store = this.state;
    store.alert_content="Landline number should be 11 numbers.";
   this.setState(store);
    this.openModal(); 
    valid = 0;
      }else if(!this.state.form['landline'].match(/^[0-9]+$/)){
       let store = this.state;
       store.alert_content="Landline number should be 11 numbers.";
      this.setState(store);
    this.openModal(); 
    valid = 0;
      }
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
     if(!this.state.form['area']){
       
      let store = this.state;
      store.alert_content="Please Select Area.";
       this.setState(store);
      this.openModal(); 
      valid=0;
      }
   
     if(!this.state.form['company_name']){
      let store = this.state;
      store.alert_content="Please enter Company Name.";
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
   store.flag=res.flag;
    this.setState(store);
	 this.openModal();  
	 if(res.msg==='You have registered for free listing.Please check your registered mobile number.'){
	 //window.location.reload();
	 window.location.href="https://teamdev.co.in/welpedia/admin/signin";
	 }
    console.log('Success');
    })
    .catch((error) => {
   let store = this.state;
   store.alert_content="Free list added failed.";
    this.setState(store);
	this.openModal();
    console.log('Error');
    })
	}
  }
  handleFree(e) { 
    let valid=1;
      e.preventDefault();
      let store = this.state;
      store.form['type'] = 'Freelist Add';
     this.setState(store);
      console.log(this.state.form);
    
    //pincode
    
     if(this.state.form['pincode']){
      if(this.state.form['pincode'].length!=6){
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
      }
          //landline
     if(this.state.form['landline']){
      if(this.state.form['landline'].length!=11){
        let store = this.state;
      store.alert_content="Landline number should be 11 numbers.";
     this.setState(store);
      this.openModal(); 
      valid = 0;
        }else if(!this.state.form['landline'].match(/^[0-9]+$/)){
         let store = this.state;
         store.alert_content="Landline number should be 11 numbers.";
        this.setState(store);
      this.openModal(); 
      valid = 0;
        }
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
       if(!this.state.form['area']){
        if(this.city){
         let store = this.state;
         store.area=this.city;
          this.setState(store);
        }else {
       let store = this.state;
       store.alert_content="Please Select Area.";
        this.setState(store);
       this.openModal(); 
       valid=0;
       }}
    
     
       if(!this.state.form['company_name']){
        let store = this.state;
        store.alert_content="Please enter Company Name.";
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
     store.flag=res.flag;
      this.setState(store);
     this.openModal();  
     if(res.msg==='You have registered for free listing.Please check your registered mobile number.'){
      //window.location.reload();
      window.location.href="https://teamdev.co.in/welpedia/admin/signin";
      }
      console.log('Success');
      })
      .catch((error) => {
     let store = this.state;
     store.alert_content="Free list added failed.";
      this.setState(store);
    this.openModal();
      console.log('Error');
      })
    }
    }

    
  getItemsAsync2(searchValue, cb){
    this.type= 'Search Place';   
    this.item= searchValue; 
    let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
    
    let h = new Headers();
    h.append('Accept', 'application/json');
    
    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({'type':this.type,'city':localStorage.getItem('city'),'item':this.item})
    });
    
    fetch(req).then((response)=> response.json())
    .then((results) => {
      if(results.items != undefined){
        let items = results.items.map( (res, i) => { return { id: res.id, value: res.area } })
        this.setState({ repos: items })
        cb(searchValue)
        //console.log(this.state.repos);
      }
    })
    .catch((error) => {
     console.log('Error');
    })
    

  }
  
  HiItems2(items) {
    //items=items.json();
    this.state.repos=[];
    var values=items.map(function(item) {
    localStorage.setItem('place',item.value);
  
    return item.value
    
  })
  let store = this.state;
  store.form['area'] = localStorage.getItem('place');
  store.repos['id']='';
  store.repos['value']='';
  this.setState(store);
  console.log(this.state.repos);

  this.type= 'Get Pincode';  
  let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
  
  let h = new Headers();
  h.append('Accept', 'application/json');
  
  let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify({'type':this.type,'city':localStorage.getItem('city'),'place':localStorage.getItem('place')})
  });
  
  fetch(req).then((response)=> response.json())
  .then((results) => {
    if(results.pincode!=''){
     
      localStorage.setItem('pincode',results.pincode);
      let store = this.state;
      store.pincode=results.pincode;
      this.setState(store);
    }
  })
  .catch((error) => {
   console.log('Error');
  })
  

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
                <div className="w-65 freelist">
                  <div className="text-center mb-5">
                    <h3 className="Section-title">List your business for <b>FREE</b></h3>
                    <p className="bold">Connect with great customers</p>
                    <p><small>By logging in, you agree to Welpedia’s <Link to="/Terms">Terms of Service</Link> and <Link to="/Privacy">Privacy Policy</Link>.</small></p>
                  </div>

                  <Form>
                  <Form.Group>
                  <Form.Row>
                            <Col xs="12" className="mb-3 mb-lg-0">
                            <Form.Control id="formBasicFname" onChange={this.handleChange} name="company_name" placeholder="Company name" />
                            </Col>
                            <Col xs="12">
                            {/* <Form.Control id="formBasiclname"  onChange={this.handleChange} name="area" placeholder="Area" /> */}
                            <Search
                items={this.state.repos}
                id="place"
                name="area"
                multiple={false}
                getItemsAsync={this.getItemsAsync2.bind(this)}
                onItemsChanged={this.HiItems2.bind(this)} 
                placeholder={this.city}
              />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                        <Col xs="3">
                            <Form.Group controlId="exampleForm.ControlSelect1">
    
                              <Form.Control as="select" name="title">
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                                <option>Dr</option>
                              </Form.Control>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Control id="formBasicFname" onChange={this.handleChange} name="fname" placeholder="First name" />
                            </Col>
                            <Col xs="12">
                            <Form.Control id="formBasiclname"  onChange={this.handleChange} name="lname" placeholder="Last name" />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                   
				       	 <Form.Group controlId="formBasicMobile">
                      <Form.Control type="text" name="mobile" onChange={this.handleChange} placeholder="Mobile" />
                    </Form.Group>

                    <Form.Group controlId="formBasicLandline">
                      <Form.Control type="text" name="landline" onChange={this.handleChange} placeholder="Landline" />
                    </Form.Group>
					
					

                    <Form.Group controlId="formGridPincode">
                        <Form.Control type="text" name="pincode"  readOnly Value={this.state.pincode} onChange={this.handleChange} placeholder="Pincode" />
                    </Form.Group>

                   


                    <Button variant="link" type="submit" onClick={this.handleSignup} className="theme-btn text-white text-deco-none bold w-100 medium-btn font-18 mb-2">
                      Submit
                    </Button>

                   
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
 
         
		  <div id="alert_content">
        {this.state.flag ? <label>The following company(ies) already exist with us for the contact details entered by you. Click on the listing name you would like to EDIT. <b>OR</b><button onClick={this.handleFree}> Click Here </button> to create a new listing.</label>
: ""}
      <div dangerouslySetInnerHTML={{ __html: this.state.alert_content }} />
		 </div>
          <button onClick={this.closeModal}>close</button>
          
        </Modal>
      </div>
		  
		  
        </Container>
      </>
      
    );
  }
}

export default Freelist;