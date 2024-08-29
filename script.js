//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get a particular cookie's value
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply the saved preferences
function applyPreferences() {
  const fontsize = getCookie('fontsize');
  const fontcolor = getCookie('fontcolor');

  if (fontsize) {
    document.documentElement.style.setProperty('--fontsize', fontsize + 'px');
    document.getElementById('fontsize').value = fontsize;
  }

  if (fontcolor) {
    document.documentElement.style.setProperty('--fontcolor', fontcolor);
    document.getElementById('fontcolor').value = fontcolor;
  }
}

// Save preferences when submit is clicked
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  // Apply any saved preferences when the user revisits the page
  applyPreferences();

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const fontsize = document.getElementById('fontsize').value;
    const fontcolor = document.getElementById('fontcolor').value;

    // Save preferences to cookies
    setCookie('fontsize', fontsize, 30); // Save for 30 days, for example
    setCookie('fontcolor', fontcolor, 30);

    // Apply preferences
    applyPreferences();
  });
});

// Call applyPreferences on load to ensure any saved preferences are applied
applyPreferences();