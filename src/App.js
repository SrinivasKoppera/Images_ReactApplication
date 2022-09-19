import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Search from './Search';
import Login from './Login/Login';
import Registration from './Login/Registration';
import PublicRoute from './Routing/PublicRoute';
import PrivateRoute from './Routing/PrivateRoute';
import Notfound from './Login/Notfound';



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<PublicRoute component={Login} />} />
          <Route path='/home'  element={<PrivateRoute component={Home} />} />
          <Route path='/search/:imgname'  element={<PrivateRoute component={Search} />} />
          <Route path='*' element={<PrivateRoute component={Notfound}/>} />
          <Route path='/registration' element={<PublicRoute component={Registration} />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App;


