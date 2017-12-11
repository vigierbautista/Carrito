/**
 * Carga las categorías.
 * @param container donde insertar las categorías
 */
function loadCategories(container) {

	var select = container.querySelector('select');
	for	(var category in data) {
		var option = document.createElement('option');
		var text = document.createTextNode(category);
		var val = category.substring(0,3);
		option.setAttribute('value', val.toLowerCase());
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
				var data_value = category.substring(0,3);
				col.setAttribute('data-cat', data_value.toLowerCase());

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

window.addEventListener('DOMContentLoaded', function () {

	/************** LOAD CONTENT ********************************/

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
	}, false);




	/************** PRODUCTS BEHAVIOUR ***************************/


	var addProductBtn = document.querySelectorAll('.add-btn');
	for (var i = 0; i < addProductBtn.length; i++) {
		addProductBtn[i].addEventListener('click', function () {
			var prodId = this.dataset.product;
			var newProd = Product.create(prodId);
			Cart.add(newProd);
			console.log(Cart.products);
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