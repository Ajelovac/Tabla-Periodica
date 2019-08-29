var elementos = document.querySelectorAll(".elemento");
console.log("Elementos");

for (var i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', cargaInfo);
}

//Recorro un bucle para que todos los elementos tengan un EventListener en click
console.log("EventListener");

function cargaInfo() {

    //cuando hago un click  en un elemento entro en esta funcion
    console.log("Entro en la funcion");

    var nombre = this.textContent.toUpperCase();

    //guardo el nombre del elemento en el que he hecho click
    console.log(nombre);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './tabla.json', true);

    console.log("Cargo el json y creo el xmlhttprequest");

    //cargo el json
    xhr.onload = function () {
        if (this.status == 200) {
            const elem = JSON.parse(this.responseText);
            //compruebo que no haya errores

            console.log("Compruebo que esta bien");

            var output = '';
            for (let i in elem.elements) {
                console.log("Entro en la funcion");
                //entro en un bucle for que pasa por los elementos y guardo el simbolo de este elemento para compararlo
                var nombrejson = elem.elements[i].symbol;

                console.log(nombrejson);
                if (nombre == nombrejson.toUpperCase()) {
                    //comparo el elemento del json con el que hice click anteriormente y entro en esta funcion para imprimir los datos correctos
                    output +=
                        `
                <div class="columna_1">
                    <p>Name: ${elem.elements[i].name}</p>
                    <p>Symbol: ${elem.elements[i].symbol} </p>
                    <p>Discovered by: ${elem.elements[i].discovered_by}</p>
                    <p>Category: ${elem.elements[i].category}</p>
                </div>
                <div class="columna_2">
                    <p>Atomic Mass: ${elem.elements[i].atomic_mass}</p>
                    <p>Density: ${elem.elements[i].density}</p>
                    <p>Period: ${elem.elements[i].period}</p>
                    <p>Boiling Point (Kelvin): ${elem.elements[i].boil}</p>
                </div>
                <div class="columna_3">
                    <a href="${elem.elements[i].source}">Wikipedia Link</a>
                    <p>Summary: ${elem.elements[i].summary}</p>
                </div>
                    `;
                }
            };

            document.querySelector('.info').innerHTML = output;
        }
    }

    xhr.send();
}