window.addEventListener("load", function () {
  const fileName = "event.json";

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
    let htmlEventTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `
    
      <div class="swiper-slide">
      <div class="event-slide-item">
        <a href="${obj.url}" class="event-link"></a>
      <div class="event-img">
        <img src="${obj.image}" alt="">
      </div></div></div>
          `;
      htmlEventTag += tempTag;
    }
    showHtmlTag(htmlEventTag);
  }

  function showHtmlTag(_html) {
    const eventSlide = ".event-slide .swiper-wrapper";
    const tag = document.querySelector(eventSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperEvent = new Swiper(".event-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      slidesPerGroup: 4,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".event-main .slide-next-bt",
        prevEl: ".event-main .slide-prev-bt",
      },
    });
  }
});
