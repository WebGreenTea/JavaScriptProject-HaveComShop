import axios from "axios";

function BTCprice() {

const res = axios.get("https://api.bitkub.com/api/market/ticker").then((res) => res.data.THB_BTC.last );
return res;

}



export { BTCprice }