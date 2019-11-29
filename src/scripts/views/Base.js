export const elements = {
    searchBtn: document.querySelector(`.search`),
    searchInp: document.querySelector(`.search__field`),
    searchResultsList: document.querySelector(`.results__list`),
    searchResults: document.querySelector(`.results`),
    searchResultsPages: document.querySelector(`.results__pages`),
    recipe: document.querySelector(`.recipe`),
    shopList: document.querySelector(`.shopping__list`),
    shopItem: document.querySelector(`.shopping__item`),
    shopping: document.querySelector(`.shopping`),
    likeMenu: document.querySelector(`.likes__field`),
    likeList: document.querySelector(`.likes__list`)
}

export function renderLoader(parent) {
    let loader = `
        <div class='loader'>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML(`afterbegin`, loader);
}

export function clearLoader(parent) {
    let loader = parent.querySelector(`.loader`);
    if (loader) loader.remove();
}

export function trimTittle(title, limit = 17) {
    if (title.length > limit) {
        title = title.substring(0, limit);
        let index = title.lastIndexOf(` `);

        if (index !== -1) {
            title = title.substring(0, index);
        }
        return `${title} ...`;
    }
    // while (title.length > limit) {
    //     title = title.split(` `);
    //     title.pop();
    //     title = title.join(` `);
    // }
    return title;
}