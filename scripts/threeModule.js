import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

document.addEventListener("DOMContentLoaded", function(){

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    function updateCameraAndRendererSize() {
        const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        console.log(viewportWidth, viewportHeight);  // Debug to track when it's correctly set

        // Update camera aspect and renderer size
        camera.aspect = viewportWidth / viewportHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewportWidth, viewportHeight);
    }

    // Call size update initially after DOM is fully loaded
    updateCameraAndRendererSize();

    const container = document.getElementById('threejs-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    
    function myFunc(media){
        if(media.matches){
            camera.position.set(0, 0, Math.PI * 3);
            renderer.setPixelRatio(window.devicePixelRatio * 0.75);
        } else{
            renderer.setPixelRatio(window.devicePixelRatio);
            camera.position.set(0, 0, 5);
        }
    }

    var media = window.matchMedia("(max-width: 768px)");
    myFunc(media);

    container.appendChild(renderer.domElement);

    const fxcomposer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);

    // bloom setup
    fxcomposer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(containerWidth, containerHeight),
        .7,
        0.9,
        0.9
    );
    fxcomposer.addPass(bloomPass);
    // end bloom setup

    //fxaa setup
    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms['resolution'].value.set(1 / (container.clientWidth * pixelRatio), 1 / (container.clientHeight * pixelRatio));
    fxcomposer.addPass(fxaaPass);
    //end fxaa setup

    const loader = new GLTFLoader();

    loader.load('model/ambalage.glb', function (gltf) {

        const model = gltf.scene;
        scene.add(model);
        model.position.set(0.25, 0, 0);
        model.scale.set(1, 1, 1);
        window.model = model;

        // from anim
        gsap.from(model.position, {
            delay: 0.5,
            duration: 0.7,
            ease: "power2.out",
            x: -16,
            invalidateOnRefresh: true
        });
        gsap.from(model.rotation, {
            delay: 0.5,
            duration: 0.7,
            ease: "power2.out",
            y: -Math.PI * 0.25,
            invalidateOnRefresh: true
        });

        // Path define
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(.25, 0, 0),
            new THREE.Vector3(0, 7, 0),
            new THREE.Vector3(0, 7, 0),
            new THREE.Vector3(.5, 18, .75),
            new THREE.Vector3(.5, 4, .75),
            new THREE.Vector3(.5, -4, .75),
            new THREE.Vector3(.5, -12, .75),
            new THREE.Vector3(0, -9, 0),
            new THREE.Vector3(-14, 0, 0),
            new THREE.Vector3(1.5, 0, 0)
        ]);
        
        // Move model along the path based on scroll
        function updateModelPositionOnScroll() {
            if (!model) return;

            const scrollY = window.scrollY;
            const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);

            const pointOnCurve = curve.getPoint(scrollPercent);
            model.position.copy(pointOnCurve);

            if(scrollPercent < 0.35){
                model.rotation.set(scrollPercent * -Math.PI * .05, scrollPercent * -Math.PI * .5, 0);
                // model.rotation.y = Math.PI * .25;
            } else if(scrollPercent < .71){
                model.rotation.set(0, scrollPercent * -Math.PI * 1.9, 0);
                // model.rotation.y = Math.PI * .9;
            } else if(scrollPercent < 1){
                model.rotation.set(0, scrollPercent * -Math.PI * .4, 0); //last Z scrollPercent * -Math.PI * .02
                // model.rotation.y = Math.PI * 1;
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', updateModelPositionOnScroll);
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // fx composere renderer
        fxcomposer.render();
    }
    
    animate();

    // Event listener for window resize to recalculate aspect ratio and size
    window.addEventListener('resize', updateCameraAndRendererSize);

    // Force a resize check on scroll, this will ensure the size updates on mobile when scrolling
    window.addEventListener('scroll', updateCameraAndRendererSize);

    window.addEventListener('touchstart', updateCameraAndRendererSize);
    window.addEventListener('touchend', updateCameraAndRendererSize);
    
    // Manually trigger a resize event when the page is fully loaded to ensure proper size
    window.dispatchEvent(new Event('resize'));

});