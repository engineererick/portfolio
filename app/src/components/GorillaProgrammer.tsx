"use client";

import { useTheme } from "./ThemeProvider";

export default function GorillaProgrammer({ className = "" }: { className?: string }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background circle - subtle */}
            <circle cx="200" cy="200" r="180" fill={isDark ? "#2a2a2a" : "#e5e5e5"} opacity="0.3" />

            {/* Headphones wire */}
            <path
                d="M 280 140 Q 290 160 290 200"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.9"
            />

            {/* Body - Blue t-shirt */}
            <ellipse cx="200" cy="280" rx="85" ry="90" fill="#3b5998" />
            <ellipse cx="200" cy="270" rx="75" ry="80" fill="#4267B2" />

            {/* Neck */}
            <rect x="180" y="200" width="40" height="35" fill="#6b5b4f" rx="8" />

            {/* Arms */}
            <ellipse
                cx="120"
                cy="290"
                rx="25"
                ry="60"
                fill="#4267B2"
                transform="rotate(-15 120 290)"
            />
            <ellipse
                cx="280"
                cy="290"
                rx="25"
                ry="60"
                fill="#4267B2"
                transform="rotate(15 280 290)"
            />

            {/* Hands */}
            <ellipse cx="110" cy="340" rx="18" ry="20" fill="#6b5b4f" />
            <ellipse cx="290" cy="340" rx="18" ry="20" fill="#6b5b4f" />

            {/* Laptop */}
            <rect x="140" y="330" width="120" height="8" fill="#2a2a2a" rx="2" />
            <rect x="145" y="305" width="110" height="25" fill="#1a1a1a" rx="2" />

            {/* Laptop screen with code */}
            <rect x="148" y="308" width="104" height="19" fill="#0d1117" />
            <text x="155" y="318" fill="#06b6d4" fontSize="8" fontFamily="monospace">&lt;/&gt;</text>
            <line x1="175" y1="314" x2="190" y2="314" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="175" y1="318" x2="195" y2="318" stroke="#22c55e" strokeWidth="1" />
            <line x1="175" y1="322" x2="185" y2="322" stroke="#f59e0b" strokeWidth="1" />

            {/* Head */}
            <ellipse cx="200" cy="140" rx="65" ry="70" fill="#4a4a4a" />

            {/* Ears */}
            <ellipse cx="140" cy="130" rx="18" ry="20" fill="#5a5a5a" />
            <ellipse cx="260" cy="130" rx="18" ry="20" fill="#5a5a5a" />
            <ellipse cx="140" cy="132" rx="12" ry="14" fill="#6b5b4f" />
            <ellipse cx="260" cy="132" rx="12" ry="14" fill="#6b5b4f" />

            {/* Headphones */}
            <ellipse cx="140" cy="135" rx="22" ry="25" fill="white" opacity="0.95" />
            <ellipse cx="260" cy="135" rx="22" ry="25" fill="white" opacity="0.95" />
            <ellipse cx="140" cy="135" rx="16" ry="19" fill="#f0f0f0" />
            <ellipse cx="260" cy="135" rx="16" ry="19" fill="#f0f0f0" />

            {/* Headphone band */}
            <path
                d="M 145 110 Q 200 85 255 110"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                opacity="0.95"
            />
            <path
                d="M 145 110 Q 200 88 255 110"
                stroke="#e0e0e0"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
            />

            {/* Face/muzzle */}
            <ellipse cx="200" cy="155" rx="40" ry="35" fill="#6b5b4f" />

            {/* Glasses frame */}
            <ellipse
                cx="175"
                cy="140"
                rx="20"
                ry="18"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="3"
            />
            <ellipse
                cx="225"
                cy="140"
                rx="20"
                ry="18"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="3"
            />

            {/* Glasses bridge */}
            <line x1="195" y1="140" x2="205" y2="140" stroke="#2a2a2a" strokeWidth="3" />

            {/* Glasses lenses - change based on theme */}
            <ellipse
                cx="175"
                cy="140"
                rx="18"
                ry="16"
                fill={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.5)"}
            />
            <ellipse
                cx="225"
                cy="140"
                rx="18"
                ry="16"
                fill={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.5)"}
            />

            {/* Lens reflection */}
            {isDark && (
                <>
                    <ellipse cx="170" cy="135" rx="6" ry="8" fill="white" opacity="0.4" />
                    <ellipse cx="220" cy="135" rx="6" ry="8" fill="white" opacity="0.4" />
                </>
            )}

            {/* Eyes behind glasses */}
            <ellipse cx="175" cy="140" rx="5" ry="6" fill="#2a2a2a" opacity="0.8" />
            <ellipse cx="225" cy="140" rx="5" ry="6" fill="#2a2a2a" opacity="0.8" />

            {/* Nose */}
            <ellipse cx="200" cy="158" rx="8" ry="6" fill="#5a4a3f" />
            <circle cx="197" cy="158" r="2" fill="#3a3a3a" />
            <circle cx="203" cy="158" r="2" fill="#3a3a3a" />

            {/* Mouth - slight smile */}
            <path
                d="M 185 168 Q 200 173 215 168"
                stroke="#3a3a3a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Sagittal crest */}
            <ellipse cx="200" cy="80" rx="30" ry="20" fill="#3a3a3a" />

            {/* Highlights on head */}
            <ellipse cx="180" cy="120" rx="8" ry="12" fill="white" opacity="0.1" />
            <ellipse cx="220" cy="120" rx="8" ry="12" fill="white" opacity="0.1" />
        </svg>
    );
}
