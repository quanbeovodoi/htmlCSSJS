import useData, { _DATA_CART } from "./Data_Local.js";
import { showForm } from "./profile.js";




export default function cartShop(options, callback) {
  const cart_Data = prdInfoCart(_DATA_CART, options.data)
  function cartHandle(id, data) {
    console.log(data)
    addItem(id, data)
  }
  function prdInfoCart(cartData, prdData) {
    // console.log(cartData)
    const _prdIncart = cartData.reduce((acc, cur) => {
      prdData.forEach(e => {
        if (Number(e.id) === Number(cur.prd_id)) {
          acc.push({ ...e, quantity: cur.quantity })
        }
      })
      return acc
    }, [])

    return _prdIncart
  }
  function addItem(id, data) {
    if (_DATA_CART.length <= 0)
      _DATA_CART.push({ prd_id: id, quantity: 1 });
    else {
      const isExist = _DATA_CART.some(item => item.prd_id === id)

      _DATA_CART.forEach((item) => {
        if (item.prd_id === id)
          item.quantity && item.quantity++
      })
      if (!isExist) { _DATA_CART.push({ prd_id: id, quantity: 1 }); }
    }

    document.querySelector('#quantity_cart').innerHTML = _DATA_CART.length;
    console.log('New in Data:', prdInfoCart(_DATA_CART, data));
  }
  function showDataCart(data) {
    const containCart = `
    <div class="form">
    <div class="relative shopping-cart">
    <div class="icon_x" id="off_form">
    <span class="delete-btn"></span>
    </div>  
    <div class="title">
      Shopping Bag
    </div>
    ${data.map((item) => `<div class="item">
    <div class="buttons">
      <span class="delete-btn"></span>
      <span class="like-btn"></span>
    </div>
    <div class="image">
      <img src="${item.imgUrl}" alt="" />
    </div>
  
    <div class="description">
      <span>${item.title}</span>
      <span>${item.brand}</span>
      <span>${item.color}</span>
    </div>
  
    <div class="quantity">
      <button class="plus-btn" type="button" name="button">
        <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
      </button>
      <input type="text" name="name" value="${item.quantity}">
      <button class="minus-btn" type="button" name="button">
        <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
      </button>
    </div>
  
    <div class="total-price">$${item.fee}</div>
  </div>`).join('')}
    
  </div>
    </div>
    `
    return containCart;
  }
  function cartHTML(dataInCart) {
    document.querySelector('#quantity_cart').innerHTML = _DATA_CART.length;
    const showDataCarts = showDataCart(dataInCart)
    console.log(showDataCarts)
    if (showDataCarts)
      showForm(options.contain, options.btnShow, '#off_form', () => {
        return showDataCarts
      }, () => { })
  }
  cartHTML(cart_Data);
  options.data.forEach(item => item.id && (Array.from(document.querySelectorAll(`#prd_${item.id} .toCart_form`)).forEach((i) => i.onclick = (e) => {
    e.preventDefault();
    cartHandle(item.id, options.data);
    cartHTML(prdInfoCart(_DATA_CART, options.data));
  })))
}