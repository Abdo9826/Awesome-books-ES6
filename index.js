import Books from './Bookstore.js';

const title = document.querySelector('.title-input');
const author = document.querySelector('.author-input');
const awesomeBooks = document.getElementById('awesome-books');
const newBookDiv = document.querySelector('.new-books');

const library = new Books(JSON.parse(localStorage.getItem('books'))) || [];

const createUI = ({ title, author }) => {
  const bookContainer = document.createElement('div');
  bookContainer.setAttribute('class', 'collection');
  bookContainer.innerHTML = `<p>${title} by ${author}</p>
  <p class="hidden">${title}</p>
  <p class="hidden">${author}</p>
    <button id="remove-btn" type="submit">Remove</button>`;
  newBookDiv.append(bookContainer);
};

library.books.forEach((element) => createUI(element));

awesomeBooks.onsubmit = (event) => {
  event.preventDefault();
  newBookDiv.innerHTML = '';
  library.addBooks(title.value, author.value);
  library.books.forEach((item) => createUI(item));
  localStorage.setItem('books', JSON.stringify(library.books));
  title.value = '';
  author.value = '';
};

document.body.addEventListener('click', (event) => {
  if (event.target.id.includes('remove-btn')) {
    const parentDiv = event.target.parentNode;
    const btn = event.target;
    const removebtns = document.querySelectorAll('#remove-btn');
    const indexarr = [...removebtns].indexOf(btn);
    library.removeBooks(indexarr);
    newBookDiv.removeChild(parentDiv);
    localStorage.setItem('books', JSON.stringify(library.books));
  }
});

const contact = document.querySelector('.contact');
const list = document.getElementById('top-books');
const addNew = document.querySelector('.add-new');
const navList = document.querySelectorAll('.nav-list-item');

for (let i = 0; i < navList.length; i += 1) {
  navList[i].addEventListener('click', (event) => {
    if (event.target.innerText === 'List') {
      list.classList.remove('hidden');
      contact.classList.add('hidden');
      addNew.classList.add('hidden');
    } else if (event.target.innerText === 'Add new') {
      list.classList.add('hidden');
      contact.classList.add('hidden');
      addNew.classList.remove('hidden');
    } else if (event.target.innerText === 'Contact') {
      list.classList.add('hidden');
      contact.classList.remove('hidden');
      addNew.classList.add('hidden');
    }
  });
}

const { luxon } = window;
function displayDate() {
  const Time = luxon.DateTime.now();
  const localTime = Time.toLocaleString(luxon.DateTime.DATETIME_MED);
  document.querySelector('.date-display').innerHTML = localTime;
}

displayDate();

setInterval(displayDate, 1000);
