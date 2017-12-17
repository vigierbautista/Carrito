/** GLOBAL VARIABLES */
// Time out de la función que cierra el modal a los 10 segundos.
var offerTimeOut;


/**
 * Carga las categorías.
 * @param container donde insertar las categorías
 */
function loadCategories(container) {

	var select = container.querySelector('select');
	for	(var category in data) {
		var option = document.createElement('option');
		var text = document.createTextNode(category);
		option.setAttribute('value', category);
		option.appendChild(text);
		select.appendChild(option);
	}
}

/**
 * Carga los productos
 * @param productsCont
 */
function loadProducts(productsCont) {

	var row = document.createElement('div');
	row.classList.add('row');

	for (var category in data) {
		for	(var productData in data[category]) {

			if (data[category].hasOwnProperty(productData)) {
				var product = data[category][productData];

				/*** COLUMN ***/
				var col = document.createElement('div');
				col.classList.add('column');
				col.classList.add('col-lg-3');
				col.classList.add('col-md-4');
				col.classList.add('col-sm-6');
				col.setAttribute('data-cat', category);

				/*** PRODUCT BOX ***/
				var prodBox = document.createElement('div');
				prodBox.classList.add('prod-box');

				/*** PRODUCT IMAGE ***/
				var img = document.createElement('img');
				var src = 'images/products/'+ category + '/' + product.img;
				img.setAttribute('src', src);
				img.setAttribute('alt', product.name);
				img.classList.add('product-img', 'center');

				/*** PRODUCT TITLE ***/
				var title = document.createElement('h3');
				var name = document.createTextNode(product.name);
				title.appendChild(name);
				title.classList.add('product-title', 'center-text');

				/*** PRODUCT PRICE ***/
				var price = document.createElement('p');
				var amount = document.createTextNode('$ '+ product.price);
				price.appendChild(amount);
				price.classList.add('product-price', 'center-text');

				/*** ADD BUTTON ***/
				var addBtn = document.createElement('div');
				var cartIcon = document.createElement('i');
				var btnTxt = document.createTextNode('Agregar');

				addBtn.appendChild(btnTxt);
				addBtn.appendChild(cartIcon);
				cartIcon.classList.add('glyphicon', 'glyphicon-shopping-cart');
				addBtn.classList.add('add-btn', 'bttn');
				addBtn.setAttribute('data-product', product.id);

				prodBox.appendChild(img);
				prodBox.appendChild(title);
				prodBox.appendChild(price);
				prodBox.appendChild(addBtn);
				col.appendChild(prodBox);
				row.appendChild(col);
			}

		}

	}
	productsCont.appendChild(row);

}

/**
 * Oculta o muestra productos según la categoría filtrada
 * @param filter
 */
function applyFilter(filter) {
	var products = $('.column');

	for	(var i = 0; i < products.length; i++) {

		products[i].style.display = 'none';

		if (filter === 'all' || products[i].dataset.cat === filter) {
			products[i].style.display = 'block';
		}
	}
}

/**
 * Brinda comportamientos necesarios para cerrar el modal.
 * @param modal
 */
function closeModal(modal) {

	// Cerramos el modal al cliquear el botón.
	var btn = $('.modalw-close');
	btn.addEventListener('click', function () {
		remove('.modalw');
		clearTimeout(offerTimeOut);
	}, false);

	// Cerramos el modal cuando se cliquea fuera de el.
	modal.addEventListener('click', function (e) {
		if (e.target == modal) {
			remove('.modalw');
			clearTimeout(offerTimeOut);
		}
	}, false);
}

/**
 * Crea y retorna una ventana modal.
 * @return {Element}
 */
