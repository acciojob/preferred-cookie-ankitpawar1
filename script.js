//your JS code here. If required.
// Function to set a cookie

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

// Function to get a cookie value
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to apply preferences
function applyPreferences() {
    const fontSize = getCookie('fontSize');
    const fontColor = getCookie('fontColor');

    if (fontSize) {
        document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
        document.getElementById('fontsize').value = fontSize;
    }

    if (fontColor) {
        document.documentElement.style.setProperty('--fontcolor', fontColor);
        document.getElementById('fontcolor').value = fontColor;
    }
}

// Apply preferences when the page loads
window.onload = applyPreferences;

// Handle form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    // Save preferences as cookies
    setCookie('fontSize', fontSize, 30);
    setCookie('fontColor', fontColor, 30);

    // Apply preferences immediately
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.documentElement.style.setProperty('--fontcolor', fontColor);

    alert('Preferences saved!');
});