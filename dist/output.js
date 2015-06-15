(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shortwave = require('./shortwave');

var _shortwave2 = _interopRequireDefault(_shortwave);

var hello = _shortwave2['default'].on('hello', sayHi);

function sayHi() {
    console.log('hello');
}

_shortwave2['default'].emit('hello');

_shortwave2['default'].remove(hello).then(function (evts) {
    console.log(evts);
});

},{"./shortwave":2}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Shortwave = (function () {
	function Shortwave() {
		_classCallCheck(this, Shortwave);

		this.events = {};
	}

	_createClass(Shortwave, [{
		key: 'collect',

		/**
   *	Returns a list of all named events (but not handlers)
   *	@return {Array}
   */
		value: function collect(callback) {
			var eventNames = Object.keys(this.events);

			if (typeof callback !== 'undefined') {
				return callback.call(this, eventNames);
			}

			return eventNames;
		}
	}, {
		key: 'get',

		/**
   *	Returns the _events object (events and handlers)
   *	@return {PlainObject} _events
   */
		value: function get(callback) {
			if (typeof callback !== 'undefined') {
				return callback.call(this, this.events);
			}

			return this.events;
		}
	}, {
		key: 'emit',

		/**
   *	Emits a specific event, along with optional data
   *	@param {String} eventName
   *	@param {UserDefined} data
   *	@return {shortwave}
   */
		value: function emit(eventName, data) {
			if (eventName in this.events) {
				this.events[eventName].forEach(function (callback) {
					callback(data);
				});
			} else {
				// warn if the event doesn't exist
				console.warn(eventName + ' does not exist!');
			}

			// return shortwave for chaining
			return this;
		}
	}, {
		key: 'on',

		/**
   *	Binds an event handler to a named event
   *	@param {String} eventName (will become an object key)
   *	@param {Function} _callback
   *	@return {PlainObject} (pass this in as "info" to shortwave.block() to remove this specific handler)
   */
		value: function on(eventName, _callback) {
			var callback = _callback.bind(null, eventName);

			// store event and callback (multiple callbacks per event)
			if (eventName in this.events) {
				this.events[eventName].push(callback);
			} else {
				this.events[eventName] = [callback];
			}

			// return callback for removal if necessary
			return {
				callback: callback,
				eventName: eventName
			};
		}
	}, {
		key: 'remove',

		/**
   *	Removes a specific event handler from an array of event handlers
   *	@param {PlainObject} info (generated automatically as the return from shortwave.on())
   */
		value: function remove(info) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				// force asynchrony due to checking through a possibly large events array
				setTimeout(function () {
					var success = false;

					if (info.eventName in _this.events) {
						_this.events[info.eventName].forEach(function (callback, i, arr) {
							if (callback === info.callback) {
								// remove the function reference from the array
								arr.splice(i, 1);
								success = true;
								return;
							}
						});
					}

					if (success) {
						resolve(_this.events);
					} else {
						reject(_this.events);
					}
				});
			});
		}
	}]);

	return Shortwave;
})();

