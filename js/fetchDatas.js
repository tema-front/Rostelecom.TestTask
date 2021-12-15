import { RenderCard } from "./renderCard.js";

// Запрос данных
export const FetchDatas = async (cardsList, cards) => {
    // Чтобы подгружать неповторяющиеся данные я создаю счётчик-флаг,
    // Именно он будет выступать в роли ID для получения данных по URL
    // Загрузка данных происходит по 10 объектов
    let counterGetCards = cardsList.length + 10;
    for (let id = cardsList.length + 1; id <= counterGetCards; id++) {
        const URL = `https://jsonplaceholder.typicode.com/comments/${id}`;
        try {
            const request = await fetch(URL);
            
            if (!request.ok) {
                throw new Error('Error getArticles()')
            }
            const result = await request.json();
            cardsList.push(result);
            // Передаю объект с данными на отрисовку 
            RenderCard(result, cards);
        } catch(error) {
            console.log('Error: ' + error);
        }
    }
}