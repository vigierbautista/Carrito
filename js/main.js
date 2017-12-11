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
	var products = document.querySelectorAll('.column');

	for	(var i = 0; i < products.length; i++) {

		products[i].style.display = 'none';

		if (filter === 'all' || products[i].dataset.cat === filter) {
			products[i].style.display = 'block';
		}
	}
}


/**
 * Crea y Retorna un modelo de ventana modal.
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
	title.classList.add('modalw-title');
	var close = document.createElement('button');
	close.classList.add('modalw-close');
	var closeIcon = document.createElement('i');
	closeIcon.classList.add('glyphicon', 'glyphicon-remove');
	var body = document.createElement('div');
	body.classList.add('modalw-body');

	modal.appendChild(content);
	content.appendChild(header);
	content.appendChild(body);
	header.appendChild(title);
	header.appendChild(close);
	close.appendChild(closeIcon);

	return modal;
}

function showOffer(category) {

	// Buscamos la categoría y el producto
	var products = data[category];
	for	(var i = 0; i > products.length; i++) {
		if (products[i].sale) {
			var product = products[i];
		}
	}

	// Obtenemos los elementos del modal base.
	var modal = createModal();
	var content = modal.querySelector('.modalw-body');
	var title = modal.querySelector('modalw-title');
	var body = modal.querySelector('modalw-body');

	// Creamos los elementos de la oferta.
	var titleText = document.createTextNode('Oferta Especial!');
	var cont = document.createElement('div');
	cont.classList.add('container');
	var row = document.createElement('div');
	row.classList.add('row');
	var col1 = document.createElement('div');
	col1.classList.add('col-md-4');
	var col2= document.createElement('div');
	col2.classList.add('col-md-8');
	var image = document.createElement('img');
	image.classList.add('img', 'center');
	var src = 'images/products/'+ category + '/' + product.img;
	image.setAttribute('src', src);
	var prodName = document.createElement('h4');
	prodName.classList.add('prod-name');
	var prodPrice = document.createElement('p');
	prodPrice.classList.add('prod-name');



	modal.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', function () {

	/************** LOAD CONTENT *********************************/

	/** @type {Element} contenedor de categorías */
	var categoriesCont = document.getElementById('filters');
	loadCategories(categoriesCont);

	/** @type {Element} contenedor de productos */
	var productsCont = document.getElementById('products-container');
	loadProducts(productsCont);



	/************** CATEGORY SELECTION ***************************/

	/** @type {Element} selector de categorías */
	var categorySelector = document.getElementById('categories-container');

	categorySelector.addEventListener('change', function () {
		var selected = this.options[this.selectedIndex];
		applyFilter(selected.value);
		showOffer(selected.value);

	}, false);



	/************** MODAL BEHAVIOUR ******************************/






	/************** PRODUCTS BEHAVIOUR ***************************/

	/** @type {Object} botones de agregar al carrito */
	var addProductBtn = document.querySelectorAll('.add-btn');
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

		}, false);
	}



	/************** CART BEHAVIOUR *******************************/



	/** @type {Element} botón del carrito */
	var cartBtn = document.getElementById('cart-btn');

	/** @type {Element} icono del carrito */
	var cartIcon = cartBtn.querySelector('.glyphicon');

	/** @type {Element} cantidad del productos en el carrito */
	var cartQuantity = document.getElementById('cart-quantity');

	cartBtn.addEventListener('mouseover', function () {
		this.style.borderColor = '#f5f5f5';
		this.style.cursor = 'pointer';
		cartIcon.style.color = '#f5f5f5';
		cartQuantity.style.backgroundColor = '#f5f5f5';
	}, false);
	cartBtn.addEventListener('mouseout', function () {
		this.style.borderColor = '#979797';
		cartIcon.style.color = '#979797';
		cartQuantity.style.backgroundColor = '#979797';
	}, false);

	/**
	 * Chequea la cantidad de productos agregados al carrito.
	 * Si no hay productos esconde los elementos indicadores.
	 */
	function checkQuantity() {
		if (cartQuantity.innerHTML > 0) {
			cartQuantity.style.display = 'inline-block';
		} else {
			cartQuantity.style.display = 'none';
		}
	}
	checkQuantity();

	cartBtn.addEventListener('click', function () {
		showCartModal();
	}, false);

}, false);