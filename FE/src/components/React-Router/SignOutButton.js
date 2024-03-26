import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const handleLogout = () => {
        window.location.href = '/login';
        navigate(`/`);
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default SignOutButton;