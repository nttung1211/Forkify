import { elements } from './Base.js';

export function getInput() {
    return elements.searchInp.value;
}

export function clean() {
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

function trimTittle(title, limit = 17) {
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

function renderRecipe(recipe) {
    let title = trimTittle(recipe.title);
    let markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
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
