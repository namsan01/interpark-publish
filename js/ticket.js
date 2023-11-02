window.addEventListener("load", function () {
  const fileName = "ticket.json";

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
    let htmlTicketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `
  
      <div class="swiper-slide">
      <div class="ticket-slide-item">
        <a href="${obj.url}" class="ticket-link">
        <div class="ticket-img">
          <img src="${obj.image}" alt="${obj.tit}">
          <span>${obj.rank}</span>
        </div>
      </div>
        <div class="ticket-info">
          <ul class="ticket-good-list">
          <li>
            <span class="ticket-good-info-tit">
            <p>${obj.tit}</p>
            </span>
          </li>
          <li>
            <span class="ticket-good-info-place">
            ${obj.place}
            </span>
            <span class="ticekt-good-info-date">
            ${obj.date}
            </span>
          </li>
          <div class="ticket-badge">
            <i class="ticket-badge-blue">${
              obj.badge === "" ? "" : obj.badge
            }</i>
          </div>
          </ul>
        </div>
      </a>

    </div>
        
        `;
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);
  }

  function showHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      slidesPerGroup: 4,
      navigation: {
        nextEl: ".ticket-main .slide-next-bt",
        prevEl: ".ticket-main .slide-prev-bt",
      },
    });
  }
});
