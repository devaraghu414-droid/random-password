
# 🛡️ VaultGen - Secure Password Architect

A professional-grade, AI-powered random password generator.

## 🚀 How to Deploy to Netlify (Fastest Way)

1.  **Download your project files**: Ensure you have all the files (`index.html`, `index.tsx`, `App.tsx`, `netlify.toml`, etc.) in a single folder on your computer.
2.  **Go to Netlify Drop**: Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3.  **Drag and Drop**: Drag the entire project folder into the "Drag and drop your site folder here" area.
4.  **Wait for the URL**: Netlify will instantly deploy your site and provide you with a public URL.

## 🛠️ Features
- **Military Grade Randomization**: Uses the Web Crypto API `window.crypto.getRandomValues`.
- **Strength Analysis**: Real-time feedback on password complexity.
- **AI Security Insights**: Powered by Gemini 3 Flash to give professional security tips.
- **History Tracking**: Keeps your last 10 generated passwords locally.
- **Responsive Design**: Optimized for mobile and desktop.

## 🔑 Environment Variables
If you use the AI features in production, ensure you have your API Key configured if you're building with a CI/CD pipeline. For manual drops, the current setup is ready for testing!
