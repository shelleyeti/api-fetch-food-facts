//returns food item in the html
foodFactory = foodItem => {
  return `
    <h3>${foodItem.name}</h3>
    <p class="ingredients">Ingredients: <br>
    ${foodItem.ingredients}</p>
    <p class="origin">Country of Origin: <br>
    ${foodItem.countryOrigin}</p>
    <p class="serving">Serving Size: <br>
    ${foodItem.servingSize}</p>
    <p class="fat">Fat per Serving: <br>
    ${foodItem.fat}</p>
    <p class="sugar">Sugar per Serving: <br>
    ${foodItem.sugar}</p>
    
    `;
};

//selects element to print to html
addFoodToDom = foodAsHTML => {
  const el = document.querySelector("#container");
  el.innerHTML += foodAsHTML;
};

//gets the api 
function getData() {
    const el = document.querySelector("#container");
    el.innerHTML = "";

    fetch("http://localhost:8088/food")
        .then(foods => foods.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                console.log(food.barcode)

                fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text
                    
                    food.countryOrigin = productInfo.product.countries
                    
                    food.servingSize = productInfo.product.serving_size

                    food.fat = productInfo.product.nutriments.fat

                    food.sugar = productInfo.product.nutriments.sugars
                    
                    const foodAsHTML = foodFactory(food);
                    addFoodToDom(foodAsHTML);
                })
            });
        });
}

//selects button on html
const getDataButton = document.getElementById("btn-getData");

//add listener for dynamic function
getDataButton.addEventListener("click", () => getData ("food.barcode"));
