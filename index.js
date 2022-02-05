const selectForm = document.querySelector('form.todoForm');
const selectItem = document.querySelector('ul.listItems');

selectItem.addEventListener('click', handleItemClick);

function handleItemClick(e) {
	if (e.target.tagName === 'LI') {
		if (e.target.classList.contains('done')) {
			e.target.classList.remove('remove');
		} else {
			e.target.classList.add('done');
		}
	}

	if (e.target.parentNode.classList.contains('remove')) {
		e.target.parentNode.parentNode.remove();
	}
}

selectForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
	e.preventDefault();

	const input = e.target.name.value; // get input field value

	if (validateInput(input, e.target.name)) {
		// Add items to list
		selectItem.insertAdjacentElement(
			'afterbegin',
			newItem(e.target.name.value)
		);
		e.target.name.value = ''; // empty field after putting contnet
	}
}

function validateInput(input, element) {
	if (input) {
		element.parentNode.classList.remove('error'); // remove error class
		return true;
	} else {
		element.parentNode.classList.add('error'); // add error class
		return false;
	}
}

function newItem(content) {
	const addNewItem = document.createElement('li'); // create new item
	addNewItem.textContent = content; // input content
	addNewItem.insertAdjacentElement('afterbegin', removeButton()); // add item one after one

	return addNewItem;
}

function removeButton() {
	const createRemoveBtn = document.createElement('span'); // Make remove btn
	createRemoveBtn.classList.add('remove'); // add class
	const deletebtn = document.createElement('img');
	deletebtn.setAttribute('src', './delete.png');
	deletebtn.style.width = '20px';
	deletebtn.style.height = '20px';
	createRemoveBtn.appendChild(deletebtn); // add content: ;
	// createRemoveBtn.textContent = 'x';

	return createRemoveBtn;
}
