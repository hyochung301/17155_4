import React, { useState } from 'react';

function Form(props) {
    // Function to handle input change
    const handleChange = (event) => {
        // Call the parent component's onChange function with the new value
        props.onChange(event.target.value);
    };

    



    return (
        <div>
          <center>
            <form>
                <label>
                    {props.text}
                    <input
                        type={props.text === 'Password:     ' ? 'password' : 'text'} 
                        value={props.value} // Set the value of the input field
                        onChange={handleChange} // Call handleChange function on change
                    />
                </label>
            </form>
          </center>
        </div>
    );
}

export default Form;
