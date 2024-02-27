import React, { useState } from 'react';

function Project() {
  const [quantity, setQuantity] = useState(0);

  const handleCheckIn = (hwset) => {
    // Logic to check in to hwset goes here
  };

  const handleCheckOut = (hwset) => {
    // Logic to check out from hwset goes here
  };

  const handleLeave = () => {
    // Logic to leave goes here
  };

  return (
    <table style={{ borderSpacing: '40px' }}>
      <thead>
        <tr>
          <th style={{ padding: '20px' }}>Project Name</th>
          <th style={{ padding: '20px' }}>HWSet1</th>
          <th style={{ padding: '20px' }}>HWSet2</th>
          <th style={{ padding: '20px' }}>Quantity</th>
          <th style={{ padding: '20px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '20px' }}>Project 1</td>
          <td style={{ padding: '20px' }}> 10/20</td> {/* Replace with actual capacity */}
          <td style={{ padding: '20px' }}>30/40</td> {/* Replace with actual capacity */}
          <td>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </td>
          <td>
            <button onClick={() => handleCheckIn('hwset1')}>Check In to HWSet1</button>
            <button onClick={() => handleCheckOut('hwset1')}>Check Out from HWSet1</button>
            <button onClick={() => handleCheckIn('hwset2')}>Check In to HWSet2</button>
            <button onClick={() => handleCheckOut('hwset2')}>Check Out from HWSet2</button>
            <button onClick={handleLeave}>Leave</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Project;