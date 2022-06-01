let mapOptions = {'center': [34.0709,-118.444],'zoom':15}


const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnggxP8FVpcEJZvJdgs_G1BLvmAX2P_UN5CypTH549bRI5Ml3ovakKx7EIAHKc1fRlLt-eNr49wPiK/pub?output=csv"
const q1 = 'What deters you from recycling and/or composting at UCLA?';
const q2 = 'Which location on or near campus would you MOST like to see more recycling/compost bins on campus?';
const q3 = 'Why do you think that UCLA has not met its Zero Waste Goal in the past?';
const q4 = 'What else can UCLA/LA do better to encourage waste reduction and make recycling/composting more accessible?';
var lats = new Array();
var lngs = new Array();
var allMarkers = new Array();

lats.push(34.0709);
lngs.push(-118.444);
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
        addMarker(data)
        addSlide(data)
        lats.push(data.lat)
        lngs.push(data.lng)
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

//addSurvey('Take the survey!')

// create a function to add markers
function addMarker(data){
    var marker = L.marker([data.lat,data.lng]).addTo(map).on('click', function(){
        temp = 1;
        while(lats.indexOf(data.lat, temp) != lngs.indexOf(data.lng, temp)){
            temp++
        }
        slideIndex = lats.indexOf(data.lat,temp);
        showSlides(slideIndex);
        allMarkers.forEach(function(marker) {
            marker.setOpacity(0.25);
        });
        allMarkers[slideIndex-1].setOpacity(10);
    });
    allMarkers.push(marker);

}

loadData(dataUrl)

//SLIDESHOW
container = document.querySelector(".slideshow-container")
function addSlide(data){
    div = document.createElement("div");
    div.classList.add("mySlides");
    
    qu1 = document.createElement("h4");
    qu1.classList.add("myText");
    node1 = document.createTextNode(q1);
    qu1.appendChild(node1)
    div.appendChild(qu1)
    or1 = document.createElement("p");
    or1.classList.add("myText");
    or1.innerHTML = data[q1];
    div.appendChild(or1);

    qu2 = document.createElement("h4");
    qu2.classList.add("myText");
    node2 = document.createTextNode(q2);
    qu2.appendChild(node2)
    div.appendChild(qu2)
    or2 = document.createElement("p");
    or2.classList.add("myText");
    or2.innerHTML = data[q2];
    div.appendChild(or2);

    qu3 = document.createElement("h4");
    qu3.classList.add("myText");
    node3 = document.createTextNode(q3);
    qu3.appendChild(node3)
    div.appendChild(qu3)
    or3 = document.createElement("p");
    or3.classList.add("myText");
    or3.innerHTML = data[q3];
    div.appendChild(or3);

    qu4 = document.createElement("h4");
    qu4.classList.add("myText");
    node4 = document.createTextNode(q4);
    qu4.appendChild(node4)
    div.appendChild(qu4)
    or4 = document.createElement("p");
    or4.classList.add("myText");
    or4.innerHTML = data[q4];
    div.appendChild(or4);

    container.appendChild(div);
}

var slideIndex = 0;
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
    if (n == slides.length) {slideIndex = 0}
      if (n < 0) {slideIndex = slides.length-1}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";

      }
    slides[slideIndex].style.display = "block";
    //map zoom to marker
    if (slideIndex == 0){map.flyTo([34.0709,-118.444],15)}
    else{map.flyTo([lats[slideIndex],lngs[slideIndex]],17)
        allMarkers.forEach(function(marker) {
            marker.setOpacity(0.25);
        });
        allMarkers[slideIndex-1].setOpacity(10);}
  }
