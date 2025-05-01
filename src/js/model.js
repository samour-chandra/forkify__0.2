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
