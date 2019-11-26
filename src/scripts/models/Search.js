import axios from 'axios';

export class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        try {
            const response = await axios(`https://cors-anywhere.herokuapp.com/https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.recipes = response.data.recipes;
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }
}