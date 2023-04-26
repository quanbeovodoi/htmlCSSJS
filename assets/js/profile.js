let nameForm;
let btnShow;
const url = "http://localhost:3000/users/";
function storeuser(data) {
  localStorage.setItem("userData", JSON.stringify(view(data, data ? true : false)));
}
export function getUser() {
  const User = JSON.parse(localStorage.getItem("userData"));
  if (User && User != {}) {
    return User;
  } else {
    return null;
  }
}
const fetch_user = async () => {
  const arr = {};

  console.log(url)
  const data = await (await fetch(url)).json()
  return data
}
async function post_data(url, data = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json();
}
function view(data, isExist) {
  if (isExist && data) {
    const obj = {
      name: data.name,
      address: data.address || '',
      gmail: data.gmail,
      numberPhone: data.numberPhone || ''
    }
    return obj;
  }

}
function ClosedForm(finded_form) {
  finded_form.innerHTML = ''
  finded_form.classList.remove('active');
}
function OpenForm(finded_form, content) {
  finded_form.classList.add('active');
  finded_form.innerHTML = content;
}
export function showForm(name_form, btn_show, btn_exit, callback, callbackend) {
  nameForm = document.querySelector(name_form);
  btnShow = document.querySelector(btn_show);
  let btnExit;
  btnShow.onclick = (e) => {
    e.preventDefault()
    console.log('Open!');
    OpenForm(nameForm, (callback)());
    (callbackend)();
    btnExit = document.querySelector(btn_exit);
    btnExit.onclick = () => {
      console.log('Exit!');
      ClosedForm(nameForm)
    }
  }
}

export function loginHanlde(userName, passWord) {
  fetch_user().then(value => {
    if (userName == "" || passWord == "" || !value) {
      alert('please fill all field!');
    } else {
      let isAuth = false;
      value.forEach(e => {
        if (userName == e.gmail && passWord == e.password) {
          console.log(e)
          storeuser(e)
          console.log(JSON.parse(localStorage.getItem("userData")));
          importUser(getUser());
          isAuth = true;
        }

      })
      if (isAuth) {
        alert("Dang nhap thanh cong");
        if (nameForm)
          ClosedForm(nameForm);
      }
      else
        alert("sai tk hoac mat khau");
    }
  })

}
export function registerHanlde(data) {
  //POST
  post_data(url, data).then(data => console.log(data))
}
export function importUser(data) {
  if (data && data.name)
    document.querySelector('#profile_name .navbar_top--name').innerHTML = data.name;
  else {
    document.querySelector('#profile_name .navbar_top--name').innerHTML = "No Login";
  }
}
