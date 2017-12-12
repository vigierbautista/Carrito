
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

	var documentBody = document.querySelector('body');
	documentBody.appendChild(modal);

	return modal;
}

/**
 * Elimina el elemento dado.
 * @param selector string
 */
function remove(selector) {
	var element = document.querySelector(selector);
	if (element != undefined) {
		var parent = element.parentNode;
		parent.removeChild(element);
	}
}
