import React, { Component } from 'react';
import { Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Search from 'react-search';
import Modal from 'react-modal';
import $ from "jquery";


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

class Searchbar extends  Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      repos1: [],
      repos2: [],
      show : false,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      lat:'',
      long:'',
      form:{
        place:"",
        search:"",
        city:""
      }
    }
    this.element = React.createRef();

  this.city=localStorage.getItem('city');
  this.handleChange = this.handleChange.bind(this);
  this.latChange = this.latChange.bind(this);
  this.search = this.search.bind(this);
  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  
  }
  hideMenu = () => {
    const {show} = this.state;
    //this.setState({ show : !show})
    this.setState({ show : true})
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
  componentDidMount = () => {
    // navigator.geolocation.getCurrentPosition(
    //    (position) => {
    //       //const initialPosition = JSON.stringify(position);
    //       //console.log(position.coords.latitude);
    //       //console.log(position.coords.longitude);
    //       let store = this.state;
    //       store.lat = position.coords.latitude;
    //       store.long = position.coords.longitude;
    //       this.setState(store);
    //       this.latChange();
    //    },
    //    (error) => alert(error.message),
    //    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    
    function DropDown(el) {
      this.dd = el;
      this.placeholder = this.dd.children('span');
      this.opts = this.dd.find('ul.dropdown > .wrapper-drop-out-padd > li');
      this.val = '';
      this.index = -1;
      this.initEvents();
    }
    DropDown.prototype = {
      initEvents : function() {
          var obj = this;
    
          obj.dd.on('click', function(event){
              $(this).toggleClass('active');
              return false;
          });
    
          obj.opts.on('click',function(){
              var opt = $(this);
              obj.val = opt.text();
              obj.index = opt.index();
              obj.placeholder.text(obj.val);
          });
      },
      getValue : function() {
          return this.val;
      },
      getIndex : function() {
          return this.index;
      }
    }
    $(function() {
    
        var dd = new DropDown( $('#dd') );
    
        $(document).click(function() {
          // all dropdowns
          $('.wrapper-dropdown-3').removeClass('active');
        });
    
      });
     // this.element.current.addEventListener('click', this)
    
  }
  handleEvent(e) {
    e.target.className === 'iRISHI' && this.getArea()
   
  }
  getArea(){console.log('area');}
  getItemsAsync(searchValue, cb){
    this.type= 'Search Items';   
    this.item= searchValue; 
    let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
    
    let h = new Headers();
    h.append('Accept', 'application/json');
    
    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({'type':this.type,'item':this.item})
    });
    
    fetch(req).then((response)=> response.json())
    .then((results) => {
      if(results.items != undefined){
        let items = results.items.map( (res, i) => { return { id: res.id, value: res.keyword } })
        this.setState({ repos: items })
        cb(searchValue)
      }
    })
    .catch((error) => {
     console.log('Error');
    })
    

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
        this.setState({ repos1: items })
        cb(searchValue)
        //console.log(this.state.repos);
      }
    })
    .catch((error) => {
     console.log('Error');
    })
    

  }
  getItemsAsync3(searchValue, cb){
    this.type= 'Search City';   
    this.item= searchValue; 
    let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
    
    let h = new Headers();
    h.append('Accept', 'application/json');
    
    let req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({'type':this.type,'item':this.item})
    });
    
    fetch(req).then((response)=> response.json())
    .then((results) => {
      if(results.items != undefined){
        let items = results.items.map( (res, i) => { return { id: res.id, value: res.city } })
        this.setState({ repos2: items })
        cb(searchValue)
        //console.log(this.state.repos);
      }
    })
    .catch((error) => {
     console.log('Error');
    })
    

  }
  handleChange(e){
    e.persist();
    let store = this.state; 
    store.form['place'] = e.target.value;
    this.setState(store); 
    console.log(this.state);
  }
  HiItems(items) {
    //items=items.json();
    this.state.repos=[];
    var values=items.map(function(item) {
    localStorage.setItem('search',item.value);
    return item.value
  })
    let store = this.state;
    store.form['search'] = values.value;
    this.setState(store);


  }
  HiItems2(items) {
    //console.log('place');
    this.state.repos1=[];
    var values=items.map(function(item) {
    localStorage.setItem('place',item.value);
    return item.value
  })
  let store = this.state;
  store.form['place'] = localStorage.getItem('place');
  store.repos1['id']='';
  store.repos1['value']='';
  this.setState(store);
  
  }

  cityselect(items) {
  //  console.log('city');
    this.state.repos2=[];
    var values=items.map(function(item) {
    localStorage.setItem('city',item.value);
    return item.value;
    console.log(item.value);
    })  
  let store = this.state;
  store.form['city'] = localStorage.getItem('city');
  store.repos2['id']='';
  store.repos2['value']='';
  this.setState(store);
  //console.log(localStorage.getItem('city'));
  this.hideMenu();
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
  
  search(e){
    e.preventDefault();
    let store = this.state;
    this.searchs=localStorage.getItem('search');
    if(this.searchs==''){
      this.searchs=localStorage.getItem('keyword');
    }
    this.place=store.form.place;
    if(this.place!=''){
    localStorage.setItem('place',this.place);
    this.place=this.place;
  }
  
  this.setState(store);
  if(this.searchs==''){
    let store = this.state;
    store.alert_content="Please select any service";
     this.setState(store);
    this.openModal();  
  }
  
 
this.type= 'Get Pincode';   
let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
let h = new Headers();
h.append('Accept', 'application/json');

let req = new Request(uri, {
  method: 'POST',
  headers: h,
  body: JSON.stringify({'type':this.type,'city':localStorage.getItem('city'),'place':this.place})
});

fetch(req).then((response)=> response.json())
.then((res) => {
 console.log(res.pincode);
  localStorage.setItem('pincode',res.pincode);
  if(this.place!='' && this.searchs!=''){
		window.location.href= "/Search/"+ this.searchs;
		//return <Redirect to={"/Listpage/Restaurants/"+ this.searchs} />
  }else if(this.place==''){
    window.location.href= "/Searches/"+ this.searchs;
  }
  console.log('Success');
})
.catch((error) => {
 console.log('Error');
})

 
}
  
  render(){
    return (
      <>
        <Row className="search-bar justify-content-lg-center">
          <FormControl 
              id="latitude"
              name="latidute"
              onChange={this.latChange}
              value={this.state.lat}
              type="hidden"
          />
          <FormControl 
            id="longitude"
            name="longitude"
            onChange={this.latChange}
            value={this.state.long}
            type="hidden"
          />
          <Col lg="4" sm="5" className="pr-lg-0 pr-sm-0 inner-pg-place" >
            <InputGroup className="search-place">
            <Search
                items={this.state.repos2}
                id="city"
                name="city"
                multiple={false}
                getItemsAsync={this.getItemsAsync3.bind(this)}
                onItemsChanged={this.cityselect.bind(this)} 
                placeholder={localStorage.getItem('city')}
              />                
            </InputGroup>
          </Col>

          <Col lg="5" sm="7" className="pl-lg-0 pl-sm-0 search-item inner-pg-search">
            <InputGroup ref={this.element}>             
              <Search
              
                items={this.state.repos}
                id="search"
                name="search"
                multiple={false}
                getItemsAsync={this.getItemsAsync.bind(this)}
                onItemsChanged={this.HiItems.bind(this)} 
               
              placeholder={localStorage.getItem('keyword') ? localStorage.getItem('keyword')  : "burgers, barbers, spas, handymen…"}
              />
               {  this.state.show && 
               <Search
                items={this.state.repos1}
                id="place"
                name="place"
                multiple={false}
                getItemsAsync={this.getItemsAsync2.bind(this)}
                onItemsChanged={this.HiItems2.bind(this)} 
                placeholder={localStorage.getItem('place')?localStorage.getItem('place'):"Enter Area"}
               /> }
            </InputGroup>

            <Button variant="link" className="search-btn" onClick={this.search}><FontAwesomeIcon icon={faSearch} /></Button>
          </Col>

          {/* <Col lg="1" xs="12" md="2" className="pl-lg-0 pl-md-0" >
              <Button variant="link" className="search-btn w-100" onClick={this.search}><FontAwesomeIcon icon={faSearch} /></Button>
          </Col> */}
        </Row>
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
      </>
    );
    }
  }


export default Searchbar;