/*
* XMLCclRequest JavaScript Library v1.0.0
*
* based on contributions from Joshua Faulkenberry
* Lucile Packard Children's Hospital at Stanford
*
* Date: 2009-04-9
* Revision: 1
*/
XMLCclRequest = function(options) {
   /************ Attributes *************/

 /***NOTES*** The onreadystatechange property is used to specify a callback function 
 * that should be executed whenever the readyState property of the XMLHttpRequest 
 * object changes. The readyState property indicates the current state of the 
 * request (e.g., whether it's still processing, completed, etc.). When the readyState 
 * changes, the specified callback function is triggered. ***/
   this.onreadystatechange = function() {
      return null;
   };
   this.options = options || {};
   this.readyState = 0;
   this.responseText = "";
   this.status = 0;
   this.statusText = "";
   this.sendFlag = false;
   this.errorFlag = false;
   this.responseBody =
   this.responseXML =
   this.async = true;
   this.requestBinding = null;
   this.requestText = null;

   /************** Events ***************/

   //Raised when there is an error.
   this.onerror =

   /************** Methods **************/

   //Cancels the current CCL request.
   this.abort =

   //Returns the complete list of response headers.
   this.getAllResponseHeaders =

   //Returns the specified response header.
   this.getResponseHeader = function() {
      return null;
   };

   //Assigns method, destination URL, and other optional attributes of a pending request.
   this.open = function(method, url, async) {
      if (method.toLowerCase() != "get" && method.toLowerCase() != "post") {
         this.errorFlag = true;
         this.status = 405;
         this.statusText = "Method not Allowed";
         return false;
      }
      this.method = method.toUpperCase();
      this.url = url;
      this.async = async!=null?(async?true:false):true;
      this.requestHeaders = null;
      this.responseText = "";
      this.responseBody = this.responseXML = null;
      this.readyState = 1;
      this.sendFlag = false;
      this.requestText = "";
      this.onreadystatechange();
   };

   //Sends a CCL request to the server and receives a response.
   this.send = function(param) {
      if (this.readyState != 1) {
         this.errorFlag = true;
         this.status = 409;
         this.statusText = "Invalid State";
         return false;
      }
      if (this.sendFlag) {
         this.errorFlag = true;
         this.status = 409;
         this.statusText = "Invalid State";
         return false;
      }
      this.sendFlag = true;
      this.requestLen = param.length;
      this.requestText = param;
      var uniqueId = this.url + "-" + (new Date()).getTime() + "-" + Math.floor(Math.random() * 99999);
      XMLCCLREQUESTOBJECTPOINTER[uniqueId] = this;

      var el;
	  if (!document.getElementById("__ID_CCLLINKHref_8629__")) {
		el = document.createElement("a");
		el.id = "__ID_CCLLINKHref_8629__";
		document.body.appendChild(el);
      }
      else {
			el = document.getElementById("__ID_CCLLINKHref_8629__");
			}

		el.href = "javascript:XMLCCLREQUEST_Send(\"" + uniqueId + "\"" + ")";
		el.click();
   };

   //Adds custom HTTP headers to the request.
   this.setRequestHeader = function(name, value) {
      if (this.readyState != 1) {
         this.errorFlag = true;
         this.status = 409;
         this.statusText = "Invalid State";
         return false;
      }
      if (this.sendFlag) {
         this.errorFlag = true;
         this.status = 409;
         this.statusText = "Invalid State";
         return false;
      }
      if (!value) { return false; }
      if (!this.requestHeaders) {
         this.requestHeaders = [];
      }
      this.requestHeaders[name] = value;
   };
}

XMLCCLREQUESTOBJECTPOINTER = [];
function evaluate(x)
{
	return eval(x)
}

function CCLNEWSESSIONWINDOW__(sUrl,sName,sFeatures,bReplace,bModal){}

function CCLNEWSESSIONWINDOW(sUrl,sName,sFeatures,bReplace,bModal){
     var el = document.getElementById("__ID_CCLLINKHref_8629__");
     el.href = "javascript:CCLNEWSESSIONWINDOW__(\"" + sUrl + "\",\"" + sName + "\",\"" + sFeatures + "\"," + bReplace + "," + bModal +")";
     el.click();
     if (bModal == 0) {          popupWindowHandle = window.open(sUrl,sName,sFeatures,bReplace);
          if (popupWindowHandle) popupWindowHandle.focus();
     }
}


function APPLINK__(mode, appname, param ){}

function APPLINK( mode, appname, param ){
     var paramLength = param.length;
     if (paramLength > 2000){
         document.getElementById("__ID_CCLLINKHref_8629__").value = '"' + param + '"';
         param = param.substring(0, 2000);
     }
     var el = document.getElementById("__ID_CCLLINKHref_8629__");
     el.href = "javascript:APPLINK__(" + mode + ",\"" + appname + "\",\"" + param + "\"," + paramLength +")";
     el.click();
  }

function CCLLINK__(program, param, nViewerType ){}

function CCLLINK( program, param, nViewerType ){
     var paramLength = param.length;
     if (paramLength > 2000){
         document.getElementById("__ID_CCLLINKHref_8629__").value = '"' + param + '"';
         param = param.substring(0, 2000);
     }
     var el = document.getElementById("__ID_CCLLINKHref_8629__");
     el.href = "javascript:CCLLINK__(\"" + program + "\",\"" + param + "\"," + nViewerType + "," + paramLength +")";
     el.click();
  }

function MPAGES_EVENT__(eventType, eventParams ){}

function MPAGES_EVENT( eventType, eventParams ){
     var paramLength = eventParams.length;
     if (paramLength > 2000){
         document.getElementById("__ID_CCLLINKHref_8629__").value = '"' + eventParams + '"';
         eventParams = eventParams.substring(0, 2000);
     }
     var el = document.getElementById("__ID_CCLLINKHref_8629__");
     el.href = "javascript:MPAGES_EVENT__(\"" + eventType + "\",\"" + eventParams + "\"," + paramLength +")";
     el.click();
  }

function CCLLINKPOPUP__(program, param, sName, sFeatures, bReplace){}

function CCLLINKPOPUP( program, param, sName, sFeatures, bReplace ){
     var paramLength = param.length;
		 alert("******HERE1111");
     if (paramLength > 2000){
         document.getElementById("__ID_CCLLINKHref_8629__").value = '"' + param + '"';
         param = param.substring(0, 2000);
     }

     var el = document.getElementById("__ID_CCLLINKHref_8629__");
     el.href = "javascript:CCLLINKPOPUP__(\"" + program + "\",\"" + param + "\",\"" + sName + "\",\"" + sFeatures + "\"," + bReplace + "," + paramLength +")";
     el.click();
  }

function CCLNEWPOPUPWINDOW(sUrl,sName,sFeatures,bReplace){
popupWindowHandle = window.open(sUrl,sName,sFeatures,bReplace);
popupWindowHandle.focus();
}
