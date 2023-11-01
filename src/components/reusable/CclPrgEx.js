import React from 'react';

const programDict = {
    "getOrders" : {
      "program" : "UT_PDFPRINT_ORDERLIST"
    }
}

//mod 060923 BC
function Cerner() {

};

Cerner.prototype.getMRN = function() {
  return "668050";
  //return "2478655602261";
};

Cerner.prototype.executeCCL = function(Program, parameters, async, callback_p, callback) {
    //create the request, assuming we will be performing async
    const xhr = new XMLCclRequest();
    const doAsync = async;

    //set the onreadystatechange event handler and prepare to execute
    xhr.onreadystatechange = checkReady;
    xhr.open('GET', Program, doAsync);

    xhr.send(parameters);

    window.debug.writeLog("Program: " + Program + " " + parameters);
    //alert("after send parameters");
    //handle the program completion
    function checkReady() { //check to see if request is ready
        if (xhr.readyState === 4) {// 4 = "loaded"
            if (xhr.status === 200) {// 200 = OK
                let response = xhr.responseText;
                window.debug.writeLog("Response: " + response);
                callback(response, callback_p);
            }
            else {
                //the program loaded, but not correctly...
                alert("Problem retrieving program: " + Program + "\n\nThe response status was: " + xhr.status);
                alert( JSON.stringify(xhr) );
            }
        }
    }
};
Cerner.prototype.executeCCL_pdfprintprg = function(encounterId, userId, cclResultCallback) {
  var parameters = [];

  parameters.push("^MINE^");
  parameters.push(encounterId);

  this.executeCCL(programDict.getPatientDemographics.program, parameters.join(","), false, null, cclResultCallback);
}
