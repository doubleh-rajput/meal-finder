import App from "../App";
import MealDetails from "../models/MealDetails";

class Home {


  render() {
    return ` <div class="uk-margin">
            <div
                class="uk-container  uk-margin-top uk-margin-xlarge-bottom uk-margin-xlarge-left uk-margin-xlarge-right">
                <form class="uk-grid-small uk-search uk-search-default" uk-grid name="search-form">
                    <div class="uk-width-3-4@s">
                        <input class="uk-search-input" type="search" placeholder="Search" name="s">
                    </div>
                    <div class="uk-width-1-4@s">
                        <div>
                            <div class="uk-button-group">
                                <button class="uk-button uk-button-primary">Search</button>
                                <button type="button" class="uk-button uk-button-secondary" style="margin-left: 2px;"
                                    id="random-button">Random</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid id="search-result-container">
            </div>
        </div>`
  }

  after_render = async () => {

    document.querySelector('#random-button').addEventListener('click', function () {
      App.loader.show();

      App.request(App.BASE_URL + 'random.php')
        .then(response => response.meals.length > 0 && response.meals.pop() || {})
        .then(meal => {
          let mealDetails = new MealDetails(meal);

          let id = mealDetails.id;
          history.pushState({ id }, "Details", '/details/' + id,);
        })
        .finally(() => {
          App.loader.hide();
        })
    })


    document.forms['search-form'].addEventListener('submit', function (event) {
      event.preventDefault()

      const formData = new FormData(document.querySelector('form'))
      let data = {};

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      App.loader.show();

      App.request(App.BASE_URL + 'search.php?' + new URLSearchParams(data))
        .then(response => Array.isArray(response.meals) && response.meals || [])
        .then(meals => {
          document.querySelector('#search-result-container').innerHTML = `
                    ${meals.map(meal => `
                        <div>
                            <div class="uk-card uk-card-default uk-card-hover meal-item" data-id="${meal.idMeal}">
                                <div class="uk-card-badge uk-label">${meal.strArea}</div>
                                <div class="uk-card-media-top">
                                    <img src="${meal.strMealThumb}" alt="">
                                </div>
                                <div class="uk-card-body">
                                    <h3 class="uk-card-title">${meal.strMeal}</h3>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                `
        })
        .finally(() => {
          App.loader.hide();
        });
    })


    document.querySelector('#search-result-container').addEventListener('click', function (event) {
      let id;
      let target = event.target;
      while (target !== document) {

        if (target.matches('.meal-item')) {
          id = target.dataset.id;
          break;
        }

        target = target.parentNode;
      }

      if (id) {
        history.pushState({ id, route: '/details/:id' }, "Details", '/details/' + id,);
      }
    })

  }
}


export default Home