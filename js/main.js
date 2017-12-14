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
				addBtn.classList.add('add-btn');
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
	// Cerramos el modal al apretar esc.
	document.addEventListener('keydown', function (e) {
		var exist = $('.modalw');
		if (e.keyCode == 27 && exist.length > 0) {
			remove('.modalw');
			clearTimeout(offerTimeOut);
		}
	});

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
	var modal = createModal();
	var title = modal.querySelector('.modalw-title');
	var body = modal.querySelector('.modalw-body');

	// Creamos los elementos de la oferta.
	var titleText = document.createTextNode('Producto destacado!');
	var figure = document.createElement('figure');
	figure.classList.add('figure');
	var image = document.createElement('img');
	image.classList.add('img', 'center');
	var src = 'images/products/'+ category + '/sale/' + product.img;
	image.setAttribute('src', src);
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

	closeModal(modal);
	modal.style.display = 'block';

	offerTimeOut = setTimeout(function () {
		remove('.modalw');
		clearTimeout(offerTimeOut);
	}, 10000);
}

/**
 * Crea Y agrega un item de producto a la lista del carrito.
 * @param product
 * @param content
 */
function addProductItem(product, content) {

	// Product Item
	var item = document.createElement('li');
	item.classList.add('prod-item');
	item.setAttribute('data-prod', product.id);

	// Product Image
	var prodImg = document.createElement('img');
	var src = 'images/products/'+ product.category + '/thumbs/' + product.img;
	prodImg.setAttribute('src', src);
	prodImg.classList.add('prod-img', 'center');
	
	// Product Name
	var prodName = document.createElement('span');
	var prodNameText = document.createTextNode(product.name);
	prodName.classList.add('prod-name');
	prodName.appendChild(prodNameText);

	// Product quantity
	var prodOpt = document.createElement('div');
	item.appendChild(prodOpt);
	var plus = document.createElement('i');
	plus.classList.add('glyphicon', 'glyphicon-plus');
	var minus = document.createElement('i');
	minus.classList.add('glyphicon', 'glyphicon-minus');
	var quantity = document.createElement('span');
	quantity.innerHTML = "x " + product.quantity;
	quantity.classList.add('prod-quantity');
	prodOpt.classList.add('prod-options');
	prodOpt.appendChild(plus);
	prodOpt.appendChild(minus);

	// Product subtotal
	var prodSub = document.createElement('span');
	var subtotal = document.createTextNode("$ " + product.subtotal);
	prodSub.classList.add('prod-subtotal');
	prodSub.appendChild(subtotal);

	// Product remove
	var remove = document.createElement('i');
	remove.classList.add('glyphicon', 'glyphicon-remove');
	remove.setAttribute('data-remove', product.id);
	
	item.appendChild(prodImg);
	item.appendChild(prodName);
	item.appendChild(quantity);
	item.appendChild(prodOpt);
	item.appendChild(prodSub);
	item.appendChild(remove);
	content.appendChild(item);

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
		var msg = document.createElement('h3');
		msg.appendChild(msgText);

		var instructionText = document.createTextNode("Cliquee en el botón Agregar de cada producto para sumarlos al carrito.");
		var instruction = document.createElement('p');
		instruction.classList.add('msg');
		instruction.appendChild(instructionText);

		content.appendChild(msg);
		content.appendChild(instruction);

	} else {
		for (var i in Cart.products) {
			var product = Cart.products[i];
			addProductItem(product, content);
		}
	}

	//TODO Agregar botón de compra.

	$('body').appendChild(cart);

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
			if (item) {
				// Si existe le actualizamos los valores.
				var itemQuantity = item.querySelector('.prod-quantity');
				var itemSubtotal = item.querySelector('.prod-subtotal');
				itemQuantity.innerHTML = "x " + product.quantity;
				itemSubtotal.innerHTML = "$ " + product.subtotal;
			} else {
				// Si no, lo agregamos.
				addProductItem(product, $('#cart-content'));
			}

		}
	}
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
			cartQuantity.innerHTML ++;
			checkQuantity();
			updateCart(this.dataset.product);

		}, false);
	}



	/************** CART BEHAVIOUR *******************************/



	/** @type {Element} botón del carrito */
	var cartBtn = $('#cart-btn');

	/** @type {Node} contenedor del carrito */
	var cartParent = cartBtn.parentNode;

	/** @type {Element} icono del carrito */
	var cartIcon = $('#cart-btn .glyphicon');

	/** @type {Element} total de productos en el carrito */
	var cartQuantity = document.createElement('span');
	cartQuantity.setAttribute('id', 'cart-quantity');


	/** @type {Element} precio total del carrito */
	var cartTotal = document.createElement('span');
	cartTotal.setAttribute('id', 'cart-total');
	cartTotal.innerHTML = '0';


	cartBtn.addEventListener('mouseover', function () {
		this.style.borderColor = '#f5f5f5';
		this.style.cursor = 'pointer';
		cartIcon.style.color = '#f5f5f5';
		cartQuantity.style.backgroundColor = '#44d63e';
	}, false);
	cartBtn.addEventListener('mouseout', function () {
		this.style.borderColor = '#979797';
		cartIcon.style.color = '#979797';
		cartQuantity.style.backgroundColor = '#38b033';
	}, false);

	/**
	 * Chequea la cantidad de productos agregados al carrito.
	 * Si no hay productos esconde los elementos indicadores.
	 */
	function checkQuantity() {
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
	checkQuantity();

	cartBtn.addEventListener('click', function () {
		if ($('#cart')) {
			remove('#cart');
		} else {
			showCartModal();
		}
	}, false);

}, false);