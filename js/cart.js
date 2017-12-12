/**
 * Objeto modelo de Carrito.
 * @type {{products: {}, total: number, add: Cart.add, remove: Cart.remove, update: Cart.update, clear: Cart.clear}}
 */
var Cart = {
	/**
	 * Objeto de productos.
	 */
	products: {},

	/**
	 * Valor total del Cart.
	 */
	total: 0,

	/**
	 * Agrega un Producto al array products o si yá está agregado le agrega cantidad.
	 * @param Product
	 */
	add: function (Product) {
		// Chequeamos si el producto ya está agregado
		var prodIndex = this.products.hasOwnProperty(Product.id);
		var prodObj = {};
		if (!prodIndex) {
			// Si no está, lo creamos.
			prodObj = {
				name: Product.name,
				img: Product.img,
				price: Product.price,
				quantity: 1,
				subtotal: Product.price
			};
			this.products[Product.id] = prodObj;

		} else {
			// Si está, agregamos uno y le sumamos el subtotal.
			prodObj = this.products[Product.id];
			prodObj.quantity ++;
			prodObj.subtotal += Product.price;
		}


		this.update('add', Product);
	},

	/**
	 * Quita un producto del array products.
	 * @param Product
	 */
	remove: function (Product) {
		var prodIndex = this.products.hasOwnProperty(Product.id);
		if (!prodIndex) {
			console.error("ERROR: No se encontró el producto a eliminar");
			return null;
		}
		var prodObj = this.products[Product.id];
		prodObj.quantity --;
		prodObj.subtotal -= Product.price;

		if (prodObj.quantity < 1) {
			this.products.splice(Product.id, 1);
		}

		this.update('remove', Product);
	},

	/**
	 * Actualiza los valores del Cart.
	 * @param instance Instancia en la que se modifican los valores
	 * @param Product
	 */
	update: function (instance, Product) {
		switch (instance) {
			case 'add':
				this.total += Product.price;
				break;
			case 'remove':
				this.total -= Product.price;
				break;
			default:
				break;
		}
	},

	/**
	 * Elimina todos los productos del Cart.
	 */
	clear: function () {
		this.products = {};
	}
};

/**
 *  Objeto modelo de Producto
 * @type {{id: number, name: string, img: string, price: number, create: Product.create}}
 */
var Product = {
	id: 0,
	name: '',
	img: '',
	description: '',
	price: 0,
	create: function (id) {
		if (!id) {
			console.error("ERROR: Falta el id del producto a crear.")
		}
		for (var category in data) {
			for (var productData in data[category]) {
				if (data[category].hasOwnProperty(productData)) {
					var product = data[category][productData];
					if (product.id == id) {
						this.id = product.id;
						this.name = product.name;
						this.img = product.img;
						this.price = product.price;
					}
				}
			}
		}

		return this;
	}
};