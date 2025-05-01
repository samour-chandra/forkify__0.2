import view from './view';

class paginationView extends view {
  _parentEl = document.querySelector('.pagination');

  handlePagination(handle) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const page = btn.dataset.goTo;
      handle(+page);
    });
  }

  _generateMarkup() {
    const totalPages = Math.ceil(
      this._data.results.length / this._data.recipePerPage
    );
    const curPage = this._data.page;
    // page 1, have others pages
    if (curPage === 1 && totalPages > 1) {
      return `
        <button data-go-to="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
      `;
      // last page and have prev pages
    } else if (totalPages === this._data.page && totalPages > 1) {
      return `
        <button data-go-to="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
      `;
      //  have next page and prev pages
    } else if (totalPages > curPage) {
      return `
      <button data-go-to="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-go-to="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    } else {
      return '';
    }

    // page1 , no others pages

    // page last no others pages
    //
  }
}

export default new paginationView();
