

const searchbtn = document.getElementById('search-btn');
const meallist = document.getElementById('meal');
const mealdetailscontent = document.querySelector('.meal-details-content');
const recipeclosebtn = document.getElementById('recipe-close-btn');

// Event listeners
searchbtn.addEventListener('click', getMealList);
meallist.addEventListener('click', getMealRecipe);
recipeclosebtn.addEventListener('click', () => {
    mealdetailscontent.parentElement.classList.remove('showrecipe');
});

// Get meal list that matches with the ingredients
function getMealList() {
    let searchinputtxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinputtxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food image">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                meallist.classList.remove('notfound');
            } else {
                html = "Sorry, we didn't find any meal!";
                meallist.classList.add('notfound');
            }
            meallist.innerHTML = html;
        });
}

// --------------getMealRecipe---------------
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        let mealId = mealItem.getAttribute('data-id');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    mealdetailscontent.innerHTML = html;
    mealdetailscontent.parentElement.classList.add('showrecipe');
}

