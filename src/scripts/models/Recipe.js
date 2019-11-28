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
            console.log(`Recipe ${error}`);
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

    updateServing(operator) {
        let newServing = eval(`${this.serving}${operator}1`);
        this.ingredients.forEach(ing => {
            ing.count *= newServing / this.serving;
        })
        this.serving = newServing;
    }

    parseIngredient() {
        let longUnits = [`tablespoon`, `ounce`, `teaspoon`, `cup`, `pound`],
            shortUnits = [`tbsp`, `oz`, `tsp`, `cup`, `pound`],
            units = [...shortUnits, `kg`, `g`];
        this.ingredients = this.ingredients.map(item => {
            longUnits.forEach((unit, i) => {
                item = item.replace(new RegExp(`${unit}s?`, `gi`), shortUnits[i]);
                item = item.replace(/ *\([^)]*\) */g, ` `);
            })
            return item;
        })
        this.ingredients = this.ingredients.map(item => {
            let obj,
                unit = ``,
                itemArray = item.split(` `),
                lastNumIndex = itemArray.findIndex((word, i) => /[0-9\/\-]+/.test(word) && /[a-z]+/i.test(itemArray[i + 1]));
            if (lastNumIndex !== -1) {
                for (let u of units) {
                    if (itemArray.includes(u)) {
                        unit = u;
                        break;
                    }
                };
                obj = {
                    count: eval(((itemArray.slice(0, lastNumIndex + 1)).join(`+`)).replace(`-`, `+`)),
                    unit,
                    ingredient: (itemArray.slice(lastNumIndex + (unit ? 2 : 1))).join(` `)
                }
            } else {
                obj = {
                    count: 1,
                    unit,
                    ingredient: item
                }
            }
            return obj;
        })
    }
}