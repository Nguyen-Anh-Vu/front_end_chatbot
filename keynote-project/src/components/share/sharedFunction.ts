import collectionAPI from '../../API/collectionAPI';

// Password must have minimum 8 characters, maximum 20, including 1 uppercase, 1 lowercase, 1 number, 1 special character and no space between
export function validatePassword(password: string) {
	// Check if the password meets the length requirement
	if (password.length < 8 || password.length > 20) {
		return false;
	}

	// Check if the password contains at least one uppercase letter, one lowercase letter, one number, and one special character
	var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/;
	if (!regex.test(password)) {
		return false;
	}

	// Check if the password contains any spaces
	if (password.indexOf(' ') !== -1) {
		return false;
	}

	// All validation checks passed, password is valid
	return true;
}

export function validateEmail(email: string) {
	console.log('email in validateEmail: ', email);

	// Email validation regular expression pattern
	var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	// Test the email against the regular expression pattern
	return regex.test(email);
}
export function validateUsername(username:string){

	var regex = /^[a-zA-Z0-9_]{3,16}$/;
	
	// Test the email against the regular expression pattern
	return regex.test(username);
}

export function validatePhone(phone: string) {
	var numericPhone = phone.replace(/\D/g, '');

	if (numericPhone.length >= 7 && numericPhone.length <= 15) {
		var firstDigit = numericPhone.charAt(0);
		var allDigitsSame = numericPhone.slice(1).split('').every(digit => digit === numericPhone.charAt(1));
		var containsSpace = phone.includes(' ');
		var containsNonDigit = /\D/.test(numericPhone);

		if (!allDigitsSame && !containsSpace && !containsNonDigit) {
		return true;
		}
	}

	return false;
}

export function validateFullName(fullName:string) {

	// Check if the full name meets the minimum character length requirement
	if (fullName.length >= 5 && fullName !== "") {
	  return true; // Valid full name
	} else {
	  return false; // Invalid full name
	}
}

export const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms)); // HÀM NÀY CỰC QUAN TRỌNG, NÓ CÓ NHIỆM VỤ YÊU CẦU CHƯƠNG TRÌNH ĐỢI t GI Y TRƯỚC KHI CHO ĐI TIẾP
