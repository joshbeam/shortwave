;(function() {
	'use strict';

	var events = {};

	var shortwave = {
		block: block,
		get: get,
		emit: emit,
		on: on
	};

	function block(info) {
		var success = false;
		
		if(info.eventName in events) {
			events[info.eventName].forEach(function(callback, i, arr) {
				if(callback === info.callback) {
					arr.splice(i, 1);
					success = true;
					return;
				}
			});
		}

		return success;
	}

	function get() {
		return events;
	}

	function on(eventName, _callback) {
		var callback = _callback.bind(null, eventName);

		// store event and callback (multiple callbacks per event)
		if(eventName in events) {
			events[eventName].push(callback);
		} else {
			events[eventName] = [].concat(callback);
		}

		// return callback for removal if necessary
		return {
			callback: callback,
			eventName: eventName
		};
	}

	function emit(eventName, data) {
		if(eventName in events) {
			events[eventName].forEach(function(callback) {
				callback.call(null, data);
			});
		} else {
			console.warn(eventName + ' does not exist!');
		}

		// return shortwave for chaining
		return this;
	}

	window.shortwave = shortwave;
})();