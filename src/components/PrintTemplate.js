import React, { useState, useEffect } from 'react';
import '../Ordreq.css'; // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom';
import { mpageLOCAL, mpageSAMPLE} from './utils/ccl';
import ord_det from "./sample/ord_det.json"

const PrintTemplate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null)
  //mpageCCL(program, parameters, credentials, callback, asyncswitch=true)
  

  useEffect(() => {
    const setSpecificOrder = (response) => {
      console.log('Response from mpage Function: ', response)
      setOrder(response.ORD_OUT.ORDERS.find(item => item.ORD_ID === parseInt(params.orderId)))
    }
    
    const fetchData = () => {
      const scriptname = "UT_PDFPRINT_ORDERDET";
      const cred = btoa("jclutter@M502:@Bangarang100");
      console.log("Loading... SCRIPT: " + scriptname + ", OID: " + params.orderId + ", CREDENTIALS: " + cred);
    
      if(!order) {
        /**** ONLY ACTIVATE 1 mpageFunction AT A TIME ****/     
        /** 1 mpageCCL is for use with live request/reply data within the EMR (wont work in local browser) **/     
        /** 2 mpageSAMPLE is for testing with a local .json file (works in local browser) **/     
        /** 3 mpageLOCAL is for testing with a hardcoded data object defined in the function **/     
        
        //mpageCCL(scriptname,params.orderId,cred,setSpecificOrder);
        mpageSAMPLE(scriptname,params.orderId,cred,setSpecificOrder);
        //mpageLOCAL(scriptname,params.orderId,cred,setSpecificOrder);

        setLoading(false);
      }
    }   
      if(!order) {
        fetchData();
      }
    }, [params.orderId]);
  
  
  if (loading) {
    return(<p>Loading</p>)
  }
  else{
    return (
      <div>
        <div className="requisition">
          
          <div className="header">
            <p>THE UNIVERSITY OF TENNESSEE MEDICAL CENTER</p>
          </div>

          <div className="content">
          
            <div className="section">
              <p>Patient: TESTING, RULES   DOB: 10/10/1984   Age: 38 Years  Gender: F</p>
              <p>MRN: 2952535 FIN: 29525350001</p>
              <p>Patient Order Location: University of Tn Medical Ctr Clinic</p>
              <p>Admit Date/Time: 01/16/23 14:37 </p>
              <p>Height: Weight: Isolation Type: Contact (MRSA, VRE, MDRO)</p>
            </div>
          
            <div className="section">
              <p>Procedure/Order: CBC with Automated Differential Order</p>
              <p>Dynamic ORD Name: {order.ORD_NAME}</p>
              <p>Requisition Type: General Lab         Dx: Testing</p>
              <p>Order Id#: 5136238549.00     Accession#: </p>
              <p>PARAMS ORDER ID: {order.ORD_ID} </p>
              <p>Order/Dept Status: {order.STATUS} </p>
              <p>Ordering Physician: CALLISON JR MD AMB, JOHN C</p>
              <p>Order Entered By: Clutter Analyst, Joseph M Date/Time Ordered: 08/14/23 13:52</p>
              <p>Specimen Type: Blood</p>
              <p>Collection Priority: Routine</p>
              <p>Reporting Priority: Routine</p>
              <p>Collected Y/N: No</p>
              <p>Collection Date/Time: 08/14/23 13:52:00 EDT</p>
            </div> 
          </div>
            <div className="footer">
              <p>Electronically Signed By: Dr. Hippocrates</p>
            </div>
        </div>


        <div className="no-print" id="backButton">
          <br />
          <button onClick={() => {
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

