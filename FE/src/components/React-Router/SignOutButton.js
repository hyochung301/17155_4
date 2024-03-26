import React from 'react';

const SignOutButton = () => {
    const handleLogout = () => {
        // Add your logout logic here
        // For example, you can clear the user session or redirect to the login page
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default SignOutButton;