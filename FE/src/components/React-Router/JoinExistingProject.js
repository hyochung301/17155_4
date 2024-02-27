import React, { useState } from 'react';
import Form from './Forms';
import { useParams } from 'react-router-dom';
function JoinExistingProject(props) {
    const handleExistingIDChange = (value) => {
        // Call the parent component's onChange function with the new value
        props.handleExistingIDChange(value);
    }
    const handleExistingSubmit = async (e) => {
        // Call the parent component's onChange function with the new value
        props.handleExistingSubmit();
    };

    return(
        <div>
        <center>
        <h3>Join an Existing Project</h3>
        <Form
            text='Project ID:'
            label='Enter The Project ID'
            onChange={handleExistingIDChange} // Pass the change handler function
        />
        <br />
        <button onClick={handleExistingSubmit}>Submit</button>
        </center>
        </div>
    );
};
export default JoinExistingProject
