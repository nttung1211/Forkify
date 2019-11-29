// if we use export defautl we do not need the exact name but we can not export multiple files
import '../css/app.scss';
import { elements, renderLoader, clearLoader } from './views/Base.js';
import { Search } from './models/Search.js';
import { Recipe } from './models/Recipe.js';
import { ShopList } from './models/ShopList.js';
import { Likes } from './models/Likes.js';
import * as SearchView from './views/SearchView.js';
import * as RecipeView from './views/RecipeView.js';
import * as ShopListView from './views/shopListview.js';
import * as LikesView from './views/Likesview.js';


const state = {
};

/***************************************
    ****** SEARCH CONTROLLER ******
***************************************/

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
});

elements.searchResultsPages.addEventListener(`click`, e => {
    let btn = e.target.closest(`.btn-inline`);

    if (btn) {
        let page = +btn.dataset.goto;
        SearchView.clearSearch();
        SearchView.renderRecipes(state.search.recipes, page);
    }
});

/***************************************
    ****** RECIPE CONTROLLER ******
***************************************/

async function controllRecipe() {
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
            RecipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch(err) {
            console.log(`Recipe rendering ${err}`);
        }
    }
}

[`hashchange`, `load`].forEach(e => {
    window.addEventListener(e, controllRecipe);
});

elements.recipe.addEventListener(`click`, e => {
    if (e.target.matches(`.btn-decrease, .btn-decrease *`) && state.recipe.serving > 1) {
        state.recipe.updateServing(`-`);
        RecipeView.updateServing(state.recipe);
    } else if (e.target.matches(`.btn-increase, .btn-increase *`) && state.recipe.serving < 100){
        state.recipe.updateServing(`+`);
        RecipeView.updateServing(state.recipe);
    } else if (e.target.matches(`.recipe__btn--add, .recipe__btn--add *`)) {
        controllShopList();
    } else if (e.target.matches(`.recipe__love, .recipe__love *`)) {
        controllLikes();
    }
});

/*****************************************
    ****** SHOP LIST CONTROLLER ******
*****************************************/

function controllShopList() {
    if (!state.shopList) {
        state.shopList = new ShopList();
    }
    state.recipe.ingredients.forEach(ing => {
        let item = state.shopList.addItem(ing.count, ing.unit, ing.ingredient);
        ShopListView.renderItem(item);
    })
}

elements.shopping.addEventListener(`click`, e => {
    let id = e.target.closest(`.shopping__item`).dataset.itemId;
    
    // Handle the delete button
    if (e.target.matches(`.shopping__delete, .shopping__delete *`)) {
        ShopListView.deleteItem(id);
        state.shopList.deleteItem(id);
    } 
    // Handdle the changing count button
    else if (e.target.matches(`.shopping__count-value, .shopping__count-value *`)) {
        state.shopList.updateNewCount(id, +e.target.value);
    }
});

/**************************************
    ****** LIKES CONTROLLER ******
**************************************/

function controllLikes() {
    let curId = state.recipe.id;
    if (state.likes.isLiked(curId)) {
        state.likes.deleteLike(curId);
        LikesView.toggleLikeBtn(true);
        LikesView.removeLikedItem(curId);
    } else {
        let newLike = state.likes.addLike(curId, state.recipe.title, state.recipe.publisher, state.recipe.img);
        LikesView.toggleLikeBtn(false);
        LikesView.renderLikeMenu(newLike);
    }
    LikesView.toggleLikeMenu(state.likes.getNumLikes());
}

/****************************************************
    ****** RETRIEVE DATA FORM LOCALSTORAGE ******
****************************************************/

window.addEventListener(`load`, () => {
    state.likes = new Likes();
    LikesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => {
        LikesView.renderLikeMenu(like);
    });
});



// function addChangeFunc() {
//     let inps = document.querySelectorAll(`.shopping__count-value`);
//     inps.forEach(inp => {
//         inp.addEventListener(`input`, e => {
//             e.stopImmediatePropagation();
//             let id = e.target.closest(`.shopping__item`).dataset.itemId;
//             state.shopList.updateNewCount(id, +e.target.value);
//         })
//     })
// }

// function addDelFunc() {
//     elements.shopping.addEventListener(`click`, e => {
//         e.stopImmediatePropagation();
//         if (e.target.matches(`.shopping__delete, .shopping__delete *`)) {
//             let id = e.target.closest(`.shopping__item`).dataset.itemId;
//             ShopListView.deleteItem(id);
//             state.shopList.deleteItem(id);
//         }
//     });
// }
// with this way every time we click on shopping, an event listener will be created an attached then there will be a lot of events exist that why we need to stopimmediatepropagation.