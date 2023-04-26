import useData, { _DATA_LOCAL } from "./Data_Local.js";
import details_Show from "./details.js";
import { importHtml } from "./importApi.js"
import { getUser, importUser, loginHanlde, registerHanlde, showForm } from "./profile.js";
import cartShop from "./shoppingCart.js";
import Validator from "./validator.js";
'use strict'
slideRun({
  slideForm: "#slideForm",
  timeRun: 800,
  maxWidth: 1600,
  slideContainer: "#slide_container",
  slideElement: ".slide_item",
  buttonNext: "#nav-button--next",
  buttonPrev: "#nav-button--prev"
})
snakegame()
menu_scroll({
  header_id: "#header"
})
function dataFilter(data, curPage, items_Pg) {
  let newData = [];
  // const pageNumber = Math.ceil(lengthData / totalPages);
  // startPage = pagenumber 
  // 1 2 3 0 5 10
  const startPage = (curPage * items_Pg - items_Pg) < 0 ? 0 : (curPage * items_Pg - items_Pg)
  for (let i = startPage; i < items_Pg + startPage; i++) {
    if (i < data.length)
      newData.push(data[i])
    else {
      break;
    }
  }
  return newData;
}

pagination({
  data: _DATA_LOCAL,
  contain: "#top_products--contain",
  number_items: 8,
  total_pages: 10,
  cur_page: 1,
  delta: 1,
  callback: (data, curPage, items_Pg) => {
    const newData = dataFilter(data, curPage, items_Pg)
    // console.log(newData)
    importHtml(newData, "#top_products")
    newData.forEach(element => {
      showForm('#subForm', `#view_data_${element.id}`, '#off_form', () => details_Show(), () => { })
    });
  }
})
showForm('#subForm', '#login_btn', '#off_form', () => {
  return `<div class="form">
    <form action="" class="form_contain" id="form_login" autocomplete="off">
      <div class="icon_x" id="off_form">
        x
      </div>
      <div class="form_login title">Login</div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="gmail_input">Gmail</label>
          <input class="input gmail_input" type="text" name="gmail_input" id="gmail_input"
            placeholder="Input Your Gmail!" />
        </div>
        <span class="form_message"></span>
      </div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="password_input">Password</label>
          <input class="input password_input" type="password" name="password_input" id="password_input"
            placeholder="Input Your Password!" />
        </div>
        <span class="form_message"></span>
      </div>
      <button class="mt-8 button submit_button">submit</button>
    </form>
  </div>`
}, () => Validator({
  form: "#form_login",
  formGroupSelector: '.form_group',
  errorSelector: '.form_message',
  rules: [
    Validator.isRequired('#gmail_input', 'Please fill out this field *'),
    Validator.isRequired('#password_input', 'Please fill out this field *'),
    Validator.isMin('#password_input', 6),
  ],
  onSubmit: function (data) {
    const gmail = data.gmail_input;
    const password = data.password_input;
    loginHanlde(gmail, password)
    // console.log(data);
  }
}))
showForm('#subForm', '#reg_btn', '#off_form', () => {
  return `<div class="form">
    <form action="" class="form_contain" id="form_1" autocomplete="off">
    <div class="icon_x" id="off_form">
        x
      </div>  
    <div class="form_login title">Register</div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="account">Name</label>
          <input class="input account_input" type="text" name="fullname" id="fullname"
            placeholder="Input Your Name!" />
        </div>
        <span class="form_message"></span>
      </div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="gmail_input">Gmail</label>
          <input class="input gmail_input" type="text" name="gmail_input" id="gmail_input"
            placeholder="Input Your Gmail!" />
        </div>
        <span class="form_message"></span>
      </div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="password_input">Password</label>
          <input class="input password_input" type="password" name="password_input" id="password_input"
            placeholder="Input Your Password!" />
        </div>
        <span class="form_message"></span>
      </div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="password_confirm">Password Confirm</label>
          <input class="input password_confirm" type="password" name="password_confirm" id="password_confirm"
            placeholder="Input Your Password Again!" />
        </div>
        <span class="form_message"></span>
      </div>
      <div class="form_group">
        <div class="form_group-input">
          <label for="gender">Gender</label>
          <div class="form_group-radio">
            <input name="gender" type="checkbox" value="male" class="gender_radio"> Male
            <input name="gender" type="checkbox" value="female" class="gender_radio"> Female
            <input name="gender" type="checkbox" value="other" class="gender_radio"> Other
          </div>
        </div>
        <span class="form_message"></span>
      </div>
      <button class="mt-8 button submit_button">submit</button>
    </form>
  </div>`
}, () => Validator({
  form: "#form_1",
  formGroupSelector: '.form_group',
  errorSelector: '.form_message',
  rules: [
    Validator.isRequired('#fullname', 'Please fill out this field *'),
    Validator.isRequired('#gmail_input', 'Please fill out this field *'),
    Validator.isEmail('#gmail_input', 'Wrong or Invalid email address. Please correct and try again.  *'),
    Validator.isRequired('#password_input', 'Please fill out this field *'),
    Validator.isMin('#password_input', 6),
    Validator.isRequired('#password_confirm', 'Please fill out this field *'),
    Validator.isConfirmed('#password_confirm', () => { return document.querySelector('#form_1 #password_input').value; }, 'Wrong password value confirm *'),
    Validator.isRequired('input[name="gender"]', 'Please choose one box *')
  ],
  onSubmit: function (data) {
    // console.log(data)
    const obj = {
      name: data.fullname,
      gender: data.gender[0],
      gmail: data.gmail_input,
      password: data.password_input
    }
    registerHanlde(obj)

  }
}))
importUser(getUser())

// cart
cartShop({
  contain: "#subForm",
  btnShow: "#cart_btn",
  data: _DATA_LOCAL
})
// console.log(getUser())