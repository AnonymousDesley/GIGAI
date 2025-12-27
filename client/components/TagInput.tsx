"use client";

import { X, Check } from "lucide-react";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TagInputProps {
    label: string;
    placeholder?: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    suggestions?: string[];
}

export default function TagInput({ label, placeholder, tags, onChange, suggestions = [] }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    };

    const addTag = (tag: string) => {
        const newTag = tag.trim();
        if (newTag && !tags.includes(newTag)) {
            onChange([...tags, newTag]);
            setInputValue("");
            setShowSuggestions(false);
        }
    };

    const removeTag = (indexToRemove: number) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-1 relative" ref={wrapperRef}>
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
                {label}
            </label>
            <div className="flex flex-wrap gap-2 min-h-[38px] border-b border-border focus-within:border-primary transition-colors py-1">
                {tags.map((tag, index) => (
                    <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        key={index}
                        className="flex items-center gap-1 bg-[#1A1A1A] text-white px-2 py-0.5 rounded textxs font-mono border border-[#333]"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(index)}
                            className="hover:text-red-400 transition-colors"
                        >
                            <X size={10} />
                        </button>
                    </motion.span>
                ))}
                <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-sm min-w-[60px] text-white placeholder:text-text-muted/20 font-mono"
                    placeholder={tags.length === 0 ? placeholder : ""}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 w-full bg-[#0A0A0A] border border-[#333] rounded-md shadow-xl mt-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800"
                    >
                        {filteredSuggestions.map(suggestion => (
                            <button
                                key={suggestion}
                                onClick={() => addTag(suggestion)}
                                className="w-full text-left px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white hover:bg-[#151515] flex items-center justify-between group"
                            >
                                {suggestion}
                                <span className="opacity-0 group-hover:opacity-100 text-primary">
                                    <Check size={12} />
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
