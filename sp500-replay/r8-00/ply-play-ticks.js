	let PLY = {};

	PLY.index = 0;

	PLY.playing = false;

	function replay() {

		if ( PLY.playing === false ) {

			if ( PLY.index > symbols.ticksCount ) { PLY.index = 0; }
			PLY.playing = true;
			mnuControls.innerHTML = 'Pause';
			updatePosition();

		} else {

			PLY.playing = false;
			mnuControls.innerHTML = 'Play';

		}

	}


	function updatePosition() {

//		let symbol, vertex, t;

		for ( let i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];

			if ( !symbol.vertices ) { continue; }

			vertex = symbol.vertices[ PLY.index ];

			if ( !symbol.ticks[ PLY.index ] || !vertex ) { continue; }

			symbols.meshes[ i ].position.copy( vertex );

		}

		symbols.date.setTime( symbols.openTime + 60000 * PLY.index );

		menuReplay.innerHTML = 'Minute: ' + PLY.index + ' - Time: ' + symbols.date.toLocaleTimeString();

		PLY.index++;

		if ( PLY.index <= 390 && PLY.playing === true ) { // ???

			inpIndex.value = PLY.index;
			t = setTimeout( updatePosition, 50 );

		} else if ( PLY.playing === true ) {

			inpIndex.value = PLY.index = 0
			t = setTimeout( updatePosition, 50 );

		}

	}
