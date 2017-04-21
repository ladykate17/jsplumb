jsPlumb.ready(function() {

	// tell Plumb to use a container as the surface
	jsPlumb.setContainer($('#container'));

	// set a variable to keep track of the states
	var i = 0;

	addState = function(e) {
		// next 3 lines create the divs that house the new state
		var newState = $('<div>').attr('id', 'state' + i).addClass('item');

		// create areas on the state that can be used later fro dragging and connecting
		var title = $('<div>').addClass('title').text('State ' + i);
		var connect = $('<div>').addClass('connect');

		// add the state at the position of the cursor
		newState.css({
			'top': e.pageY,
			'left': e.pageX
		});

		// add the title and connection areas the the state
		newState.append(title);
		newState.append(connect);

		$('#container').append(newState);

		jsPlumb.makeTarget(newState, {
			anchor: 'Continuous'
		});

		jsPlumb.makeSource(connect, {
			// connection is made to the parent state of connect
			parent: newState,
			anchor: 'Continuous'
		});

		// tell Plumb state should be draggable
		jsPlumb.draggable(newState, {
			// don't let the state be dragged outside the surface
			containment: 'parent'
		});

		// double click to remove state
		newState.dblclick(function(e) {
			// first remove all connections that may have been made
			jsPlumb.detachAllConnections($(this));
			$(this).remove(e);
			// prevent the parent elements from triggering other events
			e.stopPropagation();
		});

		i++;
	};

	$("#container").dblclick(function(e) {
		addState(e);
	});

	$("#addNewBtn").click(function(e) {
		e.pageX= 200;
		e.pageY = 200;
		addState(e);
	});
});