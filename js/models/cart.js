/**
 * Objeto de modelo de carrito.
 * @type {{products: {}, total: number, add: Cart.add, remove: Cart.remove, delete: Cart.delete, update: Cart.update, clear: Cart.clear}}
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
	 * Agrega un Producto al objeto products o si yá está agregado le agrega cantidad.
	 * @param Product
	 */
	add: function (Product) {
		// Chequeamos si el producto ya está agregado
		var prodIndex = this.products.hasOwnProperty(Product.id);
		var prodObj = {};
		if (!prodIndex) {
			// Si no está, lo creamos.
			prodObj = {
				id: Product.id,
				name: Product.name,
				img: Product.img,
				price: Product.price,
				quantity: 1,
				subtotal: Product.price,
				category: Product.category
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
	 * Quita un producto del objeto products.
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
			delete this.products[Product.id];
		}

		this.update('remove', Product);
	},

	/**
	 * Elimina un producto del objeto products
	 * @param Product
	 */
	delete: function (Product) {
		delete this.products[Product.id];
		this.update('delete', Product);
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

			case 'delete':
				var total = 0;
				for (var i in this.products) {
					total += this.products[i].subtotal;
				}
				this.total = total;
				break;

			default:
				break;
		}
	},

	/**
	 * Resetea el Cart.
	 */
	clear: function () {
		this.id = 0;
		this.products = {};
		this.total = 0;
	}
};
