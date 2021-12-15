import { RenderCard } from "./renderCard.js";

export const Filter = (cardList, searchValue, newCardList, cards) => {
    debugger;
    // Создаю новый массив, в который положу объекты, фильтруя по поиску основной массив с данными 
    newCardList = []
    // onSearch = true;
    newCardList = cardList.filter(item => {
        for (let key in item) {
            // Исключаю фильтрацию по номерам Id и postId 
            if (typeof(item[key]) == 'number') continue;
            let string = item[key].toString().replace(/\r?\n/g, " ");
            if (string.toLowerCase().includes(searchValue.toLowerCase())) return item;
        }
    });
    if (!newCardList.length) {
        cards.innerHTML = ''
        return
    }
    cards.innerHTML = ''

    // Отправляю на отрисовку отфильтрованный массив
    newCardList.forEach(cardInfo => {
        debugger
        RenderCard(cardInfo, cards);
        // loadCardContent(cardInfo);
    });
}
