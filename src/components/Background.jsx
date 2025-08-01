// dynamicBackgroundEffects.js
import React, { useState, useEffect, useRef } from "react";

const COLORS = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-600",
    "bg-red-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-violet-600",
    "bg-emerald-500",
];

const generateRandomOrb = (id) => {
    return {
        id,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 200 + 100, // 100-300px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        dx: (Math.random() - 0.5) * 0.3, // velocity X
        dy: (Math.random() - 0.5) * 0.3, // velocity Y
        opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2
        blur: Math.random() * 20 + 20, // 20-40px blur
        pulseSpeed: Math.random() * 2 + 1, // 1-3 seconds
        pulseIntensity: Math.random() * 0.5 + 0.5, // 0.5-1
        glowIntensity: Math.random() * 30 + 10, // 10-40px glow
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1,
    };
};

const DynamicBackgroundEffects = ({
    count = 6,
    className = "",
    respawnInterval = 15000, // ms before orbs respawn
}) => {
    const [orbs, setOrbs] = useState([]);
    const animationFrameRef = useRef();

    // Initialize orbs
    useEffect(() => {
        const initialOrbs = Array.from({ length: count }, (_, i) =>
            generateRandomOrb(i),
        );
        setOrbs(initialOrbs);
    }, [count]);

    // Smooth animation using requestAnimationFrame
    useEffect(() => {
        let lastTime = 0;

        const animate = (currentTime) => {
            if (currentTime - lastTime >= 16) {
                // ~60fps
                setOrbs((prevOrbs) =>
                    prevOrbs.map((orb) => {
                        let newX = orb.x + orb.dx;
                        let newY = orb.y + orb.dy;
                        let newDx = orb.dx;
                        let newDy = orb.dy;

                        // Smooth bouncing off edges with some randomness
                        if (newX <= -2 || newX >= 102) {
                            newDx = -orb.dx + (Math.random() - 0.5) * 0.1;
                            newX = Math.max(-2, Math.min(102, newX));
                        }
                        if (newY <= -2 || newY >= 102) {
                            newDy = -orb.dy + (Math.random() - 0.5) * 0.1;
                            newY = Math.max(-2, Math.min(102, newY));
                        }

                        // Add subtle random direction changes
                        if (Math.random() < 0.003) {
                            newDx += (Math.random() - 0.5) * 0.05;
                            newDy += (Math.random() - 0.5) * 0.05;

                            // Limit max speed
                            const speed = Math.sqrt(
                                newDx * newDx + newDy * newDy,
                            );
                            if (speed > 0.4) {
                                newDx = (newDx / speed) * 0.4;
                                newDy = (newDy / speed) * 0.4;
                            }
                        }

                        return {
                            ...orb,
                            x: newX,
                            y: newY,
                            dx: newDx,
                            dy: newDy,
                            rotation: orb.rotation + orb.rotationSpeed,
                        };
                    }),
                );
                lastTime = currentTime;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Respawn orbs periodically for variety
    useEffect(() => {
        const respawnInterval_id = setInterval(() => {
            setOrbs((prevOrbs) => {
                const newOrbs = [...prevOrbs];
                const randomIndex = Math.floor(Math.random() * newOrbs.length);
                newOrbs[randomIndex] = generateRandomOrb(randomIndex);
                return newOrbs;
            });
        }, respawnInterval);

        return () => clearInterval(respawnInterval_id);
    }, [respawnInterval]);

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        >
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    className={`absolute ${orb.color} rounded-full transition-none`}
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        opacity: orb.opacity,
                        filter: `blur(${orb.blur}px)`,
                        boxShadow: `0 0 ${orb.glowIntensity}px currentColor`,
                        animation: `pulse-glow-${orb.id} ${orb.pulseSpeed}s ease-in-out infinite alternate`,
                        transform: `translate(-50%, -50%) rotate(${orb.rotation}deg)`,
                    }}
                />
            ))}

            {/* Generate dynamic keyframes for each orb */}
            <style jsx>{`
                ${orbs
                    .map(
                        (orb) => `
          @keyframes pulse-glow-${orb.id} {
            0% {
              transform: translate(-50%, -50%) rotate(${orb.rotation}deg) scale(${orb.pulseIntensity});
              opacity: ${orb.opacity};
            }
            100% {
              transform: translate(-50%, -50%) rotate(${orb.rotation}deg) scale(${orb.pulseIntensity + 0.3});
              opacity: ${orb.opacity * 1.5};
            }
          }
        `,
                    )
                    .join("")}
            `}</style>
        </div>
    );
};

