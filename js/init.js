
let mapOptions = {'center': [34.0709,-118.444],'zoom':15.3}


const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnggxP8FVpcEJZvJdgs_G1BLvmAX2P_UN5CypTH549bRI5Ml3ovakKx7EIAHKc1fRlLt-eNr49wPiK/pub?output=csv"
const q1 = 'What deters you from recycling and/or composting at UCLA?';
const q2 = 'Which location on or near campus would you MOST like to see more recycling/compost bins on campus?';
const q3 = 'Why do you think that UCLA has not met its Zero Waste Goal in the past?';
const q4 = 'What else can UCLA/LA do better to encourage waste reduction and make recycling/composting more accessible?';

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
        //how to check if there was a response?
        console.log(data)
        addMarker(data)
        addSlide(data)
    })
}

//MAP

//BUTTONS


function addSurvey(title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.style.fontSize = '50px'; 
    newButton.addEventListener('click', function(){
        window.open('https://forms.gle/SkLiuAeYRMSoi3F5A', '_blank'); 
    })
    document.getElementById("survey").appendChild(newButton);
}

// create a function to add markers
function addMarker(data){
    L.marker([data.lat,data.lng]).addTo(map)
}

loadData(dataUrl)
addSurvey('Take the survey!')


//SLIDESHOW
container = document.querySelector(".slideshow-container")
function addSlide(data){
    div = document.createElement("div");
    div.classList.add("mySlides");
    text = document.createElement("text");
    text.classList.add("myText");
    text.innerHTML = data[q1];
    div.appendChild(text);
    container.appendChild(div);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n)
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

