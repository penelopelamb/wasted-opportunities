
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}


const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnggxP8FVpcEJZvJdgs_G1BLvmAX2P_UN5CypTH549bRI5Ml3ovakKx7EIAHKc1fRlLt-eNr49wPiK/pub?output=csv"
//LOAD RESPONSES

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}



function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        div = document.createElement("div");
        div.classList.add("mySlides");
        div.innerHTML = data['Where do you live?'];
        container.appendChild(div)
    })
}

//MAP

//BUTTONS
container = document.querySelector(".slideshow-container")

function addSurvey(title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.style.background = 'pink';
    newButton.addEventListener('click', function(){
        window.open('https://forms.gle/SkLiuAeYRMSoi3F5A', '_blank'); 
    })
    document.getElementById("space_for_buttons").appendChild(newButton);
}

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

loadData(dataUrl)
addSurvey('Take our survey!')


//SLIDESHOW
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    console.log(slides.length)
    if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
    slides[slideIndex-1].style.display = "block";
  
  }

