/**
 * Objeto modelo de pedido.
 * @type {{name: string, email: string, tel: string, date: string, location: string, payment: string, cart: {}, create: Order.create, reset: Order.reset}}
 */
var Order = {
	data: {
		name: '',
		email: '',
		tel: '',
		date: '',
		location: '',
		payment: '',
		cart: {}
	},
	create: function (data) {
		this.data.name = data.name;
		this.data.email = data.email;
		this.data.tel = data.tel;
		this.data.date = data.date;
		this.data.location = data.location;
		this.data.payment = data.payment;
		this.data.cart = data.cart;
	},
	reset: function () {
		this.data.name = '';
		this.data.email = '';
		this.data.tel = '';
		this.data.date = '';
		this.data.location = '';
		this.data.payment = '';
		this.data.cart = {};
	}
};