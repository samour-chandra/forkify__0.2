class searchView {
  _parentEl = document.querySelector('.search');

  handleSearch(handle) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handle();
    });
  }
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._parentEl.querySelector('.search__field').value = '';
    return query;
  }
}
export default new searchView();
