import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37818946-33cd2e224c2745fff2bf03505';
const PARAM =
  'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';
// Прийом данних з бекенду
export class FetchImagesService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`
      );
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
