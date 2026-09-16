/*=====================================
        FAVORITOS
=====================================*/

let favoritos = JSON.parse(
    localStorage.getItem("favoritos")
) || [];


/*=====================================
        ELEMENTOS
=====================================*/

const contadorFavoritos =
    document.querySelector(".fav-count");

const panelFavoritos =
    document.querySelector(".panel-favoritos");

const listaFavoritos =
    document.querySelector(".lista-favoritos");

const botonAbrirFavoritos =
    document.querySelector(".abrir-favoritos");

const botonCerrarFavoritos =
    document.querySelector(".cerrar-favoritos");

const overlayFavoritos =
    document.querySelector(".overlay");


/*=====================================
        GUARDAR FAVORITOS
=====================================*/

function guardarFavoritos(){

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}


/*=====================================
        CONTADOR
=====================================*/

function actualizarContadorFavoritos(){

    if(!contadorFavoritos) return;

    contadorFavoritos.textContent =
        favoritos.length;

}


/*=====================================
        COMPROBAR FAVORITO
=====================================*/

function esFavorito(id){

    return favoritos.some(
        producto =>
            String(producto.id) ===
            String(id)
    );

}


/*=====================================
        AGREGAR / QUITAR
=====================================*/

function cambiarFavorito(
    id,
    nombre,
    precio,
    imagen
){

    const indice =
        favoritos.findIndex(
            producto =>
                String(producto.id) ===
                String(id)
        );


    /*-------------------------------
        QUITAR
    -------------------------------*/

    if(indice !== -1){

        favoritos.splice(
            indice,
            1
        );

        guardarFavoritos();

        actualizarContadorFavoritos();

        actualizarBotonesFavoritos();

        mostrarFavoritos();


        if(
            typeof mostrarToast ===
            "function"
        ){

            mostrarToast(
                "♡ Eliminado de favoritos"
            );

        }

        return;

    }


    /*-------------------------------
        AGREGAR
    -------------------------------*/

    favoritos.push({

        id:id,

        nombre:nombre,

        precio:Number(precio),

        imagen:imagen

    });


    guardarFavoritos();

    actualizarContadorFavoritos();

    actualizarBotonesFavoritos();

    mostrarFavoritos();


    if(
        typeof mostrarToast ===
        "function"
    ){

        mostrarToast(
            "♥ Agregado a favoritos"
        );

    }

}


/*=====================================
        ACTUALIZAR BOTONES
=====================================*/

function actualizarBotonesFavoritos(){

    document
        .querySelectorAll(".fav-btn")
        .forEach(boton => {

            const id =
                boton.dataset.id;


            if(esFavorito(id)){

                boton.classList.add(
                    "favorito-activo"
                );

                boton.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';

                boton.setAttribute(
                    "aria-label",
                    "Quitar de favoritos"
                );

            }else{

                boton.classList.remove(
                    "favorito-activo"
                );

                boton.innerHTML =
                    '<i class="fa-regular fa-heart"></i>';

                boton.setAttribute(
                    "aria-label",
                    "Agregar a favoritos"
                );

            }

        });

}


/*=====================================
        MOSTRAR FAVORITOS
=====================================*/

function mostrarFavoritos(){

    if(!listaFavoritos) return;

    listaFavoritos.innerHTML = "";


    /*-------------------------------
        VACÍO
    -------------------------------*/

    if(favoritos.length === 0){

        listaFavoritos.innerHTML = `

            <div class="vacio">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    No tienes favoritos
                </h3>

                <p>
                    Guarda tus productos favoritos
                    para encontrarlos rápidamente.
                </p>

            </div>

        `;

        return;

    }


    /*-------------------------------
        PRODUCTOS
    -------------------------------*/

    favoritos.forEach(
        producto => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "item-favorito";


            item.innerHTML = `

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >


                <div>

                    <h4>
                        ${producto.nombre}
                    </h4>

                    <p>
                        $${Number(producto.precio)
                            .toLocaleString("es-CO")}
                    </p>

                </div>


                <button
                    type="button"
                    class="quitar-favorito"
                    data-id="${producto.id}"
                    aria-label="Quitar ${producto.nombre} de favoritos"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            listaFavoritos.appendChild(
                item
            );

        }
    );


    conectarBotonesEliminarFavoritos();

}


/*=====================================
        ELIMINAR FAVORITO
=====================================*/

function eliminarFavorito(id){

    favoritos =
        favoritos.filter(
            producto =>
                String(producto.id) !==
                String(id)
        );


    guardarFavoritos();

    actualizarContadorFavoritos();

    actualizarBotonesFavoritos();

    mostrarFavoritos();


    if(
        typeof mostrarToast ===
        "function"
    ){

        mostrarToast(
            "♡ Eliminado de favoritos"
        );

    }

}


/*=====================================
        BOTONES ELIMINAR
=====================================*/

function conectarBotonesEliminarFavoritos(){

    document
        .querySelectorAll(
            ".quitar-favorito"
        )
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    eliminarFavorito(
                        boton.dataset.id
                    );

                }
            );

        });

}


/*=====================================
        ABRIR FAVORITOS
=====================================*/

function abrirPanelFavoritos(){

    if(!panelFavoritos) return;


    panelFavoritos.classList.add(
        "activo"
    );


    if(overlayFavoritos){

        overlayFavoritos.classList.add(
            "activo"
        );

    }


    panelFavoritos.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/*=====================================
        CERRAR FAVORITOS
=====================================*/

function cerrarPanelFavoritos(){

    if(!panelFavoritos) return;


    panelFavoritos.classList.remove(
        "activo"
    );


    if(overlayFavoritos){

        overlayFavoritos.classList.remove(
            "activo"
        );

    }


    panelFavoritos.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/*=====================================
        BOTÓN ABRIR
=====================================*/

if(botonAbrirFavoritos){

    botonAbrirFavoritos.addEventListener(
        "click",
        abrirPanelFavoritos
    );

}


/*=====================================
        BOTÓN CERRAR
=====================================*/

if(botonCerrarFavoritos){

    botonCerrarFavoritos.addEventListener(
        "click",
        cerrarPanelFavoritos
    );

}


/*=====================================
        OVERLAY
=====================================*/

if(overlayFavoritos){

    overlayFavoritos.addEventListener(
        "click",
        cerrarPanelFavoritos
    );

}


/*=====================================
        ESCAPE
=====================================*/

document.addEventListener(
    "keydown",
    evento => {

        if(
            evento.key === "Escape"
        ){

            cerrarPanelFavoritos();

        }

    }
);


/*=====================================
        INICIAR
=====================================*/

actualizarContadorFavoritos();

mostrarFavoritos();

actualizarBotonesFavoritos();