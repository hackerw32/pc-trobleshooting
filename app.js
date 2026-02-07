// ================================
// Application State
// ================================

let currentLang = 'en';
let currentTheme = 'dark';
let pathHistory = [];
let currentPath = 'start';
let diagnosticStartTime = null;

// ================================
// Initialization
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    setupEventListeners();
    startDiagnostic();
});

// ================================
// Theme Management
// ================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('pc-diagnostix-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
        // Default to dark theme
        currentTheme = 'dark';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('pc-diagnostix-theme', currentTheme);
}

// ================================
// Language Management
// ================================

function initializeLanguage() {
    const savedLang = localStorage.getItem('pc-diagnostix-lang');
    if (savedLang && diagnosticData[savedLang]) {
        currentLang = savedLang;
    }
    updateLanguageDisplay();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'el' : 'en';
    localStorage.setItem('pc-diagnostix-lang', currentLang);
    updateLanguageDisplay();

    // Restart diagnostic with new language
    if (pathHistory.length > 0) {
        startDiagnostic();
    } else {
        renderStep();
    }
}

function updateLanguageDisplay() {
    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    langToggle.querySelector('.lang-label').textContent = currentLang.toUpperCase();

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.hasAttribute(`data-${currentLang}`)) {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        }
    });
}

function translate(key) {
    const translations = {
        en: {
            step: 'Step',
            stepLabel: 'DIAGNOSTIC PHASE',
            restart: 'Start New Diagnostic',
            export: 'Export Report',
            back: 'Back',
            tools: 'RECOMMENDED TOOLS'
        },
        el: {
            step: 'Βήμα',
            stepLabel: 'ΔΙΑΓΝΩΣΤΙΚΗ ΦΑΣΗ',
            restart: 'Νέα Διάγνωση',
            export: 'Εξαγωγή Αναφοράς',
            back: 'Πίσω',
            tools: 'ΣΥΝΙΣΤΩΜΕΝΑ ΕΡΓΑΛΕΙΑ'
        }
    };
    return translations[currentLang][key] || key;
}

// ================================
// Event Listeners
// ================================

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('backBtn').addEventListener('click', goBack);
    document.getElementById('restartBtn').addEventListener('click', startDiagnostic);
    document.getElementById('exportBtn').addEventListener('click', exportReport);
}

// ================================
// Diagnostic Flow
// ================================

function startDiagnostic() {
    diagnosticStartTime = new Date();
    pathHistory = [];
    currentPath = 'start';

    // Hide result card, show wizard
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('wizardCard').style.display = 'block';

    renderStep();
    updateProgress();
}

function renderStep() {
    const data = diagnosticData[currentLang];
    const step = data[currentPath];

    if (!step) {
        console.error('Step not found:', currentPath);
        return;
    }

    // Check if this is a result step
    if (step.title) {
        showResult();
        return;
    }

    // Update step badge
    document.getElementById('stepBadge').textContent = step.label;

    // Update question
    document.getElementById('questionTitle').textContent = step.question;

    // Render options
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';

    step.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.style.animationDelay = `${index * 0.05}s`;
        button.addEventListener('click', () => selectOption(option.next));
        optionsGrid.appendChild(button);
    });

    // Show/hide back button
    const backBtn = document.getElementById('backBtn');
    backBtn.style.display = pathHistory.length > 0 ? 'flex' : 'none';

    updateProgress();
}

function selectOption(nextPath) {
    pathHistory.push(currentPath);
    currentPath = nextPath;
    renderStep();
}

function goBack() {
    if (pathHistory.length > 0) {
        currentPath = pathHistory.pop();
        renderStep();
    }
}

// ================================
// Result Display
// ================================

