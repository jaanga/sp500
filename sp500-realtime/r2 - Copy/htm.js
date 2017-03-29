
	HTM = {};

	var colors = [0x575757,0xAD2323,0x2A4BD7,0x1D6914,0x814A19,0x8126C0,0x81C57A,0x9DAFFF,0x29D0D0,0xFF9233,0xE9DEBB,0xFFCDF3,0xFFEE33,0xA0A0A0,0x000000,0xFFFFFF];
	var sectors = [
		'Consumer Discretionary','Consumer Staples','Energy','Financials','Health Care','Industrials',
		'Information Technology', 'Materials','Real Estate','Telecommunication Services','Utilities'
	];

	HTM.init = function()  {

		let container;
		const b = '<br>';

		container = document.body.appendChild( document.createElement( 'div' ) );
		container.id = 'container';
		container.innerHTML =
			'<div id=menu >' +

				'<h2>' +
					'<a href=http://jaanga.github.io/sp500/ title="Jaanga - your 3D happy place" > &#x2766 </a>' + b +
					'<a href="" title="Click here to refresh this page" >📈' + location.pathname.split( '/' ).pop().slice( 0, -5).replace( /-/g, ' ' ) + '</a>' +
					' <a href=../../index.html#sp500-realtime/README.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>' +
				'</h2>' +
				'<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>' +
				'<p><small><i>' + document.head.querySelector("[name=description]").content + '</i></small></p>' +

				'<details open>' +
					'<summary><h3>Menu</h3></summary>' +

					'<div id=msg1 ></div>' +
					'<div id=msg2 ></div>' +
					'<div id=msg3 ></div>' +
/*
					'<p>' +
						'<select id=selFiles onchange="requestFileTrades( this.value );" size=10 style=width:100%; ></select>' +
					'</p>' +


					'<p>Replaying day: <output id=outDate ><output> </p>' +
					'<p>' +
						'<button id=mnuControls onclick=replay(); >Play</button>' +
						' <input type=range id=inpIndex min=0 max=390 step=1 value=0 oninput=index=inpIndex.value; title="0 to 390: OK" >' +
					'</p>' +
*/
					'<p id=menuReplay></p>' +


				'</details>' +

				'<details  id=detSymbols onclick=inpSearch.focus(); >' +
					'<summary><h3>Symbol Highlight</h3></summary>' +

					'<p >🔍 <input id=inpSearch size=5 ></p>' +
					'<p ><select id=selSymbols size=10 ></select></p>' +

				'</details>' +

				'<details open>' +
					'<summary><h3>Sector Highlight</h3></summary>' +

					'<p id=mnuSector ></p>' +

				'</details>' +

				'<details>' +
					'<summary><h3>Settings</h3></summary>' +
					'<p><input type=checkbox onchange=symbolsLines.visible=!symbolsLines.visible; checked > Snail Slime</p>' +
					'<p><input type=checkbox id=chkWire onchange=toggleWireframe(); > Wireframe</p>' +
					'<p><input type=checkbox onchange=ground.visible=!ground.visible; checked > Ground plane</p>' +
					'<p><input type=checkbox onchange=axisHelper.visible=!axisHelper.visible; checked > Axes</p>' +
					'<p><input type=checkbox onchange=lightDirectional.shadow.camera.visible=!lightDirectional.shadow.camera.visible; checked > lightbox</p>' +
					'<p><input type=checkbox id=chkBackground onchange=toggleBackgroundGradient(); checked > Gradient background</p>' +
					'<p title="Press spacebar or click in window to stop." >' +
						'<input type=checkbox id=chkRotate onchange=controls.autoRotate=!controls.autoRotate checked > Rotation ' +
					'</p>'  +
				'</details>' +

				'<details>' +
					'<summary><h3>About</h3></summary>' +
					'<p>' +
						'&bull; Rotate|Zoom|Pan => 1|2|3' + b +
						'&nbsp; fingers/buttons' + b +
						'&bull; Rotation => spacebar' + b +
						'&bull; Slide menu => \'hamburger\' icon' +
					'<p>' +


					'<p>Click the \'i in a circle\' icon for more <a href=index.html#readme.md title="Click here for help and information" >help</a>.</p>' +
					'<p>' +
					'Keywords:' + b +
					document.head.querySelector("[name=keywords]").content.replace( /,/g, ', ' ) + b + b +
					'Revision Date:' + b +
					document.head.querySelector("[name=date]").content + b + b +
					'File name:' + b +
						location.pathname.split( '/' ).pop() + b +
					'</p>' +
					'<p>Copyright &copy; ' + ( new Date() ).getFullYear() + ' Jaanga authors. <a href=http://jaanga.github.io/home/r4/index.html#http://jaanga.github.io/jaanga-copyright-and-mit-license.md >MIT license</a>.</p>' +
				'</details>' +

				'<hr>' +

				'<center><a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a></center>' +
				'<div class=popUp id=pop2 style=display:none;bottom:100px; >Jaanga - your 3D happy place.<br>Click here to return to the top of the page</div>' +

			'</div>' +

			'<div id=hamburger onclick=container.style.left=container.style.left===""?"-325px":""; >' +
				'<div id=bars title="Click this hamburger to slide the menu" > &#9776 </div>' +
			'</div>' +

		'';

	}
