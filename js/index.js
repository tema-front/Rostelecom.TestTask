'use strict';

import { FetchDatas } from "./fetchDatas.js";
import { Filter } from "./filter.js"
import { RenderCard } from "./renderCard.js";

let cards = document.querySelector('.cards')
let cardProduct = document.createElement('div');
cardProduct.className = 'card-item';
let cardsList= []
let onSearch = false;
let newCardsList = []
let btnSearch = document.querySelector('.search-btn');
let btnClear = document.querySelector('.clear-btn');
let searchField = document.querySelector('.search-field');


// ИНИЦИАЛИЗАЦИЯ
const init = () => {
    // Стартовый запрос на данные
    FetchDatas(cardsList, cards);
}
init()


btnClear.addEventListener('click', () => {
    onSearch = false;
    // Отчистка поиска и возврат в ленту всех данных
    searchField.value = '';
    cards.innerHTML = ''
    cardsList.forEach(cardInfo => {
        RenderCard(cardInfo, cards)
    })
    newCardsList = [];
});

// Поиск данных в массиве
btnSearch.addEventListener('click', () => {
    onSearch = true;

    // Обновляю поиск, если он был ранее использован
    cardsList.forEach(cardInfo => {
        RenderCard(cardInfo, cards);
    })
    const searchValue = searchField.value;
    if (searchField.value == '') return;

    // Вызываю фильтрацию по значению поиска searchValue
    Filter(cardsList, searchValue, newCardsList, cards);
})



let timer;
const checkTimer = () => {
    if (onSearch) return;
    clearTimeout(timer)

    timer = setTimeout(() => {
        // Вызываю отслеживание положения на странице каждые 600 милисекунд
        // Задержка обязательно нужна для того, чтобы не приходилось вызывать вычисления на каждый пиксель
        checkPosition()
    }, 600)
}

// Подписки для реализации динамической подгрузки данных
window.addEventListener("scroll", checkTimer);
window.addEventListener("resize", checkTimer);

const checkPosition = () => {
    // Нам потребуется знать высоту документа и высоту экрана
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
  
    // Записываем, сколько пикселей пользователь уже проскроллил
    const scrolled = window.scrollY
  
    // Обозначим порог, по приближении к которому
    // будем вызывать подгрузку новых данных.
    // В моём случае — треть экрана до конца страницы.
    const threshold = height - screenHeight / 3
  
    // Отслеживаем, где находится низ экрана относительно страницы.
    const position = scrolled + screenHeight
  
    // Если мы пересекли полосу-порог, подгружаем ещё данные.
    // getArticles()
    if (position >= threshold) {
        FetchDatas(cardsList, cards);
    }
}