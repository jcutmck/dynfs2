import ord_out from "../sample/ord_out.json"
import ord_det from "../sample/ord_det.json"

// Parameters
// program - (string) name of program/script to be run
// parameters - data to be sent with request to program/script
// (REMOVED) credentials - (string) user@host:password  
// callback - (Function) function to be called on the response
// asyncswitch - defaults to true to run script request asynchronously in Cerner
// switch to false to run script request sync instead
// par2, par3 added to share PID + EID across components using pageParams();
export const mpageCCL = (program, parameters, callback, asyncswitch=true) => {
    // eslint-disable-next-line
    let cclreq = new XMLCclRequest();
    console.log("Running mpageCCL");
    //handle the program completion
    const checkReady = () => { //check to see if request is ready
        if (cclreq.readyState === 4) {// 4 = "loaded"
            console.log("cclreq Readystate = 4(loaded)");
            if (cclreq.status === 200) {// 200 = OK
                    let response = cclreq.responseText;
                    console.log("Status 200(OK) - callback set");
                    callback(response);
                }
                else {
                    //the program loaded, but not correctly...
                    console.log("Status !=200 Problem Occurred");
                    alert(`Problem retrieving program: ${program}\n\nThe response status was: ${cclreq.status}`);
                    alert( JSON.stringify(cclreq) );
                }
            }
        }
    
        //set the onreadystatechange event handler and prepare to execute
    cclreq.onreadystatechange = checkReady;
    cclreq.open("GET", program, asyncswitch);
    //removed, not required for mpage ccl call in testing
    //cclreq.withCredentials = true;
    //cclreq.setRequestHeader("Authorization", `Basic ${credentials}`);
    cclreq.send(parameters);
    console.log('parameters sent:' + parameters);
    console.log("end of mpageCCL Request process");
    };


    export const mpageLOCAL = (program, param1, credentials, callback, asyncswitch=true) => {
        console.log("Running program: " + program);
        console.log("Parameters Passed: " + param1);
        console.log("Credentials Entered: " + credentials);
        console.log("Async: " + asyncswitch);
        let response = {"ORD_OUT":{"ORDERS":[{"ORD_ID":5129259387.000000,"ORD_NAME":"Novel Virus Respiratory Assessment","STATUS":"Ordered"}]}}
        callback(response);  
    };


    //mpageSAMPLE(program, parameters, credentials, callback);  // This one uses ord_out.json object&array structure
    export const mpageSAMPLE = (program, parameters, credentials, callback, asyncswitch=true) => {       
        //console.log("Running program: " + program);
        //console.log("Parameters Passed: " + parameters);
        //console.log("Credentials Entered: " + credentials);
        console.log("Async: " + asyncswitch);
        const data = ord_out;
        //console.log("this is the dataset from mpageSAMPLE function");
        //console.log(data);
        if (data) {
            callback(data);
        } else {
            console.error("Error in mpageSAMPLE function");
            callback(null); // Return null or handle the error as needed
        }
    };



    //mpageSAMPLECCL(program, parameters, credentials, callback);  // This one uses ord_det.json object structure
    export const mpageSAMPLECCL = (program, parameters, credentials, callback, asyncswitch=true) => {       
        //console.log("Running program: " + program);
        //console.log("Parameters Passed: " + parameters);
        //console.log("Credentials Entered: " + credentials);
        console.log("Async: " + asyncswitch);
        const data = ord_det;
        //console.log("this is the dataset from mpageSAMPLE function");
        //console.log(data);
        if (data) {
            callback(data);
        } else {
            console.error("Error in mpageSAMPLE function");
            callback(null); // Return null or handle the error as needed
        }
    };


//not used
    export const getJSObject = (parameters, callback) => {       
        console.log("Parameters Passed: " + parameters);
        const data = ord_out;
        console.log("this is the dataset from mpageSAMPLE function");
        console.log(data);
        if (data) {
            callback(data);
        } else {
            console.error("Invalid error mpageSAMPLE function");
            callback(null); // Return null or handle the error as needed
        }
    };

// format dates in CCL returns
    export const formatDate = (dateString) => {
        const date = new Date(parseInt(dateString.substr(6)));
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedDate;
      };


// Attempt at JS version of gathering data on load provided by Cerner
    export const pageParams = () => {
        const currentURL = new URL(window.location.href);
        const PID = currentURL.searchParams.get("persid")
        const EID = currentURL.searchParams.get("encid")
        const USRID = currentURL.searchParams.get("userid")
      
        return {
          pid : PID, 
          eid : EID, 
          uid : USRID, 
        };
      }
    
    export const buildParams = (patientId, encounterId, userId) => {
        var parameters = [];
        
        parameters.push(patientId);
        parameters.push(encounterId);
        parameters.push(userId);
      
        return parameters;
      }
