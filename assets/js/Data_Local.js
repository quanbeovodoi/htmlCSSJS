const checkApi = async (url) => {
    const fetchData = await fetch(url)
    // console.log(fetchData);

    //use string literals
    const fetchDataJson = await fetchData.json();
    return fetchDataJson;
}

const useData = async (callback, url) => {
    const jsonData = await checkApi(url);
    //now you can directly use jsonData
    callback(jsonData)
}
// get product data
async function getData(url) {
    let _data
    const cartData = await useData((data) => {
        _data = data;
    }, url)
    return _data;
}
const _HTTP = 'http://localhost:3000/'
// get cart data
export const _DATA_LOCAL = await getData(_HTTP + 'products')
export const _DATA_CART = await getData(_HTTP + 'cart')
export default useData


