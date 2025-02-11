const searchBtn = document.querySelector('#search-icon');
const searchArea = document.querySelector('.search-area');
const searchForm = document.querySelector('.searchBar');
const mealImg = document.querySelector('#meal-img');
const description = document.querySelector('.description');
const ytLink = document.querySelector('a');
const ingredientShower = document.querySelector('.incredients');
let value = 'burger';

//strYoutube
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  value = searchArea.value;
  getApiData(value);
});

const ingredients = [];

async function getApiData(value) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const { meals } = await response.json();
    mealImg.src =
      meals[0].strMealThumb ||
      'https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg';
    description.innerText = meals[0].strInstructions || '';
    ytLink.href = meals[0].strYoutube;

    for (let i = 0; i <= 20; i++) {
      if (meals[0][`strIngredient${i}`] && meals[0][`strMeasure${i}`]) {
        ingredients.push(
          `${meals[0][`strIngredient${i}`]} - ${meals[0][`strMeasure${i}`]}`
        );
      }
    }
    ingredientShower.innerHTML = '';
    if (ingredients.length > 0) {
      ingredients.map((item) => {
        ingredientShower.innerHTML += `<div class="item">${item}</div>`;
      });
    }
    console.log(ingredients);

    console.log(meals);
  } catch (err) {
    console.log(err);
  }
}
