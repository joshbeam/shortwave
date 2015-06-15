'use strict';

var _events = {};

var shortwave = {
	block: block,
	collect: collect,
	get: get,
	emit: emit,
	on: on
};

/**
 *	Removes a specific event handler from an array of event handlers
 *	@param {PlainObject} info (generated automatically as the return from shortwave.on())
 *	@param {Function} onSuccess
 *	@param {Function} onError
 *	@return {Function} onSuccess || onFailure
 */
function remove(info, onSuccess, onFailure) {
	var success = false;

	if(info.eventName in _events) {
		_events[info.eventName].forEach(function(callback, i, arr) {
			if(callback === info.callback) {
				// remove the function reference from the array
				arr.splice(i, 1);
				success = true;
				return;
			}
		});
	}

	// do something if the function existed and was removed
	if(success && typeof onSuccess !== 'undefined') {
		return onSuccess(_events);
	}

	// do something if the function did *not* exist, and therefore could not be removed
	if(!success && typeof onFailure !== 'undefined') {
		return onFailure(_events);
	}
}

/**
 *	Returns a list of all named events (but not handlers)
 *	@return {Array}
 */
function collect(callback) {
	var eventNames = Object.keys(_events);

	if(typeof callback !== 'undefined') {
		return callback.call(this, eventNames);
	}

	return eventNames;
}

/**
 *	Returns the _events object (events and handlers)
 *	@return {PlainObject} _events
 */
function get(callback) {
	if(typeof callback !== 'undefined') {
		return callback.call(this, _events);
	}

	return _events;
}

/**
 *	Emits a specific event, along with optional data
 *	@param {String} eventName
 *	@param {UserDefined} data
 *	@return {shortwave}
 */
function emit(eventName, data) {
	if(eventName in _events) {
		_events[eventName].forEach(function(callback) {
			callback.call(null, data);
		});
	} else {
		// warn if the event doesn't exist
		console.warn(eventName + ' does not exist!');
	}

	// return shortwave for chaining
	return this;
}

/**
 *	Binds an event handler to a named event
 *	@param {String} eventName (will become an object key)
 *	@param {Function} _callback
 *	@return {PlainObject} (pass this in as "info" to shortwave.block() to remove this specific handler)
 */
function on(eventName, _callback) {
	var callback = _callback.bind(null, eventName);

	// store event and callback (multiple callbacks per event)
	if(eventName in _events) {
		_events[eventName].push(callback);
	} else {
		_events[eventName] = [callback];
	}

	// return callback for removal if necessary
	return {
		callback: callback,
		eventName: eventName,
		once: emit
	};
}

module.exports = shortwave;