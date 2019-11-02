import React, { Component } from 'react';
import {Col, Row, Carousel } from 'react-bootstrap';
// Component 
import Innerpagehaeder from '../headerComponent/innerPageheader';

var truncate = function (elem, limit, after) {
	if (!elem || !limit) return;
	var content = elem.textContent.trim();
	content = content.split(' ').slice(0, limit);
	content = content.join(' ') + (after ? after : '');
	elem.textContent = content;
};
var elem = document.querySelector('.truncate');
truncate(elem, 15, '...'); 
class Keywords extends Component {
  constructor(props) {
    super(props);
  this.city=localStorage.getItem('city');
  this.states=localStorage.getItem('state');

    this.state = { 
      lists: [],
      hot:[]
  }
    //alert(this.props.match.params.id);
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);

  //   $(function () {
  //     var sidebar = $('.sidebar');
  //     var top = sidebar.offset().top - parseFloat(sidebar.css('margin-top'));
  //     var bottom = sidebar.offset().bottom - parseFloat(sidebar.css('margin-bottom'));
    
  //     $(window).scroll(function (event) {
  //       var y = $(this).scrollTop();
  //       if (y >= top) {
  //         sidebar.addClass('fixed');
  //       } else {
  //         sidebar.removeClass('fixed');
  //       }
        
  //     });
  // });
 }
 handleLoad(e) {
  e.preventDefault();
this.type= 'Keywords';  
this.category= this.props.match.params.id;  
let uri = "https://teamdev.co.in/welpedia/main/public/service.php";

let h = new Headers();
h.append('Accept', 'application/json');

let req = new Request(uri, {
  method: 'POST',
  headers: h,
  body: JSON.stringify({'type':this.type,'category':this.category})
});

fetch(req).then((response)=> response.json())
.then((res) => {
  let store = this.state;
  store.lists= res.data;
  store.hot=res.hot;
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
      const sub=[]
      const subks=value.subkeys;
      for (const [index, subk] of subks.entries()) {
      sub.push(
        <p key={index}>{subk.subkey}</p>
     );
      }
      items.push(<Col key={indexx} lg="4"><a href={"/Listpage/"+this.category+"/"+value.keywords}><div className="stores-box stores-box2">
      <Row>
      <Col lg="6">
       <Carousel className="shop-carousel">
                 <img
            className="d-block w-100"
            src={value.images}
            alt="slider-images"
          />
       </Carousel>
    </Col>

        <Col lg="6" className="py-2 px-4 px-lg-0">
              <h5>  <a href={"/Listpage/"+this.category+"/"+value.keywords}>{value.keywords}</a></h5>
               {sub}
        </Col>
      </Row>
    </div></a></Col>)
  
    }
    const hot=[]
    const hots=this.state.hot;
    for (const [index, ht] of hots.entries()) {
    hot.push(
      <li key={index}><a href={"/Keywords/" + ht.category }>{ht.category}</a></li>
   );
   
    }
    return (
        <>
        <Innerpagehaeder />

        {/* <div className="b-crumb">
          <Container>
            <Row>
              
              <Col lg="5" className="text-right">
                <p>Showing 1 - 10 of 25006</p>
              </Col>
            </Row>
          </Container>
        </div> */}

        <Col lg="12" className="mt-4">
          <Row className="d-flex">
            <Col lg="3" sm="4" className="order-2 order-lg-1 order-sm-1">
              <div className="sidebar">
                <h5 className="hot-relate-h">Hot categories</h5>
                <div className="hot-relate bg-white">
                <ul>
                  {hot}
                </ul>
              </div>
              </div>
            </Col>
            <Col lg="9" sm="8"  className="order-1 order-lg-2 order-sm-2">
              <Row>
                {items}
              </Row>
            </Col>

             
          </Row>
        </Col>
        </>
    );
  }
}

export default Keywords;