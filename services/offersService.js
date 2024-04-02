import offersData from '../mocks/offersData.json'

export function fetchOffersData() {
  return new Promise((resolve, reject) => {
    // Имитация задержки для асинхронного запроса
    setTimeout(() => {
      resolve(offersData);
    }, 1000); // Задержка в 1 секунду
  });
}
