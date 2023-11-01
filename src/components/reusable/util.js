(function ($,w) {

    if (typeof $ === 'undefined') { throw new Error("2bPrecise requires jQuery"); }

    w.util = w.util || {};

    var self = w.util;

    self.getQueryStringValue = function(parameter, url) {
      if (!url) {
        url = window.location.href;
      }

      parameter = parameter.replace(/[\[\]]/g, '\\$&');
      var results;
      var regex = new RegExp('[?&]' + parameter + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
      if (!results)
        return null;
      if (!results[2])
        return '';

      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

}($, window));

var debugLogEntryType = {
  "None" : 1
  , "Custom": 2
}

function Debug() {
  this._log = new Array();
  this._writeLogTime = null;
};

Debug.prototype.showLog = function(classification) {
  var logWindow;
  var self = this;

  logWindow = window.open("", "DebugWindow", "top=100,left=100,width=900,height=600,fullscreen=no,scrollbars=yes,location=no,menubar=no,resizeable=yes,status=no,titlebar=no,toolbar=no");
  logWindow.document.write("<html><head></head><body>");

  //log page HTML
  var sBody = $('html').clone().html();
  logWindow.document.write("<b>Page HTML:</b><br>")
  logWindow.document.write("<textarea id='debug' cols=100 rows=20></textarea><br>");
  logWindow.document.getElementById('debug').value = sBody;

  //write log
  logWindow.document.write("<b>Log:</b><br>")
  logWindow.document.write("<table border=yes style='width:100%;table-layout:fixed;'>");

  var filteredLogs = self._log;
  var counter = 0;

  if (classification !== undefined && classification !== null){
    filteredLogs = filteredLogs.filter(function(item){
      return (
        (item.classification > 0) && ((item.classification & classification) === item.classification)
      );
    });
  }

  for (var i = 0; i < filteredLogs.length; i++) {
      logWindow.document.write("<tr><td style='width:30%;'>" + filteredLogs[i].log_date + "</td><td style='width:10%;'>" + filteredLogs[i].log_milli + "</td><td style='width:60%;word-wrap:break-word;'>" + filteredLogs[i].log_data + "</td></tr>");
  }
  logWindow.document.write("</table>")
  logWindow.document.write("</body></html>");

};

Debug.prototype.writeLog = function(data, classification) {
    var self = this;

    //convert data
    if (typeof(data) == "object") {
        var logData = $.toJSON(data);
    } else {
        var logData = data;
    }
    //add to array
    var now = new Date();

		if (classification === undefined || classification === null){
			classification = debugLogEntryType.None;
		}

		if (self._writeLogTime === null) {
			self._writeLogTime = now;
		}

		var seconds = parseInt((now - self._writeLogTime)/1000);

    self._log.push({
        "log_date": now,
        "log_milli": seconds,
        "log_data": logData,
				"classification": classification,
				"local_date": now.toLocaleString() //v2.4
    });

		self._writeLogTime = now;
};

(function loadDebug(currentWindow){
      var debugInstance = new Debug();
      currentWindow.debug = debugInstance;
})(window);
