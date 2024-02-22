const fs = require("fs");
const handlebars = require("handlebars");
// const SibApiV3Sdk = require("sib-api-v3-sdk");
const moment = require("moment/moment");
const path = require("path");
const constants = require("../constants");

class HelperFunctions {
  static lowerCaseLetters = "abcdefghjkmnpqrstuvwxyz";
  static upperCaseLetters = "ABCDEFGHJKMNPQRSTUVWXYZ";
  static digits = "123456789";
  static symbols = "!@$%^*()-_+=~`[]{}|:;<>,.?/";

  /**
   * Generates a new array with unique items based on a key.
   *
   * @param {Array} arr - The original array.
   * @param {string} key - The key to determine uniqueness.
   * @return {Array} - The new array with unique items.
   */
  static getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  /**
   * Returns a new array with unique elements from the input array.
   *
   * @param {Array} arr - The input array.
   * @return {Array} - A new array with unique elements.
   */
  static getUniqueList(arr) {
    return [...new Set(arr)];
  }

  /**
   * Returns a unique list of values from an array based on a specified key.
   *
   * @param {Array} arr - The input array.
   * @param {string} key - The key used to extract values from each item in the array.
   * @return {Array} - A new array containing the unique values extracted from the input array.
   */
  static getUniqueListByKey(arr, key) {
    return [...new Set(arr.map((item) => item[key]))];
  }