function createModal() {

	var modal = document.createElement('div');
	modal.classList.add('modalw');
	var content = document.createElement('div');
	content.classList.add('modalw-content');
	var header = document.createElement('div');
	header.classList.add('modalw-header');
	var title = document.createElement('h3');
	title.classList.add('modalw-title', 'center-text');
	var close = document.createElement('button');
	close.classList.add('modalw-close');
	var closeIcon = document.createElement('i');
	closeIcon.classList.add('glyphicon', 'glyphicon-remove', 'bttn');
	var body = document.createElement('div');
	body.classList.add('modalw-body');

	modal.appendChild(content);
	content.appendChild(header);
	content.appendChild(body);
	header.appendChild(title);
	header.appendChild(close);
	close.appendChild(closeIcon);

	var documentBody = $('body');
	documentBody.appendChild(modal);
	closeModal(modal);

	return modal;
}

/**
 * Muestra la promoción destacada en cada categoría.
 * @param category
 */
function showOffer(category) {

	// Si la categoría es todos, no hacemos nada.
	if (category == 'all') return null;

	// Buscamos la categoría y el producto
	var products = data[category];
	for	(var i = 0; i < products.length; i++) {
		if (products[i].sale) {
			var product = products[i];
		}
	}

	// Obtenemos los elementos del modal base.
	createModal();
	var title = $('.modalw-title');
	var body = $('.modalw-body');

	// Creamos los elementos de la oferta.
	var titleText = document.createTextNode('Producto destacado!');
	var figure = document.createElement('figure');
	figure.classList.add('figure');
	var image = document.createElement('img');
	image.classList.add('img', 'center');
	var src = 'images/products/'+ category + '/sale/' + product.img;
	image.setAttribute('src', src);
	image.setAttribute('alt', product.name);
	var prodInfo = document.createElement('div');
	prodInfo.classList.add('info');
	var prodName = document.createElement('h4');
	prodName.classList.add('prod-name');
	var nameText = document.createTextNode(product.name);
	prodName.appendChild(nameText);
	var prodPrice = document.createElement('p');
	prodPrice.classList.add('prod-price');
	var priceText = document.createTextNode('$ ' + product.price);
	prodPrice.appendChild(priceText);
	var prodDesc = document.createElement('p');
	prodDesc.classList.add('prod-desc');
	var descText = document.createTextNode(product.description);
	prodDesc.appendChild(descText);

	title.appendChild(titleText);
	body.appendChild(figure);
	figure.appendChild(image);
	body.appendChild(prodInfo);
	prodInfo.appendChild(prodName);
	prodInfo.appendChild(prodPrice);
	prodInfo.appendChild(prodDesc);


	offerTimeOut = setTimeout(function () {
		remove('.modalw');
		clearTimeout(offerTimeOut);
	}, 10000);
}

/**
 * Incrementa la cantidad de un producto.
 * @param Product
 */
function increase(Product) {
	Cart.add(Product);
	$('#cart-quantity').innerHTML ++;
	checkQuantity();
	updateCart(Product.id);
}

/**
 * Decrementa la cantidad de un producto.
 * @param Product
 */
function decrease(Product) {
	Cart.remove(Product);
	$('#cart-quantity').innerHTML --;
	checkQuantity();
	updateCart(Product.id);
}

/**
 * Elimina al producto del Cart y de la lista de agregados.
 * @param Product
 */
function erase(Product) {
	Cart.delete(Product);
	$('#cart-quantity').innerHTML = Cart.quantity;
	checkQuantity();
	updateCart(Product.id);
}

/**
 * Crea y agrega un item de producto a la lista del carrito.
 * @param Product instance
 * @param content
 */
