
// import React from "react";
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Outlet, Navigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";


import { useParams } from 'react-router-dom';

import LogInPage from "./components/React-Router/LogInPages";
import ProjecManagement from "./components/React-Router/ProjectManagement";



// React-Router 
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(' ');
  return (
    <div>
       <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Project Mgmt</Link>
          </li>
        </ul>
      </nav> */}

     
        <Routes>
          <Route path="/" element={<LogInPage/>}></Route>
          {/* <Route path="/about" element={ <About/>}></Route> */}
          <Route path="/projectManagement/:username" element={<ProjecManagement />} />


        </Routes>
      </Router>
    </div>
  );
}



// The following two functions are the example of React-Router 
// function Layout() {
//   return (
//     <>
//       <Navbar bg="dark" expand="sm" variant="dark">
//         <Nav>
//         <LinkContainer to="/">
//           <Nav.Link>Home</Nav.Link>
//         </LinkContainer>
//         <LinkContainer to="/about">
//           <Nav.Link>About</Nav.Link>
//         </LinkContainer>
//         <LinkContainer to="/products">
//           <Nav.Link>Products</Nav.Link>
//         </LinkContainer>
//         </Nav>
//       </Navbar>
//       <main>

//         <Outlet></Outlet>
//       </main>

    
//     </>
//     );
// }

// This function is the example of Layout for React-Router-Hooks deck
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="about" element={<About />} />
//           <Route path="products" element={<Products />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }


// These two functions are created for React-Router : 
// function User() {
//   const { name } = useParams();
//   return <div>User Name: {name}</div>;
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />}></Route>
//         <Route path="/users/:name" element={<User />}></Route>
//       </Routes>
//     </Router>
//   );
// }



export default App;
