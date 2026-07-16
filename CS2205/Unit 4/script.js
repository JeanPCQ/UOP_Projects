// Get HTML elements
const temperatureInput = document.getElementById('temperature');
const conversionType = document.getElementById('conversion-type');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('resultDisplay');
const errorMessage = document.getElementById('errorMessage');

// Add event listener to button
convertBtn.addEventListener('click', convertTemperature);

// Add Enter key support
temperatureInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});

// Main conversion function
function convertTemperature() {
    // Get user input
    const temperature = temperatureInput.value.trim();
    const conversion = conversionType.value;
    
    // Clear previous error messages
    errorMessage.classList.remove('show');
    errorMessage.innerHTML = '';
    
    // Validate input
    if (!validateInput(temperature)) {
        displayError('Please enter a valid number');
        return;
    }
    
    // Convert temperature to number
    const temp = parseFloat(temperature);
    let converted;
    let unit1, unit2;
    
    // Control structure to determine conversion type
    if (conversion === 'celsius') {
        converted = celsiusToFahrenheit(temp);
        unit1 = '°C';
        unit2 = '°F';
    } else if (conversion === 'fahrenheit') {
        converted = fahrenheitToCelsius(temp);
        unit1 = '°F';
        unit2 = '°C';
    }
    
    // Display result
    displayResult(temp, unit1, converted, unit2);
}

// Conversion function: Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Conversion function: Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Input validation function
function validateInput(input) {
    // Check if input is empty
    if (input === '') {
        return false;
    }
    
    // Check if input is a valid number
    if (isNaN(input)) {
        return false;
    }
    
    // Check if input is a valid number format
    if (!input.match(/^-?\d+(\.\d+)?$/)) {
        return false;
    }
    
    return true;
}

// Display error message
function displayError(message) {
    errorMessage.innerHTML = message;
    errorMessage.classList.add('show');
    resultDisplay.innerHTML = '<p>Please fix the error above</p>';
}

// Display result
function displayResult(originalTemp, originalUnit, convertedTemp, convertedUnit) {
    // Round to 2 decimal places
    const roundedConverted = convertedTemp.toFixed(2);
    
    resultDisplay.innerHTML = `
        <p><strong>Original Temperature:</strong> ${originalTemp}${originalUnit}</p>
        <p><strong>Converted Temperature:</strong> ${roundedConverted}${convertedUnit}</p>
    `;
}