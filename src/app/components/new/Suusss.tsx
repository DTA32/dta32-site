"use client";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
// import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
// import options from "../../data/amongUs";

export default function Suusss() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("engine init:", engine);
    // await loadSlim(engine);
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log("container init:", container);
    },
    []
  );
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      url="/particles.json"
      height="100vh"
    />
  );
}
