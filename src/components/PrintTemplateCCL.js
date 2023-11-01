import React, { useState, useEffect } from 'react';
import '../Ordreq.css'; // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom';
import { mpageCCL } from './utils/ccl';
import {dataTypeTest} from './utils/TestUtils';

const PrintTemplate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null)
  const [newObject, setNewObject] = useState({});
  const [patientInfo, setPatientInfo] = useState("");
  const [visitInfo, setVisitInfo] = useState("");
  const [orderInfo, setOrderInfo] = useState("");
  const [allergyList, setAllergyList] = useState("");
  const [diagnosisList, setDiagnosisList] = useState("");
  const [healthPlans, setHealthPlans] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  

  useEffect(() => {
    
    const SelectedOrder = (response) => {
      console.log("Data checks in PrintTemplateCCL.js");
      console.log('Response from mpage Function: ', response)
      //response being returned from CCL as a string for some reason
      console.log("function(response) datatype:");
      console.log(dataTypeTest(response));
      
      setOrder(response);
    }
    
    const fetchData = () => {
      const scriptname = "UT_PDFPRINT_ORDERDET";
      //const cred = btoa("user@domain:password");
      //console.log("Loading... SCRIPT: " + scriptname + ", OID: " + params.orderId + ", CREDENTIALS: " + cred);
      console.log("Loading... SCRIPT: " + scriptname + ", OID: " + params.orderId);
    
      if(!order) {
        /**** ONLY ACTIVATE 1 mpageFunction AT A TIME ****/     
        /** 1 mpageCCL is for use with live request/reply data within the EMR (wont work in local browser) **/     
        /** 2 mpageSAMPLECCL is for testing with a local .json file (works in local browser) **/     
        
        mpageCCL(scriptname,params.orderId,SelectedOrder);
        //mpageSAMPLECCL(scriptname,params.orderId,cred,SelectedOrder);

        setLoading(false);
      }
    }   
      if(params.orderId && !order) {
        fetchData();
      }
    
    }, [params.orderId, order]);
  
    

  //convert 'order' string to object called 'newObject'
  useEffect(() => {
    const parsedObject = JSON.parse(order, (key, value) => {
      if (value === "") return value; // Preserve empty strings
      if (!isNaN(value)) return parseFloat(value); // Convert numeric strings to numbers
      return value;
    });
    
    setNewObject(parsedObject);
  }, [order]);
  
  

  //Checking that newObject is populated correctly
  useEffect(() => {
      // This code will run whenever 'order' changes
    if (order !== null) {
      // You can access and work with 'order' here
      console.log('New Object:', newObject);
    }
  }, [order, newObject]);


    useEffect(() => {
    
    const SelectedOrder = (response) => {
      console.log("Data checks in PrintTemplateCCL.js");
      console.log('Response from mpage Function: ', response)
      //response being returned from CCL as a string for some reason
      console.log("function(response) datatype:");
      console.log(dataTypeTest(response));
      
      setOrder(response);
    }
    
    const fetchData = () => {
      const scriptname = "UT_PDFPRINT_ORDERDET";
      console.log("Loading... SCRIPT: " + scriptname + ", OID: " + params.orderId);
    
      if(!order) {
        mpageCCL(scriptname,params.orderId,SelectedOrder);
        setLoading(false);
      }
    }   
      if(params.orderId && !order) {
        fetchData();
      }
    
    }, [params.orderId, order]);
  
  

  //convert 'order' string to object called 'newObject'
  useEffect(() => {
    const parsedObject = JSON.parse(order, (key, value) => {
      if (value === "") return value; // Preserve empty strings
      if (!isNaN(value)) return parseFloat(value); // Convert numeric strings to numbers
      return value;
    });
    
    setNewObject(parsedObject);

    // Check if PATIENTINFO info and extract it
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.PATIENTINFO) {
      const patientInfoLabels = ["Patient Name: ", "Gender: ", "DOB: ", "Age: ", "MRN: "];
        const item = parsedObject.ORD_DET.PATIENTINFO[0]; // Accessing the first item directly
        const patientInfoList = (
            <div className="ptinfo-columns">
              <div className="patient-name">
                <span className="bold-label highlight-label">{patientInfoLabels[0]}</span>{item.PT_NAME}
              </div>
              {/* div wrapper = COLUMN 1 */}
              <div  className="ptinfo-column1"> 
                <div><span className="bold-label">{patientInfoLabels[2]}</span>{item.DOB_TEXT}</div>
                <div><span className="bold-label">{patientInfoLabels[1]}</span>{item.GENDER}</div>
              </div>
              {/* div wrapper = COLUMN 2 */}
              <div  className="ptinfo-column2"> 
              <div><span className="bold-label">{patientInfoLabels[3]}</span>{item.MRN}</div>
              <div><span className="bold-label">{patientInfoLabels[4]}</span>{item.MRN}</div>
              </div>
              {/* div wrapper = COLUMN 3 */}
              <div  className="ptinfo-column3"> 

              </div>
            </div>
        );
    setPatientInfo(patientInfoList);
  }



    // Check if VISIT info and extract it
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.VISIT) {
      const visitInfoLabels = ["FIN: ", "Visit Date: ", "Visit Location: ", "Office Address: ", "Office Phone: "];
        const item = parsedObject.ORD_DET.VISIT[0]; // Accessing the first item directly
        const visitInfoList = (
            
          <div className="visitinfo-rows">             
            <div className="visitinfo-columns">             
              <div  className="visitinfo-column1"> 
                <div><span className="bold-label">{visitInfoLabels[1]}</span>{item.VISIT_DTTM_TEXT}</div>
              </div>
              {/* COLUMN 2 */}
              <div  className="visitinfo-column2"> 
                <div><span className="bold-label">{visitInfoLabels[0]}</span>{item.VISIT_FIN}</div>
              </div>
            </div>
            <div><span className="bold-label  full-row">{visitInfoLabels[2]}</span>{item.VISIT_LOC}</div>
            <div><span className="bold-label">{visitInfoLabels[3]}</span>{item.OFFICE_ADDRESS}</div>
            <div><span className="bold-label">{visitInfoLabels[4]}</span>{item.OFFICE_PHONE}</div>
          </div>
        );
     setVisitInfo(visitInfoList);
  }


    //Listing out the Insurance Plans (max of 2)
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.INS) {
      const listLabels = ["Mmbr Num: ", "Grp Num: ", "Plan Phone: "];
      const insuranceList = (
          <div className="insurance-columns">          
            {parsedObject.ORD_DET.INS.map((item, index) => (
                <div key={item.INS_MEMNBR}>
                  <div><span className="bold-label">{`${item.INS_PRIORITY}`}</span>{item.INS_PLANNAME}</div>
                  <div><span className="bold-label">{listLabels[0]}</span>{item.INS_MEMNBR}</div>
                  <div><span className="bold-label">{listLabels[1]}</span>{item.INS_GRPNUM}</div>
                  <div><span className="bold-label">{listLabels[2]}</span>{item.INS_PLANPHONE}</div>
                </div>
              ))}
          </div>
        );
       setHealthPlans(insuranceList);
    }
  

    // Check if ORDERINFO info and extract it
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.ORDERINFO) {
      const orderInfoLabels = ["Procedure/Order: ", "Date Ordered: ", "Ordering Physician: ", "Order Entry By: "];
        const item = parsedObject.ORD_DET.ORDERINFO[0]; // Accessing the first item directly
        const orderInfoList = (
            <div>
              {/* div wrapper = ROWS/COLUMN 1 */}
              <div className="orderinfo-fullrow">
                <div><span className="bold-label">{orderInfoLabels[0]}</span>{item.ORD_NAME}</div>
              </div>
              <div className="orderinfo-fullrow">
                <div><span className="bold-label">{orderInfoLabels[1]}</span>{item.ORD_DTTM_TEXT}</div>
              </div>
            </div>
        );
    setOrderInfo(orderInfoList);
    }
    

  // Check if allergies exist and extract them
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.ALLERGIES) {
      const allergies = parsedObject.ORD_DET.ALLERGIES.map(allergy => allergy.NAME);
      setAllergyList(allergies.join("; "));
    }


    // Check if Dx Codes and extract them
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.ORD_DX) {
      const diagnosisPairs = parsedObject.ORD_DET.ORD_DX.map(item => `${item.DX_CODE} - ${item.DX_NAME}`).join('; ');
      setDiagnosisList(diagnosisPairs);

    }  


  /*  
    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.INS) {

      const insuranceList = parsedObject.ORD_DET.INS.map(item => `${item.INS_PRIORITY} - ${item.INS_PLANNAME} - ${item.INS_MEMNBR} - ${item.INS_GRPNUM} - ${item.INS_PLANPHONE}`).join('; ');
      setHealthPlans(insuranceList);
    } 
*/

    if (parsedObject && parsedObject.ORD_DET && parsedObject.ORD_DET.ORD_DET) {
      const ordDetailList = parsedObject.ORD_DET.ORD_DET.map(item => ({
          fieldName: item.OE_FIELD_NAME,
          fieldVal: item.FIELD_DISP_VAL
      }));
      setOrderDetails(ordDetailList);
    } 

  }, [order]);
  

  //Checking that newObject is populated correctly
  useEffect(() => {
      // This code will run whenever 'order' or 'newObject' change
    if (order !== null) {
      // You can access and work with 'order' here
      console.log('New Object not null:', newObject);
            
    }
    if(newObject == null) {
      console.log("Yep newObject is null, sir!");
    }
  }, [order, newObject]);


  if (loading) {
    return(<p>Loading</p>)
  }
  else{
    return (
      <div className="requisition">
        <div className="reqdetails">
          
          <div className="header">
            <p>THE UNIVERSITY OF TENNESSEE MEDICAL CENTER</p>
          </div>

          <div className="content">
            <div className="section-title">
              <div className="bold-label title-label">
                <span className="title-border">PATIENT INFO</span>
              </div>
            </div>  
            <div className="section">
              <div className="sectioncontents">
                <div className="ptinfo-container">
                  <p>{patientInfo}</p>
                </div>
                <div className="allergies-container">
                  <span className="bold-label highlight-label">Allergy List: </span>{allergyList}
                </div>
                <div className="insurance-container">                 
                  <p>{healthPlans}</p>
                </div>
              </div>
            </div>
          
            <div className="section-title">
              <div className="bold-label title-label">
                <span className="title-border">VISIT INFO</span>
              </div>
            </div>
            <div className="section">
              <div className="sectioncontents">
                <div className="visitinfo-container">  
                  <p>{visitInfo}</p>
                </div>
              </div>
            </div>
            
            <div className="section-title">
              <div className="bold-label title-label">
                <span className="title-border">ORDER INFO</span>
              </div>
            </div>  
            <div className="section">
              <div className="sectioncontents">
                <div className="orderinfo-container">
                  <div className="orderinfo-columns">                 
                    <p>{orderInfo}</p>
                    <div className="orderinfo-fullrow">
                      <div><span className="bold-label">Ordering Physician: </span>{newObject?.ORD_DET?.ORD_PHYS}</div>
                    </div>
                    <div className="orderinfo-fullrow">
                      <div><span className="bold-label">Order Entry By: </span>{newObject?.ORD_DET?.ORD_BY}</div>
                    </div>
                  </div>
                  <div className="diagnosis-container">
                    <span className="bold-label highlight-label">Dx Code(s): </span>{diagnosisList}
                  </div>
                </div>
              </div> 
            </div>

            <div className="section-title">
              <div className="bold-label title-label">
                <span className="title-border">ORDER DETAILS</span>
              </div>
            </div> 
            <div className="section">
              <div className="sectioncontents">
                <div className="orderdetail-container">
                  <div className=".orderdetail-columns">
                    {orderDetails.map((detail, index) => (
                      <div key={index} className="orderDetailItem">
                        <span className="bold-label">{detail.fieldName}: </span>
                        <span>{detail.fieldVal}</span>
                      </div>
                    ))}
                  </div>
                </div>      
              </div>
            </div>
          
          </div>
          
          <div className="footer">
            <div className="signaturecontainer">
              <div className="grid-item">
                <span className="bold-label">Electronically Signed By: </span>{newObject?.ORD_DET?.ORD_PHYS}
              </div>
            </div>
          
            <div className="no-print">  
              <p>***UPDT APP: {newObject?.ORD_DET?.ORD_UPDT_APP}</p>
              <p>***ERRORS: {newObject?.ORD_DET?.ORD_ENC_ERROR}</p>
              <p>Order Id#: {newObject?.ORD_DET?.ORD_ID} </p>
            </div>
          </div>
        
        </div>


        <div className="no-print" id="backButton">
          <br />
          <button className="refresh-button" onClick={() => {
            navigate('/');
            setLoading(true);
            setOrder(null);
            }
          }> BACK </button>
        </div>
      </div>
    );
  }
};

export default PrintTemplate;

