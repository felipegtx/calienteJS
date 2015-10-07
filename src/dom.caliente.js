/// <reference path="obj.caliente.js" />

(function (w, d) {

    "use strict";

    var _objCaliente = w.objCaliente,
         $ = d.querySelector.bind(d),
        _isTouch = (('ontouchstart' in w)
                             || (navigator.MaxTouchPoints > 0)
                             || (navigator.msMaxTouchPoints > 0)),
        _domCaliente = (function () {

            var DOMElementHelper = function (ele) {

                if (_objCaliente.is(ele.raw, "function")) {
                    ele = ele.raw();
                }

                return {

                    /**
                    * Get/Sets the styling of a given element
                    * 
                    * @method css
                    * @param {string} name Style attribute
                    * @param {string} value Style value
                    * @chainable
                    */
                    css: function (name, value) {
                        if (_objCaliente.isType(name, "string")) {
                            if (_objCaliente.isUndefined(value)) {
                                return ele.style[name];
                            }
                            if (value === "") {
                                return DOMElementHelper(ele).removeCss(name);
                            }
                            ele.style[name] = value;
                        } else {
                            for (var attr in name) {
                                DOMElementHelper(ele).css(attr, name[attr]);
                            }
                        }
                        return DOMElementHelper(ele);
                    },

                    /**
                    * Removes the styling attrribute of a given element
                    * 
                    * @method css
                    * @param {string} name Style attribute
                    * @chainable
                    */
                    removeCss: function (name) {
                        if (ele.style.removeProperty) {
                            ele.style.removeProperty(name);
                        } else {
                            ele.style[name] = "";
                        }
                        return DOMElementHelper(ele);
                    },

                    /**
                    * Gets/Sets the value for a given attribute of an HTML element
                    * 
                    * @method attr
                    * @param {string} name Attribute name
                    * @param {string} value Attribute value
                    * @chainable
                    */
                    attr: function (name, value) {
                        if (_objCaliente.isType(name, "string")) {
                            if (_objCaliente.isUndefined(value)) {
                                return ele.getAttribute(name);
                            }
                            ele.setAttribute(name, value);

                        } else {
                            for (var attr in name) {
                                DOMElementHelper(ele).attr(attr, name[attr]);
                            }
                        }
                        return DOMElementHelper(ele);
                    },

                    /**
                    * Retrieves the raw HTML element wraped by this helper
                    * 
                    * @method raw
                    * @return {HTMLElement} The element itself
                    */
                    raw: function () {
                        return ele;
                    },

                    /**
                    * Gathers UI iteraction X/Y coordinates from an event
                    * 
                    * @method getXYPositionFrom
                    * @param {HTMLElement} container The element that contains the bounding rect we'll use to gather relative positioning data
                    * @param {event} evt The event we're extracting information from 
                    * @return {x,y} Values
                    */
                    getXYPositionFrom: function (evt) {
                        if (_isTouch
                            && _objCaliente.is(evt.touches.length, "number")
                            && evt.touches.length > 0) {
                            evt = evt.touches[0];
                        }

                        var eleRect = ele.getBoundingClientRect();
                        return {
                            x: ((evt.clientX - eleRect.left) * (ele.width / eleRect.width)),
                            y: ((evt.clientY - eleRect.top) * (ele.height / eleRect.height))
                        };
                    },

                    /**
                    * Creates a new child element relative to this HTML element
                    * 
                    * @method addChild
                    * @param {string} type Element node type
                    * @chainable
                    */
                    addChild: function (type) {
                        if (_objCaliente.isType(type, "string")) {
                            var childElement = $thisDOM.create(type);
                            ele.appendChild(childElement.raw());
                            return childElement;
                        } else {
                            ele.appendChild(type);
                            return DOMElementHelper(type);
                        }
                    },

                    /**
                    * Get the node name for this element
                    * 
                    * @method type
                    * @return {string} The node name for this element
                    */
                    type: function () {
                        return ele.nodeName;
                    },

                    /**
                    * Gets the parent node for this element
                    * 
                    * @method getParent
                    * @chainable
                    */
                    getParent: function () {
                        return DOMElementHelper((ele.parentElement) ? ele.parentElement : ele.parentNode);
                    },

                    /**
                    * Adds a sibling element
                    * 
                    * @method addSibling
                    * @param {string} type Element node type
                    * @chainable
                    */
                    addSibling: function (type) {
                        return DOMElementHelper(ele).getParent().addChild(type);
                    },

                    /**
                    * Gets\Sets the innerHTML content for the HTML element
                    * 
                    * @method html
                    * @param {string} content 
                    * @chainable
                    */
                    html: function (content) {
                        if (_objCaliente.isType(content, "string")) {
                            ele.innerHTML = content;
                            return DOMElementHelper(ele);
                        }
                        return ele.innerHTML;
                    },

                    /**
                    * Gets\Sets the innerText content for the HTML element
                    * 
                    * @method html
                    * @param {string} content 
                    * @chainable
                    */
                    text: function (content) {
                        if (_objCaliente.isType(content, "string")) {
                            ele.innerText = content;
                            return DOMElementHelper(ele);
                        }
                        return ele.innerText;
                    },

                    /**
                    * Registers a delegate to a given element event
                    * 
                    * @method on
                    * @param {HTMLElement} targetElement The element that we're interested in
                    * @param {String} iteractionType The event name
                    * @param {Function} triggerWrapper The delegate
                    * @chainable
                    */
                    on: function (iteractionType, triggerWrapper) {
                        // modern browsers including IE9+
                        if (w.addEventListener) { ele.addEventListener(iteractionType, triggerWrapper, false); }
                            // IE8 and below
                        else if (w.attachEvent) { ele.attachEvent("on" + iteractionType, triggerWrapper); }
                        else { ele["on" + iteractionType] = triggerWrapper; }
                        return DOMElementHelper(ele);
                    },

                    /**
                    * Selects the first occurent of child elements that matches the selector
                    * 
                    * @method child
                    * @param {string} selector Element's selector
                    * @return {DOMElementHelper} The element wraped in a helper object
                    */
                    first: function (selector) {

                        //https://developer.mozilla.org/en-US/docs/Web/CSS/:scope#Browser_compatibility
                        var result = ele.querySelectorAll(":scope > " + selector);
                        if (_objCaliente.isType(result, "nodelist")) {
                            return DOMElementHelper(result[0]);
                        }
                        return null;
                    }
                };
            },
            $thisDOM = {

                /**
                * Creates and returns an element
                * 
                * @method create
                * @param {string} type Element node type
                * @param {HTMLElement} parent Element's parent node
                * @return {DOMElementHelper} The element wraped in a helper object
                */
                create: function (type, parent) {
                    var newElement = d.createElement(type);
                    newElement.id = _objCaliente.generateId();
                    if (_objCaliente.isValid(parent)) {
                        DOMElementHelper(parent).addChild(newElement);
                    }
                    return DOMElementHelper(newElement);
                },

                /**
                * Gathers an element using a given selector query
                * 
                * @method get
                * @param {string} selector Element's selector
                * @return {DOMElementHelper} The element wraped in a helper object
                */
                get: function (selector) {
                    var element = _objCaliente.isType(selector, "string") ? $(selector) : selector;
                    return DOMElementHelper(element);
                },

                /**
                * Gathers an element using a given id
                * 
                * @method getById
                * @param {string} id Element's id
                * @return {DOMElementHelper} The element wraped in a helper object
                */
                getById: function (id) {
                    return DOMElementHelper($("#" + id));
                }
            };

            return $thisDOM;
        })();

    w.domCaliente = _domCaliente;

})(window, document);
