function menu_scroll(options) {
    const menu_item = document.querySelector(options.header_id);
    window.onscroll = (e) => {
        if (window.scrollY > 100) {
            menu_item.classList.add("active")
        }
        else {
            menu_item.classList.remove("active")
        }
    };
}