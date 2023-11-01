export const dataTypeTest = (value) => {
    if (typeof value === "string") {
        console.log("The value is a string.");
      } else if (typeof value === "number") {
        console.log("The value is a number.");
      } else if (typeof value === "boolean") {
        console.log("The value is a boolean.");
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          console.log("The value is an array.");
        } else {
          console.log("The value is an object.");
        }
      } else if (typeof value === "function") {
        console.log("The value is a function.");
      } else if (typeof value === "undefined") {
        console.log("The value is undefined.");
      } else if (typeof value === "null") {
        console.log("The value is null.");
      } else if (typeof value === "symbol") {
        console.log("The value is a symbol.");
      } else {
        console.log("The value has an unrecognized type.");
      }
};

