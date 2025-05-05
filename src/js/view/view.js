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
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curMarkup = Array.from(this._parentEl.querySelectorAll('*'));
    newElement.forEach((newEle, i) => {
      const curEl = curMarkup[i];
      if (
        !newEle.isEqualNode(curEl) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(curEl)) {
        Array.from(newEle.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
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
