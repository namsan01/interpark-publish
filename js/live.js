window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const fileName = "live.json";

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
    let htmlLiveTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      let tempTag = `
    
        <div class="swiper-slide">
        <div class="live-slide-item">
          <a href="${obj.url}" class="live-link">
            <div class="live-img">
              <img src="${obj.image}" alt="">
            </div>
            <div class="live-item-info">
              <i>${obj.badge}</i>
              <div class="live-item-name">
              ${obj.name}
              </div>
            </div> 
          </a>  
          <a href="#" class="live-sub">
            <div class="live-cen">
              <span class="live-day">${obj.date || ""}</span>
              <span class="live-time">${obj.time || ""}</span>
            </div>
          </a>    
              <div class="live-product">
                <a href="${obj.good_url}" class="live-product-a">
                  <div class=${obj.ig_class}>
                    <img src="${obj.good_image ? obj.good_image : ""}" alt="">
                  </div>
                  <div class="live-product-info">
                    <div class="live-product-price">
                      <span class="product-percent">
                        <em>${
                          obj.good_discount ? obj.good_discount + "%" : ""
                        }</em>
                      </span>
                      <span class="product-won"> 
                        <em>${numberWithCommas(
                          obj.good_price ? obj.good_price + "원" : ""
                        )}</em>
                        <span class="product-currency"></span>
                      </span>
                    </div>
                    <div class="live-product-name">${
                      obj.good_tittle ? obj.good_tittle : ""
                    }</div>
                    
                  
                    </div>
                    </a>
                  </div>
                 
            </div>
          </div>
          
          `;
      htmlLiveTag += tempTag;
    }
    showHtmlTag(htmlLiveTag);
  }

  function showHtmlTag(_html) {
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperLive = new Swiper(".live-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      slidesPerGroup: 4,
      navigation: {
        nextEl: ".live-main .slide-next-bt",
        prevEl: ".live-main .slide-prev-bt",
      },
    });
  }
});
