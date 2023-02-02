const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL2 = process.env.REACT_APP_API_BASE_URL2;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then(res => res.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(res => res.json());
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(res => res.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${BASE_URL2}?coinId=${coinId}`).then(res => res.json());
}
