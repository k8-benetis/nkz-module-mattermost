import pkg from '../package.json';

const MODULE_ID = 'mattermost';

console.log(`[${MODULE_ID}] Initializing module v${pkg.version}`);

// Self-register with the host runtime
if (window.__NKZ__) {
    window.__NKZ__.register({
        id: MODULE_ID,
        version: pkg.version,
        // No special slots for now, just the main route defined in manifest
        // viewerSlots: {}, 
    });
} else {
    // In dev mode or standalone, we might not have __NKZ__
    console.debug(`[${MODULE_ID}] window.__NKZ__ not found (running standalone?)`);
}
