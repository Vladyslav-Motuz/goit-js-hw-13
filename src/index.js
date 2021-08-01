import './sass/main.scss';

import { Notify } from 'notiflix';

import API from './js/fetchImages';
import galleryItem from './templates/galleryItem.hbs';

const formEL = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

let page = 1;
let data = '';
loadButton.style.visibility = 'hidden';

function addImages(data, page) {
    API.fetchImages(data, page).then(images => {
        if (images.totalHits === 0) {
            loadButton.style.visibility = 'hidden';
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else if (images.hits.length === 0) {
            loadButton.style.visibility = 'hidden';
            Notify.failure("We're sorry, but you've reached the end of search results.");
        } else {
            loadButton.style.visibility = 'visible';
        }
        const markup = galleryItem(images.hits);
        galleryList.insertAdjacentHTML('beforeend', markup);
    })
};

function onSearchImage(event) {
    event.preventDefault();
    galleryList.innerHTML = '';
    page = 1;
    loadButton.style.visibility = 'hidden';

    data = formEL.elements.searchQuery.value;
    addImages(data, page);
};

function onClickLoadmore(event) {
    page += 1;
    addImages(data, page);
};

formEL.addEventListener('submit', onSearchImage);
loadButton.addEventListener('click', onClickLoadmore);