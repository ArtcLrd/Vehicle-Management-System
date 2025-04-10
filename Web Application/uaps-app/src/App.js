import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Book from './Pages/Book';
import Locate from './Pages/Locate';
import About from './Pages/About';
import Contact from './Pages/Contact';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/book" exact component={Book}/>
          <Route path="/locate" exact component={Locate}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/about" exact component={About}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
