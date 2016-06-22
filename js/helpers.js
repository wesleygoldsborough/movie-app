(function() {

    function e(elementType, text, attributes, styles) {
        attributes = attributes || {};
        styles = styles || {};

        var newElement = document.createElement(elementType);

        if (text) {
            newElement.textContent = text;
        }

        //set the attributes on the tag
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                newElement.setAttribute(attr, attributes[attr]);
            }
        }

        //set the styles
        for (var style in styles) {
            if (styles.hasOwnProperty(style)) {
                newElement.style[style] = styles[style];
            }
        }

        return newElement;
    }

    var randomNum = function(top) {
        var randFloat = Math.random() * top;
        var randInt = Math.ceil(randFloat);
        return randInt;
    }

    //make things available globally
    window.e = e;
    window.randomNum = randomNum;
}());
