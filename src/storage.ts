// Step 8: remembering numbers (like the score) between visits, using the browser's localStorage.
// localStorage only stores text, so we turn numbers into text and back.

// The two things we need from a storage. The browser's localStorage has both,
// and the tests use a pretend one.
export type NumberStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

// Load a saved number. If nothing usable was saved, start from 0.
export function loadNumber(storage: NumberStorage, key: string): number {
  try {
    const number = Number(storage.getItem(key));
    return Number.isFinite(number) ? number : 0;
  } catch {
    // Some browsers turn storage off (for example, in private windows).
    return 0;
  }
}

// Save a number. If saving doesn't work, carry on: the game still plays.
export function saveNumber(storage: NumberStorage, key: string, value: number): void {
  try {
    storage.setItem(key, String(value));
  } catch {
    // Nothing to do: the number just won't be remembered.
  }
}
