//alloc
const contact = document.getElementById("contact").querySelector('a');

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll(".fade-right").forEach((element) => {
        gsap.fromTo(element, {
            opacity: 0,
            xPercent: -100
        }, {
            scrollTrigger:{
                trigger: element,
                start: 'top 80%',
                end: 'bottom 70%',
                scrub: true,
            },
            opacity: 1,
            xPercent: 0
        })
    });

    //s-5 
    document.querySelectorAll(".fade-bottom").forEach((element) => {
        gsap.fromTo(element, {
            opacity: 0,
            yPercent: -100
        }, {
            scrollTrigger:{
                trigger: element,
                start: 'top 80%',
                end: 'bottom 70%',
                scrub: true,
            },
            opacity: 1,
            yPercent: 0
        })
    });

    //s-5 scroll up and down
    gsap.fromTo(".scroll-up img",
        {y: "100%"},
        {
            y: "-50%",
            scrollTrigger: {
                trigger: "#s-5",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        }
    );
    gsap.fromTo(".scroll-down img",
        {y: "-200%"},
        {
            y: "120%",
            scrollTrigger: {
                trigger: "#s-5",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        }
    );

    //s-5 scroll left and right
    gsap.fromTo(".scroll-left img", {
        xPercent: 15, 
        ease: "none",
    }, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
            trigger: "#s-5-too",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    gsap.fromTo(".scroll-right img", {
        xPercent: -90,
        ease: "none",
    }, {
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: "#s-5-too",
            start: "center bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    //section six
    var tls6 = gsap.timeline({
        scrollTrigger: {
            trigger: "#s-6",
            start: "top center",
            end: "center center",
            scrub: true,
        }
    });

    // tls6.fromTo("#inter", {yPercent: -100, fontSize: "0vw"}, {opacity: 1, yPercent: 0, fontSize: "16vw"})
    // .fromTo("#interBg", {fontSize: "0vw"}, {fontSize: "32vw"})
    // .fromTo("#contact", {fontSize: "0vw"}, {fontSize: "8vw"});

    // tls6.from("#inter", {opacity: 0, yPercent: 100})
    // .fromTo("#interBg", {opacity: 0, letterSpacing: "4em"}, {opacity: 1, letterSpacing: "0em"})
    // .fromTo("#contact", {fontSize: "0vw"}, {fontSize: "8vw"});

    tls6.fromTo("#interBg", {opacity: 0, letterSpacing: "4em"}, {opacity: 1, letterSpacing: "0em"});

    let contactAnim = gsap.fromTo("#contact a", {
        color: "#fff",
        duration: 0.2,
        paused: true
    }, {
        color: "#000",
        backgroundColor: "#fff",
        duration: 0.2,
        paused: true
    });

    contact.addEventListener('mouseenter', () => contactAnim.play());
    contact.addEventListener('mouseleave', () => contactAnim.reverse());
});





//lenis scroll
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)