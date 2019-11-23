import { elements } from './Base.js';

export function getInput() {
    return elements.searchInp.value;
}

export function clean() {
    elements.searchInp.value = ``;
    elements.resultsList.innerHTML = ``;
}

export function renderRecipes(recipes) {
    recipes.forEach(renderRecipe);
}

function trimTittle(title, limit = 17) {
    if (title.length > limit) {
        title = title.substring(0, limit);
        let index = title.lastIndexOf(` `);

        if (index !== -1) {
            title = title.substring(0, index);
        }
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
        <a class="results__link results__link--active" href="${recipe.recipe_id}">
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
    elements.resultsList.insertAdjacentHTML(`beforeend`, markup);
}
