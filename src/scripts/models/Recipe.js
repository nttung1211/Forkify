import axios from 'axios';
import { cors } from '../config.js';

export class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            let response = await axios(`${cors}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = response.data.recipe.title;
            this.publisher = response.data.recipe.publisher;
            this.img = response.data.recipe.image_url;
            this.source = response.data.recipe.source_url;
            this.ingredients = response.data.recipe.ingredients;

        } catch(error) {
            console.log(error);
        }
    }

    calTime() {
        // let say we need 15 mins for every 3 ingredients
        let numRecipes = this.ingredients.length;
        let peridos = Math.ceil(numRecipes / 3);
        this.time = peridos * 15;
    }

    calServing() {
        this.serving = 4;
    }
}