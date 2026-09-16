/*=====================================
            CARRITO
=====================================*/

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];


/*=====================================
            ELEMENTOS
=====================================*/

const contadorCarrito =
    document.querySelector(".cart-count");

const listaCarrito =
    document.querySelector(".lista-carrito");

const totalCarrito =
    document.querySelector(".total-carrito");

const botonAbrirCarrito =
    document.querySelector(".abrir-carrito");

const botonCerrarCarrito =
    document.querySelector(".cerrar-carrito");

const panelCarrito =
    document.querySelector(".panel-carrito");

const overlay =
    document.querySelector(".overlay");

const botonComprar =
    document.querySelector(".comprar");

const botonVaciar =
    document.querySelector(".vaciar-carrito");


/*=====================================
            GUARDAR
=====================================*/

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


/*=====================================
            CONTADOR
=====================================*/

function actualizarContador(){

    if(!contadorCarrito) return;

    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    contadorCarrito.textContent =
        cantidad;

}


/*=====================================
            TOTAL
=====================================*/

function calcularTotal(){

    return carrito.reduce(
        (total, producto) =>
            total +
            (
                Number(producto.precio) *
                Number(producto.cantidad)
            ),
        0
    );

}


/*=====================================
            MOSTRAR
=====================================*/

function mostrarCarrito(){

    if(!listaCarrito) return;

    listaCarrito.innerHTML = "";


    if(carrito.length === 0){

        listaCarrito.innerHTML = `

            <div class="carrito-vacio">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega productos para
                    comenzar tu compra.
                </p>

            </div>

        `;

    }else{

        carrito.forEach(
            (producto, index) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "item-carrito";


                item.innerHTML = `

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >


                    <div class="item-carrito-info">

                        <h4>
                            ${producto.nombre}
                        </h4>

                        <p>
                            $${Number(producto.precio)
                                .toLocaleString("es-CO")}
                        </p>


                        <div class="cantidad">

                            <button
                                type="button"
                                class="disminuir"
                                data-index="${index}"
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>


                            <span>
                                ${producto.cantidad}
                            </span>


                            <button
                                type="button"
                                class="aumentar"
                                data-index="${index}"
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="eliminar-producto"
                        data-index="${index}"
                        aria-label="Eliminar ${producto.nombre}"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                `;


                listaCarrito.appendChild(
                    item
                );

            }
        );

    }


    if(totalCarrito){

        totalCarrito.textContent =
            "$" +
            calcularTotal()
                .toLocaleString("es-CO");

    }


    conectarControlesCarrito();

}


/*=====================================
        CONECTAR CONTROLES
=====================================*/

function conectarControlesCarrito(){

    document
        .querySelectorAll(".aumentar")
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            boton.dataset.index
                        );

                    aumentarCantidad(index);

                }
            );

        });


    document
        .querySelectorAll(".disminuir")
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            boton.dataset.index
                        );

                    disminuirCantidad(index);

                }
            );

        });


    document
        .querySelectorAll(
            ".eliminar-producto"
        )
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            boton.dataset.index
                        );

                    eliminarProducto(index);

                }
            );

        });

}


/*=====================================
        AGREGAR PRODUCTO
=====================================*/

function agregarProducto(
    id,
    nombre,
    precio,
    imagen
){

    const existente =
        carrito.find(
            producto =>
                String(producto.id) ===
                String(id)
        );


    if(existente){

        existente.cantidad++;

    }else{

        carrito.push({

            id: id,

            nombre: nombre,

            precio: Number(precio),

            imagen: imagen,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();


    if(
        typeof mostrarToast ===
        "function"
    ){

        mostrarToast(
            "🛒 Producto agregado al carrito"
        );

    }

}


/*=====================================
        AUMENTAR
=====================================*/

function aumentarCantidad(index){

    if(!carrito[index]) return;

    carrito[index].cantidad++;

    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


/*=====================================
        DISMINUIR
=====================================*/

function disminuirCantidad(index){

    if(!carrito[index]) return;


    if(
        carrito[index].cantidad > 1
    ){

        carrito[index].cantidad--;

    }else{

        carrito.splice(
            index,
            1
        );

    }


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


/*=====================================
        ELIMINAR
=====================================*/

function eliminarProducto(index){

    if(!carrito[index]) return;

    carrito.splice(
        index,
        1
    );

    guardarCarrito();

    actualizarContador();

    mostrarCarrito();


    if(
        typeof mostrarToast ===
        "function"
    ){

        mostrarToast(
            "Producto eliminado del carrito"
        );

    }

}


/*=====================================
        VACIAR
=====================================*/

function vaciarCarrito(){

    if(carrito.length === 0){

        if(
            typeof mostrarToast ===
            "function"
        ){

            mostrarToast(
                "El carrito ya está vacío"
            );

        }

        return;

    }


    carrito = [];

    guardarCarrito();

    actualizarContador();

    mostrarCarrito();


    if(
        typeof mostrarToast ===
        "function"
    ){

        mostrarToast(
            "🛒 Carrito vaciado"
        );

    }

}


/*=====================================
        ABRIR CARRITO
=====================================*/

function abrirPanelCarrito(){

    if(!panelCarrito) return;

    panelCarrito.classList.add(
        "activo"
    );


    if(overlay){

        overlay.classList.add(
            "activo"
        );

    }


    panelCarrito.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/*=====================================
        CERRAR CARRITO
=====================================*/

function cerrarPanelCarrito(){

    if(!panelCarrito) return;

    panelCarrito.classList.remove(
        "activo"
    );


    if(overlay){

        overlay.classList.remove(
            "activo"
        );

    }


    panelCarrito.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/*=====================================
        BOTÓN CARRITO
=====================================*/

if(botonAbrirCarrito){

    botonAbrirCarrito.addEventListener(
        "click",
        abrirPanelCarrito
    );

}


if(botonCerrarCarrito){

    botonCerrarCarrito.addEventListener(
        "click",
        cerrarPanelCarrito
    );

}


/*=====================================
        OVERLAY
=====================================*/

if(overlay){

    overlay.addEventListener(
        "click",
        cerrarPanelCarrito
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

            cerrarPanelCarrito();

        }

    }
);


/*=====================================
        COMPRAR WHATSAPP
=====================================*/

if(botonComprar){

    botonComprar.addEventListener(
        "click",
        () => {


            /* NO COMPRAR VACÍO */

            if(carrito.length === 0){

                if(
                    typeof mostrarToast ===
                    "function"
                ){

                    mostrarToast(
                        "🛒 Tu carrito está vacío"
                    );

                }

                return;

            }


            let mensaje =
                "Hola, quiero realizar una compra:%0A%0A";


            carrito.forEach(
                producto => {

                    const subtotal =
                        Number(producto.precio) *
                        Number(producto.cantidad);


                    mensaje +=
                        `• ${producto.nombre}` +
                        ` x${producto.cantidad}` +
                        ` - $${subtotal.toLocaleString("es-CO")}` +
                        "%0A";

                }
            );


            const total =
                calcularTotal();


            mensaje +=
                `%0A*Total: $${total.toLocaleString("es-CO")}*`;


            const numero =
                "573124235417";


            const url =
                `https://wa.me/${numero}?text=${mensaje}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/*=====================================
            INICIAR
=====================================*/

actualizarContador();

mostrarCarrito();