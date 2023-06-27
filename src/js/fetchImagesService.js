import axios from 'axios';

// Прийом данних з бекенду
export class FetchImagesService {
  #BASE_URL = 'https://pixabay.com/api';
  #API_KEY = '37818946-33cd2e224c2745fff2bf03505';

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
