
	let THR = thr = {};

	let stats, renderer, scene, camera, controls;

	thr.init = function() {

		stats = new Stats();
		stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0;' ;
		document.body.appendChild( stats.domElement );
		stats.domElement.style.display = window.innerWidth < 500 ? 'none' : '';

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.set( 120, 100, 110 );

// Controls

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.minDistance = 10;
		controls.maxDistance = 800;
		controls.target.set( 0, 20, -150 );
		controls.autoRotate = true;

		renderer.domElement.addEventListener( 'click', function() {  controls.autoRotate = false; }, false );

		addLights();

		addShadows();

	}


	function addLights() {

// 2016-02-21 ~ http://jaanga.github.io/cookbook-threejs/templates/add-lights/template-threejs-lights-r2.html

		let lightAmbient, lightPoint;

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		thr.lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
		thr.lightDirectional.position.set( -100, 100, 100 );
		thr.lightDirectional.shadow.camera.scale.set( 50, 50, 1 );

		thr.lightDirectional.shadow.mapSize.width = 2048;  // default 512
		thr.lightDirectional.shadow.mapSize.height = 2048;

		thr.lightDirectional.castShadow = true;
		scene.add( thr.lightDirectional );

		scene.add( new THREE.CameraHelper( thr.lightDirectional.shadow.camera ) );

		lightPoint = new THREE.PointLight( 0xffffff, 0.95 );
		camera.add( lightPoint );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );

		scene.add( camera );

	}


	function addShadows() {

// 2017-01-02 ~ http://jaanga.github.io/cookbook-threejs/templates/add-lights/template-threejs-lights-r3.html

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true
				child.receiveShadow = true;

			}

		} );

	}


	function animate() {

		controls.update();
		stats.update();
		renderer.render( scene, camera );
		requestAnimationFrame( animate );

	}
