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
    const [projects, setProjects] = useState([]);
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



    async function handleCheckInHWSet1(i, quantity) {
        console.log("CheckIn",quantity, "Hardware Set 1 for project", i);
        // Make a POST request to /NewUser with the username and password
    let id = projects[i].id;
    console.log("Project ID:", id);
const response = await fetch("projects/checkin", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({qty:quantity, project_id:id, hw_set_id:1})
});

// Parse the response as JSON
const data = await response.json();
console.log(data);
if (data.message === "Invalid quantity" ) {
    console.log("Invalid quantity");
    alert("Invalid quantity");
}
else if (data.message === "Exceeds capacity") {
    console.log("Exceeds capacity");
    alert("Exceeds capacity");


}
else if (data.message === "Checked in successfully") {
    console.log("Checked in successfully");
    alert("Checked in successfully");

}
else if (data.message === "Invalid Project ID") {
    console.log("Invalid Project ID");
    alert("Invalid Project ID");

}
fetchProjects();
renderProjects();
  }





async function handleCheckInHWSet2(i, quantity) {
        console.log("CheckIn",quantity, "Hardware Set 2 for project", i);
        // Make a POST request to /NewUser with the username and password
    let id = projects[i].id;
    console.log("Project ID:", id);
const response = await fetch("projects/checkin", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({qty:quantity, project_id:id, hw_set_id:2})
});

// Parse the response as JSON
const data = await response.json();
console.log(data);
if (data.message === "Invalid quantity" ) {
    console.log("Invalid quantity");
    alert("Invalid quantity");
}
else if (data.message === "Exceeds capacity") {
    console.log("Exceeds capacity");
    alert("Exceeds capacity");


}
else if (data.message === "Checked in successfully") {
    console.log("Checked in successfully");
    alert("Checked in successfully");

}
else if (data.message === "Invalid Project ID") {
    console.log("Invalid Project ID");
    alert("Invalid Project ID");

}
fetchProjects();
renderProjects();

  }







async function handleCheckOutHWSet1(i, quantity) {
        console.log("Checkout",quantity, "Hardware Set 1 for project", i);
            // Make a POST request to /NewUser with the username and password
        let id = projects[i].id;
        console.log("Project ID:", id);
    const response = await fetch("projects/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({qty:quantity, project_id:id, hw_set_id:1})
    });

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
      
      if (data.message === "Invalid quantity" ) {
        console.log("Invalid quantity");
        alert("Invalid quantity");
    }
    else if (data.message === "Exceeds capacity") {
        console.log("Exceeds capacity");
        alert("Exceeds capacity");
    
    
    }
    else if (data.message === "Checked out successfully") {
        console.log("Checked out successfully");
        alert("Checked in successfully");
    
    }
    else if (data.message === "Invalid Project ID") {
        console.log("Invalid Project ID");
        alert("Invalid Project ID");
    
    }
    fetchProjects();
    renderProjects();
}






async function handleCheckOutHWSet2(i, quantity) {
        console.log("Checkout",quantity, "Hardware Set 2 for project", i);
        // Make a POST request to /NewUser with the username and password
    let id = projects[i].id;
    console.log("Project ID:", id);
const response = await fetch("projects/checkout", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({qty:quantity, project_id:id, hw_set_id:2})
});

// Parse the response as JSON
const data = await response.json();
console.log(data);
if (data.message === "Invalid quantity" ) {
    console.log("Invalid quantity");
    alert("Invalid quantity");
}
else if (data.message === "Exceeds capacity") {
    console.log("Exceeds capacity");
    alert("Exceeds capacity");


}
else if (data.message === "Checked out successfully") {
    console.log("Checked in successfully");
    alert("Checked in successfully");

}
else if (data.message === "Invalid Project ID") {
    console.log("Invalid Project ID");
    alert("Invalid Project ID");

}
fetchProjects();
renderProjects();
  }






    const handleExistingSubmit = async (e) => {
        console.log("{Existing Project ID}:", ExistingID);
        setExistingID(ExistingID);
        // Make a POST request to /join-project with the username and projectID (should it be name instead?)
        const response = await fetch("/join-project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, ExistingID})
    });
    // - JSON response with a message and status code:
    // - If the user is not found, returns {"message": "User not found", "status": "fail"} with status code 404.
    // - If the user is already a member of the project, returns {"message": "Already a member of the project", "status": "fail"} with status code 400.
    // - If the user successfully joins the project, returns {"message": "Project joined", "status": "success"} with status code 200.

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    if (data.status === "success" ) {
        console.log(username + " has joined project " + ExistingID);
    }
    else if (data.message === "Already a member of the project") {
        console.log(username,"is Already a member of project", ExistingID);
    }
    else if (data.message === "User not found") {
        console.log("User not found");
    }
    


    };
    
    const handleDebugger = async (e) => {
        const response = await fetch("/projects", {
            method: "GET",
            //headers: {"Content-Type": "application/json"},
            
        });
    
        const data = await response.json();
        console.log(data);
    };

    const fetchProjects = async () => {
        console.log("The view your projects button has been clicked")
        // Fetch projects data from the server
        const response = await fetch("/projects");
        const data = await response.json();
        setProjects(data); // Update projects state with fetched data
        console.log(data);
    };

    // Render Project components for each project in the projects array
        const renderProjects = () => {
            return projects.map((project,index) => (
                // <Project key={project.id} project={project} />
             
                <>
                
                <Project
                name={project.name}
                capacity1={project.capacity1}
                capacity2={project.capacity2}
                checkedout1={project.checkedout1}
                checkedout2={project.checkedout2}
            
                id={project.id}

                handleCheckInHWSet1={(quantity) => handleCheckInHWSet1(index, quantity)}
                handleCheckInHWSet2={(quantity) => handleCheckInHWSet2(index,quantity)}
                handleCheckOutHWSet1={(quantity) => handleCheckOutHWSet1(index,quantity)}
                handleCheckOutHWSet2={(quantity) => handleCheckOutHWSet2(index,quantity)}/>
                <br/>
                </>
            ));
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
            
        
        {renderProjects()}
        <br/>
        {/* the code that i am putting below is to test what the BE passes when i make a call to /projects */}
        <button onClick={fetchProjects}>View Your Projects</button>
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
