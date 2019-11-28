// if we use export defautl we do not need the exact name but we can not export multiple files
import '../css/app.scss';
import { elements, renderLoader, clearLoader } from './views/Base.js';
import { Search } from './models/Search.js';
import { Recipe } from './models/Recipe.js';
import * as SearchView from './views/SearchView.js';
import * as RecipeView from './views/RecipeView.js';


const state = {
};

async function controlSearch() {
    let query = SearchView.getInput();

    try {
        if (query) {
            SearchView.clearSearch();
            renderLoader(elements.searchResultsList);
            state.search = new Search(query);
            await state.search.getRecipe(); // async funtion always return a promise no matter if we tell it to return something or not
            clearLoader(elements.searchResultsList);
            SearchView.renderRecipes(state.search.recipes);
        }
    } catch(err) {
        console.log(`Search rendering ${err}`);
        SearchView.clearSearch();
    }
}

elements.searchBtn.addEventListener(`submit`, e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultsPages.addEventListener(`click`, e => {
    let btn = e.target.closest(`.btn-inline`);

    if (btn) {
        let page = +btn.dataset.goto;
        SearchView.clearSearch();
        SearchView.renderRecipes(state.search.recipes, page);
    }
})

async function controllRecipe(e) {
    let id = window.location.hash.replace(`#`, ``);

    if (id) {
        RecipeView.clearRecipe();
        renderLoader(elements.recipe);
        if (state.search) {
            SearchView.highlight(id);
        }
        state.recipe = new Recipe(id);
        try {
            await state.recipe.getRecipe();
            state.recipe.calTime();
            state.recipe.calServing();
            state.recipe.parseIngredient();
            clearLoader(elements.recipe);
            RecipeView.renderRecipe(state.recipe);
        } catch(err) {
            console.log(`Recipe rendering ${err}`);
        }
    }
}

[`hashchange`, `load`].forEach(e => {
    window.addEventListener(e, controllRecipe);
})

document.querySelector(`.recipe`).addEventListener(`click`, e => {
    if (e.target.matches(`.btn-decrease, .btn-decrease *`) && state.recipe.serving > 1) {
        state.recipe.updateServing(`-`);
    } else if (e.target.matches(`.btn-increase, .btn-increase *`) && state.recipe.serving < 100){
        state.recipe.updateServing(`+`);
    }
    RecipeView.updateServing(state.recipe);
})