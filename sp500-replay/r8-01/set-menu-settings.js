
	let SET = set = {};

	set.init = function() {

		toggleBackgroundGradient();

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

		let col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		let pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
		let image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
				pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	}


	function onKeyUp ( event ) {

//console.log( 'key', event.keyCode );

		controls.enableKeys = false;
		event.preventDefault();

		switch( event.keyCode ) {

			case 32:
				controls.autoRotate = !controls.autoRotate;
				PLY.playing = !PLY.playing;
				mnuControls.innerHTML = 'Pause';
				updatePosition();
				break; // space bar

		}

	}

