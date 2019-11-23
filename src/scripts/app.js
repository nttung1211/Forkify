import '../css/app.scss';
import axios from 'axios';
import { name as ten } from './models/Search.js';
// if we use export defautl we do not need the exact name but we can not export multiple files
// we import using * ex: import * as objecName form '...'; it will an object 

async function getRecipe(query) {
    try {
        // const recipe = await axios(`https://forkify-api.herokuapp.com/api/search?key=f438tu34jf&q=${query}`);
        const response = await axios(`https://cors-anywhere.herokuapp.com/https://forkify-api.herokuapp.com/api/search?q=${query}`);
        console.log(response);
        console.log(response.data.recipes);
    } catch(error) {
        console.log(error);
    }
}
getRecipe(`bacon`);
