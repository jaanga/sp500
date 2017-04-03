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

		let symbol, vertex, t;

		for ( let i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];

			if ( !symbol.vertices ) { continue; }

			vertex = symbol.vertices[ PLY.index ];

			if ( !symbol.ticks[ PLY.index ] || !vertex ) { continue; }

			symbols.touchables[ i ].userData.changePct = 100 * ( symbol.ticks[ PLY.index ][1] - symbol.open ) / symbol.open;
			symbols.touchables[ i ].userData.volume = symbol.ticks[ PLY.index ][5];
			symbols.meshes[ i ].position.copy( vertex );

		}


		symbols.date.setTime( symbols[ 'MMM'].openTime + 60000 * PLY.index );

		menuReplay.innerHTML = 'minute: ' + PLY.index + ' - time: ' + symbols.date.toLocaleTimeString();

		PLY.index++;

		if ( PLY.index <= 390 && PLY.playing === true ) { // ???

			inpIndex.value = PLY.index;
			t = setTimeout( updatePosition, 50 )

		}

	}
