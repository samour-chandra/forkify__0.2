export default class view {
  _data;
  _errorMessage = 'No recipes found for your query. Please try again!';
  render(data) {
    if (data.length === 0)
      return this.renderError(
        `We don't have this food right now, sorry. Please try something else`
      );
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const errorMarkup = `
        <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
      `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterBegin', errorMarkup);
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
        </div>
      `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterBegin', markup);
  }
  clear() {
    this._parentEl.innerHTML = '';
  }
}