  /**
   * Validates a path variable.
   *
   * @param {any} value - The value to validate.
   * @return {boolean} Returns true if the value is a valid path variable, false otherwise.
   */
  static validatePathVariable(key, value) {
    if (value === undefined || value === null || value === "") {
      return false;
    }

    const regexStartsWith = /^:/;
    if (regexStartsWith.test(value)) {
      return false;
    }

    // const regexMustBeDigit = /^\d+$/;
    // if (!regexMustBeDigit.test(value)) {
    //   return false;
    // }
    // return true;

    if (key == "id") {
      const regexMustBeDigit = /^\d+$/;
      if (!regexMustBeDigit.test(value)) {
        // if uuid
        const regexMustBeUuid =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        if (!regexMustBeUuid.test(value)) {
          return false;
        }
      }
    } else {
      const regexMustBeDigit = /^[\w-]+$/;
      if (!regexMustBeDigit.test(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generates an HTML email using a given template and data.
   *
   * @param {string} templateName - The name of the template to use.
   * @param {object} data - The data to pass to the template.
   * @return {string} The rendered HTML email.
   */
  static generateHtmlEmail(templateName, data) {
    const template = fs.readFileSync(
      `src/email_templates/${templateName}.html`,
      "utf8"
    );
    const compiledTemplate = handlebars.compile(template);
    const renderedHtml = compiledTemplate(data);
    return renderedHtml;
  }

  /**
   * Generates a random password of a given length.
   *
   * @param {number} [length=8] - The desired length of the password.
   * @return {string} The randomly generated password.
   */
  static generateRandomPassword(length = 8) {
    // Initialize the password string
    let password = "";

    // Add one random lowercase letter
    password += HelperFunctions.generateRandomString(
      HelperFunctions.lowerCaseLetters
    );
    // Add one random uppercase letter
    password += HelperFunctions.generateRandomString(
      HelperFunctions.upperCaseLetters
    );
    // Add one random digit
    password += HelperFunctions.generateRandomString(HelperFunctions.digits);
    // Add one random symbol
    password += HelperFunctions.generateRandomString(HelperFunctions.symbols);

    // Add remaining characters to reach the desired length
    for (let i = 0; i < length - 4; i++) {
      // Combine all character sets into one string
      const allCharacters =
        HelperFunctions.lowercaseLetters +
        HelperFunctions.uppercaseLetters +
        HelperFunctions.digits +
        HelperFunctions.symbols;
      // Add one random character from the combined set
      password += HelperFunctions.generateRandomString(allCharacters);
    }

    // Shuffle the characters in the password string
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    // Return the generated password
    return password;
  }

  // static async sendEmail(templateName, subject, to, email_data) {
  //   SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  //     process.env.EMAIL_API_KEY;
  //   const html = HelperFunctions.generateHtmlEmail(templateName, email_data);

  //   await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
  //     subject: subject,
  //     sender: { email: "admin@admin.com", name: "Admin" },
  //     to: [{ email: to.toString() }],
  //     htmlContent: html,
  //   });
  // }

  /**
   * validate the input data string
   * has a valid JSON string return true, else return true
   * @param {*} string is a json string
   */
  static isJsonString(string) {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * random string generator
   * produced a random string of certain length & characters
   * @param {*} charSet(optional) characters of random string, else default characters
   * @param {*} len is a length of output string, default is 1
   */
  static generateRandomString(charSet, length = 1) {
    let result = "";
    const characters =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Returns the ordinal suffix of a given number.
   *
   * @param {number} number - The number to get the ordinal suffix of.
   * @return {string} The ordinal suffix of the given number.
   */
  static getOrdinalSuffixOfNumber(number) {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) {
      return number + "st";
    }
    if (j === 2 && k !== 12) {
      return number + "nd";
    }
    if (j === 3 && k !== 13) {
      return number + "rd";
    }
    return number + "th";
  }

  /**
   * Generates a response wrapper for the given request and res objects.
   *
   * @param {object} res - the res object
   * @param {number} status - the status code
   * @param {object} [data={}] - the response data
   * @param {string} message - the response message
   * @param {Error} [linenumber=null] - the line number error
   * @param {number} [explict_count=null] - the explicit count
   * @return {void}
   */
  static responseWrapper(
    res,
    status,
    data = {},
    message,
    linenumber = null,
    explict_count = null
  ) {
    // Check if the status code is not 200 or 201
    if (status != 200 || status != 201) {
      // Check if linenumber is an instance of Error
      if (linenumber instanceof Error) {
        try {
          // Extract the line number from the error stack trace
          linenumber = linenumber.stack.match(/js:\d+:\d+/g)[0].split(":")[1];
        } catch (error) {
          // Set the line number to "0" if extraction fails
          linenumber = "0";
        }
      } else {
        // Set the line number to "0" if it is undefined or null
        if (linenumber === undefined || linenumber === null) {
          linenumber = "0";
        }
      }
    }

    const response = {
      message: "",
      code: status,
      status: false,
      messagetype: "",
    };

    switch (status) {
      case 200:
      case 201:
        response.data = data;
        // Check if explict_count is null
        explict_count === null
          ? data && Array.isArray(data) && data.length > 0
            ? (response.count = data.length)
            : null
          : (response.count = explict_count);
        response.status = true;
        response.messagetype = constants.TYPE_SUCCESS;
        response.message = message
          ? message
          : constants.DEFAULT_SUCCESS_MESSAGE;

        res.status(status).send(response);
        break;
      case 422:
      case 500:
      case 408:
      case 401:
      case 404:
      case 400:
        response.message = data;
        response.messagetype = constants.TYPE_ERROR;
        response.error = constants.DEFAULT_ERROR_MESSAGE;
        res.status(status).send(response);
        break;
      default:
        response.message = data;
        response.messagetype = constants.TYPE_ERROR;
        response.error = constants.DEFAULT_ERROR_MESSAGE;
        res.status(500).send(response);
        break;
    }
  }

  /**
   * Converts a string to sentence case.
   *
   * @param {string} string - The string to be converted.
   * @return {string} The converted string in sentence case.
   */
  static toSentenceCase(string) {
    // Split the string into an array of words
    const words = string.split(" ");

    // Iterate over each word in the array
    const convertedWords = words.map((word) => {
      // If the whole word is uppercase
      if (/^[A-Z]+$/.test(word)) {
        // Return the word as is
        return word;
      } else {
        // Capitalize the first letter of the word and return it
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });

    // Join the converted words back into a string separated by spaces
    const convertedString = convertedWords.join(" ");

    // Return the converted string
    return convertedString;
  }

  /**
   * Uploads a file.
   *
   * @param {Object} requestObject - The request object.
   * @param {string} fieldNameInRequest - The name of the field in the request.
   * @param {string} directoryToSaveFile - The directory to save the file.
   * @return {Object} The modified request object if the file was uploaded successfully, otherwise null.
   */
  async uploadFile(requestObject, fieldNameInRequest, directoryToSaveFile) {
    try {
      // Check if any of the required parameters are missing
      if (!requestObject || !fieldNameInRequest || !directoryToSaveFile) {
        return null;
      }

      // Extract the 'fields' property from the 'requestObject.file()' method
      const { fields } = await requestObject.file();

      // Check if the field with the given name exists in the 'fields' object
      if (fields) {
        if (fieldNameInRequest in fields) {
          // Generate a timestamp and file extension
          const timestamp = moment.unix();
          const ext = path.extname(fields[fieldNameInRequest].filename);

          // Generate a random string of characters
          const randomCharacters = HelperFunctions.generateRandomString(
            HelperFunctions.lowerCaseLetters,
            10
          );

          // Construct the filename using the random characters, timestamp, and file extension
          const filename = `${randomCharacters}-${timestamp}${ext}`;

          let filePath = null;

          try {
            // Construct the file path by joining the directory path and filename
            filePath = path.join(directoryToSaveFile, filename);

            // Write the file to the specified file path
            await pump(
              fields[fieldNameInRequest].file,
              fs.createWriteStream(`./${filePath}`)
            );
          } catch (error) {
            // If an error occurs, return null
            filePath = null;
          }

          // Update the requestObject's body with the file path
          requestObject.body[fieldNameInRequest] = filePath;
        }

        // Update the requestObject's body with the values from the 'fields' object
        Object.keys(fields).forEach((key) => {
          requestObject.body[key] =
            "value" in fields[key] ? fields[key].value : null;
        });

        // Return the modified requestObject
        return requestObject;
      } else {
        // If the field does not exist in the 'fields' object, return null
        return null;
      }
    } catch (error) {
      // If an error occurs, return null
      return null;
    }
  }

  static async toTitleCase(str) {
    const words = str.toLowerCase().split(" ");

    // Capitalize the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);

    // Apply title case logic to the rest of the words
    for (let i = 1; i < words.length; i++) {
      // Check if the word is already capitalized
      if (/^[A-Z]+$/.test(words[i])) {
        continue;
      } else {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
      }
    }

    return words.join(" ");
  }
}
module.exports = HelperFunctions;
