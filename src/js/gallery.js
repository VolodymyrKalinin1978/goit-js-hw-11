import { FetchImagesService } from './fetchImagesService';
import { refs } from './getRefs';
import { LoadMoreBtn } from './load-more-btn';
import { makeImageMarkup } from './markupService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const fetchImagesService = new FetchImagesService();
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  const currentWord = e.currentTarget.elements.searchQuery.value.trim();
  if (currentWord === '') {
    return Notify.info(`Enter a word to search for images.`);
  }
  
  fetchImagesService.searchQuery = currentWord;
  // loadMoreBtn.show();
  fetchImagesService.resetPage();
  clearImageContainer();
  fetchImages();
}

function clearImageContainer() {
  refs.containerDiv.innerHTML = '';
}

async function fetchImages() {
  loadMoreBtn.disabled();
  try {
    const response = await fetchImagesService.fetchImages();
    const { data } = response;

    if (data.total === 0) {
      Notify.failure(
        `Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`
      );
      loadMoreBtn.hide();
      return;
    }

    const { totalHits } = data;
    if (refs.containerDiv.children.length < 40) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }
     loadMoreBtn.show();
    appendImagesMarkup(data);
    onPageScrolling();
    lightbox.refresh();

    if (refs.containerDiv.children.length >= totalHits && fetchImagesService.page > 2) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      loadMoreBtn.hide();
    } 
    if ( totalHits <= 40) {
      loadMoreBtn.hide();
    }
    loadMoreBtn.enable();
  } catch (error) {
    console.log('Error!');
  }
}

function appendImagesMarkup(data) {
  refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}

function onPageScrolling() {
  const { height: cardHeight } =
    refs.containerDiv.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
