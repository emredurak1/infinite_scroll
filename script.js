'use strict';

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageList = [];
let initialLoad = true;
let count = 5;

const createImages = async function () {
  const apiKey = 'ldL-3wZpLRvV70Vz4bafJcUnllQ4Xvu6PCnBnt6uDeQ';
  let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    imageList.push(...data);
    renderImages();
    if (initialLoad) {
      updateAPIURL(30);
      initialLoad = false;
    }
  } catch (err) {
    console.error(err);
  }
};

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

const renderImages = function () {
  imagesLoaded = 0;
  totalImages = imageList.length;
  imageList.forEach(img => {
    const markup = `
      <a href="${img.links.html}" target="_blank">
        <img src="${img.urls.regular}" alt="${img.alt_description}" title="${img.alt_description}">
      </a>
    `;
    const imageElement = document.createElement('div');
    imageElement.innerHTML = markup;
    imageContainer.appendChild(imageElement);

    const image = imageElement.querySelector('img');
    image.addEventListener('load', imageLoaded);
  });
};

const updateAPIURL = picCount =>
  (apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`);

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    createImages();
  }
});

createImages();
