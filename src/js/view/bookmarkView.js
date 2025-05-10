import previewView from './previewView';
import view from './view';

class bookmarkView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
  handleBookMark(handle) {
    window.addEventListener('load', handle);
  }
}

export default new bookmarkView();
