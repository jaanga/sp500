
	let MNU = mnu = {};

	let colors = [0x575757,0xAD2323,0x2A4BD7,0x1D6914,0x814A19,0x8126C0,0x81C57A,0x9DAFFF,0x29D0D0,0xFF9233,0xE9DEBB,0xFFCDF3,0xFFEE33,0xA0A0A0,0x000000,0xFFFFFF];
	let sectors = [
		'Consumer Discretionary','Consumer Staples','Energy','Financials','Health Care','Industrials',
		'Information Technology', 'Materials','Real Estate','Telecommunication Services','Utilities'
	];


	mnu.init = function() {


		let txt = '';

		for ( let i = 0; i < sectors.length; i++ ) {

			txt += '<div onclick=MNU.showSector(' + ( i + 1 ) + '); ><span style=background-color:#' + colors[ i + 1 ].toString( 16 ) + '; >&nbsp; &nbsp; &nbsp; </span> &nbsp;' + sectors[ i ].slice(0,25) + '</div>';

		}

		mnuSector.innerHTML = txt + '<button onclick=MNU.resetSectors(); >Reset Sectors</button>';

		inpSearch.onclick = function() { this.select(); } // highlights everything
		inpSearch.onkeyup = function() { MNU.setSymbolSearch(); }



	}


	MNU.setMenuSymbolSelect = function() { // runs after symbols loaded

		detSymbols.open = true; // toggle for debug
		detSymbols.ontoggle = function() { inpSearch.focus(); }

		for ( let i = 0; i < symbols.keys.length; i++ ) {

			selSymbols[ i ] = new Option( symbols.keys[ i ] );

		}

		selSymbols.selectedIndex = Math.floor( Math.random() * symbols.keys.length );

		selSymbols.onchange = function() { highlight( selSymbols.value ); }
		selSymbols.onfocus = function() { highlight( selSymbols.value ); }
	}



	MNU.setSymbolSearch = function() {

		let letters;

		letters = inpSearch.value.toUpperCase();

		selSymbols.innerHTML = '';

		for ( let i = 0; i < symbols.keys.length; i++ ) {

			if ( symbols.keys[ i ].indexOf( letters ) > -1 ) {

				selSymbols.innerHTML += '<option>' + symbols.keys[ i ]  + '</option>';

			}

		}

		selSymbols.selectedIndex = 0;

	}



	MNU.showSector = function( id ) {

console.log( 'id', id );

		for ( let i = 0; i < symbols.touchables.length; i++ ) {

			tch = symbols.touchables[ i ];

			if ( symbols[ tch.name ].sectorID !== id ) {

				tch.material.opacity = 0.1;
				tch.children[0].material.opacity = 0;
				tch.castShadow = false;
				tch.receiveShadow = false;
				symbols.meshes[ i ].children[ 1 ].visible = false;
//				symbolsLines.children[ i ].material.opacity = 0.2;

			} else {

				tch.material.opacity = 0.85;
				tch.children[0].material.opacity = 1;
				tch.castShadow = true;
				tch.receiveShadow = true;
				symbols.meshes[ i ].children[ 1 ].visible = true;
//				symbolsLines.children[ i ].material.opacity = 1;
			}

		}

	}

	MNU.resetSectors = function() {

		for ( let i = 0; i < symbols.touchables.length; i++ ) {

			tch = symbols.touchables[ i ];

			tch.material.opacity = 0.85;
			tch.children[0].material.opacity = 1;
			tch.castShadow = true;
			tch.receiveShadow = true;
			symbols.meshes[ i ].children[ 1 ].material.opacity = 1;
//			symbolsLines.children[ i ].material.opacity = 1;

		}

	}