function addProductItem(Product, content) {

	// Product Item
	var item = document.createElement('li');
	item.classList.add('prod-item');
	item.setAttribute('data-prod', Product.id);

	// Product Image
	var prodImg = document.createElement('img');
	var src = 'images/products/'+ Product.category + '/thumbs/' + Product.img;
	prodImg.setAttribute('src', src);
	prodImg.setAttribute('alt', Product.name);
	prodImg.classList.add('prod-img', 'center');
	
	// Product Name
	var prodName = document.createElement('span');
	var prodNameText = document.createTextNode(Product.name);
	prodName.classList.add('prod-name');
	prodName.appendChild(prodNameText);

	// Product quantity
	var prodOpt = document.createElement('div');
	item.appendChild(prodOpt);
	var plus = document.createElement('i');
	plus.classList.add('glyphicon', 'glyphicon-plus', 'bttn');
	var minus = document.createElement('i');
	minus.classList.add('glyphicon', 'glyphicon-minus', 'bttn');
	var quantity = document.createElement('span');
	quantity.innerHTML = "x " + Product.quantity;
	quantity.classList.add('prod-quantity');
	prodOpt.classList.add('prod-options');
	prodOpt.appendChild(plus);
	prodOpt.appendChild(minus);
	plus.addEventListener('click', function () {
		increase(Product);
	}, false);

	minus.addEventListener('click', function () {
		decrease(Product);
	}, false);


	// Product subtotal
	var prodSub = document.createElement('span');
	var subtotal = document.createTextNode("$ " + Product.subtotal);
	prodSub.classList.add('prod-subtotal');
	prodSub.appendChild(subtotal);

	// Product remove
	var remove = document.createElement('i');
	remove.classList.add('glyphicon', 'glyphicon-remove', 'bttn');
	remove.setAttribute('data-remove', Product.id);
	remove.addEventListener('click', function () {
		erase(Product);
	}, false);
	
	item.appendChild(prodImg);
	item.appendChild(prodName);
	item.appendChild(quantity);
	item.appendChild(prodOpt);
	item.appendChild(prodSub);
	item.appendChild(remove);
	content.appendChild(item);

}

/**
 * Crea el formulario de datos del usuario.
 * @return {Element}
 */
