import { elements, trimTittle } from './Base.js';

export function toggleLikeBtn(isLiked) {
    let iconString = isLiked ? `icon-heart-outlined` : `icon-heart`;
    document.querySelector(`.recipe__love use`).setAttribute(`href`, `img/icons.svg#${iconString}`);
}

export function toggleLikeMenu(numLikes) {
    elements.likeMenu.style.visibility = numLikes > 0 ? `visible` : `hidden`;
}

export function renderLikeMenu(item) {
    let markup = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.img}" alt="${item.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${trimTittle(item.title)}</h4>
                    <p class="likes__author">${item.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.likeList.insertAdjacentHTML(`beforeend`, markup);
}

export function removeLikedItem(id) {
    document.querySelector(`.likes__link[href="#${id}"]`).parentNode.remove();
}