function makeImageMarkup ({ hits }) {
  const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views,comments, downloads } ) => `<div class="photo-card">
  <a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
  <p class="info-item">
         Likes:
      <b>${likes}</b>
  </p>
  <p class="info-item">
         Views: 
      <b>${views}</b>
  </p>
  <p class="info-item">
         Comments:
      <b>${comments}</b>
  </p>
  <p class="info-item">
         Downloads:
      <b>${downloads}</b>
  </p>
  </div></div>`);

  return markup.join('')
}

export { makeImageMarkup };

