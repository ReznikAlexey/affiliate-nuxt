export default defineEventHandler((event) => {
    // Получаем заголовки текущего запроса
    const headers = useRequestHeaders(event)

    console.log(headers)
    // Пример использования заголовка Authorization
    const authHeader = headers['authorization']

    // Логика обработки запроса
    if (authHeader) {
        // Выполняем действия, если заголовок Authorization присутствует
    } else {
        // Обрабатываем случай, когда заголовок Authorization отсутствует
    }

    return {
        message: 'Request headers processed successfully'
    }
})