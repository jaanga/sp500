
	var REP = rep = {}


	rep.init = function() {

		symbols.index = 0;

		requestFileYQL( 'MMM' );
	}

	function requestFileYQL( symbol ) {

		var statement, encodedStatement, query;
//		var xhr, txt, lines, line;
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
console.log( 'sym', sym );
			txt = xhr.target.response;
			txt = JSON.parse( txt );

			if ( txt.query.results === null ) {

console.log( xhr.target.response );

				getTrades();
				return;

			}

			lines = txt.query.results.body.split( '\n' ).slice( 7 );

			if ( lines.length === 0 ) {

console.log( text );

				getTrades();
				return;

			}


			for ( var i = 1; i < lines.length; i++ ) {

				line = lines[ i ].split( ',');
				trade = [ parseFloat (line[ 1 ] ), parseInt( line[ 5 ], 10 ) ];
				sym.trades.push( trade );

				x = 10 * trade[ 0 ];
				x = x > 150 ? 150 : x;
				x = x < -150 ? -150 : x;

				z = -200 * Math.log( 1 + trade[ 1 ] / sym.volumeAvg );
				z = z < -400 ? -400 : z;

				vertex =  new THREE.Vector3( x, 0, z );
				sym.vertices.push( vertex );

			}

			updateLine( sym );
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
