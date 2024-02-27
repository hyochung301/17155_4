import React, { useState } from 'react';
import Form from './Forms';
import { useParams } from 'react-router-dom';
import Project from './Projects';
import CreateNewProject from './CreateNewProject';
import JoinExistingProject from './JoinExistingProject';

const ProjectManagement = () => {
    let { username } = useParams();
    const [ProjectName, setProjectName] = useState(' ');
    const [Description, setDescription] = useState(' ');
    const [NewProjectID, setNewProjectID] = useState('');
    const [ExistingID, setExistingID] = useState('');
    const handleProjectNameChange = (value) => {
        setProjectName(value);
    };
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };
    const handleNewProjectIDChange = (value) => {
        setNewProjectID(value);
    };
    const handleExistingIDChange = (value) => {
        setExistingID(value);
    }
    const handleSubmit = async (e) => {
        console.log("Project Name:", ProjectName);
        console.log("Description:", Description);
        console.log("Project ID:", NewProjectID);
    };
    const handleExistingSubmit = async (e) => {
        console.log("Existing Project ID:", ExistingID);
        setExistingID(ExistingID);
    };
    // Use the username here
    return (
        <>
        <h1>Project Management</h1>
            <p>Welcome! {username}</p>
       
        <br/>
        <CreateNewProject
           handleProjectNameChange={handleProjectNameChange}
           handleDescriptionChange={handleDescriptionChange}
           handleNewProjectIDChange={handleNewProjectIDChange}
           handleSubmit={handleSubmit} />
        <br/>
        <JoinExistingProject
            handleExistingIDChange={handleExistingIDChange}
            handleExistingSubmit={handleExistingSubmit}/>
            
        
        <Project/>
        <br/>
        <Project/>

        </>


        
    );
};

//todo add one of the components from react folder
// const About = () => {
//   return (
//     <div>This is where i will put their info</div>
//   )
// }

export default ProjectManagement;