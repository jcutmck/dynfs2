import React, {useState, useEffect} from 'react';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import {dataTypeTest} from './utils/TestUtils';
import { pageParams, mpageCCL } from './utils/ccl';
//import ord_out from "./sample/ord_out.json"

//react-table - pass it two things: 1 list of columns (headers) & the data.
const TableDisplay = () => {

    const [persId, setPersId] = useState('');
    const [encId, setEncId] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);


    //Retreive current page parameters data (ids)
    useEffect(() => {
        const { pid, eid, uid } = pageParams();
        console.log('pid = ' + pid)
        console.log('eid = ' + eid)
        console.log('uid = ' + uid)
        setPersId(pid);
        setEncId(eid);
        setUserId(uid);
      }, []);


    //When persId changes, Call script for orderList
    useEffect(() => {
      if (!persId) {
        console.log('Person ID is: ', persId);
      }

      const ReturnedOrders = (response) => {
        console.log("Data checks in DisplayTable.js");
        console.log('Response from mpage Function: ', response)
        console.log("function(response) datatype:");
        console.log(dataTypeTest(response));
        // Parse the returned string to a JavaScript object
        const parsedResponse = JSON.parse(response);
        // Access the 'ORDERS' array from the parsed object
        const orders = parsedResponse.ORD_OUT.ORDERS;
        setOrderList(orders);
      }

      const fetchData = () => {
        const scriptname = "UT_PDFPRINT_ORDERLIST";
        console.log("Loading... SCRIPT: " + scriptname + ", PID: " + persId + " EID: " + encId + " UID: " + userId);
      
        if(orderList.length === 0) {
          mpageCCL(scriptname,persId,ReturnedOrders);
          setLoading(false);
        }
      }   
        if(persId && orderList.length === 0) {
          fetchData();
        }
      
      }, [persId, encId, userId, orderList]);
 
    
    
    const navigate = useNavigate();
    //const [orderlist, setOrderlist] = useState(null)

    const handleOrderSelect = (orderId) => {
        // Navigate to a new route with the itemId as a route parameter
        navigate(`/orderreq/${orderId}`);
      };   
    
    // react-table requires an array, so here we pull the orders array
    // from the full json sample message
    //const orderArray = ord_out.ORD_OUT.ORDERS; 
    //console.log(orderArray);
    //const data = React.useMemo(() => localData, []);
    //const data = React.useMemo(() => orderArray, [orderArray]);
    //console.log("Value checks in DisplayTable.js:");
    //console.log("const orderArray value:");
    //console.log(orderArray );
    //console.log("const orderArray datatype:");
    //console.log(dataTypeTest(orderArray));
    //console.log("const data value");
    //console.log(data);
    //console.log("const data datatype:");
    //console.log(dataTypeTest(orderArray));
    //console.log(dataTypeTest(data));
    
    const columns = React.useMemo(() => [
    {
        Header:     "ID",
        accessor:   "ORD_ID",
    },
    {
        Header:     "NAME",
        accessor:   "ORD_NAME",

    },
    {
        Header:     "STATUS",
        accessor:   "STATUS",
    },
    ], []);

    const {
        getTableProps, // Function to get table props
        getTableBodyProps, // Function to get table body props
        headerGroups, // Array of header groups
        rows, // Array of table rows
        prepareRow, // Function to prepare row props and render
        } = useTable({columns, data: orderList});

  if (loading) {
    return(<p>Loading...</p>)
  }
  else{    
  return (  
        <div className="container">
        <button className="refresh-button">Refresh</button> {/* New Button */}
          <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) =>( 
                    //destructure the headerGroup
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>                
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()} 
                            onClick={() => {
                            // Handle row click event here
                            //******* HERE YOU WILL CALL THE NEXT CCL WHICH WILL CALL PrintTemplate.js */
                                console.log('Row clicked:', row.original.ORD_ID);
                                handleOrderSelect(row.original.ORD_ID);
                            }}>
                            
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}     
            </tbody>
          </table>
        </div>
  );
}};

export default TableDisplay;

