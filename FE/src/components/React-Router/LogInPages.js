import React, { useState } from 'react';
import Form from './Forms';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import { LinkContainer } from "react-router-bootstrap";

function LogInPage() {
    // State variables to store the input values
    const navigate = useNavigate();
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [isCorrect, setIsCorrect] = useState(true);
    const [CorrectPass, GetCorrectPass] = useState(' ');

    // Function to handle username input change
    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    // Function to handle password input change
    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    // Function to handle form submission
// Function to handle form submission
const handleSubmit = async (e) => {
    // Send username and password elsewhere
    console.log("Username:", username);
    console.log("Password:", password);

    // Make a POST request to /login with the username and password
    const response = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    if (data.status === "success" ){
        setIsCorrect(true);
        // setUserLoggedIn(username);
        console.log("Correct");
        navigate(`/projectManagement/${username}`);

        setIsCorrect(true);

    }
    else{
        setIsCorrect(false);
        console.log("Incorrect");
    }

   

    // Check if the password is correct
  
};
    



    return (
        <div className='LogIn'>
            <Form
                text='Username:'
                label='Enter Your Username'
                onChange={handleUsernameChange} // Pass the change handler function
            />
            <br />
            <Form
                text='Password:'
                label='Enter Your Password'
                onChange={handlePasswordChange} // Pass the change handler function
            />
            <br />
            <center>
                {/* <Link to={"/LogInAttempt/"+username+"/"+password}> */}
                <button onClick={handleSubmit}>Submit</button>
                {!(isCorrect) && <><br></br> <center><p>Incorrect User Name or Password, Pls Try Again</p></center> </>} 
            
                {/* </Link> */}
            </center>
        </div>
    );
}

export default LogInPage;
