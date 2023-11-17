const productsData = [
    {
        id: 1,
        name: "Alimento para perro",
        bid: 4500,
        category: "perros",
        cardImg: "/img/product-1.png",
    },
    {
        id: 2,
        name: "Alimento para peces",
        bid: 3500,
        category: "peces",
        cardImg: "/img/product-2.png",
    },
    {
        id: 3,
        name: "Alimento para peces",
        bid: 2000,
        category: "peces",
        cardImg: "/img/product-3.png",
    },
    {
        id: 4,
        name: "Alimento para aves",
        bid: 3000,
        category: "aves",
        cardImg: "/img/product-4.png",
    },
    {
        id: 5,
        name: "Juego para gato",
        bid: 4500,
        category: "gatos",
        cardImg: "/img/product-5.png",
    },
    {
        id: 6,
        name: "Alimento para gato",
        bid: 5000,
        category: "gatos",
        cardImg: "/img/product-6.png",
    },
    {
        id: 7,
        name: "Alimento para perro",
        bid: 6400,
        category: "perros",
        cardImg: "/img/product-7.png",
    },
    {
        id: 8,
        name: "Alimento para perro",
        bid: 4500,
        category: "perros",
        cardImg: "/img/product-8.png",
    },
    {
        id: 9,
        name: "Juguete para perros",
        bid: 2650,
        category: "perros",
        cardImg: "/img/product-9.png",
    },
    {
        id: 10,
        name: "Juguete para aves",
        bid: 1000,
        category: "aves",
        cardImg: "/img/product-10.png",
    },
];
  


// Define una función que divide la lista de productos en partes del tamaño especificado
const DivideProductsInParts = (size) => {
    const productsList = [];
    for (let i = 0; i < productsData.length; i += size)
        productsList.push(productsData.slice(i, i + size));
    console.log(productsList); // Muestra en la consola las partes divididas de la lista de productos
    return productsList; // Devuelve la lista de productos dividida
}

// Define el estado inicial de la aplicación utilizando la función DivideProductsInParts
const appState = {
    // Inicializa la lista de productos dividida en partes de tamaño 2
    products: DivideProductsInParts(2),
    // Inicializa el índice actual de las partes de productos que se están mostrando
    currentProductsIndex: 0,
    // Inicializa el límite total de partes de productos disponibles
    productsLimit: DivideProductsInParts(2).length,
    // Inicializa el filtro activo (inicialmente, no hay filtro)
    activeFilter: null,
}
