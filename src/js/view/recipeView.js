import view from './view';

class recipeView extends view {
  _parentEl = document.querySelector('.recipe');
  handelRecipe(handle) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handle));
  }
  handleServings(handle) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const nServings = btn.dataset.updateTo;
      if (+nServings > 0) handle(+nServings);
    });
  }
  handleBookMark(handle) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handle();
    });
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
              <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="src/img/icons.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons" >
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings - 1
                  }">
                    <svg>
                      <use href="src/img/icons.svg#icon-minus-circle" ></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings + 1
                  }">
                    <svg>
                      <use href="src/img/icons.svg#icon-plus-circle" ></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
                <svg>
                  <use href="src/img/icons.svg#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="src/img/icons.svg#icon-bookmark${
                    this._data.bookMarked === true ? '-fill' : ''
                  }"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                  .map(ing => {
                    return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity ?? ''}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}g</span>
                    ${ing.description}
                  </div>
                </li>
                `;
                  })
                  .join('')}
              </ul>
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `;
  }
}

export default new recipeView();