module.exports = new Shortwave();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamJlYW0vU2l0ZXMvc2hvcnR3YXZlL3NyYy9zY3JpcHRzLmpzIiwiL1VzZXJzL2piZWFtL1NpdGVzL3Nob3J0d2F2ZS9zcmMvc2hvcnR3YXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBc0IsYUFBYTs7OztBQUVuQyxJQUFJLEtBQUssR0FBRyx1QkFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV6QyxTQUFTLEtBQUssR0FBRztBQUNiLFdBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDeEI7O0FBRUQsdUJBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUV4Qix1QkFBVSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ25DLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Q0FDcEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUNaRyxTQUFTO0FBQ0gsVUFETixTQUFTLEdBQ0E7d0JBRFQsU0FBUzs7QUFFYixNQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztFQUNqQjs7Y0FISSxTQUFTOzs7Ozs7O1NBU1AsaUJBQUMsUUFBUSxFQUFFO0FBQ2pCLE9BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUxQyxPQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTtBQUNuQyxXQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDOztBQUVELFVBQU8sVUFBVSxDQUFDO0dBQ2xCOzs7Ozs7OztTQU1FLGFBQUMsUUFBUSxFQUFFO0FBQ2IsT0FBRyxPQUFPLFFBQVEsS0FBSyxXQUFXLEVBQUU7QUFDbkMsV0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEM7O0FBRUQsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0dBQ25COzs7Ozs7Ozs7O1NBUUcsY0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ3JCLE9BQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDNUIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDMUMsYUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsTUFBTTs7QUFFTixXQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdDOzs7QUFHRCxVQUFPLElBQUksQ0FBQztHQUNaOzs7Ozs7Ozs7O1NBUUMsWUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3hCLE9BQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7QUFHL0MsT0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM1QixRQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxNQUFNO0FBQ04sUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDOzs7QUFHRCxVQUFPO0FBQ04sWUFBUSxFQUFFLFFBQVE7QUFDbEIsYUFBUyxFQUFFLFNBQVM7SUFDcEIsQ0FBQztHQUNGOzs7Ozs7OztTQU1LLGdCQUFDLElBQUksRUFBRTs7O0FBQ1osVUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXZDLGNBQVUsQ0FBQyxZQUFNO0FBQ2hCLFNBQUksT0FBTyxHQUFHLEtBQUssQ0FBQzs7QUFFcEIsU0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQUssTUFBTSxFQUFFO0FBQ2pDLFlBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBSztBQUN6RCxXQUFHLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFOztBQUU5QixXQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqQixlQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsZUFBTztRQUNQO09BQ0QsQ0FBQyxDQUFDO01BQ0g7O0FBRUQsU0FBRyxPQUFPLEVBQUU7QUFDWCxhQUFPLENBQUMsTUFBSyxNQUFNLENBQUMsQ0FBQztNQUNyQixNQUFNO0FBQ04sWUFBTSxDQUFDLE1BQUssTUFBTSxDQUFDLENBQUM7TUFDcEI7S0FDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7R0FDSDs7O1FBdEdJLFNBQVM7OztBQXlHZixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNob3J0d2F2ZSBmcm9tICcuL3Nob3J0d2F2ZSc7XG5cbnZhciBoZWxsbyA9IHNob3J0d2F2ZS5vbignaGVsbG8nLCBzYXlIaSk7XG5cbmZ1bmN0aW9uIHNheUhpKCkge1xuICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xufVxuXG5zaG9ydHdhdmUuZW1pdCgnaGVsbG8nKTtcblxuc2hvcnR3YXZlLnJlbW92ZShoZWxsbykudGhlbigoZXZ0cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2dHMpXG59KTsiLCJjbGFzcyBTaG9ydHdhdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqXHRSZXR1cm5zIGEgbGlzdCBvZiBhbGwgbmFtZWQgZXZlbnRzIChidXQgbm90IGhhbmRsZXJzKVxuXHQgKlx0QHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXHRjb2xsZWN0KGNhbGxiYWNrKSB7XG5cdFx0dmFyIGV2ZW50TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmV2ZW50cyk7XG5cblx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudE5hbWVzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnROYW1lcztcblx0fVxuXG5cdC8qKlxuXHQgKlx0UmV0dXJucyB0aGUgX2V2ZW50cyBvYmplY3QgKGV2ZW50cyBhbmQgaGFuZGxlcnMpXG5cdCAqXHRAcmV0dXJuIHtQbGFpbk9iamVjdH0gX2V2ZW50c1xuXHQgKi9cblx0Z2V0KGNhbGxiYWNrKSB7XG5cdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5ldmVudHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmV2ZW50cztcblx0fVxuXG5cdC8qKlxuXHQgKlx0RW1pdHMgYSBzcGVjaWZpYyBldmVudCwgYWxvbmcgd2l0aCBvcHRpb25hbCBkYXRhXG5cdCAqXHRAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG5cdCAqXHRAcGFyYW0ge1VzZXJEZWZpbmVkfSBkYXRhXG5cdCAqXHRAcmV0dXJuIHtzaG9ydHdhdmV9XG5cdCAqL1xuXHRlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xuXHRcdGlmKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGNhbGxiYWNrID0+IHtcblx0XHRcdFx0Y2FsbGJhY2soZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gd2FybiBpZiB0aGUgZXZlbnQgZG9lc24ndCBleGlzdFxuXHRcdFx0Y29uc29sZS53YXJuKGV2ZW50TmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG5cdFx0fVxuXG5cdFx0Ly8gcmV0dXJuIHNob3J0d2F2ZSBmb3IgY2hhaW5pbmdcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlx0QmluZHMgYW4gZXZlbnQgaGFuZGxlciB0byBhIG5hbWVkIGV2ZW50XG5cdCAqXHRAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lICh3aWxsIGJlY29tZSBhbiBvYmplY3Qga2V5KVxuXHQgKlx0QHBhcmFtIHtGdW5jdGlvbn0gX2NhbGxiYWNrXG5cdCAqXHRAcmV0dXJuIHtQbGFpbk9iamVjdH0gKHBhc3MgdGhpcyBpbiBhcyBcImluZm9cIiB0byBzaG9ydHdhdmUuYmxvY2soKSB0byByZW1vdmUgdGhpcyBzcGVjaWZpYyBoYW5kbGVyKVxuXHQgKi9cblx0b24oZXZlbnROYW1lLCBfY2FsbGJhY2spIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBfY2FsbGJhY2suYmluZChudWxsLCBldmVudE5hbWUpO1xuXG5cdFx0Ly8gc3RvcmUgZXZlbnQgYW5kIGNhbGxiYWNrIChtdWx0aXBsZSBjYWxsYmFja3MgcGVyIGV2ZW50KVxuXHRcdGlmKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtjYWxsYmFja107XG5cdFx0fVxuXG5cdFx0Ly8gcmV0dXJuIGNhbGxiYWNrIGZvciByZW1vdmFsIGlmIG5lY2Vzc2FyeVxuXHRcdHJldHVybiB7XG5cdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXG5cdFx0XHRldmVudE5hbWU6IGV2ZW50TmFtZVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICpcdFJlbW92ZXMgYSBzcGVjaWZpYyBldmVudCBoYW5kbGVyIGZyb20gYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0ICpcdEBwYXJhbSB7UGxhaW5PYmplY3R9IGluZm8gKGdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGFzIHRoZSByZXR1cm4gZnJvbSBzaG9ydHdhdmUub24oKSlcblx0ICovXG5cdHJlbW92ZShpbmZvKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdC8vIGZvcmNlIGFzeW5jaHJvbnkgZHVlIHRvIGNoZWNraW5nIHRocm91Z2ggYSBwb3NzaWJseSBsYXJnZSBldmVudHMgYXJyYXlcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG5cdFx0XHRcdGlmKGluZm8uZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG5cdFx0XHRcdFx0dGhpcy5ldmVudHNbaW5mby5ldmVudE5hbWVdLmZvckVhY2goKGNhbGxiYWNrLCBpLCBhcnIpID0+IHtcblx0XHRcdFx0XHRcdGlmKGNhbGxiYWNrID09PSBpbmZvLmNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHJlbW92ZSB0aGUgZnVuY3Rpb24gcmVmZXJlbmNlIGZyb20gdGhlIGFycmF5XG5cdFx0XHRcdFx0XHRcdGFyci5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihzdWNjZXNzKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLmV2ZW50cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHRoaXMuZXZlbnRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvcnR3YXZlKCk7Il19
