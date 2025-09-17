/**
 * Application version extracted from package.json at build time
 * This constant is injected by Vite during the build process
 */
declare const __APP_VERSION__: string;

export const APP_VERSION: string = __APP_VERSION__;