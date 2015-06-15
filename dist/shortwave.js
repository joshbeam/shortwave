(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamJlYW0vU2l0ZXMvc2hvcnR3YXZlL3NyYy9zaG9ydHdhdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7OztJQUVQLFNBQVM7QUFDSCxVQUROLFNBQVMsR0FDQTt3QkFEVCxTQUFTOztBQUViLE1BQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0VBQ2pCOztjQUhJLFNBQVM7Ozs7Ozs7U0FTUCxpQkFBQyxRQUFRLEVBQUU7QUFDakIsT0FBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTFDLE9BQUcsT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFO0FBQ25DLFdBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkM7O0FBRUQsVUFBTyxVQUFVLENBQUM7R0FDbEI7Ozs7Ozs7O1NBTUUsYUFBQyxRQUFRLEVBQUU7QUFDYixPQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTtBQUNuQyxXQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4Qzs7QUFFRCxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7R0FDbkI7Ozs7Ozs7Ozs7U0FRRyxjQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDckIsT0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM1QixRQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUMxQyxhQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDZixDQUFDLENBQUM7SUFDSCxNQUFNOztBQUVOLFdBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLENBQUM7SUFDN0M7OztBQUdELFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7Ozs7U0FRQyxZQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDeEIsT0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7OztBQUcvQyxPQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQzVCLFFBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLE1BQU07QUFDTixRQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEM7OztBQUdELFVBQU87QUFDTixZQUFRLEVBQUUsUUFBUTtBQUNsQixhQUFTLEVBQUUsU0FBUztJQUNwQixDQUFDO0dBQ0Y7Ozs7Ozs7O1NBTUssZ0JBQUMsSUFBSSxFQUFFOzs7QUFDWixVQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSzs7QUFFdkMsY0FBVSxDQUFDLFlBQU07QUFDaEIsU0FBSSxPQUFPLEdBQUcsS0FBSyxDQUFDOztBQUVwQixTQUFHLElBQUksQ0FBQyxTQUFTLElBQUksTUFBSyxNQUFNLEVBQUU7QUFDakMsWUFBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFLO0FBQ3pELFdBQUcsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7O0FBRTlCLFdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLGVBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixlQUFPO1FBQ1A7T0FDRCxDQUFDLENBQUM7TUFDSDs7QUFFRCxTQUFHLE9BQU8sRUFBRTtBQUNYLGFBQU8sQ0FBQyxNQUFLLE1BQU0sQ0FBQyxDQUFDO01BQ3JCLE1BQU07QUFDTixZQUFNLENBQUMsTUFBSyxNQUFNLENBQUMsQ0FBQztNQUNwQjtLQUNELENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztHQUNIOzs7UUF0R0ksU0FBUzs7O0FBeUdmLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNob3J0d2F2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZXZlbnRzID0ge307XG5cdH1cblxuXHQvKipcblx0ICpcdFJldHVybnMgYSBsaXN0IG9mIGFsbCBuYW1lZCBldmVudHMgKGJ1dCBub3QgaGFuZGxlcnMpXG5cdCAqXHRAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cdGNvbGxlY3QoY2FsbGJhY2spIHtcblx0XHR2YXIgZXZlbnROYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKTtcblxuXHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGV2ZW50TmFtZXMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudE5hbWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqXHRSZXR1cm5zIHRoZSBfZXZlbnRzIG9iamVjdCAoZXZlbnRzIGFuZCBoYW5kbGVycylcblx0ICpcdEByZXR1cm4ge1BsYWluT2JqZWN0fSBfZXZlbnRzXG5cdCAqL1xuXHRnZXQoY2FsbGJhY2spIHtcblx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmV2ZW50cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZXZlbnRzO1xuXHR9XG5cblx0LyoqXG5cdCAqXHRFbWl0cyBhIHNwZWNpZmljIGV2ZW50LCBhbG9uZyB3aXRoIG9wdGlvbmFsIGRhdGFcblx0ICpcdEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcblx0ICpcdEBwYXJhbSB7VXNlckRlZmluZWR9IGRhdGFcblx0ICpcdEByZXR1cm4ge3Nob3J0d2F2ZX1cblx0ICovXG5cdGVtaXQoZXZlbnROYW1lLCBkYXRhKSB7XG5cdFx0aWYoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuXHRcdFx0XHRjYWxsYmFjayhkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB3YXJuIGlmIHRoZSBldmVudCBkb2Vzbid0IGV4aXN0XG5cdFx0XHRjb25zb2xlLndhcm4oZXZlbnROYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcblx0XHR9XG5cblx0XHQvLyByZXR1cm4gc2hvcnR3YXZlIGZvciBjaGFpbmluZ1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqXHRCaW5kcyBhbiBldmVudCBoYW5kbGVyIHRvIGEgbmFtZWQgZXZlbnRcblx0ICpcdEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgKHdpbGwgYmVjb21lIGFuIG9iamVjdCBrZXkpXG5cdCAqXHRAcGFyYW0ge0Z1bmN0aW9ufSBfY2FsbGJhY2tcblx0ICpcdEByZXR1cm4ge1BsYWluT2JqZWN0fSAocGFzcyB0aGlzIGluIGFzIFwiaW5mb1wiIHRvIHNob3J0d2F2ZS5ibG9jaygpIHRvIHJlbW92ZSB0aGlzIHNwZWNpZmljIGhhbmRsZXIpXG5cdCAqL1xuXHRvbihldmVudE5hbWUsIF9jYWxsYmFjaykge1xuXHRcdHZhciBjYWxsYmFjayA9IF9jYWxsYmFjay5iaW5kKG51bGwsIGV2ZW50TmFtZSk7XG5cblx0XHQvLyBzdG9yZSBldmVudCBhbmQgY2FsbGJhY2sgKG11bHRpcGxlIGNhbGxiYWNrcyBwZXIgZXZlbnQpXG5cdFx0aWYoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW2NhbGxiYWNrXTtcblx0XHR9XG5cblx0XHQvLyByZXR1cm4gY2FsbGJhY2sgZm9yIHJlbW92YWwgaWYgbmVjZXNzYXJ5XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdGV2ZW50TmFtZTogZXZlbnROYW1lXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKlx0UmVtb3ZlcyBhIHNwZWNpZmljIGV2ZW50IGhhbmRsZXIgZnJvbSBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuXHQgKlx0QHBhcmFtIHtQbGFpbk9iamVjdH0gaW5mbyAoZ2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkgYXMgdGhlIHJldHVybiBmcm9tIHNob3J0d2F2ZS5vbigpKVxuXHQgKi9cblx0cmVtb3ZlKGluZm8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Ly8gZm9yY2UgYXN5bmNocm9ueSBkdWUgdG8gY2hlY2tpbmcgdGhyb3VnaCBhIHBvc3NpYmx5IGxhcmdlIGV2ZW50cyBhcnJheVxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGxldCBzdWNjZXNzID0gZmFsc2U7XG5cblx0XHRcdFx0aWYoaW5mby5ldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1tpbmZvLmV2ZW50TmFtZV0uZm9yRWFjaCgoY2FsbGJhY2ssIGksIGFycikgPT4ge1xuXHRcdFx0XHRcdFx0aWYoY2FsbGJhY2sgPT09IGluZm8uY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0Ly8gcmVtb3ZlIHRoZSBmdW5jdGlvbiByZWZlcmVuY2UgZnJvbSB0aGUgYXJyYXlcblx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRcdFx0c3VjY2VzcyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZXZlbnRzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QodGhpcy5ldmVudHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaG9ydHdhdmUoKTsiXX0=
