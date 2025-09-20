import type {ISourceOptions} from "@tsparticles/engine";

const options: ISourceOptions = {
    fullScreen: {
        enable: false,
        zIndex: 0,
    },
    background: {
        color: {
            value: "#0d1117",
        },
    },
    fpsLimit: 60,
    particles: {
        color: {value: '#ffffff'},
        move: {
            direction: 'right',
            enable: true,
            outModes: {default: 'out'},
            warp: true,
            random: false,
            speed: 2,
            straight: true,
        },
        number: {
            value: 150
        },
        opacity: {value: 0.5},
        shape: {type: 'circle'},
        size: {value: {min: 1, max: 4}},
    },
    emitters: {
        // autoPlay: true,
        // fill: true,
        // life: {
        //     wait: false,
        // },
        rate: {
            quantity: 1,
            delay: 10,
        },
        // shape: {
        //     options: {},
        //     replace: {
        //         color: false,
        //         opacity: false,
        //     },
        //     type: "square",
        // },
        // startCount: 0,
        // size: {
        //     mode: "percent",
        //     height: 0,
        //     width: 0,
        // },
        particles: {
            shape: {
                type: "images",
                options: {
                    images: [
                        {
                            src: "https://particles.js.org/images/cyan_amongus.png",
                            width: 500,
                            height: 634,
                        },
                        {
                            src: "https://particles.js.org/images/amongus_lime.png",
                            width: 500,
                            height: 634,
                        },
                        {
                            src: "https://particles.js.org/images/amongus_orange.png",
                            width: 500,
                            height: 634,
                        },
                        {
                            src: "https://particles.js.org/images/amongus_red.png",
                            width: 500,
                            height: 634,
                        },
                        {
                            src: "https://particles.js.org/images/amongus_white.png",
                            width: 500,
                            height: 634,
                        },
                    ],
                },
            },
            size: {
                value: 50,
            },
            move: {
                speed: 7,
                direction: "right",
                outModes: {
                    default: "none",
                    right: "destroy",
                },
                straight: true,
            },
            // zIndex: {
            //     value: 0,
            // },
            rotate: {
                value: {
                    min: 0,
                    max: 360,
                },
                animation: {
                    enable: true,
                    speed: 10,
                    sync: true,
                },
            },
        },
        position: {
            x: -5,
            y: 50,
        },
    },
    // motion: {
    //     disable: false,
    //     reduce: {
    //         factor: 4,
    //         value: true,
    //     },
    // },
};

export default options;
