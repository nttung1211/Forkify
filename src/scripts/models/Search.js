import axios from 'axios';
import { cors } from '../config.js';

export class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        try {
            let response = await axios(`${cors}https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.recipes = response.data.recipes;
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }
}