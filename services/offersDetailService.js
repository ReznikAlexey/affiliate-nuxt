import currentOffersData from '../mocks/offersData.json'

export function fetchCurrentOfferByIdData(id) {
  return new Promise((resolve, reject) => {
    // Имитация задержки для асинхронного запроса
    setTimeout(() => {
      const result = currentOffersData.find(item => item.id === id);
      resolve(result);
    }, 1000); // Задержка в 1 секунду
  });
}
