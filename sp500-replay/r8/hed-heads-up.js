
	let HED = hed = {}

	hed.init = function() {

		window.index = undefined;
		window.mouse = new THREE.Vector2();
		window.intersected = undefined;

		headsUp = document.body.appendChild( document.createElement( 'div' ) );
		headsUp.style.cssText = 'background-color: #ddd; border-radius: 8px; display: none; opacity: 0.85; ' +
			'padding: 0 5px 10px 5px; position: absolute; ';

		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );

		hed.touchables = [];

	}


	function onDocumentMouseMove( event ) {

		let raycaster, intersects;

		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, camera );

		intersects = raycaster.intersectObjects( hed.touchables );

		if ( intersects.length > 0 ) {

			if ( intersected !== intersects[ 0 ].object ) {

				if ( intersected && intersected.material.emissive ) {

					intersected.material.emissive.setHex( intersected.currentHex );

				}

				intersected = intersects[ 0 ].object


				if ( intersected.material.emissive ) {

					intersected.currentHex = intersected.material.emissive.getHex();
					intersected.material.emissive.setHex( 0xff0000 );

				}


			}

		} else {

			if ( intersected && intersected.material.emissive ) {

				intersected.material.emissive.setHex( intersected.currentHex );

			}

			intersected = undefined;

		}

		setHeadsUp( event );

	}



	function setHeadsUp( event ) {

		let sym, idx, txt;
		const b = '<br>';

		if ( intersected === undefined ){

			if ( event.type === 'touchstart' ) {

				headsUp.style.display = 'none';

			}

			document.body.style.cursor = 'auto';
			return;

		}

		headsUp.style.left = 50 + 0.5 * window.innerWidth + mouse.x * 0.5 * window.innerWidth + 'px';
		headsUp.style.top = -50 + 0.5 * window.innerHeight - mouse.y * 0.5 * window.innerHeight + 'px';
		headsUp.style.display = '';

		sym = symbols[ intersected.name ];
		index = index ? index : 0;
		idx = sym.ticks.length > index ? index : sym.ticks.length - 1 ;

		txt =

			'<h2 style="margin:0;" >' + sym.symbol + '</h2>' +
			'<div>' + sym.name + '</div>' +
			'<div style="margin:0; background-color: #' + colors[ sym.sectorID ].toString( 16 )  + ';" >' + sym.sector + '</div>' +

			'<img src="https://www.google.com/finance/chart?tlf=12&q=' + 'NASDAQ:' + sym.symbol +
				'"  style="background: white;" /><br>' +
			'<a href="https://www.google.com/finance?q=' + 'NASDAQ:' + sym.symbol + '" target="_blank">Google Finance: ' +
				sym.symbol + '</a><br>' +

			'chg: ' + sym.ticks[ idx ][ 0 ].toFixed(1) + '%<br>' +
			'vol: ' + sym.ticks[ idx ][ 1 ].toLocaleString() + '<br>' +
			'vol avg :' + sym.volumeAvg.toLocaleString() + '<br>' +
			'vol/vol avg: ' + ( 100 * sym.ticks[ idx ][ 1 ] / sym.volumeAvg ).toFixed(1) + '%<br>' +
			'mkt cap: ' + sym.marketCap.toLocaleString() +

		'';

		headsUp.innerHTML = txt;
		document.body.style.cursor = 'pointer';

	}


	function onDocumentMouseDown( event ) {

		headsUp.style.display = 'none';

	}


	function onDocumentTouchStart( event ) {

//		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		onDocumentMouseMove( event );

	}

