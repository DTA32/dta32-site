"use client";
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import Image from "next/image";
import { loadImageShape } from "@tsparticles/shape-image";
import { loadSlim } from "@tsparticles/slim";
import options from '@/app/data/amongUs';
import {loadEmittersPlugin} from "@tsparticles/plugin-emitters";
import {Container, Engine} from "@tsparticles/engine";

export default function Suusss() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
            await loadImageShape(engine);
            await loadEmittersPlugin(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container?: Container) => {
        return new Promise<void>((resolve) => {
            console.log(container);
            resolve();
        });
    };

    if (init) {
        return <Particles 
                    id="tsparticles" 
                    options={options}
                    particlesLoaded={particlesLoaded}
                    className={"h-screen"}
        />;
    }

    return (
        <Image
            width={1920}
            height={1080}
            src="https://static.dta32.my.id/personal/home_placeholder.webp"
            alt="animation placeholder"
            className="h-screen w-full bg-black"
        />
    );
};