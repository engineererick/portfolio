"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const JUMP_FRAMES = [
    "/images/secuencia_salto/gorila_salto_1.svg",
    "/images/secuencia_salto/gorila_salto_2.svg",
    "/images/secuencia_salto/gorila_salto_3.svg",
    "/images/secuencia_salto/gorila_salto_4.svg",
    "/images/secuencia_salto/gorila_salto_5.svg",
];

interface GorillaJumpingAnimatedProps {
    className?: string;
    frameDelay?: number; // milliseconds between frames
}

export default function GorillaJumpingAnimated({
    className = "",
    frameDelay = 150
}: GorillaJumpingAnimatedProps) {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % JUMP_FRAMES.length);
        }, frameDelay);

        return () => clearInterval(interval);
    }, [frameDelay]);

    return (
        <div className={`relative aspect-[5/6] ${className}`}>
            <Image
                src={JUMP_FRAMES[currentFrame]}
                alt="Jumping gorilla"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}
