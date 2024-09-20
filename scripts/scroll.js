//alloc
const headerSubText = document.getElementById('header-subtext');
const skillsList = document.getElementById('skillsList');
const contact = document.getElementById("contact").querySelector('a');

document.addEventListener("DOMContentLoaded", function(){

    setTimeout(() => {
        skillsList.style.opacity = 1;
    }, 500);

    //header SUB text
    gsap.from(headerSubText, {
        y: -20,
        ease: "power2.out",
        duration: .3,
        delay: .6
    });
    gsap.to(headerSubText, {
        opacity: 1,
        duration: .3,
        delay: .7
    });


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

    //#s-2 background change
    gsap.fromTo("#s-1", {
        backgroundColor: "#000"
    }, {
        scrollTrigger: {
    		trigger: "#s-1",
            start: "40% center",
    		end: "60% center",
    		scrub: true,
    	},
        backgroundColor: "#212529"
    });

    gsap.fromTo("#sleekDiv div",
        {filter: "blur(0px)"},
        {
            filter: "blur(5px)",
            scrollTrigger: {
                trigger: "#sleekDiv div",
                start: "top 20%",
                end: "bottom top",
                scrub: true,
            }
        }
    );

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
            let tlSkills = gsap.timeline({
                scrollTrigger: {
                    trigger: "#skillsList",
                    start: "top top",
                    end: "bottom+=200% center",
                    scrub: true,
                    pin: "#s-2",
                }
            });
            tlSkills.fromTo("#skillsList div", {y: "80%"}, {y: "-40%", ease: "none"}); //y65, y-40
        },
        "(max-width: 768px)": function() {
            let tlSkills = gsap.timeline({
                scrollTrigger: {
                    trigger: "#skillsList",
                    start: "top top",
                    end: "bottom+=100% center",
                    scrub: true,
                    pin: "#s-2",
                }
            });
            tlSkills.fromTo("#skillsList div", {y: "80%"}, {y: "-40%", ease: "none"}); //y75, -40
        }
    });

    //#s-3 background change
    gsap.fromTo("#s-3", {
        backgroundColor: "#db434b"
    }, {
        scrollTrigger: {
    		trigger: "#s-3",
            start: "80% center",
    		end: "bottom center",
    		scrub: true,
    	},
        backgroundColor: "#fff"
    });

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

    tls6.from("#inter", {opacity: 0, yPercent: 100})
    .fromTo("#interBg", {opacity: 0, letterSpacing: "4em"}, {opacity: 1, letterSpacing: "0em"})
    .fromTo("#contact", {fontSize: "0vw"}, {fontSize: "8vw"});

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