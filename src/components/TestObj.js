import React, { useState, useEffect } from 'react';
import '../Ordreq.css'; // Import your CSS file

const TestObj = () => {
  const orderId = 5134199073;    
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  
  useEffect(() => {
    const fetchData = () => {
    
        if(!value) {
            setLoading(false);
        }
    }   
 
        if(!value) {
            fetchData();
        }
    }, [orderId]);

  useEffect(() => {
    if(value) {
      console.log({ value });}
      console.log(value.ORD_OUT.ORDERS[0].ORD_NAME)
  }, [value]);


if (loading) {
    return(<p>Loading</p>)
}
else{
    return (
        <div>
            <p>HERE IS YOUR ORDER_ID</p>
            <p>{value.ORD_OUT.ORDERS[0].ORD_NAME} </p>
            <p>HERE IS YOUR ORDER_NAME</p>
            <p>!!!REPLACE WITH ORDER NAME!!!</p>
        </div>
    );
  }
};

export default TestObj;

