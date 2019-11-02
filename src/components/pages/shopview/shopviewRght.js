import React, { Component } from 'react';
import { Carousel} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';


class Shopviewrght extends Component {
  render(){
   const today=this.props.today;
   const hours=this.props.hours;
   const payment=this.props.payment;
   const year=this.props.year;
   const keywords=this.props.keywords;
   const near=this.props.near;
   const slides=this.props.slides;  
    return (
        <>
                <div className="shop-details border radius-5 px-3 py-2 mb-3">
                      <ul>
                        <li><span className="icon"><FontAwesomeIcon className="mr-2" icon={faClock} /></span>Today <b>{today.day}</b> <span className="text-success bold">{today.type}</span></li>
                        {/* <li><span className="icon"><FontAwesomeIcon className="mr-2" icon={faGift} /></span>View offerings</li>
                        <li><span className="icon"><FontAwesomeIcon className="mr-2" icon={faRupeeSign} /></span>Price range <span className="bold">Moderate</span></li> */}
                      </ul>
                  </div>

                <div className="pl-0 pl-lg-4 pl-sm-4 border-left border-xs-0 font-14">
                 <h5 className="theme-txt bold">Hours</h5>

               
                <div dangerouslySetInnerHTML={{ __html: hours }} />
                <p></p>

                <h5 className="theme-txt bold">Mode of Payment</h5>

                  <ul className="business-info mb-4">
                  {payment}
                    </ul>
                
            <h5 className="theme-txt bold">Year of Establisment</h5>

                  <ul className="business-info mb-4">
                  {year}
                    </ul>
                    <h5 className="theme-txt bold">Also Listed in</h5>

                    <ul className="business-info mb-4">
                       {keywords}
                       </ul>

                {/* <h5 className="theme-txt bold">More business info</h5>

                  <ul className="business-info mb-4">
                    <dl>
                        <dt>Accepts Credit Cards</dt>
                        <dd>Yes</dd>
                    </dl>
                    <dl>
                        <dt>Accepts Google Pay</dt>
                        <dd>No</dd>
                    </dl>
                    <dl>
                        <dt>Parking</dt>
                        <dd>Street</dd>
                    </dl>
                    <dl>
                        <dt>Bike Parking</dt>
                        <dd>Yes</dd>
                    </dl>
                    <dl>
                        <dt>Wheelchair Accessible</dt>
                        <dd>Yes</dd>
                    </dl>
                    <dl>
                        <dt>Dogs Allowed</dt>
                        <dd>Yes</dd>
                    </dl>
                    <dl>
                        <dt>Open to All</dt>
                        <dd>Yes</dd>
                    </dl>
                </ul> */}

                {near}

               
                {/* <h5 className="theme-txt bold mt-4 mb-2">People found Shop Name by Searching for ...</h5>

                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>
                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>
                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>

                <h5 className="theme-txt bold mt-4 mb-2">Near Me</h5>

                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>
                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>
                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p>

                <h5 className="theme-txt bold mt-4 mb-2">Related Articles</h5>

                <p><Link to="#">Lorem ipsum dolor sit amet.</Link></p> */}

                <Carousel className="list-rght-slider">
                  {slides}
                 </Carousel>
              </div>

        </>
    );
  }
}

export default Shopviewrght;