'use client';
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const Feature = ({ title, description, Icon }: { title: string; description: string; Icon: React.ComponentType }) => {
    const offsetX = useMotionValue(-100);
    const offsetY = useMotionValue(-100);
    const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;
    const border = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (!border.current) return; 
            const borderRect = border.current.getBoundingClientRect();
            offsetX.set(e.x - borderRect.x);
            offsetY.set(e.y - borderRect.y);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, [offsetX, offsetY]);

    return (
        <div className="border border-[#191970] px-5 py-10 text-center rounded-xl sm:flex-1 relative">
            <motion.div 
                className="absolute inset-0 border-4 border-[#0000FF] rounded-xl" 
                style={{ WebkitMaskImage: maskImage, maskImage }}
                ref={border}
            />
            <div className="inline-flex h-14 w-14 text-blue-950 justify-center items-center rounded-lg">
                <Icon />
            </div>
            <h3 className="text-[#191970] font-bold">{title}</h3>
            <p className="mt-2 text-[#010D3E]">{description}</p>
        </div>
    );
};
