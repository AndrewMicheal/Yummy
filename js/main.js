let loading = document.querySelector(".custom-loader");
let rowHome = document.querySelector(".row.row-home");
let rowMealDetail = document.querySelector(".row.row-meal-detail");
let openIcon = document.querySelector(".open");
let closeIcon = document.querySelector(".close");

let arr = [];
let id;
let mealDetail;
let asideBar = document.querySelector(".asideBar");
let loadFlag = false;
let search = document.querySelector(".search");
let searchContent = document.querySelector(".search-content");
let sideBarNav = document.querySelector(".asideBar .side-bar-contents");
let searchByName = document.querySelector(".searchByName");
let item = $(".left ul li");
let socialMedia = document.querySelector(".left .social-media");
let rowMealSearch = document.querySelector(".row-meal-search");
let categories = document.getElementById("categories");
let categoryContent = document.querySelector(".category-content");
let allCategoryData;
let categoryContentFilter = document.querySelector(".category-content-filter");
let categoryFontentFilterDetail = document.querySelector(".category-content-filter-detail");
let categoryItem;
let area = document.querySelector(".area");
let allArea = document.querySelector(".all-area");
let areaFoods = document.querySelector(".area-foods");
let allAreaData;
let ingridents = document.querySelector(".ingridents");
let allIngrdients = document.querySelector(".all-ingrdients");
let ingrdientsFoods = document.querySelector(".ingrdients-foods");
let allIngrdeintsData;
let contactUs = document.querySelector(".contact-us");
let contactUsContent = document.querySelector(".contact-us-content");
let searchArr = [];

let userName = document.querySelector(".userName");
let alertName = document.getElementById("alertName");
let userNameFlag =false;

let email = document.querySelector(".email");
let alertEmail = document.getElementById('alertEmail');
let emailFlag = false;

let phone = document.querySelector(".phone");
let alertPhone = document.getElementById("alertPhone");
let phoneFlag = false;

let age = document.querySelector(".age");
let alertAge = document.getElementById("alertAge");
let ageFlag = false;

let password = document.querySelector(".password");
let alertPassword = document.getElementById("alertPassword");
let passwordFlag = false;

let repassword = document.querySelector(".repassword");
let alertRepassword = document.getElementById("alertRepassword");
let rePasswordFlag = false;

let myBtnSubmit = document.querySelector(".my-btn-submit");

function hideElements() {
    searchContent.classList.add("d-none");
    rowHome.classList.add("d-none");
    rowMealDetail.classList.add("d-none");
    categoryContent.classList.add("d-none");
    categoryContentFilter.classList.add("d-none");
    categoryFontentFilterDetail.classList.add("d-none");
    allArea.classList.add("d-none");
    areaFoods.classList.add("d-none");
    ingrdientsFoods.classList.add("d-none");
    allIngrdients.classList.add("d-none");
    rowMealSearch.classList.add("d-none");
    contactUsContent.classList.add("d-none");
}

