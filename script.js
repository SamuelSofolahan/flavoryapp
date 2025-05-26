const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const results = document.querySelector(".results-section");
const recipeDetails = document.querySelector(".details-section");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!searchInput.value) {
    console.log("Kindly enter a recipe");
  }

  async function fetchAPI() {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();

      results.innerHTML = "";
      recipeDetails.innerHTML = "";
      recipeDetails.classList.add("hidden");

      // General data needed
      data.meals.map((meal) => {
        console.log(meal);
        const recipeImg = meal.strMealThumb;
        const recipeTitle = meal.strMeal;
        const recipePublisher = meal.strArea;
        const recipeCategory = meal.strCategory;
        const recipeInstruction = meal.strInstructions;

        // ===============================================
        // Results Section | Display Recipe Card 💥💥💥💥✅
        const displayRecipeCard = function () {
          const html = `
        <div class="recipe-card" data-id="recipe_id_here">
        <img src="${recipeImg}" alt="Recipe image" />
        <div class="info">
        <div class="title">${recipeTitle}</div>
        <div class="publisher">${recipePublisher}</div>
        </div>
        </div>
        `;
          results.classList.remove("hidden");
          results.insertAdjacentHTML("afterbegin", html);
        };
        displayRecipeCard();
        // ===============================================

        const recipeCard = document.querySelector(".recipe-card");

        //👇===============================================
        // Display Recipe details 💥💥💥💥✅
        const displayRecipeDetails = function (e) {
          recipeDetails.classList.remove("hidden");
          recipeDetails.innerHTML = "";

          const html = `
     <img
        id="recipe-image"
        src="${recipeImg}"
        alt="Recipe Image"
      />

       <h2 id="recipe-title">${recipeTitle}</h2>
      <p id="recipe-publisher">"${recipeCategory}, ${recipePublisher}"</p>
      <p id="recipe-instruction">${recipeInstruction}</p>

       <button id="btn-favorite">❤️ Add to Favorites</button>

      <h3>Ingredients</h3>
      <ul id="ingredients-list" class='ingredients-list'>
      
        <!-- JS will inject ingredients -->
      </ul>
  `;

          recipeDetails.insertAdjacentHTML("afterbegin", html);

          const ulList = document.querySelector("#ingredients-list");
          for (i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient != "" && ingredient != null) {
              const li = document.createElement("li");
              li.textContent = `${ingredient}`;
              li.textContent = `${ingredient}${measure ? ` - ${measure}` : ""}`;
              ulList.appendChild(li);
            }
          }

          const btnFavorite = document.querySelector("#btn-favorite");
          const favouriteContainer = document.querySelector(".favorites");
          // Add favorite recipe to favorite section 💥💥💥💥✅
          const addtoFavorite = function () {
            favouriteContainer.classList.remove("hidden");
            const favoriteUl = document.querySelector("#favorites-list");
            const liElement = `
            <li data-id="${meal.idMeal}" id="favoriteLi" class="favoriteLi">
            <a href="#!favorite" id="favoriteItem" class="favoriteItem" target="">
            ${meal.strMeal} - ${meal.strArea}</a
            >
            <span class="removeFavorite" id="removeFavorite">❌</span>
            </li>
            `;

            favoriteUl.insertAdjacentHTML("afterbegin", liElement);

            const favoriteLi = document.querySelector(".favoriteLi");
            const favoriteItem = document.querySelector("#favoriteItem");
            // console.log(favoriteItem);
            // Display favorite Item in new Recipe card Afresh Event Listener👂👂💥 ❌ Yet to work
            favoriteItem.addEventListener("click", function () {
              const html = `
                <div class="recipe-card" data-id="recipe_id_here">
                  <img src="${recipeImg}" alt="Recipe image" />
                <div class="info">
                <div class="title">${recipeTitle}</div>
                <div class="publisher">${recipePublisher}</div>
                </div>
                </div>
                `;
              results.innerHTML = "";
              results.classList.remove("hidden");
              recipeDetails.classList.add("hidden");
              favouriteContainer.classList.add("hidden");

              results.insertAdjacentHTML("afterbegin", html);
            });

            //👇===============================================
            // Remove List item 💥💥💥💥✅
            const removeLi = function (e) {
              const deleteLink = e.target.closest(".removeFavorite");

              if (!deleteLink) return;

              favoriteLi.remove();
            };
            favoriteLi.addEventListener("click", removeLi);
            //☝️===============================================

            //👇===============================================
            // Filter Item 💥💥💥💥 ❌ Yet to implement
            const filterInput = document.querySelector("#filter-favorites");

            filterInput.addEventListener("keyup", function () {
              console.log(filterInput.value);
            });
            //☝️===============================================
          };

          // Add favorite recipe Event listener 👂👂💥✅
          btnFavorite.addEventListener("click", addtoFavorite);
        };
        //☝️===============================================

        //👇===============================================
        // Clear all item 💥💥💥💥 ✅
        const clearBtn = document.querySelector("#btn-clear-favorites");
        const clearFavItems = function () {
          document.querySelector("#favorites-list").innerHTML = "";
        };
        clearBtn.addEventListener("click", clearFavItems);
        //☝️===============================================

        //👇===============================================
        // Display Recipe details Event listener 👂👂💥✅
        recipeCard.addEventListener("click", displayRecipeDetails);
        //☝️===============================================
      });
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  fetchAPI();

  console.log("Fetching response object in 1, 2, 3...");

  searchInput.value = "";
});
