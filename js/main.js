/**
 * Carga las categorías.
 * @param container donde insertar las categorías
 */
function loadCategories(container) {

	var list = document.createElement('ul');
	for	(var category in data) {
		var item = document.createElement('li');
		var link = document.createElement('a');
		var text = document.createTextNode(category);
		link.appendChild(text);
		link.classList.add('category');
		item.appendChild(link);
		list.appendChild(item);
		container.appendChild(list);
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
				col.classList.add('col-lg-3');
				col.classList.add('col-md-4');
				col.classList.add('col-sm-6');

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

				col.appendChild(img);
				col.appendChild(title);
				col.appendChild(price);
				row.appendChild(col);
			}

		}

	}
	productsCont.appendChild(row);

}

window.addEventListener('DOMContentLoaded', function () {

	/** @type {Element} contenedor de categorías */
	var categoriesCont = document.querySelector('#categories-container');
	loadCategories(categoriesCont);

	/** @type {Element} contenedor de categorías */
	var productsCont = document.querySelector('#products-container');
	loadProducts(productsCont);

}, false);