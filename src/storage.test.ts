// Tests for remembering numbers (like the score) between visits (Step 8).
import { describe, it, expect } from "vitest";
import { loadNumber, saveNumber, NumberStorage } from "./storage";

// A pretend version of the browser's localStorage, so these tests don't need a browser.
function fakeStorage(): NumberStorage {
  const saved: Record<string, string> = {};
  return {
    getItem: (key) => (key in saved ? saved[key] : null),
    setItem: (key, value) => {
      saved[key] = value;
    },
  };
}

// A storage that always fails, like a browser that has saving turned off.
const brokenStorage: NumberStorage = {
  getItem: () => {
    throw new Error("storage is off");
  },
  setItem: () => {
    throw new Error("storage is off");
  },
};

describe("loadNumber", () => {
  it("is 0 when nothing has been saved yet", () => {
    expect(loadNumber(fakeStorage(), "score")).toBe(0);
  });

  it("is 0 when what was saved isn't a number", () => {
    const storage = fakeStorage();
    storage.setItem("score", "banana");
    expect(loadNumber(storage, "score")).toBe(0);
  });

  it("is 0 when storage doesn't work", () => {
    expect(loadNumber(brokenStorage, "score")).toBe(0);
  });
});

describe("saveNumber", () => {
  it("saving and then loading gives back the same number", () => {
    const storage = fakeStorage();
    saveNumber(storage, "score", 7);
    expect(loadNumber(storage, "score")).toBe(7);
  });

  it("keeps different names separate", () => {
    const storage = fakeStorage();
    saveNumber(storage, "score", 3);
    saveNumber(storage, "shots", 10);
    expect(loadNumber(storage, "score")).toBe(3);
    expect(loadNumber(storage, "shots")).toBe(10);
  });

  it("doesn't crash when storage doesn't work", () => {
    expect(() => saveNumber(brokenStorage, "score", 5)).not.toThrow();
  });
});
