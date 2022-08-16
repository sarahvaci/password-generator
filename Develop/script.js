// Array of special characters in password and will contain the following set of special characters.
var specialCharacters = [
	'@',
	'%',
	'+',
	'\\',
	'/',
	"'",
	'!',
	'#',
	'$',
	'^',
	'?',
	':',
	',',
	')',
	'(',
	'}',
	'{',
	']',
	'[',
	'~',
	'-',
	'_',
	'.',
];

// Array of numeric characters in password and will contain the following set of numeric characters.
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters in password and will contain the following set of lowe case characters.
var lowerCasedCharacters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

// Array of uppercase characters in password and will contain the following set of upper case characters.
var upperCasedCharacters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

// Function to prompt user for password choices
function getPasswordOptions() {
	// The user will enter the length of the password into a variable.
	var length = parseInt(
		prompt('How many characters would you like your password to contain?'),
		10
	);

	// Check to see if the length of the password is a number. If this is false, the prompts stop.
	if (Number.isNaN(length)) {
		alert('Password length must be provided as a number');
		return null;
	}

	// Check to see if the length of the password is at least 8 characters. If this is false, the prompts stop.
	if (length < 8) {
		alert('Password length must be at least 8 characters');
		return null;
	}

	// Check to see if the length of the password is less than 128 characters. If this is false, the prompts stop.
	if (length > 128) {
		alert('Password length must less than 129 characters');
		return null;
	}

	// Stores a boolean about whether or not special characters are allowed.
	var hasSpecialCharacters = confirm(
		'Click OK to confirm including special characters.'
	);

	// This variable stores a boolean about whether or not there are numbers.
	var hasNumericCharacters = confirm(
		'Click OK to confirm including numeric characters.'
	);

	// This variable stores a boolean about whether or not lowercase letters are allowed.
	var hasLowerCasedCharacters = confirm(
		'Click OK to confirm including lowercase characters.'
	);

	// This variable stores a boolean about whether or not uppercase letters are allowed.
	var hasUpperCasedCharacters = confirm(
		'Click OK to confirm including uppercase characters.'
	);

	//Conditional statement to see if the user didn't add any characters. If all four variables come back as false, the password generator stops.
	if (
		hasSpecialCharacters === false &&
		hasNumericCharacters === false &&
		hasLowerCasedCharacters === false &&
		hasUpperCasedCharacters === false
	) {
		alert('Must select at least one character type');
		return null;
	}

	// Object to store user input
	var passwordOptions = {
		length: length,
		hasSpecialCharacters: hasSpecialCharacters,
		hasNumericCharacters: hasNumericCharacters,
		hasLowerCasedCharacters: hasLowerCasedCharacters,
		hasUpperCasedCharacters: hasUpperCasedCharacters,
	};

	return passwordOptions;
}

// Function for picking a random item from an array
function getRandom(arr) {
	var randIndex = Math.floor(Math.random() * arr.length);
	var randElement = arr[randIndex];

	return randElement;
}

// Function to generate password with user input
function generatePassword() {
	var options = getPasswordOptions();
	// Variable to store password as it's being concatenated
	var result = [];

	// Array to store types of characters to include in password
	var possibleCharacters = [];

	// Array to contain one of each type of chosen character to ensure each will be used
	var guaranteedCharacters = [];

	// Check if an options object exists, if not exit the function
	if (!options) return null;

	// This statement adds an array of special characters to an array of possible characters.
	// Push new random special character to guaranteedCharacters
	if (options.hasSpecialCharacters) {
		possibleCharacters = possibleCharacters.concat(specialCharacters);
		guaranteedCharacters.push(getRandom(specialCharacters));
	}

	// Conditional statement that, depending on what the user types, adds an array of numeric characters to an array of possible characters.
	// Push new random special character to guaranteedCharacters
	if (options.hasNumericCharacters) {
		possibleCharacters = possibleCharacters.concat(numericCharacters);
		guaranteedCharacters.push(getRandom(numericCharacters));
	}

	// Conditional statement that adds array of lowercase characters into array of possible characters based on user input
	// Push new random lower-cased character to guaranteedCharacters
	if (options.hasLowerCasedCharacters) {
		possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
		guaranteedCharacters.push(getRandom(lowerCasedCharacters));
	}

	// Conditional statement that adds array of uppercase characters into array of possible characters based on user input
	// Push new random upper-cased character to guaranteedCharacters
	if (options.hasUpperCasedCharacters) {
		possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
		guaranteedCharacters.push(getRandom(upperCasedCharacters));
	}

	// For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
	for (var i = 0; i < options.length; i++) {
		var possibleCharacter = getRandom(possibleCharacters);

		result.push(possibleCharacter);
	}

	// Mix in at least one of each guaranteed character in the result
	for (var i = 0; i < guaranteedCharacters.length; i++) {
		result[i] = guaranteedCharacters[i];
	}

	// Transform the result into a string and pass into writePassword
	return result.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector('#password');

	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
