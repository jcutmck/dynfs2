import React, { useState } from 'react';

const Dropdown = () =>  {
  {/* State Handler for Dropdown Menu*/} 
  const [open, setOpen] = React.useState(false);

  {/* Dropdown State = OPEN*/} 
  const handleOpen = () => {
    setOpen(!open);
  };

  {/* Dropdown State = CLOSED*/} 
  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <div>
     
      {/*1- Primary Dropdown for for choosing available orders*/} 
      {/*2- On Click shows dropdown options*/}
      {/* TODO-- This needs to be populated dynamically. CCL to get all orders, Create slots for orders, fill them in*/}
      <button onClick={handleOpen}>Dropdown</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleMenuOne}>Menu 1</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuTwo}>Menu 2</button>
            </li>
          </ul>
        ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
    </div>
  );
}

export default Dropdown