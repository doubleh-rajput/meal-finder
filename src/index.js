import App from './App'

function init() {

  // Listen on path change:

  window.onpopstate = history.onpushstate = App.router

  // Listen on page load:
  window.addEventListener('load', App.router);

}

init();