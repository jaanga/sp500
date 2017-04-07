
	var MNU = mnu = {};

	mnu.init = function() {


		var txt = '';

		for ( var i = 0; i < sectors.length; i++ ) {

			txt += '<div onclick=showSector(' + ( i + 1 ) + '); ><span style=background-color:#' + colors[ i + 1 ].toString( 16 ) + '; >&nbsp; &nbsp; &nbsp; </span> &nbsp;' + sectors[ i ].slice(0,25) + '</div>';

		}

		mnuSector.innerHTML = txt + '<button onclick=resetSectors(); >Reset Sectors</button>';

	}


	function setMenuSymbolSelect() {

		inpSearch.onclick = function() { this.select(); }
		inpSearch.onkeyup = function() { setSearch(); }

		selSymbols.onclick = function() { highlight( selSymbols.value ); }

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			selSymbols[ i ] = new Option( symbols.keys[ i ] );

		}

		selSymbols.selectedIndex = Math.floor( Math.random() * symbols.keys.length );

	}


	function setSearch() {

		var syms, letters;

		syms = [];

		letters = inpSearch.value.toUpperCase();

		for ( var i = 0; i < symbols.keys.length; i++ ) {

			if ( symbols.keys[ i ].indexOf( letters ) > -1 ) {

				syms.push( symbols.keys[ i ] );

			}

		}

		selSymbols.innerHTML = '';

		for ( var i = 0; i < syms.length; i++ ) {

			selSymbols[ i ] = new Option( syms[ i ] );

		}

		selSymbols.selectedIndex = 0;

	}



	function showSector( id ) {

console.log( 'id', id );

		for ( var i = 0; i < symbols.touchables.length; i++ ) {

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

	function resetSectors() {

		for ( var i = 0; i < symbols.touchables.length; i++ ) {

			tch = symbols.touchables[ i ];

			tch.material.opacity = 0.85;
			tch.children[0].material.opacity = 1;
			tch.castShadow = true;
			tch.receiveShadow = true;
			symbols.meshes[ i ].children[ 1 ].material.opacity = 1;
//			symbolsLines.children[ i ].material.opacity = 1;

		}

	}
