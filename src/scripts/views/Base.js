export const elements = {
    searchBtn: document.querySelector(`.search`),
    searchInp: document.querySelector(`.search__field`),
    searchResultsList: document.querySelector(`.results__list`),
    searchResults: document.querySelector(`.results`),
    searchResultsPages: document.querySelector(`.results__pages`),
    recipe: document.querySelector(`.recipe`)
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