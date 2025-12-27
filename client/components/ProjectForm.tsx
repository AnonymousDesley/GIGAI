"use client";

import { useState } from "react";
import axios from "axios";
import { SuggestRequest, SuggestResponse } from "@/types/api";

interface ProjectFormProps {
    onSuggest: (data: SuggestResponse) => void;
    setLoading: (loading: boolean) => void;
}

export default function ProjectForm({ onSuggest, setLoading }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        user_id: "",
        languages: "",
        frameworks: "",
        experience_level: "Intermediate",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload: SuggestRequest = {
                user_id: formData.user_id,
                languages: formData.languages.split(",").map((s) => s.trim()),
                frameworks: formData.frameworks.split(",").map((s) => s.trim()),
                experience_level: formData.experience_level,
            };

            const res = await axios.post("http://localhost:5000/api/github/suggest", payload);
            onSuggest(res.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-grey-900 bg-noise p-8 rounded-xl shadow-2xl space-y-6 border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Generate Ideas</h2>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">User ID</label>
                <input
                    type="text"
                    required
                    className="w-full bg-black-950 text-white p-3 rounded-lg border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                    placeholder="e.g., dev_master_99"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Languages (comma separated)</label>
                <input
                    type="text"
                    required
                    className="w-full bg-black-950 text-white p-3 rounded-lg border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                    placeholder="Javascript, Python..."
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Frameworks (comma separated)</label>
                <input
                    type="text"
                    required
                    className="w-full bg-black-950 text-white p-3 rounded-lg border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                    placeholder="React, Express, Django..."
                    value={formData.frameworks}
                    onChange={(e) => setFormData({ ...formData, frameworks: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Experience Level</label>
                <select
                    className="w-full bg-black-950 text-white p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none appearance-none"
                    value={formData.experience_level}
                    onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-wide mt-4"
            >
                Generate Projects
            </button>
        </form>
    );
}
