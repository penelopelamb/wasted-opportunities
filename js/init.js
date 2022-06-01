let mapOptions = {'center': [34.0709,-118.444],'zoom':15}


const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnggxP8FVpcEJZvJdgs_G1BLvmAX2P_UN5CypTH549bRI5Ml3ovakKx7EIAHKc1fRlLt-eNr49wPiK/pub?output=csv"
const q1 = 'What deters you from recycling and/or composting at UCLA?';
const q2 = 'Which location on or near campus would you MOST like to see more recycling/compost bins on campus?';
const q3 = 'Why do you think that UCLA has not met its Zero Waste Goal in the past?';
const q4 = 'What else can UCLA/LA do better to encourage waste reduction and make recycling/composting more accessible? ';
const qMajor = 'What is your major?';
const qClubs = 'What are your campus affiliations?';
var questions = [q1,q2,q3,q4];
var lats = new Array();
var lngs = new Array();
var allMarkers = new Array();

let marker = L.markerClusterGroup();

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


/*function addSurvey(title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.style.fontSize = '50px'; 
    newButton.addEventListener('click', function(){
        window.open('https://forms.gle/SkLiuAeYRMSoi3F5A', '_blank'); 
    })
    document.getElementById("survey").appendChild(newButton);
}*/

// create a function to add markers
function addMarker(data){
    var marker = L.marker([data.lat,data.lng]).addTo(map)
            .bindPopup(`<p> <b>Major:</b> ${data[qMajor]}<p> <p><b>Campus Affiliations: </b>${(data[qClubs])?data[qClubs]:'N/A'}</p>`)
            .on('click', function(){
        //find index in array
        temp = 1; 
        while(lats.indexOf(data.lat, temp) != lngs.indexOf(data.lng, temp)){
            temp++
        }
        slideIndex = lats.indexOf(data.lat,temp);
        //show corresponding slide
        showSlides(slideIndex);
        allMarkers.forEach(function(marker) {
            marker.setOpacity(0.5);
        });
        //no marker for first slide so use slideIndex-1 for index of allMarkers
        allMarkers[slideIndex-1].setOpacity(8);
    });
    allMarkers.push(marker);

}

loadData(dataUrl)

//SLIDESHOW
container = document.querySelector(".slideshow-container")
function addSlide(data){
    div = document.createElement("div");
    div.classList.add("mySlides");
    
    questions.forEach(question => {
        addText(div,question,data[question])
    })

    container.appendChild(div);
}

function addText(div,question,response){
    if (response == ""){response = "N/A"}
    q = document.createElement("h4");
    q.classList.add("myText");
    node = document.createTextNode(question);
    q.appendChild(node)
    div.appendChild(q)
    ans = document.createElement("p");
    ans.classList.add("myText");
    ans.innerHTML = response;
    div.appendChild(ans);
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
    if (slideIndex == 0){
        map.flyTo([34.0709,-118.444],15);
        allMarkers.forEach(function(marker) {
            marker.setOpacity(10);
        });
    }
    else{
        map.flyTo([lats[slideIndex],lngs[slideIndex]],17)
        allMarkers.forEach(function(marker) {
            marker.setOpacity(0.5);
        });
        allMarkers[slideIndex-1].openPopup();
        allMarkers[slideIndex-1].setOpacity(8);
    }
  }
