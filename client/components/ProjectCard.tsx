"use client";

import { motion } from "framer-motion";
import { ProjectIdea } from "@/types/api";
import Typewriter from "./Typewriter";

export default function ProjectCard({ idea, index }: { idea: ProjectIdea; index: number }) {
    const diffColor =
        idea.difficulty === 'Advanced' ? 'text-red-400 bg-red-400/10' :
            idea.difficulty === 'Intermediate' ? 'text-yellow-400 bg-yellow-400/10' :
                'text-emerald-400 bg-emerald-400/10';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-border p-6 rounded-lg hover:border-primary/50 transition-colors group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/10 transition-colors" />

            <div className="flex justify-between items-start mb-4 relative">
                <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded ${diffColor} border border-current border-opacity-20`}>
                    {idea.difficulty}
                </span>
                <span className="text-[10px] font-mono text-text-muted">{idea.estimated_time}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                <Typewriter text={idea.title} speed={10} delay={index * 0.2} />
            </h3>

            <p className="text-sm text-text-muted leading-relaxed mb-6 h-20 overflow-y-auto pr-2 scrollbar-thin">
                {idea.description}
            </p>

            {/* Tech Stack Rendering Fixed for Objects */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50 relative">
                {(Array.isArray(idea.tech_stack)
                    ? idea.tech_stack
                    : typeof idea.tech_stack === 'object' && idea.tech_stack !== null
                        ? Object.values(idea.tech_stack).flat()
                        : [idea.tech_stack]
                ).map((tech, i) => (
                    <span key={i} className="text-[10px] bg-black border border-border px-2 py-1 rounded text-text-muted font-mono">
                        {String(tech)}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