function createForm() {
	var form = document.createElement('form');
	form.setAttribute('id', 'user-form');

	// Name
	var inputGrp1 = document.createElement('div');
	inputGrp1.classList.add('input-group');
	var nameInput = document.createElement('input');
	nameInput.setAttribute('id', 'name');
	nameInput.setAttribute('name', 'name');
	nameInput.setAttribute('type', 'text');
	var nameLabel = document.createElement('label');
	nameLabel.setAttribute('for', 'name');
	var nameLblTxt = document.createTextNode('Nombre: ');
	nameLabel.appendChild(nameLblTxt);
	inputGrp1.appendChild(nameLabel);
	inputGrp1.appendChild(nameInput);

	// Telephone
	var inputGrp2 = document.createElement('div');
	inputGrp2.classList.add('input-group');
	var telInput = document.createElement('input');
	telInput.setAttribute('id', 'tel');
	telInput.setAttribute('name', 'tel');
	telInput.setAttribute('type', 'tel');
	var telLabel = document.createElement('label');
	telLabel.setAttribute('for', 'tel');
	var telLblTxt = document.createTextNode('Teléfono: ');
	telLabel.appendChild(telLblTxt);
	inputGrp2.appendChild(telLabel);
	inputGrp2.appendChild(telInput);

	// Email
	var inputGrp3 = document.createElement('div');
	inputGrp3.classList.add('input-group');
	var emailInput = document.createElement('input');
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('name', 'email');
	emailInput.setAttribute('type', 'text');
	var emailLabel = document.createElement('label');
	emailLabel.setAttribute('for', 'email');
	var emailLblTxt = document.createTextNode('Email: ');
	emailLabel.appendChild(emailLblTxt);
	inputGrp3.appendChild(emailLabel);
	inputGrp3.appendChild(emailInput);

	// Location
	var inputGrp4 = document.createElement('div');
	inputGrp4.classList.add('input-group');
	var locationInput = document.createElement('input');
	locationInput.setAttribute('id', 'location');
	locationInput.setAttribute('name', 'location');
	locationInput.setAttribute('type', 'text');
	var locationLabel = document.createElement('label');
	locationLabel.setAttribute('for', 'location');
	var locationLblTxt = document.createTextNode('Dirección: ');
	locationLabel.appendChild(locationLblTxt);
	inputGrp4.appendChild(locationLabel);
	inputGrp4.appendChild(locationInput);

	// Date
	var inputGrp5 = document.createElement('div');
	inputGrp5.classList.add('input-group');
	var dateInput = document.createElement('input');
	dateInput.setAttribute('id', 'date');
	dateInput.setAttribute('name', 'date');
	dateInput.setAttribute('type', 'date');
	var dateLabel = document.createElement('label');
	dateLabel.setAttribute('for', 'date');
	var dateLblTxt = document.createTextNode('Fecha: ');
	dateLabel.appendChild(dateLblTxt);
	inputGrp5.appendChild(dateLabel);
	inputGrp5.appendChild(dateInput);

	// Payment
	var inputGrp6 = document.createElement('div');
	inputGrp6.classList.add('input-group');
	var paymentSelect = document.createElement('select');
	paymentSelect.setAttribute('id', 'payment');
	paymentSelect.setAttribute('name', 'payment');
	var paymentLabel = document.createElement('label');
	paymentLabel.setAttribute('for', 'payment');
	var paymentLblTxt = document.createTextNode('Medio de pago: ');
	var paymaentOpt1 = document.createElement('option');
	var paymaentOpt1Text = document.createTextNode('Visa nacional **** **** **** 8795');
	paymaentOpt1.setAttribute('value', '1');
	paymaentOpt1.appendChild(paymaentOpt1Text);
	var paymaentOpt2 = document.createElement('option');
	var paymaentOpt2Text = document.createTextNode('Mastercard internacional **** **** **** 1733');
	paymaentOpt2.setAttribute('value', '2');
	paymaentOpt2.appendChild(paymaentOpt2Text);
	var paymaentOpt3 = document.createElement('option');
	var paymaentOpt3Text = document.createTextNode('Visa débito **** **** **** 2556');
	paymaentOpt3.setAttribute('value', '3');
	paymaentOpt3.appendChild(paymaentOpt3Text);
	paymentLabel.appendChild(paymentLblTxt);
	paymentSelect.appendChild(paymaentOpt1);
	paymentSelect.appendChild(paymaentOpt2);
	paymentSelect.appendChild(paymaentOpt3);
	inputGrp6.appendChild(paymentLabel);
	inputGrp6.appendChild(paymentSelect);

	// Button
	var nextBtn = document.createElement('button');
	var rightArrow = document.createElement('i');
	var btnTxt = document.createTextNode('Siguiente');
	nextBtn.appendChild(btnTxt);
	nextBtn.appendChild(rightArrow);
	nextBtn.setAttribute('type', 'submit');
	rightArrow.classList.add('glyphicon', 'glyphicon-arrow-right');
	nextBtn.classList.add('next-btn', 'bttn');


	form.appendChild(inputGrp1);
	form.appendChild(inputGrp2);
	form.appendChild(inputGrp3);
	form.appendChild(inputGrp4);
	form.appendChild(inputGrp5);
	form.appendChild(inputGrp6);
	form.appendChild(nextBtn);

	return form;
}

/**
 * Retorna si los datos no están vacíos o un array con los datos que deben completarse.
 * @param data
 * @return {*}
 */
function checkMissing(data) {
	var empty = [];
	if (isEmpty(data)) return false;
	for (var i in data) {
		if (data[i] == '') {
			empty.push(i);
		}
	}
	return empty;
}

/**
 * Marca los campos que debe completar el usuario.
 * @param missing
 */
function displayErrors(missing) {
	for (var i in missing) {
		var alert = document.createElement('span');
		var alertText = document.createTextNode('* Por favor complete este campo');
		alert.classList.add('error');
		alert.appendChild(alertText);
		var input = $('#' + missing[i]);
		input.parentNode.appendChild(alert);
		input.classList.add('error');
	}
}

