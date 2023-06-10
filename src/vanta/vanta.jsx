import React from 'react';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min.js';

class BG extends React.Component {
	constructor() {
		super();
		this.vantaRef = React.createRef();
	}
	componentDidMount() {
		this.vantaEffect = BIRDS({
			el: this.vantaRef.current,
			THREE: THREE,
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			scale: 1.0,
			scaleMobile: 1.0,
			birdSize: 1.3,
			wingSpan: 12.0,
			speedLimit: 7.0,
			separation: 38.0,
			alignment: 30.0,
			cohesion: 33.0
		});
	}
	componentWillUnmount() {
		if (this.vantaEffect) {
			this.vantaEffect.destroy();
		}
	}
	render() {
		return (
			<div style={{ height: '90vh', width: '100%' }} ref={this.vantaRef}></div>
		);
	}
}

export default BG;
