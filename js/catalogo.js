/*=====================================
        CATÁLOGO DE PRODUCTOS
=====================================*/

const contenedorProductos =
    document.querySelector("#productos-grid");


/*=====================================
        MOSTRAR PRODUCTOS
=====================================*/

function cargarProductos(lista = productos) {

    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";


    if (!lista || lista.length === 0) {

        contenedorProductos.innerHTML = `

            <div class="sin-productos">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>
                    No encontramos productos
                </h3>

                <p>
                    Intenta con otro nombre o categoría.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "product animar";


        tarjeta.dataset.nombre =
            producto.nombre.toLowerCase();

        tarjeta.dataset.categoria =
            producto.categoria;


        tarjeta.innerHTML = `

            <div class="product-image">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >

                <button
                    type="button"
                    class="fav-btn"
                    data-id="${producto.id}"
                    aria-label="Agregar ${producto.nombre} a favoritos"
                >

                    <i class="fa-regular fa-heart"></i>

                </button>

            </div>


            <div class="product-info">

                <span class="product-category">

                    ${producto.categoria}

                </span>


                <h3>

                    ${producto.nombre}

                </h3>


                <p class="product-price">

                    $${Number(producto.precio)
                        .toLocaleString("es-CO")}

                </p>


                <button
                    type="button"
                    class="btn agregar-carrito"
                    data-id="${producto.id}"
                >

                    <i class="fa-solid fa-cart-shopping"></i>

                    Agregar al carrito

                </button>

            </div>

        `;


        contenedorProductos.appendChild(tarjeta);

    });


    conectarBotonesCarrito();

    conectarBotonesFavoritos();

}


/*=====================================
        BOTONES CARRITO
=====================================*/

function conectarBotonesCarrito() {

    const botones =
        document.querySelectorAll(
            ".agregar-carrito"
        );


    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;

                const producto =
                    productos.find(
                        item =>
                        String(item.id) === String(id)
                    );


                if (!producto) return;


                agregarProducto(

                    producto.id,

                    producto.nombre,

                    Number(producto.precio),

                    producto.imagen

                );

            }
        );

    });

}


/*=====================================
        BOTONES FAVORITOS
=====================================*/

function conectarBotonesFavoritos() {

    const botones =
        document.querySelectorAll(
            ".fav-btn"
        );


    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;


                if (
                    typeof alternarFavorito ===
                    "function"
                ) {

                    alternarFavorito(id);

                }

            }
        );

    });

}


/*=====================================
        INICIAR CATÁLOGO
=====================================*/

cargarProductos();