async function data(url) {
    if (!loadFlag) {
        asideBar.classList.add("d-none")
        rowHome.classList.replace("d-flex", "d-none");
        loading.classList.replace("d-none", "d-block");
    }
    let api = await fetch(`${url}`);
    let apiResponse = await api.json();
    loadFlag = true;
    if (loadFlag) {
        asideBar.classList.remove("d-none");
        rowHome.classList.replace("d-none", "d-flex");
        loading.classList.add("d-none");
        loadFlag = false;
    }
    return apiResponse.meals;
}
async function getMealsByName() {
    let res = await data(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    arr = [...res];
    getData();
}

function getData() {
    let cartoona = ``;
    hideElements();
    rowHome.classList.replace("d-none", "d-flex");
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 mb-3" onclick = getDetails(${i})>
                        <div class="home-content">
                            <div class="image">
                                <img src='${arr[i].strMealThumb}' class = "w-100" alt="${arr[i].strMeal}">
                            </div>
                            <div class="overlay">
                                <div class="overlay-content d-flex align-items-center w-100 h-100 ps-2">
                                    <h2>${arr[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                     </div>`
    }

    rowHome.innerHTML = cartoona;
}

async function getDetails(index) {
    id = arr[index].idMeal;
    mealDetail = await data(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    hideElements();
    rowMealDetail.classList.replace("d-none", "d-flex");
    getMealDetail(mealDetail);
}

function getMealDetail(detail) {
    let rowElements = ``;
    for (let i = 0; i < detail.length; i++) {
        rowElements += `<div class="col-md-4">
                        <div class="image-content">
                            <div class="image">
                                <img src="${detail[i].strMealThumb}" class="w-100" alt="">
                            </div>
                            <h2 class="ps-3 mt-1">${detail[i].strMeal}</h2>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="item">
                            <h3>Instructions</h3>
                            <p class="mt-4">${detail[i].strInstructions}</p>
                            <div class="mt-2">
                                <span class="my-font">Area : ${detail[i].strArea}</span>
                            </div>
                            <div class="mt-2">
                                <span class="my-font">Category : ${detail[i].strCategory}</span>
                            </div>
                            <div class="mt-2">
                                <span class="recipe-font">Recipes :</span>
                            </div>`
        rowElements += `<ul class="d-flex meal-recipe">`
        Object.keys(detail[0]).forEach(key => {
            if (key.startsWith('strIngredient') && detail[0][key] !== "") {
                const measureKey = key.replace('strIngredient', 'strMeasure');
                rowElements += `
                                        <li>
                                            <span>${detail[0][measureKey]} ${detail[0][key]}</span>
                                        </li>`;
            }

        })
        rowElements += `</ul>`

        rowElements += `<div>
                                <span class="tags-font mb-3 d-block">Tags :</span>`
        if (detail[i].strTags != null) {
            let arrSplit = detail[i].strTags.split(",")
            rowElements += `<div class = "d-flex removeComma">`
            for (let index = 0; index < arrSplit.length; index++) {
                rowElements += `<span class="d-inline-block alert my-alert alert-danger">${arrSplit[index]}</span>`
            }
            rowElements += `</div>`
            // ${detail[i].strTags != null ? `<span class="d-inline-block alert my-alert alert-danger">${detail[i].strTags}</span>`: `` } 
        }

        rowElements += `<div class="buttons mt-3">
                                <button class="btn btn-success me-1" onclick = "goToSource()">Source</button>
                                <button class="btn btn-danger" onclick = "goToYoutube()">Youtube</button>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    rowMealDetail.innerHTML = rowElements;
}

function goToSource() {
    window.open(`${mealDetail[0].strSource}`, "_blank");
}

function goToYoutube() {
    window.open(`${mealDetail[0].strYoutube}`, "_blank");
}

getMealsByName();

// search
search.onclick = async function () {
    hideElements();
    searchContent.classList.replace("d-none", "d-flex");
}

async function getSearchDetail(index) {
    id = searchArr[index].idMeal;
    let test = await data(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log(test);
    rowHome.classList.replace("d-flex", "d-none");
    rowMealDetail.classList.replace("d-none", "d-flex");
    // getMealDetail(mealDetail);
    rowHome.classList.add("d-none");
}

 // End search

$(".barsIcon").click(function () {
    let transitionDelay = 0;
    if ($(".left").css("width") == "0px") {
        $(".left").animate({ width: "250px" }, 500, function () {
            socialMedia.classList.remove("d-none");
        });
        $(".left ul").animate({ width: "100%" }, 1000);

        for (var i = 0; i < item.length; i++) {
            item.eq(i).css({ transform: "translateY(0%)", "transition-property:": "translateY", "transition-duration": ".5s", "transition-delay": `${transitionDelay}s` });
            item.eq(i).css({ opacity: "1", "transition-property:": "opacity", "transition-duration": ".5s", "transition-delay": `${transitionDelay}s` });
            item.eq(i).addClass("mb-3");
            transitionDelay += 0.5;
        }
        openIcon.classList.add("d-none");
        closeIcon.classList.remove("d-none");
        asideBar.classList.add("z-index");
        asideBar.classList.remove("w-70")

    }
    else {
        let start = 480;
        for (var i = 0; i < item.length; i++) {
            item.eq(i).css({ transform: `translateY(${start}%)`, "transition-property:": "translateY", "transition-duration": ".5s" });
            item.eq(i).css({ opacity: "0", "transition-property:": "opacity", "transition-duration": ".5s", "transition-delay": `0.01s` });
            start += 20;
            item.eq(i).addClass("mb-4");
        }
        $(".left").animate({ width: "0%" }, 100);
        $(".left ul").animate({ width: "-700px" }, 100);
        openIcon.classList.remove("d-none");
        closeIcon.classList.add("d-none");
        socialMedia.classList.add("d-none");
        asideBar.classList.add("z-index");
        asideBar.classList.add("w-70")

    }
});

// Category
categories.onclick = async function () {
    if (!loadFlag) {
        asideBar.classList.add("d-none")
        rowHome.classList.replace("d-flex", "d-none");
        loading.classList.replace("d-none", "d-block");
    }
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let apiResponse = await api.json();
    loadFlag = true;
    if (loadFlag) {
        asideBar.classList.remove("d-none");
        hideElements();
        loading.classList.add("d-none");
        loadFlag = false;
    }
    displayAllCategories(apiResponse.categories)
}

function displayAllCategories(items) {
    let cartoona = ``;
    allCategoryData = items;
    hideElements();
    categoryContent.classList.replace("d-none", "d-flex");
    for (let i = 0; i < items.length; i++) {
        cartoona += `<div class="col-md-3 mb-3" onclick = "filterByCategory(${i})">
                        <div class="home-content">
                            <div class="image">
                                <img src='${items[i].strCategoryThumb}' class = "w-100 rounded" alt="${items[i].strCategory}">
                            </div>
                            <div class="overlay">
                                <div class="overlay-content w-100 h-100 ">
                                    <h2 class = "text-center pt-2">${items[i].strCategory}</h2>
                                    <p class = "mt-1 text-center">${items[i].strCategoryDescription.split(".")[0]}</p>
                                </div>
                            </div>
                        </div>
                     </div>`
    }

    categoryContent.innerHTML = cartoona;
}

async function filterByCategory(index) {
    let filterData = await data(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${allCategoryData[index].strCategory}`);
    getFilterCategoryData(filterData.slice(0, 20));
}

function getFilterCategoryData(arr) {
    let cartoona = ``;
    hideElements();
    categoryContentFilter.classList.replace("d-none", "d-flex");
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 mb-3" onclick = getCategoryID(${arr[i].idMeal})>
                        <div class="home-content">
                            <div class="image">
                                <img src='${arr[i].strMealThumb}' class = "w-100" alt="${arr[i].strMeal}">
                            </div>
                            <div class="overlay">
                                <div class="overlay-content d-flex align-items-center w-100 h-100 ps-2">
                                    <h2>${arr[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                     </div>`
    }

    categoryContentFilter.innerHTML = cartoona;
}

async function getCategoryID(id) {
    categoryItem = await data(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    getCategoryDetails(categoryItem);
}

function getCategoryDetails(detail) {
    let rowElements = ``;
    hideElements();
    categoryFontentFilterDetail.classList.replace("d-none", "d-flex");
    for (let i = 0; i < detail.length; i++) {
        rowElements += `<div class="col-md-4 text-white">
                        <div class="image-content">
                            <div class="image">
                                <img src="${detail[i].strMealThumb}" class="w-100" alt="">
                            </div>
                            <h2 class="ps-3 mt-1">${detail[i].strMeal}</h2>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="item">
                            <h3>Instructions</h3>
                            <p class="mt-4">${detail[i].strInstructions}</p>
                            <div class="mt-2">
                                <span class="my-font">Area : ${detail[i].strArea}</span>
                            </div>
                            <div class="mt-2">
                                <span class="my-font">Category : ${detail[i].strCategory}</span>
                            </div>
                            <div class="mt-2">
                                <span class="recipe-font">Recipes :</span>
                            </div>`
        rowElements += `<ul class="d-flex meal-recipe">`
        Object.keys(detail[0]).forEach(key => {
            if (key.startsWith('strIngredient') && detail[0][key] !== "" && detail[0][key] != null) {
                const measureKey = key.replace('strIngredient', 'strMeasure');
                rowElements += `
                                        <li>
                                            <span>${detail[0][measureKey]} ${detail[0][key]}</span>
                                        </li>`;
            }

        })
        rowElements += `</ul>`

        rowElements += `<div>
                                <span class="tags-font mb-3 d-block">Tags :</span>`
        if (detail[i].strTags != null) {
            let arrSplit = detail[i].strTags.split(",")
            rowElements += `<div class = "d-flex removeComma">`
            for (let index = 0; index < arrSplit.length; index++) {
                rowElements += `<span class="d-inline-block alert my-alert alert-danger">${arrSplit[index]}</span>`
            }
            rowElements += `</div>`
            // ${detail[i].strTags != null ? `<span class="d-inline-block alert my-alert alert-danger">${detail[i].strTags}</span>`: `` } 
        }

        rowElements += `<div class="buttons mt-3">
                                <button class="btn btn-success me-1" onclick = "goCategoryToSource()">Source</button>
                                <button class="btn btn-danger" onclick = "goCategoryToYoutube()">Youtube</button>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    categoryFontentFilterDetail.innerHTML = rowElements;
}

function goCategoryToSource() {
    window.open(`${categoryItem[0].strSource}`, "_blank");
}

function goCategoryToYoutube() {
    window.open(`${categoryItem[0].strYoutube}`, "_blank");
}
// ********************* End CateGory ******************************

// area

area.onclick = async function () {
    if (!loadFlag) {
        asideBar.classList.add("d-none")
        rowHome.classList.replace("d-flex", "d-none");
        loading.classList.replace("d-none", "d-block");
    }
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let apiResponse = await api.json();
    loadFlag = true;
    if (loadFlag) {
        asideBar.classList.remove("d-none");
        hideElements();
        loading.classList.add("d-none");
        loadFlag = false;
    }
    displayAllAreas(apiResponse.meals)
}

function displayAllAreas(items) {
    let cartoona = ``;
    allAreaData = items;
    hideElements();
    allArea.classList.replace("d-none", "d-flex");

    for (let i = 0; i < items.length; i++) {
        cartoona += `<div class="area-cursor col-md-3 mb-3" onclick = "filterByArea(${i})">
                        <div class="home-content me-3">
                            <div class="image">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                            </div>
                            <h2 class = "mt-1">${items[i].strArea}</h2>
                        </div>
                     </div>`
    }

    allArea.innerHTML = cartoona;
}

async function filterByArea(index) {
    let filterData = await data(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${allAreaData[index].strArea}`);
    getFilterAreaData(filterData);
}

function getFilterAreaData(arr) {
    let cartoona = ``;
    hideElements();
    areaFoods.classList.replace("d-none", "d-flex");
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 mb-3" onclick = getCategoryID(${arr[i].idMeal})>
                        <div class="home-content">
                            <div class="image">
                                <img src='${arr[i].strMealThumb}' class = "w-100" alt="${arr[i].strMeal}">
                            </div>
                            <div class="overlay">
                                <div class="overlay-content d-flex align-items-center w-100 h-100 ps-2">
                                    <h2 style = "color : #000">${arr[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                     </div>`
    }

    areaFoods.innerHTML = cartoona;
}

// Ingrdients

ingridents.onclick = async function () {
    if (!loadFlag) {
        asideBar.classList.add("d-none")
        rowHome.classList.replace("d-flex", "d-none");
        loading.classList.replace("d-none", "d-block");
    }
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let apiResponse = await api.json();
    loadFlag = true;
    if (loadFlag) {
        asideBar.classList.remove("d-none");
        hideElements();
        loading.classList.add("d-none");
        loadFlag = false;
    }
    displayAllIngridents(apiResponse.meals.slice(0,20))
}

function displayAllIngridents(items) {
    let cartoona = ``;
    allIngrdeintsData = items;
    hideElements();
    allIngrdients.classList.replace("d-none", "d-flex");
    for (let i = 0; i < items.length; i++) {
        const description = items[i].strDescription;
        cartoona += `<div class="area-cursor col-md-3 mb-3" onclick = "filterByIngrdeint(${i})">
                        <div class="home-content me-3">
                            <div class="image">
                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            </div>
                            <h4 class = "mt-1">${items[i].strIngredient}</h4>
                            <p class = "mt-1">${items[i].strDescription.slice(0,100)}</p>
                        </div>
                     </div>`
    }

    allIngrdients.innerHTML = cartoona;
}

async function filterByIngrdeint(index) {
    let filterData = await data(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${allIngrdeintsData[index].strIngredient}`);
    getFilterAreaData(filterData.slice(0,20));
}

function getFilterAreaData(arr) {
    let cartoona = ``;
    hideElements();
    ingrdientsFoods.classList.replace("d-none", "d-flex");
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 mb-3" onclick = getCategoryID(${arr[i].idMeal})>
                        <div class="home-content">
                            <div class="image">
                                <img src='${arr[i].strMealThumb}' class = "w-100" alt="${arr[i].strMeal}">
                            </div>
                            <div class="overlay">
                                <div class="overlay-content d-flex align-items-center w-100 h-100 ps-2">
                                    <h2 style = "color : #000">${arr[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                     </div>`
    }

    ingrdientsFoods.innerHTML = cartoona;
}

// Contact us

contactUs.onclick = function() {
    hideElements();
    contactUsContent.classList.replace("d-none" , "d-flex");
}

function checkName() {
    var regexName = /^([a-zA-Z]+\s*[A-Z]*)+$/;
    if (regexName.test(userName.value.trim())) {
      alertName.classList.add("d-none");
      userNameFlag = true;
    } 
    else {
      alertName.classList.remove("d-none");
      userName.value.trim() == "" ? (alertName.innerHTML = "please fill input Name") : (alertName.innerHTML = "Enter Name in characters only");
      userNameFlag = false;
    }
    checkFlags()
}

function checkEmail(){
    var regexEmail = /^\w+([-_.]\w+)*@\w+([.-]\w+)*\.\w+([-.]\w+)*$/;
    if (regexEmail.test(email.value.trim())) {
      alertEmail.classList.add("d-none");
      emailFlag = true;
    } 
    else {
      alertEmail.classList.remove("d-none");
      email.value.trim() == "" ? (alertEmail.innerHTML = "please fill input Email Text") : (alertEmail.innerHTML = "please enter Email Format");
      emailFlag  =  false;
    }
    checkFlags()
  }

  function checkPhone(){
    var regexPhone = /^(010|011|012|015)\d{8}$/;
    if (regexPhone.test(phone.value.trim())) {
      alertPhone.classList.add("d-none");
      phoneFlag = true
    } 
    else {
      alertPhone.classList.remove("d-none");
      phone.value.trim() == "" ? (alertPhone.innerHTML = "please fill input Phone Number") :(alertPhone.innerHTML = "please enter phone number start with 010 or 011 012 015 and 8 numbers");
      phoneFlag =  false;
    }
    checkFlags()
  }
  function checkAge(){
    var regexAge = /^[1-9]\d$/;
    if (regexAge.test(age.value.trim())) {
      alertAge.classList.add("d-none");
      ageFlag = true;
    } 
    else {
      alertAge.classList.remove("d-none");
      age.value.trim() == "" ? (alertAge.innerHTML = "please fill input Age") :(alertAge.innerHTML = "Enter Age Numbers Only (2 digit)");
      ageFlag = false;
    }
    checkFlags()
  }

  function checkPassword(){
    var regexPassword = /^([a-zA-Z]+[0-9]+[a-zA-Z]*)+$/;
    if (regexPassword.test(password.value.trim()) && password.value.length >= 8) {
        alertPassword.classList.add("d-none");
        passwordFlag = true
    } 
    else {
        alertPassword.classList.remove("d-none");
        password.value.trim() == "" ? (alertPassword.innerHTML = "please fill input Password Field") :(alertPassword.innerHTML = "entre valid password *Minimum eight characters, at least one letter and one number:*");
        passwordFlag = false;
    }
    checkFlags()

  }

  function checkRepassword(){
    if(password.value === repassword.value){
        alertRepassword.classList.add("d-none");
        rePasswordFlag = true;
    }
    else{
        alertRepassword.classList.remove("d-none");
        alertRepassword.innerHTML = "entre valid Repassword";
        rePasswordFlag =  false;
    }
    checkFlags()

 }

 function checkFlags() {
    if(userNameFlag && emailFlag && ageFlag && phoneFlag && passwordFlag && rePasswordFlag) {
        myBtnSubmit.removeAttribute("disabled");
     } else {
        myBtnSubmit.setAttribute("disabled","true");
     }
 }

 myBtnSubmit.onclick = function(){
    let userInformation = {
        name : userName.value ,
        email : email.value ,
        phone : phone.value ,
        age : age.value ,
        password: password.value
    }
}