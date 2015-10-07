/// <reference path="../src/obj.caliente.js" />
/// <reference path="../src/dom.caliente.js" />

(function (w, d) {

	if (!objCaliente.isValid(w.raska)) {
		/// https://github.com/felipegtx/Raska
		throw { message: "This plugin requires RaskaJs library" };
	}

	function getColorFor(value) {
		var color = "hsla(360, 100%, 50%, " + value + ")";
		console.log(color);
		return color;

	}


	var _canvasId = "",
		_clusterSize = 50,
		_raskaCaliente = {
			/**
			 * Syntactic sugar for the raska.installUsing
			 * 
			 * @method prepare
			 * @chainable
			 */
			prepare: function (canvasId) {

				raska.installUsing({ targetCanvasId: _canvasId = canvasId }).toggleFullScreen();
				return _raskaCaliente;
			},

			/**
			 * Plots a given set of mouse position iteraction to a canvas
			 * 
			 * @method plot
			 * @param {Object} data User mouse positioning data
			 * @chainable
			 */
			plot: function (data) {

				raska.clear();
				var element = null, value = null;
				for (var xAxis in data) {
					for (var yAxis in data[xAxis]) {
						var rawValue = data[xAxis][yAxis],
							value = rawValue * 100;
						if ((element = raska.tryGetElementOn(xAxis, yAxis)) !== null) {
						    element.radius += value;
						    element.fillColor = getColorFor(element.radius / 10);
						} else {
							var circle = raska.newCircle();
							circle.x = xAxis;
							circle.y = yAxis;
							circle.border.active = false;
							circle.fillColor = getColorFor(rawValue * 10);
							circle.radius = value * 10;
							raska.plot(circle);
						}
					}
				}

				//console.log(raska.getElementsRaw().length);

				return _raskaCaliente;
			}
		};

	w.raska.caliente = _raskaCaliente;

})(window, document);