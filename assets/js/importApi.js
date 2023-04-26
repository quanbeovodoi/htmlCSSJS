import html from "./modules/core.js";

export function importHtml(items, placeItem) {
  var itemdata = [];
  items.forEach(function (el) {
    // document.querySelector(el.id).onclick = addItem(el.id, items)
    itemdata.push(html`<div class="section_block--item" id="prd_${el.id}">
        <div class="section_block--img" style="background-image: url('${el.imgUrl}');"></div>
        <div class="section_block--content">
          <h4 class="section_block--title">${el.title}</h4>
          <div class="section_block--free">${Number(el.fee) <= 0 ? "Free" : Number(el.fee) + "$"}</div>
          <div class="animation_text">View Detail</div>
        </div>
        <div class="section_icon--link">
                <a href="" class="icon_button add_wishList" data-action="post">
                  <ion-icon name="heart-outline"></ion-icon>
                </a>
                <form action="" class="toCart_form" method="POST">
                  <button class="icon_button add_cart"><ion-icon name="bag-add-outline"></ion-icon></button>
                </form>
                <a href="" class="icon_button viewDetail" id="view_data_${el.id}" data-action="post">
                  <ion-icon name="eye-outline"></ion-icon>
                </a>
              </div>
        </div>`)

  })
  document.querySelector(placeItem).innerHTML = itemdata.join('')


  // addItem()
}
