import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
//import Scriptcall from './components/Scriptcall';
import TableDisplay from './components/DisplayTableCCL';
///import PrintTemplate from './components/PrintTemplate';
import PrintTemplate from './components/PrintTemplateCCL';
import NotFound from './pages/Notfound';

const Home = (props) => {
  
  //const [title, setTitle] = useState(props.title); 
    
    //TOMORROW TODO: Work on making a call to run the script ONLOAD
    //TOMORROW TODO: Work on parsing JSON text into an organized list/table
    //TOMORROW TODO: Work on putting the data in list/table into a dropdown menu
    
  return (
  <div className="Home">
    <header className="App-header"></header>
    <body className="App-body">
    <Router>
      <Routes>
        <Route path="/" exact element={<TableDisplay />} />
        <Route path="/orderreq/:orderId" exact element={<PrintTemplate />} />
        <Route path="/404" exact element={<NotFound />} />
      </Routes>
    </Router>
    </body>
  </div>
  );
}

export default Home;
