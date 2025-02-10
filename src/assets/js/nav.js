// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}
document.getElementById('cs-form').addEventListener('submit', async function (event) {
	event.preventDefault(); // Prevent form from submitting the traditional way
	console.log('this', this, event)
	// Collect form data
	const formData = new FormData(this);
	const messageBox = document.getElementById('responseMessage');
	console.log('formData', formData)
	const formValues = {};
	formData.forEach((value, key) => {
		formValues[key] = value;
	});
	console.log('Form Values:', formValues); // Log all input values
	const contactUsEndpoint = 'http://localhost/dims/contact-us.php';
	// Send form data to the server using fetch
	try {
		const response = await fetch(contactUsEndpoint, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues) 
		});
 
		const result = await response.json(); // Parse the response
		messageBox.style.display = 'block';
		messageBox.textContent = result.message;
	} catch (error) {
		messageBox.style.display = 'block';
		messageBox.textContent = 'An error occurred. Please try again';
		console.error('Error:', error);
	}
 });