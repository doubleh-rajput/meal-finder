class MealDetails {
  constructor(meal) {
    this.meal = meal;
  }

  get image() {
    return this.meal.strMealThumb
  }

  get id() {
    return this.meal.idMeal
  }

  get description() {
    return this.meal.strInstructions
  }

  get name() {
    return this.meal.strMeal
  }

  get category() {
    return this.meal.strCategory
  }

  get area() {
    return this.meal.strArea
  }

  get ingredients() {
    return [...{
      i: 1,
      meal: this.meal,
      [Symbol.iterator]() {
        return this
      },
      next() {
        let measure = 'strMeasure' + this.i;
        let ingredient = 'strIngredient' + this.i++;
        let ingredientValue = this.meal[ingredient] && this.meal[ingredient].trim() || ""

        return {
          done: !Reflect.has(this.meal, ingredient) || ingredientValue === "",
          value: `${ingredientValue} - ${this.meal[measure]}`
        }
      }
    }]
  }
}

export default MealDetails