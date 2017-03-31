// needs the most clean up



// https://docs.google.com/spreadsheets/d/1_sv-QsJvHCfTCjRlpgv5ZwAUZetMCu-SfQHERAOuGZE/edit#gid=0
	var WikipediaDataFileName = 'https://spreadsheets.google.com/feeds/list/1_sv-QsJvHCfTCjRlpgv5ZwAUZetMCu-SfQHERAOuGZE/1/public/values?alt=json';


// https://docs.google.com/spreadsheets/d/17cct_eo6odACejno1YnDPxXXyOoNxxjs02zhXTNdWwo/edit#gid=1750244370
	var TradeDataFileName = 'https://spreadsheets.google.com/feeds/list/17cct_eo6odACejno1YnDPxXXyOoNxxjs02zhXTNdWwo/1/public/values?alt=json';

	var WKI = wki = {};

	var symbols;
	var symbolsObjects;
	var symbolsLines;
	var index = 0;

	symbols = {};
	symbols.touchables = [];

	var sp500ticks = [];
	var sp500TradesPrevious;
	var updateTime, updateText, updateTextPrevious;


	wki.init = function() {

		loadWikiJSON();

	}

	function loadWikiJSON() {

//		var xhr, data, entries, txt, entry, symbol;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', WikipediaDataFileName + '&t=' + Math.random(), true );
		xhr.onload = callbackJSON;
		xhr.send( null );

		function callbackJSON() {

			data = xhr.responseText;
			data = JSON.parse( data );
			entries = data.feed.entry;
			symbols = {};
			symbols.keys = [];
			symbols.meshes = [];
			symbols.touchables = [];
			symbols.trades = [];
			symbols.updates = 0;

			txt = '';

			for ( var i = 0; i < entries.length; i++  ) {

				entry = entries[i];

				symbol = {
					symbol: entry.gsx$tickersymbol.$t, // t.replace( '.', '-' ),
					name: entry.gsx$security.$t,
					sector: entry.gsx$gicssector.$t,
					sectorID: parseInt( entry.gsx$sectorid.$t, 10 ),
					industry: entry.gsx$gicssubindustry.$t,
					cik: parseInt( entry.gsx$cik.$t, 10),
					volumeAvg: parseInt( entry.gsx$volumeavg.$t, 10 ),
					marketCap: parseInt( entry.gsx$marketcap.$t, 10 ),
					trades : [],
					vertices : []
				};

				symbols.keys[ i ] = symbol.symbol;
				symbols[ symbol.symbol ] = symbol;

			}

console.log( 'loaded', symbols.keys.length );

			setMenuSymbolSelect();
			drawSymbols();

		}

	}


	function drawSymbols() {

		var geometry, material, mesh;
		var edgesGeometry, edgesMaterial, edges;
		var scale,  obj, sp;

		scene.remove( symbolsObjects );

		symbolsObjects = new THREE.Object3D();

		geometry = new THREE.BoxGeometry( 5, 1, 5 );

		for ( var i = 0; i < symbols.keys.length; i++) {

			obj = new THREE.Object3D();
			symbol = symbols[ symbols.keys[ i ] ];

			material = new THREE.MeshPhongMaterial( {
				color: colors[ symbol.sectorID ], // 0xffffff * Math.random(),
				opacity: 0.85,
				side: 2,
				transparent: true
			} );

			mesh = new THREE.Mesh( geometry, material );
			mesh.name = mesh.userData.symbol = symbol.symbol;
			mesh.userData.name = symbol.name;
			mesh.userData.sector = symbol.sector;
			mesh.userData.sectorID = symbol.sectorID;

//subindustry
//clic
			mesh.userData.volumeAvg = symbol.volumeAvg;
			mesh.userData.marketCap = symbol.marketCap;
			mesh.userData.volume = 0;
			mesh.userData.changePct = 0;

			scale = 2 + 0.0000000002 * symbol.marketCap;
//			mesh.position.set( 10 * sp500[i][2], 0.5 * scale, -200 * Math.log( 1 + sp500[i][4] / sp500[i][3] ) + 100 );
			mesh.position.set( 0, 0.5 * scale, 0 );
			mesh.scale.y = scale;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			obj.add( mesh );

			edgesGeometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
			edgesMaterial = new THREE.LineBasicMaterial( { transparent: true } );
			edgesMaterial.color.setRGB( 0.3, 0.3, 0.3 );
			edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
			mesh.add( edges ); // add wireframe as a child of the parent mesh

			sp = drawSprite( mesh.userData.symbol, (0.05 ), '#ffff00', mesh.position.x, ( 2 * mesh.position.y + 3 ), mesh.position.z);
			sp.material.opacity = 0.5;
			obj.add( sp );

			symbols.meshes.push( obj );
			symbols.touchables.push( mesh );
			symbolsObjects.add( obj );

		}

		scene.add( symbolsObjects );
		loadTradeJSON();

	}


	function loadTradeJSON() {

		var xhr, data, entries, txt;
		var entry, trade, symbol, diff, note;

		sp500TradesPrevious = symbols.trades.slice( 0 );

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', TradeDataFileName + '&t=' + Math.random(), true );
		xhr.onload = callbackJSON;
		xhr.send( null );

		function callbackJSON() {

			data = xhr.responseText;
			data = JSON.parse( data );
			entries = data.feed.entry;
			symbols.updates++;
			txt = '';

			for ( var i = 0; i < entries.length; i++  ) {

				entry = entries[ i ];
				symbol = symbols[ symbols.keys[ i ] ];
				trade = [
					parseFloat( entry.gsx$changepct.$t ),
					parseInt( entry.gsx$volume.$t, 10 )
				];

// move to after check!!!!!

				symbol.trades.push( trade );

//				txt += i + ' ' + entry.gsx$symbol.$t + ' ' + trade.toString() + '<br>';

			}

			note = '<br>updates: ' + symbols.updates;

			if ( symbols.trades.length < 2 ) { // first pass

console.log( 'first difff' );

				diff = true;
				note = '<br><span style=color:red; >first updates</span>';

				symbols.trades.push( entries );

			}  else if ( symbols.updates > 2 ) {

				for ( i = 1; i < symbols.keys.length ; i++ ) {

					symbol = symbols[ symbols.keys[ i ] ];

					if ( symbol.trades[ symbol.trades.length - 1 ][ 1 ] !== symbol.trades[ symbol.trades.length - 2  ][ 1 ] ) {

						diff = true;
						note = '<br><span style=color:red; >update ' + symbol.symbol + '</span>';
						symbols.trades.push( entries );

console.log( 'update', symbol.symbol, symbol.trades[ symbol.trades.length - 1 ][ 1 ],  symbol.trades[ symbol.trades.length - 2  ][ 1 ] );

//						break; // we have found a diff


					}



				}


			} else {

				diff = false;
				note = '<br>no update';

			}

//console.log( 'difference:', diff,  new Date().toLocaleTimeString() );

			updateTime = new Date().toLocaleTimeString();
			updateText = ''; //txt;
			msg1.innerHTML = 'Debug info:<br>' + updateTime + note;

			if ( diff === true ) {

				updateSymbols();
				updateLines();
				msg2.innerHTML = 'ticks:' + symbols.trades.length;
				msg3.innerHTML = updateText;

			}

// use the wait for free time thing
			tim = setTimeout( loadTradeJSON, 5000 );

		}

	}


	function updateSymbols() {

		var symbol, trade, x, z, vertex;

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

		var symbol;
		var geometry, material, line;

		scene.remove( symbolsLines );

		symbolsLines = new THREE.Object3D();

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			symbol = symbols[ symbols.keys[ i ] ];

			geometry = new THREE.Geometry();
			geometry.vertices = symbol.vertices;
			material = new THREE.LineBasicMaterial( { color: colors[ symbol.sectorID ], transparent: true } );
			line = new THREE.Line( geometry, material );
			line.userData.symbol = symbol.symbol;

			symbolsLines.add( line );

		}

		scene.add( symbolsLines );

	}
