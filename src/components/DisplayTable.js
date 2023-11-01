import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import {dataTypeTest} from './utils/TestUtils';
import ord_out from "./sample/ord_out.json"

// Set test data as array, this is what is required for using react-table
const localData = 
        [
          {"ORD_ID":5136238549.000000,"ORD_NAME":"CBC1","STATUS":"Ordered"},
          {"ORD_ID":5136238509.000000,"ORD_NAME":"ASPIRIN 81 MG CHEW TAB","STATUS":"Ordered"},
          {"ORD_ID":5134199123.000000,"ORD_NAME":"Pharmacy Notification of 60 Day Med Review","STATUS":"Ordered"},
          {"ORD_ID":5134199113.000000,"ORD_NAME":"Isolation Precautions","STATUS":"Ordered"},
          {"ORD_ID":5134199073.000000,"ORD_NAME":"Bronchoscopy with Insertion Valve Bronchus","STATUS":"Ordered"},
          {"ORD_ID":5133815523.000000,"ORD_NAME":"Colonoscopy with Dilatation","STATUS":"Ordered"},
          {"ORD_ID":5129259595.000000,"ORD_NAME":"amlodipine/hydrochlorothiazide/valsartan","STATUS":"Ordered"}
        ];

//react-table - pass it two things: 1 list of columns (headers) & the data.
const TableDisplay = () => {
    const navigate = useNavigate();
    const [orderlist, setOrderlist] = useState(null)

    const handleOrderSelect = (orderId) => {
        // Navigate to a new route with the itemId as a route parameter
        navigate(`/orderreq/${orderId}`);
      };   
    
    // react-table requires an array, so here we pull the orders array
    // from the full json sample message
    const orderArray = ord_out.ORD_OUT.ORDERS; 
    console.log(orderArray);
    
    //const data = React.useMemo(() => localData, []);
    const data = React.useMemo(() => orderArray, []);
    console.log("Value checks in DisplayTable.js:");
    console.log("const orderArray value:");
    console.log(orderArray );
    console.log("const orderArray datatype:");
    console.log(dataTypeTest(orderArray));
    console.log("const data value");
    console.log(data);
    console.log("const data datatype:");
    console.log(dataTypeTest(orderArray));

    console.log(dataTypeTest(data));
    
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
        } = useTable({columns,data});

        
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
};

export default TableDisplay;

