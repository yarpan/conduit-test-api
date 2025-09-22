
// To have additional outputs in debug-run-mode only
export function debugPrint(message: string) {
  const isDebugMode = process.env.DEBUG_MODE === 'true';
  if (isDebugMode) {
    console.log(`\x1b[33m[DEBUG]\x1b[0m ${message}`);
  }
}