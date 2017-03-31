
	var REP = rep = {}

	var playing = false;


	rep.init = function() {

		symbols.index = 0;


		symbols.timeOpen = parseInt( '1490906965' + '000', 0 );

		symbols.date = new Date();
		symbols.date.setTime( symbols.timeOpen );

		getEnd = symbols.keys.length;

		getTrades()

	}


	function getTrades() {

		if ( symbols.index < getEnd ) {

			requestFileYQL( symbols.keys[ symbols.index ] );

		} else {

//			getTradeDay( 0 );

console.timeEnd( 'time' );

		}

	}

	function requestFileYQL( symbol ) {

		var statement, encodedStatement, query;
		var xhr, txt, trades, trd, trade;
		let period;

		period = '&p=1d';

// Symbols must be uppercase for Google
//		statement = 'select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.google.com%2Ffinance%2Fgetprices%3Fq%3DGOOG%26i%3D60%22';
		statement =
			'select * from html where url="http://www.google.com/finance/getprices?q=' +
			symbol +
			'&i=60' +
			period +
		'"';

		encodedStatement = encodeURIComponent( statement );

		query =	'https://query.yahooapis.com/v1/public/yql?q=' + encodedStatement + '&format=json';

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', query, true );
		xhr.onerror = function() { console.log( 'error', symbols.index, symbol  ); getTrades(); };
		xhr.onload = callbackQuery;
		xhr.send( null );

		function callbackQuery( xhr ) {

//			var trades, epochTime;
//			var tradeDays, tradeStart, tradeFinish;

			sym = symbols[ symbol ];
			sym.trades = [];
			sym.vertices = [];

			txt = xhr.target.response;
			txt = JSON.parse( txt );

			if ( txt.query.results === null ) {

console.log( symbol, xhr.target.response );

				getTrades();
				return;

			}

			trades = txt.query.results.body.split( '\n' ).slice( 7 );

			if ( trades.length === 0 ) {

console.log( symbol, trades );

				tim = setTimeout( getTrades, 500 );
				return;

			}

			vol = 0;
			sym.open = parseFloat( trades[ 0 ].split( ',')[ 1 ] );

			for ( var i = 1; i < trades.length - 1; i++ ) {

				trd = trades[ i ].split( ',');
				trade = [ parseFloat (trd[ 1 ] ), parseInt( trd[ 5 ], 10 ) ];
				sym.trades.push( trade );

				x = 1000 * ( trade[ 0 ] - sym.open ) / sym.open;;
				x = x > 150 ? 150 : x;
				x = x < -150 ? -150 : x;

				vol += trade[ 1 ];
				z = -200 * Math.log( 1 + vol / sym.volumeAvg );
				z = z < -400 ? -400 : z;

				vertex =  new THREE.Vector3( x, 0, z );
				sym.vertices.push( vertex );

			}

			updateLine( sym );

			symbols.index++;

			log1.innerHTML = 'loaded: ' + symbols.index + ' ' + sym.symbol;

			getTrades();

		}


	}


	function updateLine( symbol ) {

//		var sym;
		var geometry, material, line;

		scene.remove( sym.line );
		geometry = new THREE.Geometry();
		geometry.vertices = sym.vertices;
		material = new THREE.LineBasicMaterial( { color: colors[ symbol.sectorID ], transparent: true } );
		sym.line = new THREE.Line( geometry, material );
		sym.line.userData.symbol = sym.symbol;

		scene.add( sym.line );

	}


	function replay() {

		if ( playing === false ) {

			if ( index > 390 ) { index = 0; }
			playing = true;
			mnuControls.innerHTML = 'Pause';
			updatePosition();

		} else {

			playing = false;
			mnuControls.innerHTML = 'Play';

		}

	}


	function updatePosition() {

		var symbol, vertex, t;

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];

			if ( !symbol.vertices ) { continue; }

			vertex = symbol.vertices[ index ];

			if ( !vertex ) { continue; }

			symbols.touchables[ i ].userData.changePct = 100 * ( symbol.trades[ index ][1] - symbol.open ) / symbol.open;
			symbols.touchables[ i ].userData.volume = symbol.trades[ index ][5];
			symbols.meshes[ i ].position.copy( vertex );

		}


		symbols.date.setTime( symbols.timeOpen + 60000 * index );

		menuReplay.innerHTML = 'minute: ' + index + ' - time: ' + symbols.date.toLocaleTimeString();

		index++;

		if ( index <= 390 && playing === true ) { // ???

			inpIndex.value = index;
			t = setTimeout( updatePosition, 50 )

		}

	}
