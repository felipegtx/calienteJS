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