/**
 * Limpia los errores del formulario.
 */
function cleanErrors() {
	var inputs = $('#user-form input.error');
	if (inputs) {
		for (var i in inputs) {
			// querySelectorAll devuelve un NodeList, por eso debemos saltear las propiedades que no sean numéricas.
			if (isNaN(i)) continue;
			inputs[i].classList.remove('error');

		}
	}

	var msgs = $('span.error');
	if (msgs) {
		for (var i in msgs) {
			// querySelectorAll devuelve un NodeList, por eso debemos saltear las propiedades que no sean numéricas.
			if (isNaN(i)) continue;
			msgs[i].parentNode.removeChild(msgs[i]);
		}
	}
}

/**
 * Completa los valores del formulario con los datos ya ingresados.
 */
function refill() {
    for (var key in Order.data) {
        if (key != 'payment' && key != 'cart') {
            if (Order.data[key]== 'cart') continue;
            $('#' + key).value = Order.data[key];
        }
    }
}

/**
 * Vuelve al paso anterior del formulario de datos.
 */
function back() {
	// Creamos el nuevo formulario y borramos el contenido anterior.
	var body = $('.modalw-body');
	var form = createForm();
	$('.modalw-title').innerHTML = "Ingrese sus datos";
	empty(body);
	body.appendChild(form);

	// Completamos con los datos.
	refill();

	// Comportamiento del submit.
	submit(form);
}

/**
 * Muestra el mensaje de agradecimiento y finaliza la operación.
 */
function thanks() {
	// Borramos el contenido anterior.
    var content = $('.modalw-content');
    content.classList.remove('confirm');
    content.classList.add('thanks');
    $('.modalw-title').innerHTML = "Gracias por su compra!";
    var body = $('.modalw-body');
    empty(body);

    // Mostramos el mensaje de agradecimiento.
	var successIcon = document.createElement('i');
	successIcon.classList.add('glyphicon', 'glyphicon-ok-circle');
	var msg = document.createElement('p');
	var msgTxt = document.createTextNode('Su compra se realizó con éxito. En unos minutos recibirá un mail con los datos de la compra en ' + Order.data.email);
    var closeBtn = document.createElement('button');
    var closeTxt = document.createTextNode('Cerrar');
    closeBtn.appendChild(closeTxt);
    closeBtn.classList.add('close-btn', 'bttn');
    closeBtn.addEventListener('click', function () {
        remove('.modalw');
        Cart.clear();
        Order.reset();
        var cartTotal = $('#cart-total');
        var cartQuantity = $('#cart-quantity');
        cartTotal.parentNode.removeChild(cartTotal);
        cartQuantity.parentNode.removeChild(cartQuantity);
    }, false);

    body.appendChild(successIcon);
    msg.appendChild(msgTxt);
    body.appendChild(msg);
    body.appendChild(closeBtn);
}

/**
 * Muestra un resumen de los datos del usuario y los productos.
 * @param Order
 */
