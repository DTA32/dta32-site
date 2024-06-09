"use client";
import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import Image from "next/image";
import options from "@/app/data/amongUs";

export default function Suusss() {
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => setInit(true));
    }, []);
    const particlesLoaded = (container?: Container) => {
        return new Promise<void>((resolve) => {
            console.log(container);
            resolve();
        });
    };
    const configs = useMemo(() => options, []);
    if (init) {
        return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={configs} className="h-screen" />;
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
}
