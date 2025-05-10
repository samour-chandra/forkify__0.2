import { RECIPE_URL } from './config';
import { getJson } from './helper';

export const state = {
  recipe: {},
  search: {
    results: {},
    query: '',
    recipePerPage: 10,
    page: 1,
  },
  bookMark: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${RECIPE_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };
    if (state.bookMark.some(bookmark => bookmark.id === id)) {
      state.recipe.bookMarked = true;
    } else {
      state.recipe.bookMarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${RECIPE_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(element => {
      return {
        id: element.id,
        title: element.title,
        publisher: element.publisher,
        image: element.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const paginationResult = function (curPage = state.search.page) {
  state.search.page = curPage;
  const fristIndex = (curPage - 1) * state.search.recipePerPage;
  const lastIndex = curPage * state.search.recipePerPage;
  return state.search.results.slice(fristIndex, lastIndex);
};

export const updateServing = function (newSurvings) {
  state.recipe.ingredients.forEach(ingr => {
    ingr.quantity = (ingr.quantity * newSurvings) / state.recipe.servings;
  });
  state.recipe.servings = newSurvings;
};

const saveData = function () {
  localStorage.setItem('bookMarks', JSON.stringify(state.bookMark));
};

export const bookMark = function (recipe) {
  //  add bookMark
  state.bookMark.push(recipe);
  // marked current recipe as book mark
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  console.log(state.bookMark);

  // save data in the server
  saveData();
};

export const deleteBookMark = function (id) {
  const index = state.bookMark.findIndex(recipe => recipe.id === id);

  // delete the recipe from the bookmark
  state.bookMark.splice(index, 1);
  // marked current recipe is not bookMark
  if (id === state.recipe.id) state.recipe.bookMarked = false;
  console.log(state.bookMark);
  // delete data from the bookMarks
  saveData();
};

const init = function () {
  const stroge = localStorage.getItem('bookMarks');
  if (stroge) state.bookMark = JSON.parse(stroge);
};

init();
