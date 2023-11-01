if (typeof (PdfPrinter) == "undefined") PdfPrinter = {};
if (typeof (PdfPrinter.config) == "undefined") PdfPrinter.config = {};

/******************************************************************************************
INTERNATIONALIZATION TEXT
******************************************************************************************/
PdfPrinter.config.loadingText = "Loading Master JavaScript Resources";


/******************************************************************************************
END CONFIGURATION OPTIONS
******************************************************************************************/


//PdfPrinterPdfPrinterComponent
PdfPrinter.summary = function () { };
PdfPrinter.summary.prototype = new MPage.Component();
PdfPrinter.summary.prototype.constructor = MPage.Component;
PdfPrinter.summary.prototype.base = MPage.Component.prototype;
PdfPrinter.summary.prototype.componentMinimumSpecVersion = 1.0;
PdfPrinter.summary.prototype.rootPath = "I:\\WININTEL\\static_content\\custom_mpage_content\\custom-components\\js\\jtestccl\\";
PdfPrinter.summary.prototype.init = function () {
    //define data request
};
PdfPrinter.summary.prototype.isFullpage = false;

PdfPrinter.summary.prototype.loadDependencies = function (callback, rootPath) {
    var self = this;

    //Load dependencies
    var jsFiles = ["util.js", "config.js", "string.js", "Cerner.js", "ToBePreciseMPageComponent.js", "ToBePreciseComponent.js", "MPageEventManager.js", "ToBePreciseAPI.js", "Integration.js", "timeConverter.js", "moment-with-locales.min.js"];
    for (var i = 0; i < jsFiles.length; i++) {
        jsFiles[i] = rootPath + jsFiles[i];
    }

    var cssFile = rootPath + "style.css";

    PdfPrinter.resourceLoader.css(cssFile, function () {
    });

    PdfPrinter.resourceLoader.js(jsFiles, function () {
        try {
            callback(self, false, "");
        } catch (ex) {
            callback(self, true, ex);
        }
    });
};

PdfPrinter.summary.prototype.render = function () {
    var self = this;

    self.getTarget().innerHTML = '<span title="' + self.rootPath + '">' + PdfPrinter.config.loadingText + '...</span>';

    var loadDependenciesCallback = function (component, isError, exception) {
        if (isError) {
            alert("Error: Cannot load dependencies. \n" + exception.message);
            return;
        }

        try {
            self.getTarget().innerHTML = '<span title="' + self.rootPath + '">' + PdfPrinter.config.loadingText + '...</span>';
            $().ToBePreciseMPageComponent(self);
        } catch (err) {
            var strError = err.message;
            self.getTarget().innerHTML = '<span title="' + self.rootPath + '\n\n' + strError + '">Error calling $().ToBePreciseMPageComponent(self)...</span>';
        }
    };


    self.loadDependencies(loadDependenciesCallback, self.rootPath);
};

/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
//renamed agilemd.resourceLoader (instead of LazyLoad)
PdfPrinter.resourceLoader = (function (doc) {
    var env, head, pending = {}, pollCount = 0, queue = { css: [], js: [] }, styleSheets = doc.styleSheets; function createNode(name, attrs) {
        var node = doc.createElement(name), attr; for (attr in attrs) { if (attrs.hasOwnProperty(attr)) { node.setAttribute(attr, attrs[attr]); } }
        return node;
    }
    function finish(type) { var p = pending[type], callback, urls; if (p) { callback = p.callback; urls = p.urls; urls.shift(); pollCount = 0; if (!urls.length) { callback && callback.call(p.context, p.obj); pending[type] = null; queue[type].length && load(type); } } }
    function getEnv() { var ua = navigator.userAgent; env = { async: doc.createElement('script').async === true }; (env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE|Trident/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true); }
    function load(type, urls, callback, obj, context) {
        var _finish = function () { finish(type); }, isCSS = type === 'css', nodes = [], i, len, node, p, pendingUrls, url; env || getEnv(); if (urls) { urls = typeof urls === 'string' ? [urls] : urls.concat(); if (isCSS || env.async || env.gecko || env.opera) { queue[type].push({ urls: urls, callback: callback, obj: obj, context: context }); } else { for (i = 0, len = urls.length; i < len; ++i) { queue[type].push({ urls: [urls[i]], callback: i === len - 1 ? callback : null, obj: obj, context: context }); } } }
        if (pending[type] || !(p = pending[type] = queue[type].shift())) { return; }
        head || (head = doc.head || doc.getElementsByTagName('head')[0]); pendingUrls = p.urls; for (i = 0, len = pendingUrls.length; i < len; ++i) {
            url = pendingUrls[i]; if (isCSS) { node = env.gecko ? createNode('style') : createNode('link', { href: url, rel: 'stylesheet' }); } else { node = createNode('script', { src: url }); node.async = false; }
            node.className = 'lazyload'; node.setAttribute('charset', 'utf-8'); if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) { node.onreadystatechange = function () { if (/loaded|complete/.test(node.readyState)) { node.onreadystatechange = null; _finish(); } }; } else if (isCSS && (env.gecko || env.webkit)) { if (env.webkit) { p.urls[i] = node.href; pollWebKit(); } else { node.innerHTML = '@import "' + url + '";'; pollGecko(node); } } else { node.onload = node.onerror = _finish; }
            nodes.push(node);
        }
        for (i = 0, len = nodes.length; i < len; ++i) { head.appendChild(nodes[i]); }
    }
    function pollGecko(node) {
        var hasRules; try { hasRules = !!node.sheet.cssRules; } catch (ex) {
            pollCount += 1; if (pollCount < 200) { setTimeout(function () { pollGecko(node); }, 50); } else { hasRules && finish('css'); }
            return;
        }
        finish('css');
    }
    function pollWebKit() {
        var css = pending.css, i; if (css) {
            i = styleSheets.length; while (--i >= 0) { if (styleSheets[i].href === css.urls[0]) { finish('css'); break; } }
            pollCount += 1; if (css) { if (pollCount < 200) { setTimeout(pollWebKit, 50); } else { finish('css'); } }
        }
    }
    return { css: function (urls, callback, obj, context) { load('css', urls, callback, obj, context); }, js: function (urls, callback, obj, context) { load('js', urls, callback, obj, context); } };
})(this.document);