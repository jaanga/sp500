
	var GND = gnd = {};

	gnd.init = function() {

		drawTable();

	}


	function drawTable() {

		function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

		var geometry, material, mesh;
		var edgesGeometry, edgesMaterial, edges;

// Ground Plane

		ground = new THREE.Object3D();

		geometry = new THREE.BoxGeometry( 150, 5, 400 );

		material = new THREE.MeshPhongMaterial( {
			color: 0x22cc55,
			specular: 0xffffff * Math.random(),
			shininess: 10
		} );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 75, -2.6, -200 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		ground.add( mesh );

		edgesGeometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
		edgesMaterial = new THREE.LineBasicMaterial();
		edgesMaterial.color.setRGB( 0.3, 0.3, 0.3 );
		edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
		mesh.add( edges ); // add wireframe as a child of the parent mesh


		material = new THREE.MeshPhongMaterial( {
			color: 0x992222,
			specular: 0xffffff * Math.random(),
			shininess: 10
		} );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( -75, -2.51, -200 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		ground.add( mesh );

		edgesGeometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
		edgesMaterial = new THREE.LineBasicMaterial();
		edgesMaterial.color.setRGB( 0.3, 0.3, 0.3 );
		edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
		mesh.add( edges ); // add wireframe as a child of the parent mesh

// Bar
		geometry = new THREE.BoxGeometry( 300, 1, 5 );

		material = new THREE.MeshPhongMaterial( {
			color: 0xaaaaaa,
			specular: 0xffffff * Math.random(),
			shininess: 10
		} );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, 0.5, -200 * Math.log( 2 ) );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		ground.add( mesh );


		edgesGeometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
		edgesMaterial = new THREE.LineBasicMaterial();
		edgesMaterial.color.setRGB( 0.3, 0.3, 0.3 );
		edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
		mesh.add( edges ); // add wireframe as a child of the parent mesh

// Labels
		var sp, ar, axis;

		sp = drawSprite( '0% vol avg', 0.1, '#ff00ff', -150, 12 , 0 );
		sp.material.opacity = 0.5;
		scene.add( sp );

		ar = new THREE.ArrowHelper( v( 0, 1, 0 ), v( -150, 0, 0 ), 8, 0xff8888, 4, 3 );
		ground.add( ar );

		sp = drawSprite( '100% vol avg', 0.1, '#ff00ff', -150, 12 , mesh.position.z );
		sp.material.opacity = 0.5;
		ground.add( sp );

		sp = drawSprite( '>600% vol avg', 0.1, '#ff00ff', -150, 12 , -200 * Math.log( 7 ) );
		sp.material.opacity = 0.5;
		ground.add( sp );

		axisHelper = new THREE.AxisHelper( 50 );
		ground.add( axisHelper );

		scene.add( ground );

	}


	function drawSprite( text, scale, color, x, y, z ) {

		var texture, spritMaterial, sprite;

		texture = canvasText( text, color );
		spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 1 } );
		sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

		return sprite;

	}


	function canvasText( textArray, color ) {

		var canvas = document.createElement( 'canvas' );
		var context = canvas.getContext( '2d' );
		var width = 0, texture;

		if ( typeof textArray === 'string' ) textArray = [ textArray ];

		context.font = '48px sans-serif';

		for (var i = 0, len = textArray.length; i < len; i++) {

			width = context.measureText( textArray[i] ).width > width ? context.measureText( textArray[i] ).width : width;

		}

		canvas.width = width + 20; // 480
		canvas.height = textArray.length * 60;

		context.fillStyle = color;
		context.fillRect( 0, 0, canvas.width, canvas.height);

		context.lineWidth = 1 ;
		context.strokeStyle = '#000';
		context.strokeRect( 0, 0, canvas.width, canvas.height);

		context.fillStyle = '#000' ;
		context.font = '48px sans-serif';

		for (var i = 0, len = textArray.length; i < len; i++) {

			context.fillText( textArray[i], 10, 48  + i * 60 );

		}

		texture = new THREE.Texture( canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;

	}


