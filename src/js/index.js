//create photo objects
const noOfPeople = 8;
const noOfNature = 9;
const noOfEvents = 10;
const arrOfPpl = [];
const arrOfNat = [];
const arrOfEv = [];

//object constructor
function Photo(name, img, clicks){
    this.name = name;
    this.img = img;
    this.clicks = clicks;
}
//create objects using constructor
function createObjects(no, src, type, array){
    for (let i = 0; i < no; i++) {
        let image = new Image();
        image.src = src + `${i+1}.jpg`;
        let photo = new Photo(type + `${i+1}`, image, 0);
        array.push(photo);
    }
    // console.log(array);
}
//run the functions
createObjects(noOfPeople, "../img/people/people_", "people_", arrOfPpl);
createObjects(noOfNature, "../img/nature/nature_", "nature_", arrOfNat);
createObjects(noOfEvents, "../img/events/event_", "event_", arrOfEv);

//create gallery function
function createGallery(array){
    $("#showcase").empty().append(`
        <section class="galleryContainer">
        <div class="mainPhoto" id="mainPhoto">
        </div>
        <div class="images">
            <i id="left" class="fas fa-angle-left fa-5x"></i>
            <div class="photoSlider" id="photoSlider">
            </div>
            <i id="right" class="fas fa-angle-right fa-5x"></i>
        </div>
    </section>
    `);
    $("#mainPhoto").empty().append(`<img class="mainItem" src="${array[0].img.src}" alt="${array[0].name}">`);
    $("#photoSlider").empty();
    for (let i = 0; i < array.length; i++) {
        $("#photoSlider").append(`<img class="sliderItem" src="${array[i].img.src}" alt="${array[i].name}">`)
    }

    $(".sliderItem").on("click", function(){
        $("#mainPhoto").empty().append(`<img class="mainItem" src="${this.src}" alt="${this.alt}">`);

        if(this.alt.includes("people")){
            for (let i = 0; i < arrOfPpl.length; i++) {
                if(this.alt === arrOfPpl[i].name){
                    arrOfPpl[i].clicks += 1;
                }
            }
        } else if(this.alt.includes("nature")){
            for (let i = 0; i < arrOfNat.length; i++) {
                if(this.alt === arrOfNat[i].name){
                    arrOfNat[i].clicks += 1;
                }
            }
        } else if(this.alt.includes("event")){
            for (let i = 0; i < arrOfEv.length; i++) {
                if(this.alt === arrOfEv[i].name){
                    arrOfEv[i].clicks += 1;
                }
            }
        }
    });


    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const slider = document.getElementById("photoSlider");

    leftBtn.addEventListener("click", function scrollLeft(){slider.scrollBy(-400, 0)});
    rightBtn.addEventListener("click", function scrollRight(){slider.scrollBy(400, 0)});
}
//call the functions on each button
$("#people").on("click", function(){createGallery(arrOfPpl)});
$("#nature").on("click", function(){createGallery(arrOfNat)});
$("#events").on("click", function(){createGallery(arrOfEv)});

//create home page
function createHome(){
    //sort arrays based on clicks
    arrOfPpl.sort(sortArrays);
    arrOfEv.sort(sortArrays);
    arrOfNat.sort(sortArrays);
    //create home page UI
    $("#showcase").empty().append(`
          <div class="mainPhotoBar">
            <img class="mainHomeItem" src="${arrOfPpl[0].img.src}" alt="${arrOfPpl[0].name}">
            <img class="mainHomeItem" src="${arrOfEv[0].img.src}" alt="${arrOfEv[0].name}">
            <img class="mainHomeItem" src="${arrOfNat[0].img.src}" alt="${arrOfNat[0].name}">
         </div>
    
        <div id="quote">
            <h1>"Photography takes an instant out of time,</h1>
            <h1> altering life by holding it still."</h1>
            <p>- Dorothea Lange</p>
        </div>
    
        <div class="mainPhotoBar">
            <img class="mainHomeItem" src="${arrOfPpl[1].img.src}" alt="${arrOfPpl[1].name}">
            <img class="mainHomeItem" src="${arrOfEv[1].img.src}" alt="${arrOfEv[1].name}">
            <img class="mainHomeItem" src="${arrOfNat[1].img.src}" alt="${arrOfNat[1].name}">
        </div>
    `);
    //on img click go to related gallery
    $(".mainHomeItem").on("click", function(){
        if(this.alt.includes("people")){
            createGallery(arrOfPpl);
        } else if(this.alt.includes("nature")){
           createGallery(arrOfNat);
        }else {createGallery(arrOfEv)}});
}
//on main logo click go to home
$("#mainLogo").on("click", createHome);
//on home icon click
$("#home").on("click", createHome);
//on doc ready go to home
$(document).ready(createHome);
//compare function for sorting arrays
function sortArrays(a, b) {
    if(a.clicks < b.clicks){return 1} else if(a.clicks > b.clicks){return -1} else {return 0}
}