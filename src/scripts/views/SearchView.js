import { elements, trimTittle } from './Base.js';

export function getInput() {
    return elements.searchInp.value;
}

export function clearSearch() {
    elements.searchInp.value = ``;
    elements.searchResultsList.innerHTML = ``;
    elements.searchResultsPages.innerHTML = ``;
}

export function renderRecipes(recipes, page = 1, perPage = 10) {
    let start = (page - 1) * perPage,
        end = page * perPage;
    recipes.slice(start, end).forEach(renderRecipe);
    elements.searchResultsPages.innerHTML = renderPageBtn(page, perPage, recipes.length);
}

export function highlight(id) {
    elements.searchResultsList.querySelectorAll(`a`).forEach(a => a.classList.remove(`results__link--active`));
    elements.searchResultsList.querySelector(`.results__link[href="#${id}"]`).classList.add(`results__link--active`);
}

function renderPageBtn(page, perPage, numOfRecipes){
    let numOfpages = Math.ceil(numOfRecipes / perPage),
        button;
    if (numOfpages > 1) {
        if (page === 1) {
            button = createBtn(page, `next`);
        } else if(page === numOfpages) {
            button = createBtn(page, `prev`);
        } else {
            button = `
                ${createBtn(page, `next`)}
                ${createBtn(page, `prev`)}
            `;
        }
    }
    return button;
}

function createBtn(page, type) {
    return `
        <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;
}

function renderRecipe(recipe) {
    let title = trimTittle(recipe.title);
    let markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML(`beforeend`, markup);
}
