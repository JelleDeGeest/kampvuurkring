// A simple script to capture browser console output
const url = 'http://localhost:3000/admin/collections/activiteiten/2';

console.log('Attempting to fetch page content...');

fetch(url)
  .then(response => response.text())
  .then(html => {
    if (html.includes('EnrollmentResponsesLink')) {
      console.log('✓ EnrollmentResponsesLink found in HTML');
    } else {
      console.log('✗ EnrollmentResponsesLink NOT found in HTML');
    }
    
    if (html.includes('Bekijk Inschrijvingen')) {
      console.log('✓ Button text found in HTML');
    } else {
      console.log('✗ Button text NOT found in HTML');
    }
    
    if (html.includes('Component loaded:')) {
      console.log('✓ Debug text found in HTML');
    } else {
      console.log('✗ Debug text NOT found in HTML');
    }
  })
  .catch(err => console.error('Error:', err));