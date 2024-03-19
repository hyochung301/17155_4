import React, { useState } from 'react';

function Project(props) {
  const [quantity, setQuantity] = useState(0);

  function handleCheckInHWSet1() {
    props.handleCheckInHWSet1(quantity);
  }
function handleCheckInHWSet2() {
    props.handleCheckInHWSet2(quantity);
  }
function handleCheckOutHWSet1() {
    props.handleCheckOutHWSet1(quantity);
  }
  function handleCheckOutHWSet2() {
    props.handleCheckOutHWSet2(quantity);
  }
  function handleLeave() {
    console.log("Leaving project");
  }

  return (
    <table style={{ borderSpacing: '40px' }}>
      <thead>
        <tr>
          <th style={{ padding: '20px' }}>Project Name</th>
          <th style={{ padding: '20px' }}>Project ID</th>
          <th style={{ padding: '20px' }}>HWSet1</th>
          <th style={{ padding: '20px' }}>HWSet2</th>
          <th style={{ padding: '20px' }}>Quantity</th>
          <th style={{ padding: '20px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td style={{ padding: '20px' }}>{props.name}</td>
          <td style={{ padding: '20px' }}>{props.id}</td>
          <td style={{ padding: '20px' }}> {props.checkedout1}/{props.capacity1}</td> {/* Replace with actual capacity */}
          <td style={{ padding: '20px' }}>{props.checkedout2}/{props.capacity2}</td> {/* Replace with actual capacity */}
          <td>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </td>
          <td>
            <button onClick={() => handleCheckInHWSet1()}>Check In to HWSet1</button>
            <button onClick={() => handleCheckOutHWSet1()}>Check Out from HWSet1</button>
            <button onClick={() => handleCheckInHWSet2()}>Check In to HWSet2</button>
            <button onClick={() => handleCheckOutHWSet2()}>Check Out from HWSet2</button>
            <button onClick={handleLeave}>Leave</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Project;