function showConfirmation(Order) {
	// Cambiamos el titulo y el contenido del modal.
	var content = $('.modalw-content');
	content.classList.remove('checkout');
	content.classList.add('confirm');
	$('.modalw-title').innerHTML = "Confirme sus datos";
	var body = $('.modalw-body');
	empty(body);

	// Creamos una lista con los datos del pedido.
	var list = document.createElement('ul');
	list.setAttribute('id', 'details');
	for (var key in Order.data) {
		if (key == 'cart') {
			var pedido = document.createElement('li');
			var pedidoSpan = document.createElement('span');
			var pedidoText = document.createTextNode('Pedido: ');
			var prodList = document.createElement('ul');
			prodList.setAttribute('id', 'pedido');
			for (var prod in Order.data.cart.products) {
				var product = Order.data.cart.products[prod];
				var prodItem = document.createElement('li');
				var prodName = document.createElement('span');
				prodName.classList.add('name');
				var prodItemText = document.createTextNode(product.name + ' x' + product.quantity);
				var subtotal = document.createElement('span');
				subtotal.classList.add('subtotal');
				var subtotalText = document.createTextNode('$ ' + product.subtotal);

				prodName.appendChild(prodItemText);
				prodItem.appendChild(prodName);
				subtotal.appendChild(subtotalText);
				prodItem.appendChild(subtotal);
				prodList.appendChild(prodItem);
			}
			var total = document.createElement('li');
			var totalSpan = document.createElement('span');
			totalSpan.classList.add('name');
			var spanNum = document.createElement('span');
			spanNum.classList.add('subtotal');
			var totalText = document.createTextNode('Total: ');
			var spanTotal = document.createTextNode('$ ' + Order.data.cart.total);

			totalSpan.appendChild(totalText);
			spanNum.appendChild(spanTotal);
			total.appendChild(totalSpan);
			total.appendChild(spanNum);
			prodList.appendChild(total);
			pedidoSpan.appendChild(pedidoText);
			pedido.appendChild(pedidoSpan);
			pedido.appendChild(prodList);
			list.appendChild(pedido);

		} else {

			var item = document.createElement('li');
			var itemText = document.createTextNode(Order.data[key]);
			var span = document.createElement('span');
			var spanText = document.createTextNode(ucFirst(key) + ': ');
			span.appendChild(spanText);
			item.appendChild(span);
			item.appendChild(itemText);
			list.appendChild(item);
		}
	}
	body.appendChild(list);

	// Buttons
	var prevBtn = document.createElement('button');
	var leftArrow = document.createElement('i');
	var prevTxt = document.createTextNode('Atrás');
	prevBtn.appendChild(leftArrow);
	prevBtn.appendChild(prevTxt);
	leftArrow.classList.add('glyphicon', 'glyphicon-arrow-left');
	prevBtn.classList.add('back-btn', 'bttn');
	prevBtn.addEventListener('click', function () {
		back();
	}, false);

	var confirmBtn = document.createElement('button');
	var rightArrow = document.createElement('i');
	var confirmTxt = document.createTextNode('Confirmar');
	confirmBtn.appendChild(confirmTxt);
	confirmBtn.appendChild(rightArrow);
	rightArrow.classList.add('glyphicon', 'glyphicon-ok');
	confirmBtn.classList.add('confirm-btn', 'bttn');
	confirmBtn.addEventListener('click', function () {
		thanks();
	}, false);

	body.appendChild(prevBtn);
	body.appendChild(confirmBtn);
}

/**
 * Comportamiento del formulario al ser enviado.
 * @param form
 */
function submit(form) {
	// Submit
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		cleanErrors();
		var data = {
			name: $('#name').value,
			email: $('#email').value,
			tel: $('#tel').value,
			date: $('#date').value,
			location: $('#location').value,
			payment: $('#payment').options[$('#payment').selectedIndex].innerHTML
		};
		var missing = checkMissing(data);
		// // TODO BORRAR BYPASS
		// missing = [];
		// // TODO BORRAR BYPASS
		if (missing.length) {
			displayErrors(missing);

		} else {
			data.cart = Cart;
			Order.create(data);
			showConfirmation(Order);
		}
	}, false);
}

/**
 * Crea la ventana de checkout.
 */
function checkout() {
	// Sacamos el carrito
	remove('#cart');
	toogleActive();

	// Creamos el modal del checkout.
	createModal();
	$('.modalw-content').classList.add('checkout');
	var title = document.createTextNode('Ingrese sus datos');
	$('.modalw-title').appendChild(title);

	// Formulario de datos de usuario.
	var form = createForm();
	$('.modalw-body').appendChild(form);
	refill();
	submit(form);
}

