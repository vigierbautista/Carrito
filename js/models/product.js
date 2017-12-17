/**
 *  Objeto modelo de Producto
 * @type {{id: number, name: string, img: string, price: number, create: Product.create}}
 */
var Product = {
	id: 0,
	name: '',
	img: '',
	description: '',
	category: '',
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
						this.description = product.description;
						this.category = category;
					}
				}
			}
		}

		return this;
	}
};