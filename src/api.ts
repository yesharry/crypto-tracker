const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

// 여기서 나는 fetcher 함수를 만들거다.
// fetcher 함수는 꼭 fetch promise를 return해줘야 한다.
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
// 위 함수는 json data의 Promise를 return 해주어야 한다.
// 다시 짚어보자면 우리는 api를 fetch하고 json을 return하는 함수를 만들었다.

export function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId?: string) {
  // nico api
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23 * 7 * 1;
  return fetch(`${NICO_URL}/?coinId=${coinId}`).then((response) =>
    response.json()
  );

  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7;
  // return fetch(
  //   `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  // ).then((response) => response.json());
}
