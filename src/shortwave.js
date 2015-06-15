'use strict';

class Shortwave {
	constructor() {
		this.events = {};
	}

	/**
	 *	Returns a list of all named events (but not handlers)
	 *	@return {Array}
	 */
	collect(callback) {
		var eventNames = Object.keys(this.events);

		if(typeof callback !== 'undefined') {
			return callback.call(this, eventNames);
		}

		return eventNames;
	}

	/**
	 *	Returns the _events object (events and handlers)
	 *	@return {PlainObject} _events
	 */
	get(callback) {
		if(typeof callback !== 'undefined') {
			return callback.call(this, this.events);
		}

		return this.events;
	}

	/**
	 *	Emits a specific event, along with optional data
	 *	@param {String} eventName
	 *	@param {UserDefined} data
	 *	@return {shortwave}
	 */
	emit(eventName, data) {
		if(eventName in this.events) {
			this.events[eventName].forEach(callback => {
				callback(data);
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
	on(eventName, _callback) {
		var callback = _callback.bind(null, eventName);

		// store event and callback (multiple callbacks per event)
		if(eventName in this.events) {
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

	/**
	 *	Removes a specific event handler from an array of event handlers
	 *	@param {PlainObject} info (generated automatically as the return from shortwave.on())
	 */
	remove(info) {
		return new Promise((resolve, reject) => {
			// force asynchrony due to checking through a possibly large events array
			setTimeout(() => {
				let success = false;

				if(info.eventName in this.events) {
					this.events[info.eventName].forEach((callback, i, arr) => {
						if(callback === info.callback) {
							// remove the function reference from the array
							arr.splice(i, 1);
							success = true;
							return;
						}
					});
				}

				if(success) {
					resolve(this.events);
				} else {
					reject(this.events);
				}
			});
		});
	}
}

module.exports = new Shortwave();