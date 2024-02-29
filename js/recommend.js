
window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fileName = "recommend.json";


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

    let htmlRecommendTag = ``;

    for (let i = 0; i < _res.total; i++) {

      const index = i + 1;

      const obj = _res["good_" + index];


      let tempTag = ``;

      if (i === _res.total - 1) {
        tempTag = `
          <div class="swiper-slide">
          바로가기
          </div>
        `;

      } else {
        tempTag = `
      <div class="swiper-slide">
        <div class="recommend-slide-item">
          <a href="#" class="recommend-link">
            <div class="recommend-img">
              <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="recommend-info">
              <ul class="recommend-good-list">
                <li>
                  <span class="recommend-good-info-price">
                    <b>${obj.discount && obj.discount + "%"}</b>
                    <em>${numberWithCommas(obj.price)}</em>
                    원
                  </span>
                </li>
                <li>
                  <p class="recommend-good-info-desc">
                  ${obj.desc}
                  </p>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    `;

        //일반적인 코드를 출력한다.
      }
      // htmlRecommendTag = htmlRecommendTag + tempTag;
      htmlRecommendTag += tempTag;
    }

    showHtmlTag(htmlRecommendTag);
  }

  // html 출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    // swiper 태그에 백틱을 배치한다.
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;

    // swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    // swiper 작동시킨다.
    const swiperRecommend = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".recommend-main .slide-next-bt",
        prevEl: ".recommend-main .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
});
