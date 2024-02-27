import React, { useState } from 'react';
import Form from './Forms';
import { useParams } from 'react-router-dom';
function CreateNewProject(props) {
    const handleProjectNameChange = (value) => {
        // Call the parent component's onChange function with the new value
        props.handleProjectNameChange(value);
    };
    const handleDescriptionChange = (value) => {
        // Call the parent component's onChange function with the new value
        props.handleDescriptionChange(value);
    };
    const handleNewProjectIDChange = (value) => {
        // Call the parent component's onChange function with the new value
        props.handleNewProjectIDChange(value);
    };
    const handleSubmit = async (e) => {
        // Call the parent component's onChange function with the new value
        props.handleSubmit();
    };



    return(
        <div>
        <center>

        <h3>Create New Project</h3>
        
        <Form
            text='Name:'
            label='Enter Project Name'
            onChange={handleProjectNameChange} // Pass the change handler function
        />
        <br />
        <right>
         <Form
            text='Description:'
            label='Enter Project Description'
            onChange={handleDescriptionChange} // Pass the change handler function
        />
        <br />
        </right>
        <Form
            text='ProjectID:'
            label='Enter Project ID'
            onChange={handleNewProjectIDChange} // Pass the change handler function
        />
        <button onClick={handleSubmit}>Submit</button>
        </center>

    </div>
    );
};
export default CreateNewProject;