import App from "../App"
import MealDetails from "../models/MealDetails"

class Details {

  data = {
    image: 'https://getuikit.com/docs/images/light.jpg',
    name: '',
    description: '',
    category: '',
    area: '',
    ingredients: []
  }


  async render() {

    App.loader.show();

    const meal = await App.request(App.BASE_URL + 'lookup.php?i=' + history.params.id)
      .then(response => response.meals.length > 0 && response.meals.pop() || {})
      .finally(() => { App.loader.hide() })

    let mealDetails = new MealDetails(meal);
    const { image, name, description, category, area, ingredients } = mealDetails
    return `<div class="uk-child-width-expand@s" uk-grid>
            <div>
                <span uk-icon="icon:  chevron-left"></span>
                <button class="uk-button uk-button-default" id="back-button">Back</button>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>

        <div class="uk-grid-collapse uk-child-width-expand@s uk-margin-large-top" uk-grid>
            <div>
                <div class="uk-background uk-padding">
                    <img data-src="${image}" alt="" uk-img>
                </div>
            </div>
            <div>
                <div class="uk-background">
                    <article class="uk-article">

                        <h1 class="uk-article-title">
                          <a class="uk-link-reset" href="">${name}</a>
                        </h1>

                        <p class="uk-article-meta">
                          ${category}
                        </p>

                        <p>
                          ${description}
                        </p>

                        <div class="uk-grid-small uk-child-width-auto" uk-grid>
                            <div>
                                <a class="uk-button uk-button-text" href="#">Ingredients</a>
                            </div>
                            <br />

                        </div>
                        <div class="">
                            ${ingredients.map(i => `<span class="uk-badge">${i}</span>`).join('')}
                        </div>
                    </article>
                </div>
            </div>
        </div>`
  }

  after_render = async () => {
    document.querySelector('#back-button').addEventListener('click', function () {
      App.history.pushState({}, "Home", '/');
    })
  }

}


export default Details