import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //1. Loading recipe
    const { recipe } = model.state;

    //2. Render recipe
    recipeView.render(model.state.recipe);

  } catch(error) {
    recipeView.renderError();
    // alert(error);
  }
}

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) {
      return;
    }

    console.log('query below');
    console.log(query);

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);

  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
