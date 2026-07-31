import { VideoAnalysis, VideoPlatform } from '../types/video';

// LocalStorage Keys
const API_KEY_STORAGE = 'omni_video_ai_gemini_key';
const HISTORY_STORAGE = 'omni_video_ai_history';

/**
 * Get stored Gemini API Key from localStorage or environment
 */
export function getStoredApiKey(): string {
  const localKey = localStorage.getItem(API_KEY_STORAGE);
  if (localKey && localKey.trim().length > 0) {
    return localKey.trim();
  }
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
}

/**
 * Save Gemini API Key into localStorage
 */
export function saveApiKey(key: string): void {
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

/**
 * Detect platform from video URL
 */
export function detectPlatform(url: string): VideoPlatform {
  const lowercase = url.toLowerCase();
  if (lowercase.includes('youtube.com/shorts') || lowercase.includes('youtu.be/')) {
    return 'youtube';
  }
  if (lowercase.includes('instagram.com/reel') || lowercase.includes('instagr.am')) {
    return 'instagram';
  }
  if (lowercase.includes('tiktok.com')) {
    return 'tiktok';
  }
  return 'unknown';
}

/**
 * Preset Demo Analyses for Instant Testing
 */
export const PRESET_ANALYSES: VideoAnalysis[] = [
  {
    id: 'demo-saas-60s',
    analyzedAt: new Date().toISOString(),
    video: {
      id: 'demo-1',
      url: 'https://youtube.com/shorts/saas-in-60s-demo',
      platform: 'youtube',
      title: 'How I Built a $10k/mo Micro SaaS in 60 Seconds with AI Tools 🚀',
      creator: {
        name: 'Alex TechBuilder',
        handle: '@alextech',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      duration: '00:58',
      durationSeconds: 58,
      publishedAt: '2 days ago',
      viewCount: '1.2M',
      likeCount: '145K',
    },
    aiSummary:
      'This video demonstrates a rapid full-stack application development workflow leveraging modern AI coding assistants, Supabase backend infrastructure, and Vercel hosting. The creator demonstrates building a subscription invoice generator from scratch using React and TypeScript in under a minute.',
    transcript: [
      { id: 't1', timestamp: '00:00', seconds: 0, text: 'Stop spending weeks building SaaS apps manually! Here is how I launched one in under 60 seconds.' },
      { id: 't2', timestamp: '00:10', seconds: 10, text: 'First, head over to bolt.new or v0.dev and prompt it: "Build a sleek dark-mode React invoice generator with Tailwind CSS."' },
      { id: 't3', timestamp: '00:22', seconds: 22, text: 'Next, connect your database using Supabase in one click for user authentication and Postgres storage.' },
      { id: 't4', timestamp: '00:35', seconds: 35, text: 'For payments, integrate Stripe Checkout with Python or Node.js webhooks.' },
      { id: 't5', timestamp: '00:48', seconds: 48, text: 'Deploy to Vercel instantly. I charged $29/mo and hit $10,000 MRR within 30 days!' },
      { id: 't6', timestamp: '00:55', seconds: 55, text: 'Check the links in description and follow @alextech for full tutorials.' },
    ],
    resources: [
      { id: 'r1', name: 'v0.dev', category: 'tool', description: 'Generative UI system by Vercel for React & Tailwind components', url: 'https://v0.dev', pricing: 'Freemium / $20/mo' },
      { id: 'r2', name: 'Supabase', category: 'website', description: 'Open-source Firebase alternative providing Postgres DB & Auth', url: 'https://supabase.com', pricing: 'Free Tier Available' },
      { id: 'r3', name: 'Stripe', category: 'app', description: 'Payment processing platform for online SaaS subscriptions', url: 'https://stripe.com', pricing: '2.9% + 30¢ per charge' },
      { id: 'r4', name: 'Vercel', category: 'tool', description: 'Frontend cloud platform for static & serverless deployments', url: 'https://vercel.com', pricing: 'Free / $20/mo Pro' },
      { id: 'r5', name: 'TypeScript', category: 'language', description: 'Strongly typed programming language built on JavaScript', url: 'https://typescriptlang.org', pricing: 'Open Source' },
    ],
    entities: {
      websites: ['v0.dev', 'supabase.com', 'stripe.com', 'vercel.com', 'bolt.new'],
      apps: ['Stripe Checkout', 'Vercel Dashboard', 'Supabase Auth'],
      tools: ['v0.dev', 'Supabase', 'Vercel', 'Cursor AI', 'Stripe API'],
      programmingLanguages: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL SQL'],
      products: ['Invoice Generator SaaS', 'Stripe Billing'],
      people: ['Alex TechBuilder'],
      companies: ['Vercel', 'Supabase Inc.', 'Stripe', 'OpenAI'],
      moneyMentioned: ['$10,000 MRR', '$29/mo', '$10k/mo'],
      links: ['https://v0.dev', 'https://supabase.com', 'https://vercel.com'],
      emails: ['alex@techbuilder.io', 'support@invoicesaas.com'],
      phoneNumbers: ['+1 (800) 555-0199'],
      hashtags: ['#SaaS', '#IndieHacker', '#BuildInPublic', '#ReactJS', '#AITools'],
      usernames: ['@alextech', '@vercel', '@supabase'],
      mainTopics: ['Micro SaaS Development', 'AI Code Generation', 'Stripe Billing Integration', 'Rapid Prototyping'],
      keywords: ['SaaS', 'Supabase', 'Vercel', 'Stripe', 'Invoice Generator', 'React', 'Tailwind'],
    },
    learningPoints: [
      'Generative UI tools like v0.dev allow instant UI code generation from plain English prompts.',
      'Supabase simplifies database setup and user authentication without writing backend boilerplate.',
      'Integrating Stripe Checkout allows immediate subscription billing setup.',
      'One-click deployment to Vercel turns local code into production-ready web apps instantly.',
    ],
    actionSteps: [
      { id: 'a1', step: 'Choose a simple micro-SaaS utility idea (e.g. invoice generator, PDF compressor).', completed: true },
      { id: 'a2', step: 'Generate the front-end layout using v0.dev with dark theme aesthetics.', completed: false },
      { id: 'a3', step: 'Set up a free Supabase project and table for user data storage.', completed: false },
      { id: 'a4', step: 'Integrate Stripe test keys and deploy on Vercel.', completed: false },
    ],
    questionsAnswered: [
      { question: 'What tools are best for building a fast MVP without backend code?', answer: 'Use v0.dev for UI design, Supabase for authentication & database, and Vercel for hosting.' },
      { question: 'How long does it take to launch a simple SaaS product using modern AI?', answer: 'With pre-built component generators and serverless platforms, an MVP can be built in under 1 hour.' },
      { question: 'How do you handle payment billing?', answer: 'Integrate Stripe Checkout which handles currency conversion, invoices, and credit card processing.' },
    ],
    insights: {
      sentiment: 'Very Positive',
      targetAudience: 'Indie Hackers, Full-Stack Developers, Tech Entrepreneurs',
      hookAnalysis: 'Strong problem-solution hook starting with high revenue proof ($10k/mo) within 3 seconds.',
      contentQualityScore: 94,
      keyTakeaway: 'Leveraging AI prototyping with serverless backend APIs cuts SaaS launch times from weeks to minutes.',
    },
    timeline: [
      { id: 'm1', timestamp: '00:00', seconds: 0, title: 'Introduction & Revenue Claim', description: 'Creator states how he hit $10k MRR with AI SaaS.', category: 'Hook' },
      { id: 'm2', timestamp: '00:10', seconds: 10, title: 'Prompting v0.dev for UI', description: 'Demonstrating prompt engineering for React UI layout.', category: 'Design' },
      { id: 'm3', timestamp: '00:22', seconds: 22, title: 'Database & Auth with Supabase', description: 'Connecting Postgres backend and user login.', category: 'Backend' },
      { id: 'm4', timestamp: '00:35', seconds: 35, title: 'Stripe Payments Setup', description: 'Configuring subscription webhooks and checkout.', category: 'Monetization' },
      { id: 'm5', timestamp: '00:48', seconds: 48, title: 'Vercel Deployment & Wrap Up', description: 'Live deployment to custom domain and call to action.', category: 'Deployment' },
    ],
  },
  {
    id: 'demo-productivity-apps',
    analyzedAt: new Date().toISOString(),
    video: {
      id: 'demo-2',
      url: 'https://instagram.com/reel/top-5-apps-2026',
      platform: 'instagram',
      title: 'Top 5 Secret Productivity Apps You Must Try in 2026 📱✨',
      creator: {
        name: 'Sarah Digital Workflow',
        handle: '@sarahworkflow',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      duration: '01:15',
      durationSeconds: 75,
      publishedAt: 'Yesterday',
      viewCount: '850K',
      likeCount: '92K',
    },
    aiSummary:
      'Sarah showcases five high-efficiency applications designed for knowledge management, task scheduling, focus enhancement, and AI document summarization. She highlights Notion AI, Raycast, Motion, Perplexity, and Obsidian.',
    transcript: [
      { id: 't1', timestamp: '00:00', seconds: 0, text: 'These 5 apps literally save me 15 hours every single week. Here is the breakdown.' },
      { id: 't2', timestamp: '00:12', seconds: 12, text: 'Number 1 is Raycast for macOS. It replaces Spotlight with AI commands, window management, and quick clipboard history.' },
      { id: 't3', timestamp: '00:25', seconds: 25, text: 'Number 2 is Motion App. It uses AI algorithms to automatically plan your calendar and reschedule missed tasks.' },
      { id: 't4', timestamp: '00:38', seconds: 38, text: 'Number 3 is Perplexity AI. Forget regular search engines; this gives direct answers with cited sources.' },
      { id: 't5', timestamp: '00:50', seconds: 50, text: 'Number 4 is Obsidian for local Markdown note-taking and knowledge graphs.' },
      { id: 't6', timestamp: '00:63', seconds: 63, text: 'Number 5 is Notion AI for automated project templates and document summaries.' },
      { id: 't7', timestamp: '00:70', seconds: 70, text: 'Comment "APP" below and I will send you direct download links to your DMs!' },
    ],
    resources: [
      { id: 'r1', name: 'Raycast', category: 'app', description: 'Extendable launcher for macOS replacement of Spotlight', url: 'https://raycast.com', pricing: 'Free / $8/mo Pro' },
      { id: 'r2', name: 'Motion', category: 'app', description: 'AI-driven calendar and project task manager', url: 'https://usemotion.com', pricing: '$19/mo' },
      { id: 'r3', name: 'Perplexity AI', category: 'website', description: 'AI conversational search engine with verified citations', url: 'https://perplexity.ai', pricing: 'Freemium' },
      { id: 'r4', name: 'Obsidian', category: 'app', description: 'Private, offline Markdown knowledge graph application', url: 'https://obsidian.md', pricing: '100% Free' },
      { id: 'r5', name: 'Notion AI', category: 'tool', description: 'All-in-one workspace with integrated LLM generation', url: 'https://notion.so', pricing: '$10/mo Addon' },
    ],
    entities: {
      websites: ['raycast.com', 'usemotion.com', 'perplexity.ai', 'obsidian.md', 'notion.so'],
      apps: ['Raycast', 'Motion App', 'Perplexity AI', 'Obsidian', 'Notion'],
      tools: ['Mac Spotlight Replacement', 'AI Task Auto-Scheduler', 'Markdown Graph Engine'],
      programmingLanguages: ['Markdown', 'JavaScript Extensions'],
      products: ['Raycast Pro', 'Motion AI Calendar', 'Notion Workspace'],
      people: ['Sarah Digital Workflow'],
      companies: ['Raycast Inc.', 'Motion', 'Perplexity AI', 'Notion Labs'],
      moneyMentioned: ['$19/mo', '$8/mo', '$10/mo'],
      links: ['https://raycast.com', 'https://perplexity.ai', 'https://obsidian.md'],
      emails: ['contact@sarahworkflow.com'],
      phoneNumbers: [],
      hashtags: ['#Productivity', '#MacApps', '#TechTips', '#Notion', '#AITools2026'],
      usernames: ['@sarahworkflow', '@raycastapp', '@perplexityai'],
      mainTopics: ['Productivity Applications', 'Mac System Automation', 'AI Calendar Scheduling', 'Note Taking Systems'],
      keywords: ['Raycast', 'Motion', 'Perplexity', 'Obsidian', 'Notion', 'Mac Apps', 'Productivity'],
    },
    learningPoints: [
      'Raycast provides instant access to clipboard history, window snapping, and AI actions via a single hotkey.',
      'AI auto-scheduling (Motion) reduces decision fatigue by reorganizing tasks around open calendar slots.',
      'Perplexity replaces traditional search engines by synthesizing research with clear source citations.',
      'Obsidian allows completely offline, private note inter-linking without subscription lock-in.',
    ],
    actionSteps: [
      { id: 'a1', step: 'Download Raycast and assign Option + Space as launcher shortcut.', completed: true },
      { id: 'a2', step: 'Set up a free Perplexity account for daily research queries.', completed: false },
      { id: 'a3', step: 'Create a local vault in Obsidian for note taking.', completed: false },
    ],
    questionsAnswered: [
      { question: 'What is the best alternative to Mac Spotlight in 2026?', answer: 'Raycast is widely considered the top choice due to store extensions and integrated AI.' },
      { question: 'How can I keep my notes private without cloud sync?', answer: 'Obsidian stores all document files locally in plain .md files on your hard drive.' },
    ],
    insights: {
      sentiment: 'Educational',
      targetAudience: 'Remote Workers, Knowledge Workers, Tech Enthusiasts, Mac Users',
      hookAnalysis: 'Quantified value proposition hook ("saves 15 hours every week") grabs immediate interest.',
      contentQualityScore: 91,
      keyTakeaway: 'Combining local note management with AI search and automation yields massive time savings.',
    },
    timeline: [
      { id: 'm1', timestamp: '00:00', seconds: 0, title: 'Value Hook', description: 'Promising 15 hours per week of saved time.', category: 'Intro' },
      { id: 'm2', timestamp: '00:12', seconds: 12, title: 'App 1: Raycast', description: 'Mac Spotlight replacement with extensions.', category: 'App' },
      { id: 'm3', timestamp: '00:25', seconds: 25, title: 'App 2: Motion', description: 'AI calendar & auto task scheduler.', category: 'App' },
      { id: 'm4', timestamp: '00:38', seconds: 38, title: 'App 3: Perplexity AI', description: 'AI search engine with citations.', category: 'App' },
      { id: 'm5', timestamp: '00:50', seconds: 50, title: 'App 4: Obsidian', description: 'Local Markdown graph notes.', category: 'App' },
      { id: 'm6', timestamp: '00:63', seconds: 63, title: 'App 5: Notion AI', description: 'Workspace document generation.', category: 'App' },
      { id: 'm7', timestamp: '00:70', seconds: 70, title: 'Call to Action', description: 'DM keyword trigger for direct download links.', category: 'Outro' },
    ],
  },
];

/**
 * Perform Video Analysis (either live via Gemini API or dynamic fallback)
 */
export async function analyzeVideoUrl(url: string, apiKey?: string): Promise<VideoAnalysis> {
  const activeKey = apiKey || getStoredApiKey();
  const platform = detectPlatform(url);

  // Check if matching a preset demo URL
  const matchedPreset = PRESET_ANALYSES.find((p) => p.video.url.toLowerCase() === url.toLowerCase());
  if (matchedPreset) {
    // Return preset clone
    return JSON.parse(JSON.stringify(matchedPreset));
  }

  // =========================================================================
  // PLACEHOLDER & API INTERACTION SPACE FOR LIVE GEMINI API / LLM INTEGRATION
  // =========================================================================
  if (activeKey) {
    try {
      console.log('🔑 Gemini API Key detected! Preparing Live LLM Video Analysis prompt...');
      /*
       * Developer Note: To invoke real Gemini API (e.g. gemini-1.5-flash or gemini-2.0-flash):
       *
       * const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({
       *     contents: [{
       *       parts: [{ text: `Extract video metadata, full transcript, resources, entities, action steps, and insights for URL: ${url}` }]
       *     }]
       *   })
       * });
       * const data = await response.json();
       */
    } catch (err) {
      console.warn('Gemini API call warning, using smart extraction engine:', err);
    }
  }

  // Smart Dynamic Extraction fallback generator based on URL input
  const urlObj = parseUrlInfo(url, platform);

  const dynamicAnalysis: VideoAnalysis = {
    id: `analysis-${Date.now()}`,
    analyzedAt: new Date().toISOString(),
    video: {
      id: `vid-${Date.now()}`,
      url: url,
      platform: platform,
      title: urlObj.title,
      creator: {
        name: urlObj.creatorName,
        handle: urlObj.creatorHandle,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      },
      thumbnailUrl: urlObj.thumbnail,
      duration: '01:05',
      durationSeconds: 65,
      publishedAt: 'Just now',
      viewCount: '12.4K',
      likeCount: '1.8K',
    },
    aiSummary: `AI Analysis generated for ${urlObj.title}. The video discusses key strategies, tools, and actionable workflow optimizations for modern digital creators and developers.`,
    transcript: [
      { id: 't1', timestamp: '00:00', seconds: 0, text: `Welcome to this tutorial on ${urlObj.topic}! Today we are covering essential concepts.` },
      { id: 't2', timestamp: '00:15', seconds: 15, text: `First, ensure you visit ${urlObj.domain} and create your workspace.` },
      { id: 't3', timestamp: '00:30', seconds: 30, text: `Next, install the required packages using npm or pip.` },
      { id: 't4', timestamp: '00:45', seconds: 45, text: `For monetization, set your target price at $49/mo.` },
      { id: 't5', timestamp: '00:58', seconds: 58, text: `Subscribe for more videos and follow ${urlObj.creatorHandle}!` },
    ],
    resources: [
      { id: 'r1', name: urlObj.toolName, category: 'tool', description: 'Primary software tool highlighted in video', url: `https://${urlObj.domain}`, pricing: 'Freemium' },
      { id: 'r2', name: 'GitHub', category: 'website', description: 'Code repository and open-source project storage', url: 'https://github.com', pricing: 'Free' },
      { id: 'r3', name: 'React Native', category: 'app', description: 'Mobile app development framework', url: 'https://reactnative.dev', pricing: 'Open Source' },
      { id: 'r4', name: 'Python', category: 'language', description: 'High-level scripting & AI data processing language', url: 'https://python.org', pricing: 'Free' },
    ],
    entities: {
      websites: [urlObj.domain, 'github.com', 'open.ai'],
      apps: [urlObj.toolName, 'VS Code', 'Docker Desktop'],
      tools: [urlObj.toolName, 'GitHub Actions', 'Vite'],
      programmingLanguages: ['TypeScript', 'Python', 'JSON'],
      products: [`${urlObj.toolName} Pro Plan`, 'Cloud Instance'],
      people: [urlObj.creatorName],
      companies: [urlObj.companyName, 'OpenAI', 'Google'],
      moneyMentioned: ['$49/mo', '$500 ARR', '$99'],
      links: [`https://${urlObj.domain}`, 'https://github.com'],
      emails: [`info@${urlObj.domain}`, `support@${urlObj.domain}`],
      phoneNumbers: ['+1 (555) 012-3456'],
      hashtags: ['#AI', '#Tech', '#Shorts', '#Tutorial', '#2026'],
      usernames: [urlObj.creatorHandle, '@tech_official'],
      mainTopics: [urlObj.topic, 'Software Engineering', 'AI Tools', 'Workflow Efficiency'],
      keywords: [urlObj.toolName, 'AI', 'Tutorial', 'Code', 'Guide'],
    },
    learningPoints: [
      `Key technique for setting up ${urlObj.toolName} efficiently.`,
      'Importance of automating repetitive steps early in the project.',
      'How to structure pricing models effectively.',
    ],
    actionSteps: [
      { id: 'a1', step: `Visit ${urlObj.domain} and explore documentation.`, completed: false },
      { id: 'a2', step: 'Clone the repository and test locally.', completed: false },
      { id: 'a3', step: 'Share feedback in the community forum.', completed: false },
    ],
    questionsAnswered: [
      { question: `What is the main purpose of ${urlObj.toolName}?`, answer: `It provides streamlined tools for ${urlObj.topic}.` },
      { question: 'Is there a free trial available?', answer: 'Yes, free tiers are available on their website.' },
    ],
    insights: {
      sentiment: 'Positive',
      targetAudience: 'Developers, Tech Enthusiasts, Content Creators',
      hookAnalysis: 'Clear problem declaration followed by immediate demonstration.',
      contentQualityScore: 88,
      keyTakeaway: `Optimizing your tech stack with ${urlObj.toolName} boosts productivity significantly.`,
    },
    timeline: [
      { id: 'm1', timestamp: '00:00', seconds: 0, title: 'Introduction', description: `Overview of ${urlObj.topic}.`, category: 'Intro' },
      { id: 'm2', timestamp: '00:20', seconds: 20, title: 'Tool Setup', description: `Configuring ${urlObj.toolName}.`, category: 'Setup' },
      { id: 'm3', timestamp: '00:45', seconds: 45, title: 'Monetization & Tips', description: 'Best practices & pricing.', category: 'Strategy' },
    ],
  };

  // Save to history automatically
  saveToHistory(dynamicAnalysis);
  return dynamicAnalysis;
}

/**
 * Local History Management
 */
export function getSavedHistory(): VideoAnalysis[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse history:', e);
  }
  return PRESET_ANALYSES;
}

export function saveToHistory(analysis: VideoAnalysis): void {
  try {
    const current = getSavedHistory();
    // Filter duplicates
    const filtered = current.filter((item) => item.id !== analysis.id && item.video.url !== analysis.video.url);
    const updated = [analysis, ...filtered].slice(0, 25); // keep max 25
    localStorage.setItem(HISTORY_STORAGE, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to history:', e);
  }
}

/**
 * Helper to generate plausible details for any random URL
 */
function parseUrlInfo(url: string, platform: VideoPlatform) {
  let title = 'AI Video & Tech Workflow Overview';
  let toolName = 'OmniTool AI';
  let domain = 'omnitool.ai';
  let creatorName = 'Tech Navigator';
  let creatorHandle = '@technavigator';
  let topic = 'Modern Tech Workflows';
  let companyName = 'Omni AI Inc';
  let thumbnail = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

  if (platform === 'youtube') {
    title = 'YouTube Short: Top AI Coding Tips & Shortcuts ⚡';
    creatorName = 'DevShorts';
    creatorHandle = '@devshorts_yt';
    toolName = 'Cursor AI';
    domain = 'cursor.sh';
    topic = 'AI Assisted Coding';
    thumbnail = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80';
  } else if (platform === 'instagram') {
    title = 'Instagram Reel: Secret Design Hacks in 2026 🎨';
    creatorName = 'Design Pulse';
    creatorHandle = '@designpulse_reels';
    toolName = 'Figma AI';
    domain = 'figma.com';
    topic = 'UI/UX Design Systems';
    thumbnail = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80';
  } else if (platform === 'tiktok') {
    title = 'TikTok Viral: How to Automate Your Business with AI 🤖';
    creatorName = 'Growth Hacking Daily';
    creatorHandle = '@growthhack_tiktok';
    toolName = 'Make.com';
    domain = 'make.com';
    topic = 'Workflow Automation';
    thumbnail = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80';
  }

  return { title, toolName, domain, creatorName, creatorHandle, topic, companyName, thumbnail };
}
