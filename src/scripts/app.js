// if we use export defautl we do not need the exact name but we can not export multiple files
import '../css/app.scss';
import { Search } from './models/Search.js';
import { elements, renderLoader } from './views/Base.js';
import * as SearchView from './views/SearchView.js';
import { Recipe } from './models/Recipe.js';


const state = {
};

async function controlSearch() {
    let query = SearchView.getInput();

    try {
        if (query) {
            SearchView.clean();
            renderLoader(elements.searchResultsList);
            state.search = new Search(query);
            await state.search.getRecipe(); // async funtion always return a promise no matter if we tell it to return something or not
            SearchView.clean();
            SearchView.renderRecipes(state.search.recipes);
        }
    } catch(err) {
        alert(`Search rendering ${err}`);
        SearchView.clean();
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
        SearchView.clean();
        SearchView.renderRecipes(state.search.recipes, page);
    }
})

async function controllRecipe(e) {
    let id = window.location.hash.replace(`#`, ``);

    if (id) {
        try {
            state.recipe = new Recipe(id);
            await state.recipe.getRecipe();
            // testing************
            console.log(state.recipe);
            state.recipe.parseIngredient();
            // console.log(state.recipe);
            // console.log(state.recipe);
        } catch(err) {
            alert(`Recipe rendering ${err}`)
        }
    }
}

[`hashchange`, `load`].forEach(e => {
    window.addEventListener(e, controllRecipe);
})