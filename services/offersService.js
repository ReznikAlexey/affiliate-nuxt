import offersData from '../mocks/offersData.json'

export function fetchOffersData(size) {
  return new Promise((resolve, reject) => {
    // Имитация задержки для асинхронного запроса
    setTimeout(() => {
      const result = offersData.filter(item => item.size === size);
      resolve(result);
    }, 1000); // Задержка в 1 секунду
  });
}