function showResult() {
    const data = diagnosticData[currentLang];
    const result = data[currentPath];

    if (!result) {
        console.error('Result not found:', currentPath);
        return;
    }

    // Hide wizard, show result
    document.getElementById('wizardCard').style.display = 'none';
    const resultCard = document.getElementById('resultCard');
    resultCard.style.display = 'block';

    // Set severity badge
    const severityBadge = document.getElementById('severityBadge');
    severityBadge.textContent = result.severity.toUpperCase();
    severityBadge.className = `severity-badge severity-${result.severity}`;

    // Set title
    document.getElementById('resultTitle').textContent = result.title;

    // Set content
    document.getElementById('resultContent').innerHTML = result.content;

    // Render tools
    const toolsContainer = document.getElementById('resultTools');
    if (result.tools && result.tools.length > 0) {
        toolsContainer.innerHTML = `
            <h4 class="tools-title">${translate('tools')}</h4>
            ${result.tools.map(tool => `
                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-link">
                    <div class="tool-icon">${tool.name.substring(0, 2).toUpperCase()}</div>
                    <div class="tool-info">
                        <div class="tool-name">${tool.name}</div>
                        <div class="tool-desc">${tool.desc}</div>
                    </div>
                    <div class="tool-arrow">→</div>
                </a>
            `).join('')}
        `;
        toolsContainer.style.display = 'block';
    } else {
        toolsContainer.style.display = 'none';
    }

    // Update progress to 100%
    document.getElementById('progressFill').style.width = '100%';
    const stepSpan = currentLang === 'en' ? 'Step' : 'Βήμα';
    document.getElementById('progressText').innerHTML = `
        <span>${stepSpan}</span>
        <span id="currentStep">${pathHistory.length + 1}</span>
    `;
}

// ================================
// Progress Tracking
// ================================

function updateProgress() {
    const currentStep = pathHistory.length + 1;
    const estimatedTotal = 6; // Approximate total steps for progress bar only
    const progressPercent = Math.min((currentStep / estimatedTotal) * 100, 90);

    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    document.getElementById('currentStep').textContent = currentStep;
}

// ================================
// Export Functionality
// ================================

function exportReport() {
    const data = diagnosticData[currentLang];
    const result = data[currentPath];

    if (!result) return;

    // Create report content
    const reportContent = generateReportContent(result);

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PC-DiagnostiX-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateReportContent(result) {
    const timestamp = new Date().toLocaleString(currentLang === 'en' ? 'en-US' : 'el-GR');
    const duration = diagnosticStartTime
        ? Math.round((new Date() - diagnosticStartTime) / 1000)
        : 0;

    let report = '';
    report += '═══════════════════════════════════════════\n';
    report += '       PC DiagnostiX - Diagnostic Report\n';
    report += '═══════════════════════════════════════════\n\n';
    report += `Date: ${timestamp}\n`;
    report += `Diagnostic Duration: ${duration} seconds\n`;
    report += `Language: ${currentLang.toUpperCase()}\n\n`;
    report += '───────────────────────────────────────────\n';
    report += `DIAGNOSIS: ${result.title}\n`;
    report += `SEVERITY: ${result.severity.toUpperCase()}\n`;
    report += '───────────────────────────────────────────\n\n';

    // Strip HTML tags from content
    const contentText = result.content.replace(/<[^>]*>/g, '\n').replace(/\n\n+/g, '\n').trim();
    report += 'DETAILS:\n';
    report += contentText + '\n\n';

    if (result.tools && result.tools.length > 0) {
        report += '───────────────────────────────────────────\n';
        report += 'RECOMMENDED TOOLS:\n';
        report += '───────────────────────────────────────────\n\n';
        result.tools.forEach((tool, index) => {
            report += `${index + 1}. ${tool.name}\n`;
            report += `   ${tool.desc}\n`;
            report += `   URL: ${tool.url}\n\n`;
        });
    }

    report += '═══════════════════════════════════════════\n';
    report += '  Generated by PC DiagnostiX\n';
    report += '  Professional PC Troubleshooting Suite\n';
    report += '═══════════════════════════════════════════\n';

    return report;
}

// ================================
// Terminal Footer Animation
// ================================

function updateTerminalText() {
    const terminalText = document.querySelector('.terminal-text');
    if (!terminalText) return;

    const messages = {
        en: [
            'System diagnostic engine initialized...',
            'Analyzing hardware configuration...',
            'Checking system integrity...',
            'Monitoring component health...',
            'Ready for diagnostics...'
        ],
        el: [
            'Μηχανή διαγνωστικών συστήματος ενεργοποιήθηκε...',
            'Ανάλυση διαμόρφωσης hardware...',
            'Έλεγχος ακεραιότητας συστήματος...',
            'Παρακολούθηση υγείας εξαρτημάτων...',
            'Έτοιμο για διαγνωστικά...'
        ]
    };

    let messageIndex = 0;
    setInterval(() => {
        const currentMessages = messages[currentLang];
        terminalText.textContent = currentMessages[messageIndex];
        messageIndex = (messageIndex + 1) % currentMessages.length;
    }, 4000);
}

// Start terminal animation
updateTerminalText();
