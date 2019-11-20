//Tiffany Wong and Andrew Rubesa psuedo-code for project 4.

//QR code generator app.

//1. Document ready
//2. Set up namespace qrApp:
const qrApp = {};
//3. Init to start the function
//4. Pull user data from form with following parameters:
//a) User's portfolio URL.
//b) Buttons for user to select what format they want their qr code generated as (JPEG, PNG, SVG).
//5. Make AJAX request to goqr.me to endpoint: https://api.qrserver.com/v1/create-qr-code/?data=
//6. Generate the users qr code to the page based on users parameters.
