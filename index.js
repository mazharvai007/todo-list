const selectForm = document.querySelector('form.todoForm');
const selectItem = document.querySelector('ul.listItems');

loadListeres();

function loadListeres() {
	// Get items from local store
	document.addEventListener('DOMContentLoaded', getListFromLocalStorage);

	selectItem.addEventListener('click', handleItemClick);

	selectForm.addEventListener('submit', handleSubmit);
}

/**
 * Get List from local storage
 */
function getListFromLocalStorage() {
	let lists;

	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}

	lists.forEach((list) => {
		const addNewItem = document.createElement('li');
		addNewItem.textContent = list;
		addNewItem.insertAdjacentElement('afterbegin', removeButton());
		return selectItem.appendChild(addNewItem);
	});
}

/**
 * TO DO items store in local storage
 * @param {*} item
 */
function storeListInLocalStorage(item) {
	let lists;

	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}

	lists.unshift(item);
	localStorage.setItem('lists', JSON.stringify(lists));
}

/**
 * Handle single item
 * @param {*} e
 */

function handleItemClick(e) {
	if (e.target.tagName === 'LI') {
		if (e.target.classList.contains('done')) {
			e.target.classList.remove('remove');
		} else {
			e.target.classList.add('done');
		}
	}

	if (e.target.parentNode.classList.contains('remove')) {
		if (confirm('Are you sure?')) {
			e.target.parentNode.parentNode.remove();
			removeListFromLocalStorage(e.target.parentNode.parentNode);
		}
	}
}

/**
 * Handle input item and store to locastorage
 * after input get empty field
 * @param {*} e
 */

function handleSubmit(e) {
	e.preventDefault();

	const input = e.target.name.value; // get input field value

	if (validateInput(input, e.target.name)) {
		// Add items to list
		selectItem.insertAdjacentElement(
			'afterbegin',
			newItem(e.target.name.value)
		);
		storeListInLocalStorage(input); // store item in local storage
		e.target.name.value = ''; // empty field after putting contnet
	}
}

/**
 * form validation
 * @param {*} input
 * @param {*} element
 * @returns
 */

function validateInput(input, element) {
	if (input) {
		element.parentNode.classList.remove('error'); // remove error class
		return true;
	} else {
		element.parentNode.classList.add('error'); // add error class
		return false;
	}
}

/**
 * add new item
 * @param {*} content : ;
 * @returns
 */
function newItem(content) {
	const addNewItem = document.createElement('li'); // create new item
	addNewItem.textContent = content; // input content
	addNewItem.insertAdjacentElement('afterbegin', removeButton()); // add item one after one
	return addNewItem;
}

/**
 * handle remove icon
 * @returns
 */
function removeButton() {
	const createRemoveBtn = document.createElement('span'); // Make remove btn
	createRemoveBtn.classList.add('remove'); // add class

	const deletebtn = document.createElement('img');
	deletebtn.setAttribute('src', './delete.png');
	deletebtn.style.width = '20px';
	deletebtn.style.height = '20px';
	createRemoveBtn.appendChild(deletebtn); // add content: ;

	return createRemoveBtn;
}

/**
 * Remove item from local storage
 * @param {*} listItem
 */

function removeListFromLocalStorage(listItem) {
	let lists;

	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}

	lists.forEach((list, index) => {
		if (listItem.textContent === list) {
			lists.splice(index, 1);
		}

		localStorage.setItem('lists', JSON.stringify(lists));
	});
}
