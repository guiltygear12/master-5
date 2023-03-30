const BASE_URL=`https://api.coinpaprika.com/v1`
const BASE_URL2=`https://api.upbit.com/v1/`



export function fetchCoins(){
    return fetch("https://api.coinpaprika.com/v1/coins").then((response)=>response.json());
}

export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=>response.json());
}
export function fetchCoinPrice(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=>response.json());
}
export function fetchCoinHistory(coinId:string){
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60 * 60 * 23;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response)=>response.json());
}