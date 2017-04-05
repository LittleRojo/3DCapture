/**
 * @author mrdoob / http://mrdoob.com
 * Based on @tojiro's vr-samples-utils.js
 */

var WEBVR = {

	isLatestAvailable: function () {

		return navigator.getVRDisplays !== undefined;

	},

	isAvailable: function () {

		return navigator.getVRDisplays !== undefined || navigator.getVRDevices !== undefined;

	},

	getMessage: function () {

		var message;

		if ( navigator.getVRDisplays ) {

			navigator.getVRDisplays().then( function ( displays ) {

				if ( displays.length === 0 ) message = 'WebVR supported, but no VRDisplays found.';

			} );

		} else if ( navigator.getVRDevices ) {

			message = 'Your browser supports WebVR but not the latest version. See <a href="http://webvr.info">webvr.info</a> for more info.';

		} else {

			message = 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.';

		}

		if ( message !== undefined ) {

			var container = document.createElement( 'div' );
			container.style.position = 'absolute';
			container.style.left = '0';
			container.style.top = '0';
			container.style.right = '0';
			container.style.zIndex = '999';
			container.align = 'center';

			var error = document.createElement( 'div' );
			error.style.fontFamily = 'sans-serif';
			error.style.fontSize = '16px';
			error.style.fontStyle = 'normal';
			error.style.lineHeight = '26px';
			error.style.backgroundColor = '#fff';
			error.style.color = '#000';
			error.style.padding = '10px 20px';
			error.style.margin = '50px';
			error.style.display = 'inline-block';
			error.innerHTML = message;
			container.appendChild( error );

			return container;

		}

	},

	getButton: function ( effect ) {

		var button = document.createElement( 'button' );
		button.style.position = 'absolute';
		button.style.left = window.innerWidth / 2 - 32 + 'px';
		button.style.top = '5px';//window.innerHeight - 58 + 'px';
		button.style.width = '70px';
		button.style.height = '74px';
		button.style.border = '0';
		button.style.padding = '0px';
		button.style.cursor = 'pointer';		
		button.style.background = 'none';
		button.style.backgroundColor = 'transperant';
		button.style.color = 'yellow';
		button.style.fontFamily = 'sans-serif';
		button.style.fontSize = '16px';
		button.style.fontWeight = 'bold';
		button.style.textAlign = 'center';
		button.style.zIndex = '999';
		button.textContent = "VR";
		button.style.backgroundImage = "url('img/vrLogo.png')";
		button.onclick = function() {
			effect.isPresenting ? effect.exitPresent() : effect.requestPresent();
		};

		window.addEventListener( 'vrdisplaypresentchange', function ( event ) {

			button.textContent = effect.isPresenting ? "2D" : "VR" ;

		}, false );

		return button;

	}

};

