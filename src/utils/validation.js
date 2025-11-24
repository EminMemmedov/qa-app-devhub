// Luhn Algorithm for credit card validation
export function validateLuhn(cardNumber) {
    // Remove spaces and non-digits
    const digits = cardNumber.replace(/\D/g, '');

    // Card must be at least 13 digits
    if (digits.length < 13) return false;

    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

// Validate postal code (Azerbaijan format: AZ1234)
export function validatePostalCode(code) {
    const azPattern = /^AZ\d{4}$/i;
    return azPattern.test(code);
}

// Validate city name (no numbers, min 2 chars)
export function validateCity(city) {
    if (!city || city.length < 2) return false;
    return !/\d/.test(city);
}

// Check for XSS patterns
export function containsXSS(text) {
    const xssPatterns = [
        /<script/i,
        /<\/script/i,
        /javascript:/i,
        /onerror=/i,
        /onclick=/i,
        /<iframe/i
    ];

    return xssPatterns.some(pattern => pattern.test(text));
}

// Validate address fields
export function validateAddress(address) {
    const errors = {};

    if (!address.street || address.street.trim().length < 5) {
        errors.street = 'Küçə ünvanı ən azı 5 simvol olmalıdır';
    }

    if (containsXSS(address.street)) {
        errors.street = 'Ünvanda icazəsiz simvollar var';
    }

    if (!validateCity(address.city)) {
        errors.city = 'Şəhər adı düzgün deyil';
    }

    if (!validatePostalCode(address.postalCode)) {
        errors.postalCode = 'Poçt kodu formatı: AZ1234';
    }

    if (!address.country || address.country.trim().length === 0) {
        errors.country = 'Ölkə seçilməlidir';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
