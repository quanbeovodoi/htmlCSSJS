function pagination(options) {
    // console.log(options.data)
    const getData = options.data;
    const contain = document.querySelector(options.contain).querySelector('.page_number').querySelector('.page_number--list');
    const number_items = options.number_items;
    const item_page = `
    <li>
        <div class="number_box" for="top_products" data-index="1">1</div>
    </li>
    `
    const arr = []
    const lengthData = options.data.length;
    const pageNumber = Math.ceil(lengthData / options.number_items);
    const totalPages = options.total_pages < pageNumber ? options.total_pages : pageNumber;
    const curPage = options.cur_page;

    const dot = `
    <li>
        <div class="number_box" for="top_products">...</div>
    </li>`;

    function renderPage(pos, active = '') {
        return `
        <li>
            <div class="number_box ${active}" for="top_products" data-index="${pos}" >${pos}</div>
        </li>`
    }

    function pagination_handle(curPage) {

        // console.log(dataFilter(getData, curPage, 3))

        options.callback(getData, curPage, number_items);
        let render = "";
        let renderTwoSide = "";
        let countTruncate = 0; const nextPage = `
        <li>
            <div class="number_box" for="top_products" data-index="${(curPage + 1) > totalPages ? totalPages : (curPage + 1)}" >next</div>
        </li>`;
        const prevPage = `
        <li>
            <div class="number_box" for="top_products" data-index="${(curPage - 1) > 0 ? (curPage - 1) : 0}" >prev</div>
        </li>`;
        const delta = options.delta;
        const range = delta + 4;
        const numberTruncateLeft = curPage - delta;
        const numberTruncateRight = curPage + delta;
        // get
        let active = "";
        for (let pos = 1; pos <= totalPages; pos++) {
            active = pos === curPage ? "active" : "";
            if (totalPages >= 2 * range - 1) {
                // import vao 
                if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
                    if (pos >= numberTruncateLeft && pos <= numberTruncateRight)
                        renderTwoSide += renderPage(pos, active)
                }
                else {
                    if ((curPage < range && pos <= range) || (curPage > totalPages - range && pos >= totalPages - range + 1 || pos == totalPages || pos == 1)) {
                        render += renderPage(pos, active);
                    } else {
                        countTruncate++;
                        if (countTruncate === 1)
                            render += dot;
                    }
                }

            } else {
                render += renderPage(pos, active)
            }
        }
        if (renderTwoSide) {
            renderTwoSide =
                renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
            contain.innerHTML = prevPage + renderTwoSide + nextPage;
        } else {
            contain.innerHTML = prevPage + render + nextPage;
        }
        Array.from(contain.querySelectorAll('.number_box')).forEach((e) => e.onclick = (e) => {
            var newCurPage = Number(e.target.getAttribute('data-index'))
            if (newCurPage) {
                pagination_handle(newCurPage)
            }
        })
    }
    pagination_handle(curPage);
}