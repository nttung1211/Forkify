import { elements } from './Base.js';

export function renderItem(item) {
    let markup = `
        <li class="shopping__item" data-item-id="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" min="0" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shopList.insertAdjacentHTML(`beforeend`, markup);
}

export function deleteItem(id) {
    elements.shopList.querySelector(`[data-item-id="${id}"]`).remove();
}