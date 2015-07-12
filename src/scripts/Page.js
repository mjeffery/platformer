(function(exports) {
	
	var onShow = new Phaser.Signal();
	var onHide = new Phaser.Signal();

	//http://stackoverflow.com/questions/1060008/is-there-a-way-to-detect-if-a-browser-window-is-not-currently-active/1060034#1060034
	//http://likadev.tumblr.com/post/112385977129/handling-tab-switching-in-phaser-io
	//TODO clean this up, its atrocious
	
	var hidden = "hidden";

	var eventMap = {
		focus: 'visible',
		focusin: 'visible',
		pageshow: 'visible',
		blur: 'hidden',
		focusout: 'hidden',
		pagehide: 'hidden'
	}

	function onChange(evt) {
		evt = evt || window.event;
		if(evt.type in eventMap) 
			document.body.className = eventMap[evt.type];
		else 
			document.body.className = this[hidden] ? 'hidden' : 'visible';
	
		if(document.body.className.match(/hidden/)) 
			onHide.dispatch();
		else
			onShow.dispatch();
	}

	document.addEventListener('readystatechange', function() {
		if(hidden in document) 
			document.addEventListener("visibilitychange", onChange);
		else if((hidden = 'mozHidden') in document)
			document.addEventListener('mozvisibilitychange', onChange);
		else if((hidden = 'webkitHidden') in document)
			document.addEventListener('webkitvisibilitychange', onChange);
		else if((hidden = 'msHidden') in document)
			document.addEventListener('msvisibilitychange', onChange);
		else {
			window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onChange;
		}

		if(document[hidden] !== undefined) 
			onChange({ type: document[hidden] ? 'blur' : 'focus' });
	});


	exports.Page = {
		onShow: onShow,
		onHide: onHide
	}

})(this);
