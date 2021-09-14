import Router from './Router'

const App = (function () {
  const loader = document.querySelector('#loader');
  const history = window.history;

  (function (history) {
    var pushState = history.pushState;

    history.pushState = function (state) {
      pushState.apply(history, arguments);

      if (typeof history.onpushstate == "function") {
        history.onpushstate({ state: state });
      }

      return true;
      // ... whatever else you want to do
      // maybe call onhashchange e.handler
    };
  })(history);


  return {
    request(url) {
      return fetch(url).then(data => data.json())
    },
    loader: {
      hide() {
        loader.style.visibility = "hidden"
      },
      show() {
        loader.style.visibility = "visible"
      }
    },
    BASE_URL: 'https://www.themealdb.com/api/json/v1/1/',
    router: Router,
    history
  }
})();

export default App