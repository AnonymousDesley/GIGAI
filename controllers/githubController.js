const github = require('../lib/github');
const gemini = require('../lib/gemini');
const supabase = require('../config/supabase');

const suggestIdeas = async (req, res) => {
    try {
        const { user_id, languages, frameworks, experience_level, interests } = req.body;

        if (!user_id || !languages || !frameworks || !experience_level) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 1. Save user skills to Supabase
        const { error: skillError } = await supabase
            .from('user_skills')
            .upsert({ user_id, languages, frameworks, experience_level, interests }, { onConflict: 'user_id' });

        if (skillError) console.error('Error saving skills:', skillError);

        // 2. Fetch GitHub trends
        const trends = await github.getTrendingTopics({ languages, frameworks, interests });

        // 3. Generate ideas using Gemini
        const ideas = await gemini.generateProjectIdeas({ languages, frameworks, experience_level, interests }, trends);

        if (!ideas) {
            return res.status(500).json({ error: 'Failed to generate ideas' });
        }

        // 4. Store ideas in Supabase
        const projectEntries = ideas.map(idea => ({
            user_id,
            idea: JSON.stringify(idea),
            difficulty: idea.difficulty || 'Medium',
            ai_generated: true
        }));

        const { error: projectError } = await supabase
            .from('project_ideas')
            .insert(projectEntries);

        if (projectError) console.error('Error saving projects:', projectError);

        res.json({ success: true, ideas });
    } catch (error) {
        console.error('Suggest error:', error);
        res.status(500).json({ error: error.message });
    }
};

const explainRepo = async (req, res) => {
    try {
        const { url } = req.body;

        let owner, repo;
        if (url) {
            const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
            if (match) {
                owner = match[1];
                repo = match[2].replace('.git', '');
            }
        }

        if (!owner || !repo) {
            if (req.body.owner && req.body.repo) {
                owner = req.body.owner;
                repo = req.body.repo;
            } else {
                return res.status(400).json({ error: 'Invalid GitHub URL or missing owner/repo' });
            }
        }

        const { repo: repoDetails, readme } = await github.getRepoDetails(owner, repo);
        const explanation = await gemini.explainArchitecture(repoDetails, readme, req.body.user_context);

        res.json({ success: true, explanation });
    } catch (error) {
        console.error('Explain error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getRoadmap = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const roadmap = await gemini.generateRoadmap(topic);

        res.json({ success: true, roadmap });
    } catch (error) {
        console.error('Roadmap error:', error);
        res.status(500).json({ error: error.message });
    }
};

const findContributions = async (req, res) => {
    try {
        const { languages } = req.body;

        if (!languages || !Array.isArray(languages)) {
            return res.status(400).json({ error: 'Languages array is required' });
        }

        const issues = await github.findGoodFirstIssues({ languages });
        res.json({ success: true, issues });
    } catch (error) {
        console.error('Contributions error:', error);
        res.status(500).json({ error: error.message });
    }
}

const elaborateProject = async (req, res) => {
    try {
        const { title, description, tech_stack } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description required' });
        }

        const spec = await gemini.generateProjectSpec(title, description, tech_stack);
        res.json({ success: true, spec });
    } catch (error) {
        console.error('Elaborate error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    suggestIdeas,
    explainRepo,
    getRoadmap,
    findContributions,
    elaborateProject
};
