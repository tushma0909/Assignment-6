// Categories Container--------------------------------------------------------
const loadCategoriesTree = async() => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    const res = await fetch(url);
    const json = await res.json();
    displayCategoriesTree(json.categories);
}

    // Show Categories
const displayCategoriesTree = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach((category) => {
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.innerHTML = `
        <button id="activeBtn-${category.id}" onclick="loadSelectedPlants(${category.id})" class="hover:bg-[#40a164] hover:text-white md:px-3 md:py-2 px-8 py-3 w-fit md:w-full md:text-left cursor-pointer rounded-xl text-center category-btn">
        ${category.category_name}
        </button>
    `
    categoriesContainer.appendChild(div);
    })
}



// All Plants Data in Middle Containers----------------------------------------
const loadAllPlantsDefault = async() => {
    loadingSpinner(true);
    const url = 'https://openapi.programming-hero.com/api/plants';
    const res = await fetch(url);
    const json = await res.json();
    showAllPlantsDefault(json.plants);
}

    // Show All Plants
const showAllPlantsDefault = (plants) => {
    const allPlantsContainer = document.getElementById('all-plants-container');
    plants.map(plant => {
        const div = document.createElement('div');
        div.innerHTML = `
                        <div class="p-4 bg-white rounded-lg space-y-5 flex items-center justify-between flex-col w-full">
                            <img class="bg-cover rounded-lg w-full h-52 object-cover" src="${plant.image}" alt="">
                            <h2 onclick="openModalByName(${plant.id})" class="font-semibold text-left w-full">${plant.name}</h2>
                            <p class="text-[#4C545F] text-sm text-justify">${plant.description}</p>
                            <div class="flex items-center justify-between w-full text-sm md:text-base">
                                <button class="text-[#15803D] bg-[#DCFCE7] rounded-3xl px-4 py-1 font-medium cursor-pointer">${plant.category}</button>
                                <p class="font-semibold">৳<span>${plant.price}</span></p>
                            </div>
                            <button onclick="addToCartBtn(${plant.id})" class="bg-[#15803D] text-white rounded-3xl w-full px-3 py-2 lg:px-5 lg:py-3 cursor-pointer font-medium">Add to Cart</button>
                        </div>
        `
        allPlantsContainer.appendChild(div);
        loadingSpinner(false);
    })
}



// Plants show by Categories--------------------------------------------------------
const loadSelectedPlants = async(id) => {
    loadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    // Remove Active Button before select category
    removeActiveBtn();

    // Show Active Button
    const showActiveBtn = document.getElementById(`activeBtn-${id}`);
    showActiveBtn.classList.add("bg-[#15803D]","text-white");

    showSelectedPlantsByCategory(json.plants);
}

    // Show Plants by categories
const showSelectedPlantsByCategory = (plants) => {
    loadingSpinner(true)
    const allPlantsContainer = document.getElementById('all-plants-container');
    allPlantsContainer.innerHTML = "";
    plants.forEach(plant => {
        const div = document.createElement('div');
        div.innerHTML = `
                        <div class="p-4 bg-white rounded-lg space-y-5 flex items-center justify-between flex-col w-full">
                            <img class="bg-cover rounded-lg w-full h-52 object-cover" src="${plant.image}" alt="">
                            <h2 onclick="openModalByName(${plant.id})" class="font-semibold text-left w-full">${plant.name}</h2>
                            <p class="text-[#4C545F] text-sm text-justify">${plant.description}</p>
                            <div class="flex items-center justify-between w-full text-sm md:text-base">
                                <button class="text-[#15803D] bg-[#DCFCE7] rounded-3xl px-4 py-1 font-medium cursor-pointer">${plant.category}</button>
                                <p class="font-semibold">৳<span>${plant.price}</span></p>
                            </div>
                            <button onclick="addToCartBtn(${plant.id})" class="bg-[#15803D] text-white rounded-3xl w-full px-3 py-2 lg:px-5 lg:py-3 cursor-pointer font-medium">Add to Cart</button>
                        </div>
        `
        allPlantsContainer.appendChild(div);
        loadingSpinner(false);
    })
}



// Open Modal for Each Card--------------------------------------------------------
const openModalByName = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    showModalForCard(json.plants)
}

    // Show Modal
const showModalForCard = (plant) => {
    const modalContainer = document.getElementById('modal-details');
    modalContainer.innerHTML =`
                            <div class="space-y-3">
                                <h2 class="font-semibold">${plant.name}</h2>
                                <img class="bg-cover rounded-lg w-full h-52 object-cover" src="${plant.image}" alt="">
                                <p><span class="font-semibold">Category:</span> ${plant.category}</p>
                                <p><span class="font-semibold">Price:</span> ৳${plant.price}</p>
                                <p><span class="font-semibold">Description: </span><span class="text-[#4C545F] text-sm text-justify">${plant.description}</span>
                            </div>
    `
    document.getElementById('modal_container').showModal();
}



// Add to Cart features-------------------------------------------------------------
const addToCartBtn = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    showOnCart(json.plants)
}

// Show on Cart
const showOnCart = (plant) => {
    alert(`${plant.name} has been added to the cart.`);
    const cartAddedContainer = document.getElementById('cart-added-container');
    const div = document.createElement('div');
    div.innerHTML = `
                <div id="cart-${plant.id}" class="flex items-center justify-between bg-[#F0FDF4] px-3 py-2 rounded-lg">
                    <div class="space-y-2">
                        <h3 class="font-semibold">${plant.name}</h3>
                        <p class="text-[#879395]">৳<span>${plant.price}</span> x 1</p>
                    </div>  
                    <button onclick="removeCart(${plant.price}, ${plant.id})" class="fa-solid fa-xmark cursor-pointer"></button>
                </div>
    `
        cartAddedContainer.appendChild(div);
    
    // Total Amount
    const totalAmount = Number(document.getElementById('total-amount').innerText);
    const plantPrice = plant.price;
    
    // Update total amount
    document.getElementById('total-amount').innerText = totalAmount + plantPrice;
}



// Remove Cart-----------------------------------------------------------------------
const removeCart = (price, id) => {
    // Total Amount
    const totalAmount = Number(document.getElementById('total-amount').innerText);
    const removeCartPrice = price;
    
    // Remove Tree Amount
    const reducePrice = totalAmount - removeCartPrice;
    document.getElementById('total-amount').innerText = reducePrice;
    
    // Remove Cart
    // btn.closest('.cart').remove();
    // btn.parentElement.remove()
    document.getElementById(`cart-${id}`).remove();
}


// Loading Spinner--------------------------------------------------------------------
const loadingSpinner = (status) => {
    if(status === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('hide-when-loading').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('hide-when-loading').classList.remove('hidden');
    }
}



// Remove Active Button---------------------------------------------------------------
const removeActiveBtn = () => {
    const categoryBtn = document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn => {
        btn.classList.remove("bg-[#15803D]","text-white");
    })
}



loadCategoriesTree();
loadAllPlantsDefault();