/**
 * Crea la ventana que muestra el resumen del carrito.
 */
function showCartModal() {

	var cart = document.createElement('div');
	cart.setAttribute('id', 'cart');
	var content = document.createElement('ul');
	content.setAttribute('id', 'cart-content');
	cart.appendChild(content);

	// Nos fijamos que el carrito no esté vacío.
	if (isEmpty(Cart.products)) {
		var msgText = document.createTextNode("El carrito está vacío!");
		var msg = document.createElement('li');
		msg.classList.add('msg-title');
		msg.appendChild(msgText);

		var instructionText = document.createTextNode("Cliquee en el botón Agregar de cada producto para sumarlos al carrito.");
		var instruction = document.createElement('li');
		instruction.classList.add('msg');
		instruction.appendChild(instructionText);

		content.appendChild(msg);
		content.appendChild(instruction);

	} else {
		for (var i in Cart.products) {
			var product = Cart.products[i];
			addProductItem(product, content);
		}

		var buyBtn = document.createElement('button');
		buyBtn.classList.add('bttn');
		buyBtn.setAttribute('id', 'buyBtn');
		var buyText = document.createTextNode('Comprar');

		buyBtn.addEventListener('click', checkout, false);


		buyBtn.appendChild(buyText);
		cart.appendChild(buyBtn);
	}


	$('body').appendChild(cart);

}

/**
 * Activa o desactiva el icono según corresponda.
 */
function toogleActive() {
	$('#cart-btn').classList.toggle('active');
	$('#cart-btn .glyphicon-shopping-cart').classList.toggle('active');
	if ($('#cart-quantity')) {
		$('#cart-quantity').classList.toggle('active');
	}
}

/**
 * Dado el id del producto agregado al carrito, lo agrega a la lista o actualiza sus valores si ya estaba agregado.
 * @param id
 */
function updateCart(id) {
	// Chequeamos si existe el carrito.
	if ($('#cart')) {
		// Chequeamos si la ventana está mostrando el mensaje de carrito vacío.
		if ($('#cart .msg')) {
			remove('#cart');
			showCartModal();
		} else {
			// Si no, chequeamos si el producto está en la lista
			var product	= Cart.products[id];
			var item = $("[data-prod='"+ id +"']");
			if (item && product) {
				// Si existe le actualizamos los valores.
				var itemQuantity = item.querySelector('.prod-quantity');
				var itemSubtotal = item.querySelector('.prod-subtotal');
				itemQuantity.innerHTML = "x " + product.quantity;
				itemSubtotal.innerHTML = "$ " + product.subtotal;
			} else if (item && !product) {
				// Si existe en la Lista pero NO en el Cart, lo eliminamos de la lista.
				remove("[data-prod='"+ id +"']");
				if (isEmpty(Cart.products)) {
					remove("#cart");
					toogleActive();
				}
			} else {
				// Si no, lo agregamos.
				addProductItem(product, $('#cart-content'));
			}

		}
	}
}

/**
 * Chequea la cantidad de productos agregados al carrito.
 * Si no hay productos esconde los elementos indicadores.
 */
function checkQuantity() {
	var cartQuantity = $('#cart-quantity');
	var cartTotal = $('#cart-total');
	var cartBtn = $('#cart-btn');
	var cartParent = cartBtn.parentNode;

	if (!cartQuantity) {
		return
	}

	if (cartQuantity.innerHTML > 0) {
		cartQuantity.style.display = 'inline-block';
		cartTotal.innerHTML = '$ ' + Cart.total;
		cartParent.appendChild(cartTotal);
		cartBtn.appendChild(cartQuantity);
	} else {
		if (isChild(cartParent, cartTotal) && isChild(cartBtn, cartQuantity)) {
			cartParent.removeChild(cartTotal);
			cartBtn.removeChild(cartQuantity);
		}
	}
}


