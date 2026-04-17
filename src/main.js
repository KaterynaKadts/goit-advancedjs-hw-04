import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = "";
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  if (searchQuery === "") {
    iziToast.error({ message: "Please enter a search query!" });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (data.hits.length === 0) {
      iziToast.warning({ message: "No images found!" });
      return;
    }

    createGallery(data.hits);
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Error fetching images!" });
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);
    
    // Плавная прокрутка
    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Error loading more images!" });
  } finally {
    hideLoader();
  }
}