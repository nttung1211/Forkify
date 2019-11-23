// if we use export defautl we do not need the exact name but we can not export multiple files
import '../css/app.scss';
import { Search } from './models/Search.js';
import { elements } from './views/Base.js';
import * as SearchView from './views/SearchView.js';



const state = {
};

async function controlSearch() {
    let query = SearchView.getInput();

    if (query) {
        state.search = new Search(query);
        await state.search.getRecipe(); // async funtion always return a promise no matter if we tell it to return something or not
        SearchView.clean();
        SearchView.renderRecipes(state.search.result);
    }
}

elements.searchBtn.addEventListener(`submit`, e => {
    e.preventDefault();
    controlSearch();
})
