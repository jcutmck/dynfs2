import React, { useState, useEffect } from 'react';
const script = "UT_PDFPRINT_ORDERLIST";
//const cred = btoa("user@domain:password");
//const url = "https://univtneanp.cernerasp.com/discern/m502.univ_tn.cernerasp_com/mpages/reports/UT_PDFPRINT_ORDERLIST?ENC_ID=47423205";
console.log("(1) Scriptcall.js imported");

function Scriptcall() {
  const [rec, setRec] = useState(null);
  console.log("2");
  
  useEffect(() => {
    const asyncRequest = () =>  {
      try {
      // eslint-disable-next-line
      let asyncreq = new XMLCclRequest();
      asyncreq.onreadystatechange = checkReady;
      asyncreq.open("GET", script);
      //asyncreq.withCredentials = true;
      //asyncreq.setRequestHeader("Authorization", "Basic " + cred);
      asyncreq.send('0');
      alert("Program: " + script);

          function checkReady() { //check to see if request is ready
          if (asyncreq.readyState === 4) {// 4 = "loaded"
              if (asyncreq.status === 200) {// 200 = OK
                  let response = asyncreq.responseText;
                  setRec(response);
              }
              else {
                  //the program loaded, but not correctly...
                  alert("Problem retrieving program: " + script + "\n\nThe response status was: " + asyncreq.status);
                  alert(JSON.stringify(asyncreq) );
              }
          }
        }
      } catch { 
        const sampleData = 
        // eslint-disable-next-line
        {"ORD_OUT":{"ORDERS":[{"ORD_ID":5136238549.000000,"ORD_NAME":"CBC1","STATUS":"Ordered"},{"ORD_ID":5136238509.000000,"ORD_NAME":"ASPIRIN 81 MG CHEW TAB","STATUS":"Ordered"},{"ORD_ID":5134199123.000000,"ORD_NAME":"Pharmacy Notification of 60 Day Med Review","STATUS":"Ordered"},{"ORD_ID":5134199113.000000,"ORD_NAME":"Isolation Precautions","STATUS":"Ordered"},{"ORD_ID":5134199073.000000,"ORD_NAME":"Bronchoscopy with Insertion Valve Bronchus","STATUS":"Ordered"},{"ORD_ID":5133815523.000000,"ORD_NAME":"Colonoscopy with Dilatation","STATUS":"Ordered"},{"ORD_ID":5129259595.000000,"ORD_NAME":"amlodipine\/hydrochlorothiazide\/valsartan","STATUS":"Ordered"},{"ORD_ID":5129259589.000000,"ORD_NAME":"Notify Re: QM Eligibility - VTE","STATUS":"Ordered"},{"ORD_ID":5129259555.000000,"ORD_NAME":"Assess Quality Measures Eligibility on Admission","STATUS":"Ordered"},{"ORD_ID":5129259569.000000,"ORD_NAME":"Assess Quality Measure Eligibility","STATUS":"Ordered"},{"ORD_ID":5129259463.000000,"ORD_NAME":"Daily Bath with CHG","STATUS":"Ordered"},{"ORD_ID":5129259439.000000,"ORD_NAME":"Daily Line Necessity Assessment","STATUS":"Ordered"},{"ORD_ID":5129259327.000000,"ORD_NAME":"Nursing Inpatient Admission Orders","STATUS":"Ordered"},{"ORD_ID":5129259417.000000,"ORD_NAME":"VAD Risk Screening Tool","STATUS":"Ordered"},{"ORD_ID":5129259387.000000,"ORD_NAME":"Novel Virus Respiratory Assessment","STATUS":"Ordered"},{"ORD_ID":5129259423.000000,"ORD_NAME":"Weight PRN","STATUS":"Ordered"},{"ORD_ID":5129259357.000000,"ORD_NAME":"PACT Admission Education","STATUS":"Ordered"},{"ORD_ID":5129259393.000000,"ORD_NAME":"CVL Insertion Checklist PRN","STATUS":"Ordered"},{"ORD_ID":5129259381.000000,"ORD_NAME":"Falls Intervention Worksheet","STATUS":"Ordered"},{"ORD_ID":5129259339.000000,"ORD_NAME":"Medication List \/ Home Meds","STATUS":"Ordered"},{"ORD_ID":5129259399.000000,"ORD_NAME":"Order Entry Details PRN","STATUS":"Ordered"},{"ORD_ID":5129259351.000000,"ORD_NAME":"Order Entry Details","STATUS":"Ordered"},{"ORD_ID":5129259375.000000,"ORD_NAME":"Meal Documentation","STATUS":"Ordered"},{"ORD_ID":5129259405.000000,"ORD_NAME":"Special Alert - Nursing","STATUS":"Ordered"},{"ORD_ID":5129259369.000000,"ORD_NAME":"Braden Scale Assessment","STATUS":"Ordered"},{"ORD_ID":5129259411.000000,"ORD_NAME":"Core Measures","STATUS":"Ordered"},{"ORD_ID":5129259363.000000,"ORD_NAME":"Interdisciplinary Plan of Care","STATUS":"Ordered"},{"ORD_ID":5129259429.000000,"ORD_NAME":"Nurse Note PRN On Admission","STATUS":"Ordered"},{"ORD_ID":5129259333.000000,"ORD_NAME":"Nursing Admission History - Adult","STATUS":"Ordered"},{"ORD_ID":5129259345.000000,"ORD_NAME":"Weight On Admission","STATUS":"Ordered"},{"ORD_ID":5129259311.000000,"ORD_NAME":"VTE Quality Measures","STATUS":"Ordered"},{"ORD_ID":5129259319.000000,"ORD_NAME":"VTE Quality Measures Tracking Order","STATUS":"Ordered"}]}}

        setRec(sampleData)
       }      
    }
    asyncRequest();
    }, []);


  return (
    <div>
    <h1>Test</h1>
    {/*1- Primary Dropdown for for choosing available orders*/}
    {/*2- On Click shows dropdown options*/}
    {/* TODO-- This needs to be populated dynamically. CCL to get all orders, Create slots for orders, fill them in*/}
    <p> {rec}</p>
    <p>END</p>
    </div>
  );
}

export default Scriptcall; 