/*=====================================
        BUSCADOR Y FILTROS
=====================================*/

const inputBuscador =
    document.querySelector("#buscador");

const botonesFiltro =
    document.querySelectorAll(
        ".filtros button"
    );

const botonLimpiar =
    document.querySelector(
        "#limpiar-busqueda"
    );

const contadorResultados =
    document.querySelector(
        "#resultados"
    );


/*=====================================
        CATEGORÍA ACTUAL
=====================================*/

let categoriaActual = "todos";


/*=====================================
        FILTRAR PRODUCTOS
=====================================*/

function aplicarFiltros(){

    if(
        typeof productos === "undefined"
    ){

        console.error(
            "No se encontró la variable productos."
        );

        return;

    }


    const texto =
        inputBuscador
            ? inputBuscador.value
                .toLowerCase()
                .trim()
            : "";


    const resultado =
        productos.filter(producto => {


            const nombre =
                String(producto.nombre || "")
                    .toLowerCase();


            const categoria =
                String(producto.categoria || "")
                    .toLowerCase();


            const coincideTexto =
                nombre.includes(texto) ||
                categoria.includes(texto);


            const coincideCategoria =
                categoriaActual === "todos" ||
                categoria ===
                    categoriaActual.toLowerCase();


            return (
                coincideTexto &&
                coincideCategoria
            );

        });


    /* Mostrar resultados */

    if(
        typeof cargarProductos ===
        "function"
    ){

        cargarProductos(resultado);

    }


    actualizarResultados(
        resultado.length
    );


    actualizarBotonLimpiar();

}


/*=====================================
        CONTADOR
=====================================*/

function actualizarResultados(total){

    if(!contadorResultados)
        return;


    if(total === 1){

        contadorResultados.textContent =
            "1 producto encontrado";

    }else{

        contadorResultados.textContent =
            `${total} productos encontrados`;

    }

}


/*=====================================
        BOTÓN LIMPIAR
=====================================*/

function actualizarBotonLimpiar(){

    if(!botonLimpiar)
        return;


    const tieneTexto =
        inputBuscador &&
        inputBuscador.value.trim() !== "";


    botonLimpiar.style.display =
        tieneTexto
            ? "flex"
            : "none";

}


/*=====================================
        BUSCADOR
=====================================*/

if(inputBuscador){

    inputBuscador.addEventListener(
        "input",
        aplicarFiltros
    );

}


/*=====================================
        LIMPIAR
=====================================*/

if(botonLimpiar){

    botonLimpiar.addEventListener(
        "click",
        limpiarBusqueda
    );

}


function limpiarBusqueda(){

    if(inputBuscador){

        inputBuscador.value = "";

    }


    categoriaActual = "todos";


    botonesFiltro.forEach(
        boton => {

            boton.classList.remove(
                "activo"
            );


            if(
                boton.dataset.filter ===
                "todos"
            ){

                boton.classList.add(
                    "activo"
                );

            }

        }
    );


    aplicarFiltros();

}


/*=====================================
        FILTROS
=====================================*/

botonesFiltro.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {


                categoriaActual =
                    boton.dataset.filter ||
                    "todos";


                botonesFiltro.forEach(
                    item => {

                        item.classList.remove(
                            "activo"
                        );

                    }
                );


                boton.classList.add(
                    "activo"
                );


                aplicarFiltros();

            }
        );

    }
);


/*=====================================
        TECLA ESCAPE
=====================================*/

if(inputBuscador){

    inputBuscador.addEventListener(
        "keydown",
        evento => {

            if(
                evento.key ===
                "Escape"
            ){

                limpiarBusqueda();

                inputBuscador.blur();

            }

        }
    );

}


/*=====================================
        INICIO
=====================================*/

if(
    typeof productos !==
    "undefined"
){

    actualizarResultados(
        productos.length
    );

}

actualizarBotonLimpiar();