const listSlide = [{
    imageUrl: './assets/images/bg/slider-01.webp',
    titleImage: 'All In One',
    desImage: 'Thanks for come to my Website',
    linkItem: '#'
},
{
    imageUrl: './assets/images/bg/2.webp',
    titleImage: 'All In One',
    desImage: 'Thanks for come to my Website',
    linkItem: '#'
}, {
    imageUrl: './assets/images/bg/3.webp',
    titleImage: 'All In One',
    desImage: 'Thanks for come to my Website',
    linkItem: '#'
}];



function slideRun(options) {
    const slide_container = document.querySelector(options.slideContainer);
    if (!slide_container) return;
    const maxWithScreen = slide_container.offsetWidth ? slide_container.offsetWidth : options.maxWidth;
    const timeRun = options.timeRun;
    var positionLeft = 0;
    var indexPage = 0;//vị trí trang
    var widthScreenPresent = checkMaxWidth(maxWithScreen)//kiểm tra độ rộng trang hiện tại
    const buttonNext = document.querySelector(options.buttonNext);
    const buttonPrev = document.querySelector(options.buttonPrev);
    const form = document.querySelector(options.slideForm);
    var checked_timeOut = true;
    function importslideHtml(item, placeItem) {
        const itemdata = []
        item.forEach(function (el) {
            itemdata.push(`<div class="slide_item">
            <div class="slide_item--img">
              <div class="img_container" style="background-image: url(${el.imageUrl});"></div>
            </div>
            <div class="slide_item--content">
              <h3 class="slide_item--title">${el.titleImage}</h3>
              <p class="slide_item--des">${el.desImage}</p>
              <a draggable="false" href="${el.linkItem}" class="slide_item--link" style="font-weight:400">View Now</a>
            </div>
          </div>`)
        })
        placeItem.innerHTML = itemdata.join('');

    }
    // importdot
    function importDotSlide(item, placeItem, indexPage) {
        var i = 0;
        var itemdata = [];
        for (i = 0; i < item.length; i++) {
            itemdata.push((indexPage === i) ? `<li class="dot active" data-index="${i}"></li>` : `<li class="dot" data-index="${i}"></li>`);
            document.querySelector(placeItem).innerHTML = itemdata.join('');
        }
        dotClicked('.dot')
    }
    function updateDotSlide(index) {
        const Dot = document.querySelectorAll('.dot')
        Dot.forEach((e) => {
            if (e.classList.contains('active'))
                e.classList.remove('active');
            if (e.getAttribute('data-index') == index)
                e.classList.add('active');
        })
    }
    function dotClicked(item, index) {

        const Dot = document.querySelectorAll(item);
        Dot.forEach(e => e.onclick = () => {
            var num = Number(e.getAttribute("data-index"));
            slide_container.style.transition = `left 0.5s ease-in-out`;
            NextSlide(num, Number(checkMaxWidth(maxWithScreen)));
            updateDotSlide(num)
            indexPage = num;
            window.addEventListener("resize", () => {
                NextSlide(num, Number(checkMaxWidth(maxWithScreen)));
            })
        })
    }
    function setWidth(myWidth, slide, slideItemImg) {
        var slideItem = document.querySelectorAll('.slide_item--img');
        slideItem.forEach((e) => e.style.width = myWidth + "px")
        var listSlide = document.querySelector('.slide');
        listSlide.style.width = "100%";
        // console.log(listSlide)
    }
    function NextSlide(num, maxWithScreen, style = 1) {
        positionLeft = -num * maxWithScreen;
        slide_container.style.left = positionLeft + 'px';
    }
    function handleEventSlide(widthElement, num, next) {
        slide_container.style.transition = `left 0.5s ease-in-out`;
        // Next page
        if (num < listSlide.length - 1 && next) {
            num = num + 1;
            NextSlide(num, widthElement);
            updateDotSlide(num);
            indexPage = num;
            window.addEventListener("resize", () => {
                NextSlide(num, Number(checkMaxWidth(maxWithScreen)));
            })

        }
        // previous page
        if (num > 0 && !next) {
            num = num - 1;
            NextSlide(num, widthElement);
            updateDotSlide(num);
            indexPage = num;
            window.addEventListener("resize", () => {
                NextSlide(num, Number(checkMaxWidth(maxWithScreen)));
            })
        }
    }
    function checkMaxWidth(maxWithScreen) {
        return document.body.clientWidth <= maxWithScreen ? (document.body.clientWidth) : (maxWithScreen)
    }
    function downListener(el) {
        var pressed = true;
        var check;
        var _this = this
        function onMouseMove(e) {
            if (pressed) {
                (function (e) {
                    check = e.clientX - el.clientX;
                })(e)
            }
        }
        this.addEventListener('mousemove', onMouseMove)
        this.onmouseup = (e) => {
            if (checked_timeOut) {
                pressed = false;
                _this.removeEventListener('mousemove', onMouseMove)
                _this.onmouseup = null;
                if (Math.abs(check) > 20) {
                    if (check < 0) {
                        handleEventSlide(Number(checkMaxWidth(maxWithScreen)), indexPage, true);
                    } else {
                        handleEventSlide(Number(checkMaxWidth(maxWithScreen)), indexPage, false);
                    }
                    checked_timeOut = false;
                    setTimeout(() => { checked_timeOut = true }, timeRun)
                }
            }

        }


    }
    function handleDrag(element) {
        element.addEventListener('mousedown', downListener)
    }

    (function main() {
        importslideHtml(listSlide, slide_container);
        importDotSlide(listSlide, "#page_dots", indexPage);
        setWidth(widthScreenPresent);
        window.addEventListener("resize", function (event) {
            slide_container.style.removeProperty('transition');
            setWidth(checkMaxWidth(maxWithScreen));
        })

        buttonNext.addEventListener("click", () => {
            if (checked_timeOut) {
                checked_timeOut = false;
                handleEventSlide(Number(checkMaxWidth(maxWithScreen)), indexPage, true);
                setTimeout(() => { checked_timeOut = true }, timeRun)
            }
        })
        buttonPrev.addEventListener("click", () => {
            if (checked_timeOut) {
                checked_timeOut = false;
                handleEventSlide(Number(checkMaxWidth(maxWithScreen)), indexPage, false);
                setTimeout(() => { checked_timeOut = true }, timeRun)
            }

        })
        handleDrag(form);
    })()
}

