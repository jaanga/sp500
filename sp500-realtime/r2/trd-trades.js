// https://docs.google.com/spreadsheets/d/17cct_eo6odACejno1YnDPxXXyOoNxxjs02zhXTNdWwo/edit#gid=1750244370
	var TradeDataFileName = 'https://spreadsheets.google.com/feeds/list/17cct_eo6odACejno1YnDPxXXyOoNxxjs02zhXTNdWwo/1/public/values?alt=json';

	tickUpdate = 2;

	function loadTradeJSON() {

		let xhr, response, txt;
		let cells, cell, trades, trade, symbol, diff, note;
		const b = '<br>';



		trades = [];
		txt = '';

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', TradeDataFileName + '&t=' + Math.random(), true );
		xhr.onload = callbackJSON;
		xhr.send( null );

		function callbackJSON() {

			response = xhr.responseText;
			response = JSON.parse( response );
			cells = response.feed.entry; // from spreadsheet

			for ( let i = 0; i < cells.length; i++  ) {

				cell = cells[ i ];

				trade = [
					parseFloat( cell.gsx$changepct.$t ),
					parseInt( cell.gsx$volume.$t, 10 )
				];

				trades.push( trade );

			}

			if ( symbols.updates === 0 ) { // first pass

//console.log( 'first update' );

				diff = true;

				note = '<span style=color:red; >first tick</span>';

				addTrades();

			}  else {

//console.log( 'update', symbols.updates );

				diff = false;

				for ( i = 0; i < symbols.keys.length ; i++ ) {

					symbol = symbols[ symbols.keys[ i ] ];

if ( !trades[ i ][ 1 ] || !symbol.trades[ symbol.trades.length - 1 ] ) { console.log( 'trd', i, trades ); break; }

					if ( trades[ i ][ 1 ] && symbol.trades[ symbol.trades.length - 1 ][ 1 ] !== trades[ i ][ 1 ] ) {

//console.log( 'diff', symbol.symbol );

						diff = true;
						break;
					}

				}

			}

			symbols.updates++;

			updateTime = new Date().toLocaleTimeString();

			if ( diff === true ) {

				note = ' <span style=color:red; >' + symbols.updates + ' diff at ' + symbol.symbol + '</span>';
				tickUpdate = note;
				addTrades();

				updateSymbols();
				updateLines();

			} else {

				note = 'No new tick';

			}

			mnuTRD.innerHTML =

				updateTime + b +
				'updates: ' + symbols.updates + b +
				note + b +
				'ticks: ' + symbols["AAPL"].trades.length + ' at update ' + tickUpdate + b +

			'';

// use the wait for free time thing
			tim = setTimeout( loadTradeJSON, 5000 );

		}


		function addTrades() {

			for ( let i = 0; i < symbols.keys.length ; i++ ) {

				symbol = symbols[ symbols.keys[ i ] ];

				symbol.trades.push( trades[ i ] );

			}

		}

	}




	function updateSymbols() {

		let symbol, trade, x, z, vertex;

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];
			trade = symbol.trades[ symbol.trades.length - 1 ];

			x = 10 * trade[ 0 ];
			x = x > 150 ? 150 : x;
			x = x < -150 ? -150 : x;

			z = -200 * Math.log( 1 + trade[ 1 ] / symbol.volumeAvg );
			z = z < -400 ? -400 : z;

			vertex =  new THREE.Vector3( x, 0, z );
			symbol.vertices.push( vertex );
			symbols.meshes[ i ].position.copy( vertex )

		}

	}


	function updateLines() {

		let symbol;
		let geometry, material, line;

		scene.remove( symbols.lines );

		symbols.lines = new THREE.Object3D();

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];

			geometry = new THREE.Geometry();
			geometry.vertices = symbol.vertices;
			material = new THREE.LineBasicMaterial( { color: colors[ symbol.sectorID ], transparent: true } );
			line = new THREE.Line( geometry, material );
			line.userData.symbol = symbol.symbol;

			symbols.lines.add( line );

		}

		scene.add( symbols.lines );

	}
