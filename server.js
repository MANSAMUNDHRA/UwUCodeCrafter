const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- SERVE FRONTEND ---------- */
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* ---------- HF SETUP ---------- */
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

console.log("HF KEY EXISTS:", !!process.env.HUGGINGFACE_API_KEY);

/* ---------- SYSTEM PROMPT ---------- */
const SYSTEM_PROMPT = `
You are a coding assistant for students.
Generate SIMPLE, short, beginner-friendly code.
Prefer clarity over optimization.
Only output code.
`;

/* ---------- CHAT ---------- */
app.post('/chat', async (req, res) => {
    try {
        const { message, language = "python" } = req.body;

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const stream = hf.chatCompletionStream({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Write simple ${language} code for: ${message}` }
            ],
            temperature: 0.3,
            max_tokens: 1024
        });

        for await (const chunk of stream) {
            const content = chunk?.choices?.[0]?.delta?.content;
            if (!content) continue;
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }

        res.write("data: [DONE]\n\n");
        res.end();

    } catch (error) {
        console.error("CHAT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ---------- RUN PYTHON ---------- */
app.post('/run', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    try {
        const tmpDir = path.join(__dirname, "tmp");
        await fs.mkdir(tmpDir, { recursive: true });

        const tmpFile = path.join(tmpDir, `code_${Date.now()}.py`);
        await fs.writeFile(tmpFile, code);

        const output = await new Promise((resolve, reject) => {
            let stdout = "";
            let stderr = "";

            const proc = spawn("python", [tmpFile]);

            proc.stdout.on("data", d => stdout += d.toString());
            proc.stderr.on("data", d => stderr += d.toString());

            proc.on("close", (code) => {
                fs.unlink(tmpFile).catch(() => {});
                if (code !== 0) reject(new Error(stderr || "Execution failed"));
                else resolve(stdout);
            });
        });

        res.json({ output });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