// Simpler version without style jsx (more compatible)
const DynamicBackgroundEffectsSimple = ({
    count = 6,
    className = "",
    respawnInterval = 15000,
}) => {
    const [orbs, setOrbs] = useState([]);
    const animationFrameRef = useRef();

    useEffect(() => {
        const initialOrbs = Array.from({ length: count }, (_, i) =>
            generateRandomOrb(i),
        );
        setOrbs(initialOrbs);
    }, [count]);

    useEffect(() => {
        let lastTime = 0;

        const animate = (currentTime) => {
            if (currentTime - lastTime >= 16) {
                // ~60fps
                setOrbs((prevOrbs) =>
                    prevOrbs.map((orb) => {
                        let newX = orb.x + orb.dx;
                        let newY = orb.y + orb.dy;
                        let newDx = orb.dx;
                        let newDy = orb.dy;

                        // Smooth bouncing off edges
                        if (newX <= -2 || newX >= 102) {
                            newDx = -orb.dx + (Math.random() - 0.5) * 0.1;
                            newX = Math.max(-2, Math.min(102, newX));
                        }
                        if (newY <= -2 || newY >= 102) {
                            newDy = -orb.dy + (Math.random() - 0.5) * 0.1;
                            newY = Math.max(-2, Math.min(102, newY));
                        }

                        // Subtle random direction changes
                        if (Math.random() < 0.003) {
                            newDx += (Math.random() - 0.5) * 0.05;
                            newDy += (Math.random() - 0.5) * 0.05;

                            const speed = Math.sqrt(
                                newDx * newDx + newDy * newDy,
                            );
                            if (speed > 0.4) {
                                newDx = (newDx / speed) * 0.4;
                                newDy = (newDy / speed) * 0.4;
                            }
                        }

                        return {
                            ...orb,
                            x: newX,
                            y: newY,
                            dx: newDx,
                            dy: newDy,
                            rotation: orb.rotation + orb.rotationSpeed,
                        };
                    }),
                );
                lastTime = currentTime;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const respawnInterval_id = setInterval(() => {
            setOrbs((prevOrbs) => {
                const newOrbs = [...prevOrbs];
                const randomIndex = Math.floor(Math.random() * newOrbs.length);
                newOrbs[randomIndex] = generateRandomOrb(randomIndex);
                return newOrbs;
            });
        }, respawnInterval);

        return () => clearInterval(respawnInterval_id);
    }, [respawnInterval]);

    return (
        <>
            {/* CSS for animations */}
            <style>{`
        .pulse-glow {
          animation: pulse-base 2s ease-in-out infinite alternate;
        }

        @keyframes pulse-base {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .glow-effect {
          filter: drop-shadow(0 0 20px currentColor);
        }
      `}</style>

            <div
                className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            >
                {orbs.map((orb) => (
                    <div
                        key={orb.id}
                        className={`absolute ${orb.color} rounded-full pulse-glow glow-effect transition-none`}
                        style={{
                            left: `${orb.x}%`,
                            top: `${orb.y}%`,
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            opacity: orb.opacity,
                            filter: `blur(${orb.blur}px) drop-shadow(0 0 ${orb.glowIntensity}px currentColor)`,
                            animationDuration: `${orb.pulseSpeed}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            transform: `translate(-50%, -50%) rotate(${orb.rotation}deg)`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

// Export both versions
export { DynamicBackgroundEffects, DynamicBackgroundEffectsSimple };
export default DynamicBackgroundEffectsSimple;