function showProductModal(product) {
	createModal();
	$('.modalw-title').innerHTML = product.name;
	var body = $('.modalw-body');

    // Creamos los elementos del producto.
    var figure = document.createElement('figure');
    figure.classList.add('figure');
    var image = document.createElement('img');
    image.classList.add('img', 'center');
    var src = 'images/products/'+ product.category + '/modal/' + product.img;
    image.setAttribute('src', src);
    image.setAttribute('alt', product.name);
    var prodInfo = document.createElement('div');
    prodInfo.classList.add('info');
    var prodDesc = document.createElement('p');
    prodDesc.classList.add('prod-desc');
    var descText = document.createTextNode(product.description);
    prodDesc.appendChild(descText);

    body.appendChild(figure);
    figure.appendChild(image);
    body.appendChild(prodInfo);
    prodInfo.appendChild(prodDesc);

}

window.addEventListener('DOMContentLoaded', function () {

	/************** LOAD CONTENT *********************************/

	/** @type {Element} contenedor de categorías */
	var categoriesCont = $('#filters');
	loadCategories(categoriesCont);

	/** @type {Element} contenedor de productos */
	var productsCont = $('#products-container');
	loadProducts(productsCont);



	/************** CATEGORY SELECTION ***************************/

	/** @type {Element} selector de categorías */
	var categorySelector = $('#categories-container');

	categorySelector.addEventListener('change', function () {
		var selected = this.options[this.selectedIndex];
		applyFilter(selected.value);
		showOffer(selected.value);

	}, false);




	/************** PRODUCTS BEHAVIOUR ***************************/

	/** @type {Object} botones de agregar al carrito */
	var addProductBtn = $('.add-btn');
	for (var i = 0; i < addProductBtn.length; i++) {
		addProductBtn[i].addEventListener('click', function () {
			// Creamos el producto.
			var prodId = this.dataset.product;
			var newProd = Product.create(prodId);
			// Agregamos el producto al carrito.
			Cart.add(newProd);
			// Actualizamos la cantidad de productos en el icono del carrito.
			cartBtn.parentNode.appendChild(cartTotal);
			cartBtn.appendChild(cartQuantity);
			cartQuantity.innerHTML ++;
			checkQuantity();
			updateCart(this.dataset.product);
		}, false);
	}

	var prodBoxes = $('.prod-box');
	for (var j = 0; j < prodBoxes.length; j++) {
		prodBoxes[j].addEventListener('click', function (e) {
			var addBtn = this.querySelector('.add-btn');
			if (e.target != addBtn) {
				var product = Product.create(addBtn.dataset.product);
				showProductModal(product);
			}
        }, false)
	}



	/************** CART BEHAVIOUR *******************************/

	/** @type {Element} botón del carrito */
	var cartBtn = $('#cart-btn');

	/** @type {Element} total de productos en el carrito */
	var cartQuantity = document.createElement('span');
	cartQuantity.setAttribute('id', 'cart-quantity');


	/** @type {Element} precio total del carrito */
	var cartTotal = document.createElement('span');
	cartTotal.setAttribute('id', 'cart-total');
	cartTotal.innerHTML = '0';

	// Cart button active class.
	cartBtn.addEventListener('mouseover', function () {
		toogleActive();
	}, false);
	cartBtn.addEventListener('mouseout', function () {
		toogleActive();
	}, false);

	checkQuantity();

	cartBtn.addEventListener('click', function () {
		if ($('#cart')) {
			remove('#cart');
			toogleActive();
		} else {
			showCartModal();
			toogleActive();
		}
	}, false);


	/************** ESC KEY EVENT **********************************/

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 27) {
			if ($('.modalw')) {
				// Cerramos el modal al apretar esc.
				remove('.modalw');
				clearTimeout(offerTimeOut);
			}
			if ($('#cart')) {
				// Cerramos el carrito al apretar esc.
				remove('#cart');
				toogleActive();
			}
		}
	});

}, false);