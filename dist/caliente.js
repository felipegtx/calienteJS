///#source 1 1 /src/obj.caliente.js
(function (w, d) {

    "use strict";

    var _objCaliente = (function () {

        var _this;

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return _this = {

            /**
            * Executes a given delegate for each item in the collection
            * 
            * @method forEach
            * @param {Array} arr The array that need to be enumerated
            * @param {Delegate} what What to do to a given item (obj item, number index)
            * @return Array of data acquired during array enumaration
            */
            forEach: function (arr, what) {
                var result = [];
                if (_this.isArray(arr)) {
                    for (var i = 0; i < arr.length; i++) {
                        result.push(what(arr[i], i));
                    }
                }
                return result;
            },

            /**
            * Whether or not a given object type is of the type you expect (typeof)
            * 
            * @method is
            * @param {Object} obj The object we whant to know about
            * @param {String} what The string representing the name of the type
            * @return {Bool} Whether or not the object matches the specified type
            */
            is: function (obj, what) {
                return typeof obj === what;
            },

            /**
           * Whether or not a given object type is of the type you expect (constructor call)
           * 
           * @method isType
           * @param {Object} obj The object we whant to know about
           * @param {String} typeName The string representing the name of the type
           * @return {Bool} Whether or not the object matches the specified type
           */
            isType: function (obj, typeName) {
                return this.isValid(obj) && Object.prototype.toString.call(obj).toLowerCase() === "[object " + typeName.toLowerCase() + "]";
            },

            /**
            * Generates a pseudo-random Id
            * 
            * @method generateId
            * @return {String} A pseudo-random Id
            */
            generateId: function () {

                return "__" + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
            },

            /**
            * Whether or not a given object type is valid to be handled
            * 
            * @method isValid
            * @param {Object} obj The object we whant to know if it's valid to be handled
            * @return {Bool} Whether or not the object is valid to be handled
            */
            isValid: function (obj) {
                return !this.is(obj, 'undefined') && obj !== null;
            },

            /**
            * Whether or not a given object is an Array
            * 
            * @method isArray
            * @param {Object} obj The object we whant to know is it's valid to be handled
            * @return {Bool} Whether or not the object is valid to be handled
            */
            isArray: function (obj) {
                return this.isValid(obj) && this.isType(obj, "Array");
            },

            /**
            * Whether or not a given object type is undefined
            * 
            * @method isUndefined
            * @param {Object} obj The object we whant to know if it's undefined
            * @return {Bool} Whether or not the object is undefined
            */
            isUndefined: function (obj) {
                return this.is(obj, "undefined");
            },

            /**
            * Extends any object using a base template object as reference
            * 
            * @method extend
            * @param {Object} baseObject The object we whant to copy from
            * @param {Object} impl The object with the data we want use 
            * @param {Bool} addNewMembers Whether or not we allow new members on the 'impl' object to be used in the result
            * @return {Object} Extended object
            */
            extend: function (baseObject, impl, addNewMembers) {
                var result = {}, element = null;
                if (this.isUndefined(impl)) {
                    for (element in baseObject) {
                        result[element] = baseObject[element];
                    }
                } else {

                    if (addNewMembers === true) {
                        result = impl;
                    }
                    for (element in baseObject) {
                        if (!result.hasOwnProperty(element)) {
                            result[element] = impl.hasOwnProperty(element) ? impl[element] : baseObject[element];
                        }
                    }
                }
                return result;
            }
        };
    })();

    w.objCaliente = _objCaliente;
})(window, document);

///#source 1 1 /src/dom.caliente.js
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

///#source 1 1 /src/core.caliente.js
/// <reference path="obj.caliente.js" />
/// <reference path="dom.caliente.js" />

(function (w, d) {

    "use strict";

    function propagate(x, y) {
        if (!(x in _rawResult)) { _rawResult[x] = {}; }
        if (!(y in _rawResult[x])) { _rawResult[x][y] = 0; }
        _rawResult[x][y] = Math.min(_rawResult[x][y] + 0.01, 1);
    }

    function track() {
        if (_timeout !== null) {
            window.clearTimeout(_timeout);
        }
        if (_evt !== null) {
            if ((_lastPosition.x !== _evt.clientX) || (_lastPosition.y !== _evt.clientY)) {
                propagate(_evt.clientX, _evt.clientY);
                _lastPosition.x = _evt.clientX;
                _lastPosition.y = _evt.clientY;
                if (_objCaliente.isType(_onMove, "function")) {
                    _onMove(_rawResult.slice());
                }
            }
        }
        window.setTimeout(track, 100);
    }

    var _rawResult = [],
        _evt = null,
        _lastPosition = { x: 0, y: 0 },
        _domCaliente = w.domCaliente,
        _objCaliente = w.objCaliente,
        _onMove = null,
        _timeout = null,
        _caliente = {
            track: function () {

                if (_timeout === null) {
                    _domCaliente.get(w).on("mousemove", function (evt) {
                        _evt = evt;
                    });
                    track();
                }

                return _caliente;
            },
            onMove: function (doWhat) {
                if (_objCaliente.isType(doWhat, "function")) {
                    _onMove = doWhat;
                }
                return _caliente;
            },
            onMoveOut: function (doWhat) {
                if (_objCaliente.isType(doWhat, "function")) {
                    _domCaliente.get(document).on("mouseout", function (evt) {
                        doWhat(_rawResult.slice());
                    });
                }
                return _caliente;
            }
        };

    w.caliente = _caliente;

})(window, document);


