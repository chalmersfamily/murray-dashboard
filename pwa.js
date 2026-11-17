const installButton = document.getElementById('installDashboard');
let installPrompt;

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
});

function hideInstallButton() {
    installPrompt = undefined;
    installButton.hidden = true;
}

window.addEventListener('appinstalled', hideInstallButton);
installButton.addEventListener('click', async () => {
    const prompt = installPrompt;
    if (!prompt) return;
    hideInstallButton();
    try {
        await prompt.prompt();
    } catch {
        // The browser menu remains available if it cannot show the in-app prompt.
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(error => {
        console.warn('Dashboard offline page could not be registered.', error.name);
    });
}
