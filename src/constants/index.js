const HelperFunctions = require("../helper");

exports.TYPEERROR = "error";
exports.TYPEFAILURE = "failure";
exports.TYPESUCCESS = "success";

exports.REQUIREDFIELDSMESSAGE = "Required fields are missing";

exports.INVALIDPOSTEDVALUES = "Invalid values posted";

exports.USERNAMEMINLENGTH = "6";
exports.USERNAMEMAXLENGTH = "12";
exports.USERNAMEREGEX = /^(?=.{6,12})([a-zA-Z0-9@#_-])+$/i;
exports.USERNAMEMESSAGE =
  "Username can only be a combination of lowercase alphabets, uppercase alphabets, digits and symbols(@, #, -, _)";

exports.PASSWORDMINLENGTH = "6";
exports.PASSWORDMAXLENGTH = "50";
exports.PASSWORDREGEX =
  /^.*(?=.{6,50})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).*$/;
exports.PASSWORDMESSAGE =
  "Password must be a combination of lowercase alphabets, uppercase alphabets, digits and symbols";