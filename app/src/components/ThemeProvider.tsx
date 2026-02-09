"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage or system preference
        const stored = localStorage.getItem("theme") as Theme | null;
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

        const initialTheme = stored || systemPreference;
        setTheme(initialTheme);

        // Apply theme class to document
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (!mounted) return; // Prevent toggle before mount

        const newTheme = theme === "light" ? "dark" : "light";
        const el = document.documentElement;

        // Add brightness animation class
        el.classList.add(newTheme === "dark" ? "theme-to-dark" : "theme-to-light");

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        // Update document class
        if (newTheme === "dark") {
            el.classList.add("dark");
        } else {
            el.classList.remove("dark");
        }

        // Clean up animation classes after transition ends
        setTimeout(() => {
            el.classList.remove("theme-to-dark", "theme-to-light");
        }, 550);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
