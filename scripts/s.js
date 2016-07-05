function addLoadEvent(func) {
  if (!document.getElementById || !document.createTextNode) {return;}
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function focusLabels() {
  var labels = document.getElementsByTagName('label');
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute('for')) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute('for');
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function prepareForms() {
  var objForms = document.getElementsByTagName('form');
  for (var iCounter=0; iCounter<objForms.length; iCounter++) {
    objForms[iCounter].onsubmit= function() {
      return validateForm(this);
    }
  }
}
function validateForm(objForm) {
  var arClass = new Array();
  var iErrors = 0;
  var objField = objForm.getElementsByTagName('*');
  var objLabel = objForm.getElementsByTagName('label');
  for (var iCounter=0; iCounter<objLabel.length; iCounter++) {
    objLabel[iCounter].style.color = ('#333');
  }
  var objList = document.createElement('ol');
  var strLinkID = objForm.id + 'ErrorID';
  for (var iFieldCounter=0; iFieldCounter<objField.length; iFieldCounter++) {
    arClass = objField[iFieldCounter].className.split(' ');
    for (var iClassCounter=0; iClassCounter<arClass.length; iClassCounter++) {
      switch (arClass[iClassCounter]) { 
	case 'required':
	  if (!isFilled(objField[iFieldCounter].value, arClass)) {
 	    if (iErrors == 0)
	      logError(objField[iFieldCounter], objLabel, objList, strLinkID);
	    else
	      logError(objField[iFieldCounter], objLabel, objList, '');
	      iErrors++;
	  }
        break;
	case 'email':
	  if (!isEmail(objField[iFieldCounter].value, arClass)) {
	    if (iErrors == 0)
	      logError(objField[iFieldCounter], objLabel, objList, strLinkID);
	    else
	      logError(objField[iFieldCounter], objLabel, objList, '');
	      iErrors++;
	    }
	break;
      }
    }
  }
  if (iErrors > 0) {
    var objError = objForm.getElementsByTagName('div');
    for (var iCounter=0; iCounter<objError.length; iCounter++)
      if (objError[iCounter].className == 'validationerrors')
 	var objExisting = objError[iCounter];
	var objNew = document.createElement('div');
	var objTitle = document.createElement('h4');
	var objParagraph = document.createElement('p');
	var objAnchor = document.createElement('a');
	if (iErrors == 1)
	  objAnchor.appendChild(document.createTextNode('1 Error'));
	else
	  objAnchor.appendChild(document.createTextNode(iErrors + ' Errors'));
	  objAnchor.href = '#' + strLinkID;
	  objAnchor.className = 'submissionerror';
	  objTitle.appendChild(objAnchor);
	  objParagraph.appendChild(document.createTextNode('Please review the following'));
	  objNew.className = 'validationerrors';
	  objNew.appendChild(objTitle);
	  objNew.appendChild(objParagraph);
	  objNew.appendChild(objList);
	if (objExisting)
	  objExisting.parentNode.replaceChild(objNew, objExisting);
	else {
	  var objPosition = objForm.firstChild;
	  objForm.insertBefore(objNew, objPosition);
	}
	objAnchor.focus();
	objForm.submitAllowed = false;
	return false;
  }
  return true;
}
function addError(objList, strError, strID, strErrorID) {
  var objListItem = document.createElement('li');
  var objAnchor = document.createElement('a');
  objAnchor.href='#' + strID;
  if (strErrorID.length > 0)
    objAnchor.id = strErrorID;
    objAnchor.appendChild(document.createTextNode(strError));
    objAnchor.onclick = function(event){return focusFormField(this, event);}
    objAnchor.onkeypress = function(event){return focusFormField(this, event);}
    objListItem.appendChild(objAnchor);
    objList.appendChild(objListItem);
}
function focusFormField(objAnchor, objEvent) {
  if (objEvent && objEvent.type == 'keypress')
    if (objEvent.keyCode != 13 && objEvent.keyCode != 32)
      return true;
      var strFormField = objAnchor.href.match(/[^#]\w*$/);
      var objForm = getForm(strFormField);
      objForm[strFormField].focus();
      return false;
}
function getForm(strField) {
  var objElement = document.getElementById(strField);
  do {
    objElement = objElement.parentNode;
  } 
  while (!objElement.tagName.match(/form/i) && objElement.parentNode);
  return objElement;
}
function logError(objField, objLabel, objList, strErrorID) {
  for (var iCounter=0; iCounter<objLabel.length; iCounter++)
    if (objLabel[iCounter].getAttribute('for') == objField.id) {
      objLabel[iCounter].style.color = ('#cf0012');
      var strError = objLabel[iCounter].firstChild.nodeValue;
      addError(objList, strError, objField.id, strErrorID);
    }
}
function isFilled(strValue, arClass) {
  var bValid = (strValue.length > 0);
  return checkOptional(bValid, strValue, arClass);
}
function isEmail(strValue, arClass) {
  var objRE = /^[\w-\.\']{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,}$/;
  var bValid = objRE.test(strValue);
  return checkOptional(bValid, strValue, arClass);
}
function checkOptional(bValid, strValue, arClass) {
  var bOptional = false;
  for (var iCounter=0; iCounter<arClass.length; iCounter++)
    if (arClass[iCounter] == 'optional')
      bOptional = true;
      if (bOptional && strValue.replace(/^\s*|\s*$/g, '') == '')
	return true;
	return bValid;
}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);