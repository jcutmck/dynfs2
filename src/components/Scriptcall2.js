import React, { useState, useEffect } from 'react';
const scriptname = "UT_PDFPRINT_ORDERDET";
const cred = btoa("jclutter@M502:@Bangarang100");
//const url = "https://univtneanp.cernerasp.com/discern/m502.univ_tn.cernerasp_com/mpages/reports/UT_PDFPRINT_ORDERLIST?ENC_ID=47423205";
console.log("(1) Scriptcall2.js imported");

function Scriptcall2(oid) {
  console.log("processing json for printing");
  let orderId = oid;  
  console.log("scriptcall2: " + orderId);
  const sampleData = {
    ord_id: orderId,
    ord_name: "CBC w/ DIFF (Sample Data from Scriptcall2.js file)",
    status: "Ordered",
    accession: 12345,
    ord_dttm: "2023-09-15",
    ord_type: "Standard",
    ord_by_id: 101,
    ord_by: "John Doe",
    ord_phys_id: 201,
    ord_phys: "Dr. Smith",
  };

  let data = { ...sampleData, ord_id: orderId };

  const requestData = (script, cred, id) => {
    try{
      // eslint-disable-next-line
      let asyncreq = new XMLCclRequest();
      asyncreq.onreadystatechange = checkReady;
      asyncreq.open("GET", scriptname);
      asyncreq.withCredentials = true;
      asyncreq.setRequestHeader("Authorization", "Basic " + cred);
      asyncreq.send(orderId);
      alert("Program: " + scriptname);

      function checkReady() { //check to see if request is ready
        if (asyncreq.readyState === 4) {// 4 = "loaded"
            if (asyncreq.status === 200) {// 200 = OK
                let response = asyncreq.responseText;
                data = { ...response, ord_id: orderId };
            }
            else {
                //the program loaded, but not correctly...
                alert("Problem retrieving program: " + scriptname + "\n\nThe response status was: " + asyncreq.status);
                alert(JSON.stringify(asyncreq) );
          }
        }
      }
    } catch{ 
      console.log("Error: Reverting to sampleData");
      data = { ...sampleData, ord_id: orderId };
    }


    return [
      {
        ord_det: [
          {
            ord_id: data.ord_id,
            ord_name: data.ord_name,
            status: data.status,
            accession: data.accession,
            ord_dttm: data.ord_dttm,
            ord_type: data.ord_type,
            ord_by_id: data.ord_by_id,
            ord_by: data.ord_by,
            ord_phys_id: data.ord_phys_id,
            ord_phys: data.ord_phys,
          },
        ],
      },
    ];
  }
  requestData(scriptname, cred, oid); 
}

export default Scriptcall2; 