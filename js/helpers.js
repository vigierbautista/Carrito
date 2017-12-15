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
	} else if (list.length == 1) {
		return document.querySelector(selector);
	} else {
		return null
	}
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
 * Retorna el length del objeto dado.
 * @param obj
 * @return {number}
 */
function objLength(obj) {
	var length = 0;
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			length ++;
	}
	return length;
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

/**
 * Elimina los hijos del elemento.
 */
function empty(parent) {
	while(parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	// No estoy seguro si esta variante está permitida.
	// parent.innerHTML = '';
}

/**
 * Capitaliza el string dado.
 * @param string
 * @return {string}
 */
function ucFirst(string) {
	return string.substring(0, 1).toUpperCase() + string.slice(1);
}