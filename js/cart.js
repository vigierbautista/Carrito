/**
 * Objeto modelo de carrito.
 * @type {{products: Array, add: Cart.add, remove: Cart.remove, clear: Cart.clear, update: Cart.update, total: number}}
 */
var Cart = {
	products: [],
	add: function () {},
	remove: function () {},
	clear: function () {},
	update: function () {},
	total: 0
};

/**
 * Objeto modelo de Producto
 * @type {{id: number, title: string, img: string, price: string, quantity: number}}
 */
var Product = {
	id: 0,
	title: '',
	img: '',
	price: '',
	quantity: 0
};