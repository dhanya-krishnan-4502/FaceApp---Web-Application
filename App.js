import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import FaceDetection from './FaceDetection';
import FacialExpression from './FacialExpression';

const App = () => {
  return (
    <Router>
      <div className="App">
      <h1 className="title">FaceApp</h1>
        <nav>
          <ul>
            <li>
              <Link to="/facedetection">Face Detection</Link>  
            </li>
            <li>
            <Link to="/facialexpression">Facial Expression</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/facedetection" component={FaceDetection} />
          <Route path="/facialexpression" component={FacialExpression} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
