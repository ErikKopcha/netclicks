const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = '5c7771dc114092e0d6ec416fd461e631';

let leftMenu = document.querySelector('.left-menu'),
  hamburger = document.querySelector('.hamburger'),
  tvShowsList = document.querySelector('.tv-shows__list'),
  modal = document.querySelector('.modal'),
  wrapperShows = document.querySelector('.tv-shows'),
  cardImg = document.querySelector('.tv-card__img'),
  modalTitle = document.querySelector('.modal__title'),
  genresList = document.querySelector('.genres-list'),
  rating = document.querySelector('.rating'),
  description = document.querySelector('.description'),
  modalLink = document.querySelector('.modal__link');

const preloader = document.createElement('div');
preloader.className = 'loading';


class DBService {
  getData = async (url) => {
    const res = await fetch(url);
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`Не удалось получить данные по адресу ${url}`)
    }
  }

  getTestData = () => {
    return this.getData('test.json');
  }
  
  getTestCard = () => {
    return this.getData('card.json');
  }
  
  // getSearchResult = () => {
  //   return this.getData('search');
  // };
}

const renderCard = response => {
  response.results.forEach(el => {
    const {
      backdrop_path: backdrop,
      name: title,
      poster_path: poster,
      vote_average: vote
    } = el;
    
    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = backdrop ? IMG_URL + backdrop : ''; 
    const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
    
    const card = document.createElement('li');
    card.classList.add('tv-shows__item');
    card.innerHTML = `
            <a href="#" class="tv-card">
              ${voteElem}
              <img class="tv-card__img"
                src="${posterIMG}"
                data-backdrop="${backdropIMG}"
                alt="${title}">
              <h4 class="tv-card__head">${title}</h4>
            </a>
    `;
    preloader.remove();
    tvShowsList.append(card);
  });
};

{
  wrapperShows.append(preloader);
  new DBService().getTestData().then(renderCard);
}

hamburger.addEventListener('click', () => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

document.body.addEventListener('click', evt => {
  if (!evt.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});

leftMenu.addEventListener('click', evt => {
  const target = evt.target;
  const dropdown = target.closest('.dropdown');

  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }

  // const dropdown = document.querySelectorAll('.dropdown');

  // dropdown.forEach((el) => {
  //   el.addEventListener('click', () => {
  //     el.classList.toggle('active');
  //   });
  // });
});

// modal
tvShowsList.addEventListener('click', evt => {
  evt.preventDefault();
  const target = evt.target;
  const card = target.closest('.tv-card');
  
  if (card) {
    new DBService().getTestCard().then(data => {
      console.log(data);
      cardImg.src = IMG_URL + data.poster_path;
      modalTitle.textContent = data.name;
      // genresList.innerHTML = data.genres.reduce((acc, item) => { return `${acc}<li>${item}</li>` }, '');
      // for(const item of data.genres) {
      //   genresList.innerHTML += `<li>${item}</li>`;
      // }
      genresList.textContent = '';
      data.genres.forEach(item => {
        genresList.innerHTML += `<li>${item.name}</li>`;
      });
      
      // rating
      // description
      // modalLink
    })
    .then(() => {
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hide');
    });
  }
});

modal.addEventListener('click', evt => {
  const target = evt.target;
  
  if (target.closest('.cross') || target.classList.contains('modal')) {
    document.body.style.overflow = '';
    modal.classList.add('hide')
  }
});

// image src
const changeImage = evt => {
  const target = evt.target;
  
  if (target.closest('.tv-shows__item')) {
    const img = target.closest('.tv-shows__item').querySelector('.tv-card__img');
    const changeImg = img.dataset.backdrop;
    if (changeImg) {
      // меняем местами src и data
      img.dataset.backdrop = img.src;
      img.src = changeImg;
    }
  }
};

// mouse evt
tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);

