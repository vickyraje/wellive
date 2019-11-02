import React, { Component } from 'react';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUtensils, faCoffee, faSuitcase, faSchool, faConciergeBell, faPaw, faTasks, faGopuram, faFilm, faMapMarkedAlt, faSyringe, faPlane, faTv, faMoneyBillAlt, faLandmark, faBuilding } from '@fortawesome/free-solid-svg-icons';

class Moremenu extends Component {
  constructor(props){
    super(props);
      this.state = { 
        third:[]
    }
    this.handleLoad = this.handleLoad.bind(this);
    };
    componentDidMount() {
      window.addEventListener('load', this.handleLoad);
   }
   handleLoad(e) {
    e.preventDefault();
 this.type= 'Category';  
 let uri = "http://teamdev.co.in/welpedia/main/public/service.php";

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
    store.third= res.third;
    this.setState(store);
    console.log(this.state.third);
  })
  .catch((error) => {
   console.log('Error');
  })
  
}
  render(){
    const elements= this.state.third;
    const items = [];


  for (const [index, value] of elements.entries()) {
    items.push(<li><a href={"/Keywords/" + value.title }><FontAwesomeIcon className="mr-2" icon={value.image} />{value.title}</a></li>)

  }
    return (
        <>
             <div className="more-cat">
                <ul>
                  {items}
                  {/* <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faCoffee} />Coffee &amp; Tea</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faSuitcase} />Professional Services</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faConciergeBell} />Local Services</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faSchool} />Education</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faUtensils} />Food</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faPaw} />Pets</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faTasks} />Event Planning &amp; Services</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faGopuram} />Religious Organizations</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faFilm} />Arts &amp; Entertainment</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faBuilding} />Real Estate</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faLandmark} />Public Services &amp; Government</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faMapMarkedAlt} />Local Flavor</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faSyringe} />Health &amp; Medical</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faPlane} />Hotels &amp; Travel</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faMoneyBillAlt} />Financial Services</Link></li>
                  <li><Link to="#"><FontAwesomeIcon className="mr-2" icon={faTv} />Mass Media</Link></li> */}
                </ul>
             </div>
        </>
    );
  }
}

export default Moremenu;