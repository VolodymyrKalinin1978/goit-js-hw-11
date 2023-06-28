import axios from 'axios';

// Прийом данних з бекенду
export class FetchImagesService {
  #BASE_URL = 'https://pixabay.com/api';
  #API_KEY = '26715029-67e5620fa98d677e725f7569f';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const response = await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.searchQuery,
        page: this.page,
        per_page: 40,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
      },
    });
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
