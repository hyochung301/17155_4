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
    const [Newusername, setNewUsername] = useState(' ');
    const [Newpassword, setNewPassword] = useState(' ');
    const [confirmNewpassword, setconfirmNewPassword] = useState(' ');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [UserAlreadyExists, setUserAlreadyExists] = useState(true);

    // Function to handle username input change
    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    // Function to handle password input change
    const handlePasswordChange = (value) => {
        setPassword(value);
    };

        // Function to handle new username input change
        const handleNewUsernameChange = (value) => {
            setNewUsername(value);
        };
    
        // Function to handle new password input change
        const handleNewPasswordChange = (value) => {
            setNewPassword(value);
        };
        
        // Function to handle confirm password input change
        const handleConfirmPasswordChange = (value) => {
            setconfirmNewPassword(value);
        };        



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
        console.log("User Already Exists");
    }

  
};

// Function to handle new user form submission
const handleNewUserSubmit = async (e) => {
    // Send username and password elsewhere and confirmation of password
    console.log("Username:", Newusername);
    console.log("Password:", Newpassword);
    console.log("Confirm Password:", confirmNewpassword);

    //check to see if the two passwords don't match
    if (Newpassword !== confirmNewpassword){
        console.log("Passwords do not match");
        setPasswordsMatch(false);
        return;
    }

    // Make a POST request to /NewUser with the username and password
    const response = await fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userID:Newusername, password:Newpassword})
    });

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    if (data.status === "success" ){
        
        // setUserLoggedIn(username);
        console.log("New User was added");
        navigate(`/projectManagement/${Newusername}`);

        

    }
    else{
        setUserAlreadyExists(false);
        console.log("User Already Exists");
    }

  
};
    



    return (
        <>
        <div style={{background: 'linear-gradient(to top, #ffffff, #bf5700)'}}>

        
        <center>
            <h1><b>Welcome to our Project Management System!</b></h1>
        </center>
        
        <br />

        <center>
            <h1 style={{fontWeight: 'bold', fontSize: '1.5em'}}>Returning User? Please Log In</h1>
        </center>
        <div className='LogIn'>
            <Form
                text='   Username: '
                label='Enter Your Username'
                onChange={handleUsernameChange} // Pass the change handler function
            />
            <br />
            <Form
                text='Password:     '
                label='Enter Your Password'
                onChange={handlePasswordChange} // Pass the change handler function
            />
            <br />
            <center>
                {/* <Link to={"/LogInAttempt/"+username+"/"+password}> */}
                <button onClick={handleSubmit} style={{fontWeight: 'bold', fontSize: '1.2em'}}>Submit</button>
                {!(isCorrect) && <><br></br> <center><p>Incorrect User Name or Password, Pls Try Again</p></center> </>} 
            
                {/* </Link> */}
            </center>
        </div>
        <br />
        <br />
        <center>
            <h1 style={{fontWeight: 'bold', fontSize: '1.5em'}}>New User? Please Create a profile</h1>
        </center>
        <div className='NewUser'>
        <Form
                text='Username: '
                label='Enter Your Username'
                onChange={handleNewUsernameChange} // Pass the change handler function
            />
            <br />
            <Form
                text='Password: '
                label='Enter Your Password'
                onChange={handleNewPasswordChange} // Pass the change handler function
            />
            <br />
                        <Form
                text='Confirm Password:'
                label='Confirm Your Password'
                onChange={handleConfirmPasswordChange} // Pass the change handler function
            />
            <br />
            <center>
                {/* <Link to={"/LogInAttempt/"+username+"/"+password}> */}
                <button onClick={handleNewUserSubmit} style={{fontWeight: 'bold', fontSize: '1.2em'}}>Submit</button>
                {!(passwordsMatch) && <><br></br> <center><p>Passwords Do Not Match, Pls Try Again</p></center> </>} 
                {!(UserAlreadyExists) && <><br></br> <center><p>User Already Exists, Pls Try Again</p></center> </>}
                {/* </Link> */}
            </center>


        </div>
        <div>
            <img src="UT logo.png"/>
        </div>
        

        </div>
        </>
    );
}

export default LogInPage;
