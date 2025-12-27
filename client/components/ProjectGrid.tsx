import { ProjectIdea } from "@/types/api";

interface ProjectGridProps {
    ideas: ProjectIdea[];
}

export default function ProjectGrid({ ideas }: ProjectGridProps) {
    if (ideas.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-12">
            {ideas.map((idea, index) => (
                <div key={index} className="bg-grey-900 bg-noise p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded uppercase 
              ${idea.difficulty === 'Advanced' ? 'bg-red-900/50 text-red-200' :
                                idea.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-200' :
                                    'bg-green-900/50 text-green-200'}`}>
                            {idea.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{idea.estimated_time}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {idea.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                        {idea.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(idea.tech_stack)
                                ? idea.tech_stack.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-black-950 rounded text-xs text-gray-300 border border-white/5">
                                        {tech}
                                    </span>
                                ))
                                : <span className="text-sm text-gray-300">{idea.tech_stack}</span>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
