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

