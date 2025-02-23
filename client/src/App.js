import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import FaceDetection from './FaceDetection';
import FaceSimilarity from './FaceSimilarity';
import FacialExpression from './FacialExpression';
import FaceRecognition from './FaceRecognition';

const App = () => {
  return (
    <div>
      <div className="center">
      <h1>
        <span>FaceApp</span>
        <span>FaceApp</span>
        <span>FaceApp</span></h1>
      </div>
      
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/facedetection"><h1 className="forhead">Face Detection</h1></Link>  
            </li>
            <li>
            <Link to="/facialexpression"><h1 className="forhead">Facial Expression</h1></Link>
            </li>
            <li>
              <Link to="/facerecognition"><h1 className="forhead">Face Recognition</h1></Link>  
            </li>
            <li>
              <Link to="/facesimilarity"><h1 className="forhead">Face Similarity</h1></Link>  
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/facedetection" component={FaceDetection} />
          <Route path="/facialexpression" component={FacialExpression} />
          <Route path="/facerecognition" component={FaceRecognition} />
          <Route path="/facesimilarity" component={FaceSimilarity} />
        </Switch>
      </div>
    </Router>
    </div>
  );
};

export default App;
