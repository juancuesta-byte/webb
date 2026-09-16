/*=====================================
        VAPE LOS CABALLOS
        APP PRINCIPAL
=====================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=================================
            ELEMENTOS
    =================================*/

    const contenedorProductos =
        document.querySelector(".productos-grid");

    const buscador =
        document.querySelector("#buscador");

    const contadorResultados =
        document.querySelector("#resultados");

    const filtros =
        document.querySelectorAll(".filtro");

    const menuBtn =
        document.querySelector(".menu-btn");

    const menu =
        document.querySelector(".menu");

    const goTop =
        document.querySelector(".go-top");

    const botonLimpiar =
        document.querySelector("#limpiar-busqueda");


    /*=================================
            COMPROBAR PRODUCTOS
    =================================*/

    if (
        typeof productos === "undefined" ||
        !Array.isArray(productos)
    ) {

        console.error(
            "No se encontró el catálogo de productos."
        );

        if (contenedorProductos) {

            contenedorProductos.innerHTML = `

                <div class="sin-productos">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>
                        No se pudo cargar el catálogo
                    </h3>

                    <p>
                        Revisa que data/productos.js
                        esté correctamente conectado.
                    </p>

                </div>

            `;

        }

        return;

    }


    /*=================================
            CATEGORÍA ACTUAL
    =================================*/

    let categoriaActual = "todos";


    /*=================================
            MOSTRAR PRODUCTOS
    =================================*/

    function mostrarProductos(lista) {

        if (!contenedorProductos) return;

        contenedorProductos.innerHTML = "";


        /*-------------------------------
            SIN RESULTADOS
        -------------------------------*/

        if (lista.length === 0) {

            contenedorProductos.innerHTML = `

                <div class="sin-productos">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <h3>
                        No encontramos productos
                    </h3>

                    <p>
                        Intenta con otro nombre
                        o categoría.
                    </p>

                </div>

            `;

            actualizarResultados(0);

            return;

        }


        /*-------------------------------
            CREAR PRODUCTOS
        -------------------------------*/

        lista.forEach((producto, index) => {

            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                "product animar";


            tarjeta.dataset.nombre =
                producto.nombre.toLowerCase();


            tarjeta.dataset.categoria =
                producto.categoria.toLowerCase();


            tarjeta.dataset.id =
                producto.id;


            const favorito =
                typeof esFavorito === "function" &&
                esFavorito(producto.id);


            tarjeta.innerHTML = `

                <div class="product-image">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >


                    <button
                        type="button"
                        class="fav-btn ${
                            favorito
                            ? "favorito-activo"
                            : ""
                        }"
                        data-id="${producto.id}"
                        aria-label="${
                            favorito
                            ? "Quitar de favoritos"
                            : "Agregar a favoritos"
                        }"
                    >

                        <i class="${
                            favorito
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"></i>

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${producto.categoria}
                    </span>


                    <h3>
                        ${producto.nombre}
                    </h3>


                    <div class="product-price">

                        $${Number(producto.precio)
                            .toLocaleString("es-CO")}

                    </div>


                    <button
                        type="button"
                        class="btn agregar-carrito"
                        data-id="${producto.id}"
                    >

                        <i class="fa-solid fa-cart-plus"></i>

                        Agregar al carrito

                    </button>

                </div>

            `;


            contenedorProductos.appendChild(
                tarjeta
            );


            setTimeout(() => {

                tarjeta.classList.add(
                    "mostrar"
                );

            }, index * 45);

        });


        conectarBotonesProductos();

        actualizarResultados(lista.length);

    }


    /*=================================
            RESULTADOS
    =================================*/

    function actualizarResultados(cantidad) {

        if (!contadorResultados) return;


        if (cantidad === 1) {

            contadorResultados.textContent =
                "1 producto encontrado";

        } else {

            contadorResultados.textContent =
                `${cantidad} productos encontrados`;

        }

    }


    /*=================================
            FILTRAR
    =================================*/

    function filtrarProductos() {

        const texto =
            buscador
                ? buscador.value
                    .toLowerCase()
                    .trim()
                : "";


        const resultado =
            productos.filter(producto => {

                const nombre =
                    String(producto.nombre)
                        .toLowerCase();


                const categoria =
                    String(producto.categoria)
                        .toLowerCase();


                const coincideTexto =
                    nombre.includes(texto) ||
                    categoria.includes(texto);


                const coincideCategoria =
                    categoriaActual === "todos" ||
                    categoria === categoriaActual;


                return (
                    coincideTexto &&
                    coincideCategoria
                );

            });


        mostrarProductos(resultado);

    }


    /*=================================
            BUSCADOR
    =================================*/

    if (buscador) {

        buscador.addEventListener(
            "input",
            filtrarProductos
        );

    }


    /*=================================
            LIMPIAR BUSCADOR
    =================================*/

    if (botonLimpiar) {

        botonLimpiar.addEventListener(
            "click",
            () => {

                if (buscador) {

                    buscador.value = "";

                }

                filtrarProductos();

                buscador?.focus();

            }
        );

    }


    /*=================================
            FILTROS
    =================================*/

    filtros.forEach(filtro => {

        filtro.addEventListener(
            "click",
            () => {

                filtros.forEach(
                    boton =>
                        boton.classList.remove(
                            "activo"
                        )
                );


                filtro.classList.add(
                    "activo"
                );


                categoriaActual =
                    (
                        filtro.dataset.categoria ||
                        "todos"
                    ).toLowerCase();


                filtrarProductos();

            }
        );

    });


    /*=================================
        BOTONES DE PRODUCTOS
    =================================*/

    function conectarBotonesProductos() {


        /*-------------------------------
            CARRITO
        -------------------------------*/

        document
            .querySelectorAll(".agregar-carrito")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const id =
                            boton.dataset.id;


                        const producto =
                            productos.find(
                                item =>
                                    String(item.id) ===
                                    String(id)
                            );


                        if (!producto) return;


                        if (
                            typeof agregarProducto ===
                            "function"
                        ) {

                            agregarProducto(
                                producto.id,
                                producto.nombre,
                                producto.precio,
                                producto.imagen
                            );

                        }


                        boton.innerHTML = `

                            <i class="fa-solid fa-check"></i>

                            Agregado

                        `;


                        setTimeout(() => {

                            boton.innerHTML = `

                                <i class="fa-solid fa-cart-plus"></i>

                                Agregar al carrito

                            `;

                        }, 1000);

                    }
                );

            });


        /*-------------------------------
            FAVORITOS
        -------------------------------*/

        document
            .querySelectorAll(".fav-btn")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const id =
                            boton.dataset.id;


                        const producto =
                            productos.find(
                                item =>
                                    String(item.id) ===
                                    String(id)
                            );


                        if (!producto) return;


                        if (
                            typeof cambiarFavorito ===
                            "function"
                        ) {

                            cambiarFavorito(
                                producto.id,
                                producto.nombre,
                                producto.precio,
                                producto.imagen
                            );

                        }

                    }
                );

            });

    }


    /*=================================
            MENÚ MÓVIL
    =================================*/

    if (menuBtn && menu) {

        menuBtn.addEventListener(
            "click",
            () => {

                const activo =
                    menu.classList.toggle(
                        "activo"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    activo
                        ? "true"
                        : "false"
                );

            }
        );


        menu
            .querySelectorAll("a")
            .forEach(enlace => {

                enlace.addEventListener(
                    "click",
                    () => {

                        menu.classList.remove(
                            "activo"
                        );


                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /*=================================
            HEADER SCROLL
    =================================*/

    const header =
        document.querySelector("header");


    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;


            if (
                window.scrollY > 40
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }


            if (goTop) {

                if (
                    window.scrollY > 500
                ) {

                    goTop.classList.add(
                        "mostrar"
                    );

                } else {

                    goTop.classList.remove(
                        "mostrar"
                    );

                }

            }

        },
        {
            passive:true
        }
    );


    /*=================================
            IR ARRIBA
    =================================*/

    if (goTop) {

        goTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }
        );

    }


    /*=================================
            ANIMACIONES SCROLL
    =================================*/

    const elementosAnimados =
        document.querySelectorAll(
            ".animar"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "mostrar"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:.12
                }
            );


        elementosAnimados.forEach(
            elemento =>
                observer.observe(
                    elemento
                )
        );

    } else {

        elementosAnimados.forEach(
            elemento =>
                elemento.classList.add(
                    "mostrar"
                )
        );

    }


    /*=================================
            LINKS ANCLA
    =================================*/

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(enlace => {

            enlace.addEventListener(
                "click",
                evento => {

                    const destino =
                        enlace.getAttribute(
                            "href"
                        );


                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (!elemento) return;


                    evento.preventDefault();


                    elemento.scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });

                }
            );

        });


    /*=================================
            CATEGORÍAS
    =================================*/

    document
        .querySelectorAll(
            ".categoria-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const categoria =
                        (
                            card.dataset.categoria ||
                            "todos"
                        ).toLowerCase();


                    categoriaActual =
                        categoria;


                    filtros.forEach(
                        filtro => {

                            filtro.classList.toggle(
                                "activo",

                                (
                                    filtro.dataset.categoria ||
                                    "todos"
                                ).toLowerCase()
                                ===
                                categoria
                            );

                        }
                    );


                    const productosSeccion =
                        document.querySelector(
                            "#productos"
                        );


                    if (
                        productosSeccion
                    ) {

                        productosSeccion.scrollIntoView({
                            behavior:"smooth",
                            block:"start"
                        });

                    }


                    filtrarProductos();

                }
            );

        });


    /*=================================
            TOAST
    =================================*/

    window.mostrarToast =
        function(mensaje) {

            let toast =
                document.querySelector(
                    ".toast"
                );


            if (!toast) {

                toast =
                    document.createElement(
                        "div"
                    );

                toast.className =
                    "toast";

                document.body.appendChild(
                    toast
                );

            }


            toast.textContent =
                mensaje;


            toast.classList.add(
                "mostrar"
            );


            clearTimeout(
                window.toastTimeout
            );


            window.toastTimeout =
                setTimeout(
                    () => {

                        toast.classList.remove(
                            "mostrar"
                        );

                    },
                    2500
                );

        };


    /*=================================
            HORA
    =================================*/

    const reloj =
        document.querySelector("#hora");


    function actualizarHora(){

        if (!reloj) return;


        const ahora =
            new Date();


        reloj.textContent =
            ahora.toLocaleTimeString(
                "es-CO"
            );

    }


    if (reloj) {

        actualizarHora();

        setInterval(
            actualizarHora,
            1000
        );

    }


    /*=================================
            CARGAR CATÁLOGO
    =================================*/

    mostrarProductos(productos);


    /*=================================
            FILTRO TODOS
    =================================*/

    const filtroTodos =
        document.querySelector(
            '.filtro[data-categoria="todos"]'
        );


    if (filtroTodos) {

        filtroTodos.classList.add(
            "activo"
        );

    }


    /*=================================
            ESCAPE MENÚ
    =================================*/

    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key === "Escape"
            ) {

                menu?.classList.remove(
                    "activo"
                );

                menuBtn?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});