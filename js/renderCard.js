export const RenderCard = (cardInfo, cards) => {
    // Полученные данные используются для создания карточек
    cards.insertAdjacentHTML('beforeEnd', `
        <div class='card-item'>
            <img class='card-item-img' src="https://picsum.photos/200/200?random=${cardInfo.id}" alt="cardPreview" height='200' width='200'>
            <div class="card-item-info">
                <span class='card-item-info-title'>${cardInfo.name}</span>
                <p class='card-item-info-txt'>${cardInfo.body}</p>
                <span class='card-item-info-email'>${cardInfo.email}</span>
            </div>
        </div>
    `)
}