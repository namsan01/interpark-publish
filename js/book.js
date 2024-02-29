window.addEventListener("load", function () {
  const fileName = "book.json";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);

  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;

      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlBookTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `

      <div class="swiper-slide">
      <div class="book-slide-item">
        <a href=#" class="book-link">
        <div class="book-img">
          <img src="${obj.image}" alt="${obj.desc}">
        </div>
      </div>
        <div class="book-info">
          <div class="book-good-list">
          <li>
            <p class="book-good-info-desc">
            ${obj.desc}
          </p>
          <b class="book-good-info-price">${obj.price}</b>
          원
        </li>
          </div>
      
        </div>
      </a>
      </div>
`;
      htmlBookTag += tempTag;
    }
    showHtmlTag(htmlBookTag);
  }

  function showHtmlTag(_html) {
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperBook = new Swiper(".book-slide", {
      slidesPerView: 5,
      spaceBetween: 28,
      slidesPerGroup: 5,
      navigation: {
        nextEl: ".book-main .slide-next-bt",
        prevEl: ".book-main .slide-prev-bt",
      },
    });
  }
});
