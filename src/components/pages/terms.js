import React, { Component } from 'react';
import Innerpagehaeder from '../headerComponent/innerPageheader';
import { Container, Col, Row, Tab } from 'react-bootstrap';
import renderHTML from 'react-render-html';
 
class Terms extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                title:'',
                content:'',
            }
          }
        this.handleLoad = this.handleLoad.bind(this);
    }
   
    componentDidMount() {
       window.addEventListener('load', this.handleLoad);
    }
   
    handleLoad(e) {
        e.preventDefault();
     this.type= 'CMS';  
     this.page='terms_conditions'; 
     let uri = "https://teamdev.co.in/welpedia/main/public/service.php";
  
      let h = new Headers();
      h.append('Accept', 'application/json');
  
      let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({'type':this.type,'page':this.page})
      });
  
      fetch(req).then((response)=> response.json())
      .then((res) => {
        let store = this.state;
    store.data['title'] = res.title;
    store.data['content'] = res.content;
    this.setState(store);
       console.log('Success');
      })
      .catch((error) => {
       console.log('Error');
      })
      
    }
  render(){
    return (
     <>
     <Innerpagehaeder/>
     <Container className="pt-4">
                <div className="about-us">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={12}>
                    <h4>  {this.state.data.title} </h4>
                            <hr />
                        
                           
                             {renderHTML(this.state.data.content)}
                            
                        </Col>

                    </Row>
                </Tab.Container>
                </div>
            </Container>
     </>
    );
  }
}

export default Terms;