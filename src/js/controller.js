import * as model from './model';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';
import paginationView from './view/paginationView';
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// samour chandra paul

const controlRecipe = async function () {
  try {
    //1) render spinner
    recipeView.renderSpinner();
    // 2) get the id from the hash
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return recipeView.renderError();
    // 3) load the recipe from the api
    await model.loadRecipe(id);
    if (model.state.recipe.length === 0) return;
    // render recipe to the fontend
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearch = async function () {
  try {
    //1) render spinner
    resultsView.renderSpinner();
    // 2) get the id from the hash
    const query = searchView.getQuery();
    if (!query)
      return resultsView.renderError(`Search for your favorite food first.`);
    // 3) loadSearch results from the api
    await model.loadSearchResults(query);
    // 4) dispaly the searchResults
    resultsView.render(model.paginationResult(1));

    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.paginationResult(page));
  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.handelRecipe(controlRecipe);
  searchView.handleSearch(controlSearch);
  paginationView.handlePagination(controlPagination);
};

init();
