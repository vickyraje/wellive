import React, { Component } from 'react';
import {  BrowserRouter as Router, Route}from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// component
import Home from './components/pages/homepage/home';
import Listpage from './components/pages/listpage/listPage';
import Shopview from './components/pages/shopview/shopView';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Footer from './components/footerComponent/footer';
import About from './components/pages/about';
import Privacy from './components/pages/privacy';
import Terms from './components/pages/terms';
import Keywords from './components/pages/keywords';
import Search from './components/pages/listpage/search';
import Searches from './components/pages/listpage/searches';
import Wishlist from './components/pages/listpage/wishlist';
import Freelist from './components/pages/freelist'

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
           <Route exact path="/" component={Home} />
           <Route exact path="/Listpage/:id/:key" component={Listpage} />
           <Route exact path="/Shopview/:company/:id" component={Shopview} />
           <Route exact path="/Login" component={Login} />
           <Route exact path="/Signup" component={Signup} />
           <Route exact path="/About" component={About} />
           <Route exact path="/Privacy" component={Privacy} />
           <Route exact path="/Terms" component={Terms} />
           <Route exact path="/Keywords/:id" component={Keywords} />
           <Route exact path="/Search/:id" component={Search} />
           <Route exact path="/Searches/:id" component={Searches} />
           <Route exact path="/Wishlist" component={Wishlist} />
           <Route exact path="/Freelist" component={Freelist} />
           <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;