import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
    recipe: { },
    search: {
      query: '',
      results: [],
    }
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);
    
        const {recipe} = data.data;
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        };
    
        // if(!res.ok) {
        //   throw new Error(`${data.message} ${res.status}`);
        // }
        console.log(state.recipe);
    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const loadSearchResults = async function(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

loadSearchResults('pizza');