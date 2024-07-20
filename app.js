document.addEventListener('DOMContentLoaded', (event) => {
    const overlay = document.getElementById('overlay');
    const inactivityOverlay = document.getElementById('inactivity-overlay');
    const countdownElement = document.querySelector('#overlay .countdown');
    const inactivityCountdownElement = document.querySelector('#inactivity-overlay .countdown');
    let countdownTime = 30; // Countdown for breach of contract
    let inactivityCountdownTime = 10; // Countdown for inactivity warning
    let inactivityTime = 0;
    const inactivityLimit = 2 * 60 * 1000; // 2 minutes (120 seconds)
    let countdownInterval, inactivityCountdownInterval;

    const startCountdown = () => {
        countdownElement.textContent = `Down in ${countdownTime} seconds`;
        countdownElement.style.visibility = 'visible';
        countdownInterval = setInterval(() => {
            countdownTime--;
            countdownElement.textContent = `Out in ${countdownTime} seconds`;
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                activateOverlay();
            }
        }, 1000);
    };

    const startInactivityCountdown = () => {
        inactivityCountdownElement.textContent = `Overlay in ${inactivityCountdownTime} seconds`;
        inactivityCountdownElement.style.visibility = 'visible';
        inactivityCountdownInterval = setInterval(() => {
            inactivityCountdownTime--;
            inactivityCountdownElement.textContent = `Overlay in ${inactivityCountdownTime} seconds`;
            if (inactivityCountdownTime <= 0) {
                clearInterval(inactivityCountdownInterval);
                activateInactivityOverlay();
            }
        }, 1000);
    };

    const activateOverlay = () => {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        localStorage.setItem('overlayActive', 'true');
    };

    const fadeOutOverlay = () => {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.visibility = 'hidden';
                countdownElement.style.visibility = 'hidden';
            }, 5000);
        }, 5000); // Fade out after 5 seconds
    };

    const activateInactivityOverlay = () => {
        inactivityOverlay.style.visibility = 'visible';
        inactivityOverlay.style.opacity = '1';
    };

    const deactivateInactivityOverlay = () => {
        inactivityOverlay.style.opacity = '0';
        setTimeout(() => {
            inactivityOverlay.style.visibility = 'hidden';
        }, 500);
    };

    const checkOverlayStatus = () => {
        if (localStorage.getItem('overlayActive') === 'true') {
            activateOverlay();
        }
    };

    const resetInactivityTimer = () => {
        inactivityTime = 0;
        inactivityCountdownTime = 10; // Reset inactivity countdown
        if (inactivityOverlay.style.visibility === 'visible') {
            deactivateInactivityOverlay();
        }
    };

    setInterval(() => {
        inactivityTime += 1000; // Increment inactivity time by 1 second
        if (inactivityTime >= inactivityLimit) {
            activateOverlay();
        } else if (inactivityTime >= inactivityCountdownTime * 1000) {
            startInactivityCountdown();
        }
    }, 1000);

    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer);

    // Activate overlay 10 seconds after page load
    setTimeout(() => {
        activateOverlay();
        fadeOutOverlay();
    }, 10000); // 10 seconds

    // Initialize Particle.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 10,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Add floating site name text
    const siteName = document.createElement('div');
    siteName.id = 'floating-title';
    siteName.innerText = 'Breach Contract';
    siteName.style.position = 'absolute';
    siteName.style.top = '50%';
    siteName.style.left = '50%';
    siteName.style.transform = 'translate(-50%, -50%)';
    siteName.style.fontSize = '5em';
    siteName.style.color = 'white';
    document.body.appendChild(siteName);

    // Check overlay status on page load
    checkOverlayStatus();
});