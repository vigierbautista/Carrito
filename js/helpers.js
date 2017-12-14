/**
 * Función de búsqueda de elementos
 * Versión simplificada de la función JQuery $()
 * @param selector
 * @return {*}
 */
function $(selector) {
	var list = document.querySelectorAll(selector);
	if (list.length > 1) {
		return list;
	} else if(list.length == 1) {
		return document.querySelector(selector);
	} else {
		return null
	}
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
	closeIcon.classList.add('glyphicon', 'glyphicon-remove');
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

	return modal;
}


/**
 * Retorna los elementos dados son padre e hijo.
 * @param parent
 * @param child
 * @return {boolean}
 */
function isChild(parent, child) {
	var node = child.parentNode;
	return node == parent;
}


/**
 * Retorna si el objeto está vacío o no.
 * @param obj
 * @return {boolean}
 */
function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			return false;
	}
	return true;
}


/**
 * Elimina el elemento dado.
 * @param selector string
 */
function remove(selector) {
	var element = $(selector);
	if (element) {
		var parent = element.parentNode;
		parent.removeChild(element);
	} else {
		console.error("ERROR: El elemento a eliminar no existe.")
	}
}