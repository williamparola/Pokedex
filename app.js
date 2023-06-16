const pokedex = document.getElementById("pokedex")
const listaTipi = document.getElementById("listaTipi")



var newPoke = [];
var selezionato = 0;
var selezionato2 = 0;
var occupato1 = 0;
var occupato2 = 0;
var stessoBottone = 0;

const arrayTipi = [{

    "name": "dark",
    "color": "#0c0d0c",
    "selected": false

},
{

    "name": "steel",
    "color": "#2c2e2c",
    "selected": false

},
{

    "name": "ghost",
    "color": "#484a48",
    "selected": false

},
{

    "name": "normal",
    "color": "#555955",
    "selected": false

},
{

    "name": "flying",
    "color": "#8cada6",
    "selected": false

},
{

    "name": "ice",
    "color": "#8fbff2",
    "selected": false

},
{

    "name": "fire",
    "color": "red",
    "selected": false

},
{

    "name": "poison",
    "color": "#8f02a1",
    "selected": false

},
{

    "name": "psychic",
    "color": "#ce27e3",
    "selected": false

},
{

    "name": "bug",
    "color": "#e00ffa",
    "selected": false


},
{

    "name": "fairy",
    "color": "#d051e0",
    "selected": false

},
{

    "name": "water",
    "color": "#3e94f0",
    "selected": false

},
{

    "name": "dragon",
    "color": "#fc4103",
    "selected": false

},
{

    "name": "electric",
    "color": "#fcba03",
    "selected": false

},
{

    "name": "ground",
    "color": "#c94000",
    "selected": false

},
{

    "name": "rock",
    "color": "#9c3302",
    "selected": false

},
{

    "name": "fighting",
    "color": "#e34902",
    "selected": false

},
{

    "name": "grass",
    "color": "green",
    "selected": false

}]


const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 700; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        newPoke = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name)
        }));
        displayPokemon(newPoke);
    });
};

const displayPokemon = (pokemon) => {

    const pokemonHTMLString = pokemon.map(
        (pokeman) => `
    <li class= "card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type} </p>
    </li>
    `
    )
        .join('');
    pokedex.innerHTML = pokemonHTMLString
}
fetchPokemon();

const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitem = document.getElementById("product-list")
    const prodotto = document.querySelectorAll(".product")
    const pname = document.getElementsByTagName("h2")

    for (var i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName('h2')[0];
    }

    if (match) {
        let textvalue = match.textContent || match.innerHTML

        if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
            product[i].style.display = "";
        } else {
            product[i].style.display = "none";
        }
    }
}

function leggi() {
    let dato;
    let pokemonFiltrati;

    dato = document.getElementById("fname");


    pokemonFiltrati = newPoke.filter((p) => p.name.includes(dato.value))

    displayPokemon(pokemonFiltrati)
}

function capo() {
    displayPokemon(newPoke)
}

function leggiTipo() {
    let dato;
    let pokemonFiltrati;

    dato = document.getElementById("fname");


    pokemonFiltrati = newPoke.filter((p) => p.type.includes(dato.value))

    displayPokemon(pokemonFiltrati)
}



const displayTipi = () => {
    arrayTipi.forEach(
        (tipo) => {

            var btn = document.createElement("DIV");
            btn.setAttribute("id", "btn-" + tipo.name);
            btn.innerHTML = tipo.name;
            btn.setAttribute("style", "background-color:" + tipo.color);


            btn.className = "button-tipo"
            btn.addEventListener("click", () => {
                const tipiselezionati = arrayTipi.filter((t) => t.selected);
                selezioneTipo(tipo.name);
            });
            document.getElementById("listaTipi").appendChild(btn);

        }
    )

}
displayTipi();

function selezioneTipo(nomeTipo) {


    const index = arrayTipi.findIndex(tipo => tipo.name == nomeTipo);
    let variabile = arrayTipi[index]


    arrayTipi[index] = { ...variabile, selected: variabile.selected = !variabile.selected }
    variabile = arrayTipi[index]
    const btn = document.getElementById("btn-" + nomeTipo)
    if (!variabile.selected) {
        btn.classList.remove("button-tipo-selected")
        selezionato--;
    } else {
        btn.classList.add("button-tipo-selected")
        selezionato++;
    }

    if (selezionato == 2) {
        arrayTipi.forEach(tipo => {
            if (!tipo.selected) {
                
                const btnTipo = document.getElementById("btn-" + tipo.name)
                btnTipo.classList.add("button-tipo-disabled")
            } 
        });

    } else if (selezionato < 2) {
        arrayTipi.forEach(tipo => {

            const btnTipo = document.getElementById("btn-" + tipo.name)

            if (btnTipo.classList.contains("button-tipo-disabled")) {
                btnTipo.classList.remove("button-tipo-disabled")

            }
        })
    }


    const tipiselezionati = arrayTipi.filter((t) => t.selected)
    let pokemonFiltrati = [];
    newPoke.forEach(p => {
        let include = [];
        p.type.forEach(t => {
            if (tipiselezionati.map(tp => tp.name).join(",").includes(t)) {
                include.push(t)
            }
        })
        if (include.length > 0) {
            pokemonFiltrati.push(p)
        }
    })

    
    if(pokemonFiltrati.length==0){
        capo();
    }else if(pokemonFiltrati.length>0){
        displayPokemon(pokemonFiltrati)
    }
    
}
















