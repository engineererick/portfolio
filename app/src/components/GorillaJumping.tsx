export default function GorillaJumping({ className = "" }: { className?: string }) {
    return (
        <svg
            width="100"
            height="120"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Head */}
            <ellipse cx="50" cy="30" rx="20" ry="22" fill="#4a4a4a" />

            {/* Sagittal crest (top of head) */}
            <ellipse cx="50" cy="14" rx="10" ry="8" fill="#3a3a3a" />

            {/* Ears */}
            <circle cx="32" cy="28" r="5" fill="#5a5a5a" />
            <circle cx="68" cy="28" r="5" fill="#5a5a5a" />

            {/* Face/muzzle area - lighter */}
            <ellipse cx="50" cy="36" rx="12" ry="10" fill="#8a8a8a" />

            {/* Eyes */}
            <ellipse cx="43" cy="28" rx="3" ry="4" fill="#2a2a2a" />
            <ellipse cx="57" cy="28" rx="3" ry="4" fill="#2a2a2a" />
            <circle cx="44" cy="27" r="1.5" fill="white" opacity="0.6" />
            <circle cx="58" cy="27" r="1.5" fill="white" opacity="0.6" />

            {/* Nose */}
            <ellipse cx="50" cy="38" rx="4" ry="3" fill="#2a2a2a" />
            <circle cx="48" cy="38" r="1" fill="#1a1a1a" />
            <circle cx="52" cy="38" r="1" fill="#1a1a1a" />

            {/* Body/torso */}
            <ellipse cx="50" cy="70" rx="24" ry="28" fill="#4a4a4a" />
            <ellipse cx="50" cy="68" rx="18" ry="22" fill="#5a5a5a" opacity="0.6" />

            {/* Arms */}
            <ellipse
                cx="28"
                cy="72"
                rx="10"
                ry="26"
                fill="#4a4a4a"
                transform="rotate(-20 28 72)"
            />
            <ellipse
                cx="72"
                cy="72"
                rx="10"
                ry="26"
                fill="#4a4a4a"
                transform="rotate(20 72 72)"
            />

            {/* Hands/fists */}
            <circle cx="22" cy="88" r="8" fill="#3a3a3a" />
            <circle cx="78" cy="88" r="8" fill="#3a3a3a" />

            {/* Legs */}
            <ellipse
                cx="38"
                cy="100"
                rx="9"
                ry="18"
                fill="#4a4a4a"
            />
            <ellipse
                cx="62"
                cy="100"
                rx="9"
                ry="18"
                fill="#4a4a4a"
            />

            {/* Feet */}
            <ellipse cx="38" cy="112" rx="10" ry="6" fill="#3a3a3a" />
            <ellipse cx="62" cy="112" rx="10" ry="6" fill="#3a3a3a" />

            {/* Accent highlights on body */}
            <ellipse cx="45" cy="24" rx="2" ry="3" fill="white" opacity="0.15" />
            <ellipse cx="55" cy="24" rx="2" ry="3" fill="white" opacity="0.15" />
        </svg>
    );
}
