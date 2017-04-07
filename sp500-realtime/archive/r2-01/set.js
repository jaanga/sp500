
	var SET = set = {};

	set.init = function() {

		toggleBackgroundGradient();

		renderer.domElement.addEventListener( 'click', function() {  controls.autoRotate = false; }, false );

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'keyup', onKeyUp, false );


	}


	function toggleWireframe() {

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.wireframe = chkWire.checked;

			}

		} );

	}


	function toggleBackgroundGradient() {

// 2016-07-18

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
		var image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
				pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	}


	function onKeyUp ( event ) {

//console.log( 'key', event.keyCode );

		controls.enableKeys = false;
		event.preventDefault();

		switch( event.keyCode ) {

//			case 32: controls.autoRotate = !controls.autoRotate; chkRotate.checked = controls.autoRotate; break; // space bar
			case 32: controls.autoRotate = !controls.autoRotate; break; // space bar

		}

	}

	function onDocumentTouchStart( event ) {

//		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		onDocumentMouseMove( event );

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		stats.domElement.style.display = window.innerWidth < 500 ? 'none' : '';

	}
