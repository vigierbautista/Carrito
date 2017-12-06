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

				var col = document.createElement('div');
				col.classList.add('column');
				col.classList.add('col-lg-3');
				col.classList.add('col-md-4');
				col.classList.add('col-sm-6');
				var data_value = category.substring(0,3);
				col.setAttribute('data-cat', data_value.toLowerCase());

				var prodBox = document.createElement('div');
				prodBox.classList.add('prod-box');

				var img = document.createElement('img');
				var src = 'images/products/'+ category + '/' + product.img;
				img.setAttribute('src', src);
				img.classList.add('product-img');
				img.classList.add('center');

				var title = document.createElement('h3');
				var name = document.createTextNode(product.name);
				title.appendChild(name);
				title.classList.add('product-title');
				title.classList.add('center-text');

				var price = document.createElement('p');
				var amount = document.createTextNode('$ '+ product.price);
				price.appendChild(amount);
				price.classList.add('product-price');
				price.classList.add('center-text');

				prodBox.appendChild(img);
				prodBox.appendChild(title);
				prodBox.appendChild(price);
				col.appendChild(prodBox);
				row.appendChild(col);
			}

		}

	}
	productsCont.appendChild(row);

}

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

	/** @type {Element} contenedor de categorías */
	var categoriesCont = document.getElementById('filters');
	loadCategories(categoriesCont);

	/** @type {Element} contenedor de productos */
	var productsCont = document.getElementById('products-container');
	loadProducts(productsCont);

	/** @type {Element} selector de categorías */
	var categorySelector = document.getElementById('categories-container');

	categorySelector.addEventListener('change', function () {
		var selected = this.options[this.selectedIndex];
		applyFilter(selected.value);
	});

}, false);