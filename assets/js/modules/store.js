// Nơi tạo ra store trả về attach dispatch và connect
import reducer from "./reducer.js";
import { storeCreated } from "./core.js";

const { attach, connect, dispatch } = storeCreated(reducer)
window.dispatch = dispatch;
export {
    attach,
    connect
}