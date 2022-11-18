const main = document.querySelector(`main`);
const btn = document.querySelector(`button`)
const planets = document.querySelector(`.planets`)
const factsDisplay = document.querySelector(`.display`)
let bodies = [];


const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';


async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, 
    { method: 'POST' });
    const data = await response.json();
    console.log(data);
    return data.key;
}


async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': 'solaris-vKkkQHqQboi7c6JF'
        }
    });
    const data = await response.json();
    bodies = data.bodies;
    return data.bodies;
    
}

async function start() {


    const key = await getKey();
    // console.log(key)
    const bodies = await getPlanets();
    // console.log(bodies)
    createPlanets(bodies);
  
}

async function createPlanets(bodies) {


    bodies.forEach(planet => {

        
         let printPlanets = `<article class="planet-${planet.id}">
         </article>
         ` 

   main.insertAdjacentHTML('beforeend', printPlanets)

    });

    let printOutPlanets = document.querySelectorAll(`main article`)
    //console.log(printOutPlanets)

    for(let i = 0; i< printOutPlanets.length; i++) {

        let element = printOutPlanets[i]
        element.addEventListener(`click` , () => {
         factsDisplay.style.display = "block";
         factsPrinter(bodies[i]);

       
        })

    }

}

async function factsPrinter(body) {

    // console.log(body)

    let printFact = `<header class="display-header"><h1 display-h3>${body.name}<h1/> <h3 class="display-h3"> ${body.latinName}</h3> </header> <article class="display-desc"> <p> ${body.desc}</p> </article> 
    <section class="display-content">  <p> OMKRETS <br> ${body.circumference} km <br> </p> <p>KM FRÅN SOLEN <br> ${body.distance} km<br> </p>
    <p> MAX TEMPERATUR <br> ${body.temp.day}°C <br> </p> <p> MIN TEMPERATUR <br> ${body.temp.night}°C <br> </p></section> <aside class="display-bottom">  <p> MÅNAR <br> ${body.moons} <br> </p></aside>
    <footer class="display-footer">  <h5> ZoCom</h5>  <button>Gå tillbaka</button> </footer>`;

factsDisplay.insertAdjacentHTML('beforeend', printFact)
document.querySelector(`button`).addEventListener(`click`,() => {
    window.location.reload();
}) 


}

start();

