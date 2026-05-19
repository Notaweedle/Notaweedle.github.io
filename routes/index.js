const express = require('express');
const router = express.Router();

const portfolioData =
{title: 'Robert Majka — Developer Portfolio',

name: 'Robert Majka',

stats: [
    { value: '4+', label: 'Languages' },
    { value: '5+', label: 'Projects Built' },
    { value: '137.1 ',  label: 'Hours in RimWorld' },
    { value: '1',  label: 'Dream Studio' },
],

projects: [
    {
    title: 'Mini Monster Battle Engine',
    desc: 'A turn-based combat system inspired by Pokémon. Type matchups, randomised moves, validated input loops — built in Python with clean OOP structure.',
    tags: ['Python', 'OOP', 'Enums', 'Game Logic'],
    },
    {
    title: 'Newegg Price Tracker',
    desc: 'Scrapes Newegg product pages, stores price history in JSON, and alerts when an all-time low is hit. Uses BeautifulSoup and a custom Product class.',
    tags: ['Python', 'BeautifulSoup', 'JSON', 'Web Scraping'],
    },
    {
    title: 'Student Tracker',
    desc: 'A persistent student-record manager with JSON file I/O, full error handling, and class-based design. Clean serialisation and a simple CLI.',
    tags: ['Python', 'SQLite', 'JSON', 'OOP'],
    },
    {
    title: 'Discord AI Bot',
    desc: 'A local AI pipeline — Ollama running Gemma 4, connected to Discord via OpenClaw. Fully self-hosted, no cloud API.',
    tags: ['Ollama', 'OpenClaw', 'Discord', 'Self-Hosted'],
    },
],

    languages: [
        { name: 'Python',     level: 'Primary',     pct: 90 },
        { name: 'HTML / CSS', level: 'Working',     pct: 80 },
        { name: 'C#',         level: 'Proficient',  pct: 75 },
        { name: 'JavaScript', level: 'Learning',    pct: 60 },
        { name: 'Java',       level: 'Need Recap',  pct: 50 },
        { name: 'C++',        level: 'Learning',    pct: 40 }

    ],

    tools: [
        'NumPy', 'BeautifulSoup', 'Requests', 'SQLite3',
    'Regex', 'JSON / CSV', 'Express.js', 'Git',
    'Ollama', 'Discord API', 'AI',
],

concepts: [
    'OOP Design', 'Web Scraping', 'Data Persistence',
    'Game Systems', 'REST APIs', 'Error Handling',
],

experience: [
    {
    date: '2024 — Present',
    role: 'CS Student & Developer',
    org: 'University Coursework',
    bullets: [
        'Built Python projects covering scripting, data collection, NumPy, and web scraping.',
        'Developed full-scope apps: a battle engine, price tracker, and student management system.',
        'Covered data structures, OOP, SQL, and regex-based text processing.',
    ],
    },
    {
    date: '2023 — Present',
    role: 'Hobbyist Infrastructure Tinkerer',
    org: 'Personal Home Lab',
    bullets: [
        'Set up a self-hosted AI stack (Ollama + Gemma 4) piped into Discord.',
        'Created embedded projects with ESP32 hardware involving networking, peripherals, and real-time device interaction.',
        'Explored API integrations and self-hosted tooling out of genuine curiosity.',
    ],
    },
    {
    date: 'Long-term goal',
    role: 'Aspiring Game Developer',
    org: 'Personal Ambition',
    bullets: [
        'Lifelong interest in game design and the systems that power it.',
        'Submitted a speculative application to Ludeon Studios highlighting C# skills and familiarity with RimWorld.',
        'Actively bridging software engineering and game development through personal projects.',
    ],
    },
],

contact: {
    email: 'RobertMajka254@gmail.com',
    github: 'https://github.com/Notaweedle',
    linkedin: 'https://linkedin.com/in/yourname',
},
};

// GET /
router.get('/', (req, res) => {
    res.render('index', portfolioData);
});

// POST /contact
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  // TODO: hook up nodemailer or save to DB
    console.log('Contact form submission:', { name, email, message });
    res.render('index', { ...portfolioData, success: true });
});

module.exports = router;
