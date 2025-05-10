import previewView from './previewView';
import view from './view';

class resultsView extends view {
  _parentEl = document.querySelector('.results');
  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new resultsView();
