'use strict';

/**
 * options:
 * shouldExcludeValue(key, value)
 * keyParser(key)
 * valueParser(val)
 */

function objectParser(obj, options) {
    return this.parseObj(obj, null, options);
}

function parseObj(obj, keyName, options) {
    if (Array.isArray(obj)) {
      let content = "";
      for (let i = 0; i < obj.length; i++) {
        let parsedData = this.parseObj(obj[i], i, options);
        if (parsedData) {
          content += "<li class='obj-li'>" + parsedData + "</li>";
        }
      }
      if (content)
        return "<ol class='obj-ul'>" + content + "</ol>"
    }
    else if (typeof(obj) == "object") {
      let content = "";
      for (let key in obj) {
        let parsedData = this.parseObj(obj[key], key, options);
        if (parsedData) {
          content += this.formatObjToHtml(key, obj[key], parsedData, options);
        }
      }
      return content;
    }
    else {
      if (!keyName || (options && options.shouldExcludeValue && options.shouldExcludeValue(keyName, obj)))
        return "";

      //let objKey = Number.isNaN(Number(keyName)) ? keyName : "Result " + keyName;
      let keyToDisplay = options && options.keyParser ? options.keyParser(keyName) : keyName;
      let valueToDisplay = options && options.keyParser ? options.valueParser(obj) : obj;
      return "<div class='obj-key-value'><span class='obj-str-key'>" + keyToDisplay + ": </span><span class='obj-str-value'>" + valueToDisplay + "</span></div>";
    }
  }

  function formatObjToHtml(key, val, innerData, options) {
    if (typeof(val) != "object")
      return  "<div class='obj-value'>" + innerData + "</div>";
    else {
        let keyToDisplay = options && options.keyParser ? options.keyParser(key) : key;
        return "<div class='obj-key-value-indent'><div class='obj-key'>" + keyToDisplay + ": </div><div class='obj-value'>" + innerData + "</div></div>";
    }
  }

module.exports = {
    objectParser: objectParser
};