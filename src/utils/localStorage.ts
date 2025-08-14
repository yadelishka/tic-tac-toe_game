export type GameSave = {
  cells: number[];
  activePlayer: number;
};

function isValidCells(data: any): data is GameSave {
  if (
    data &&
    typeof data === "object" &&
    "cells" in data &&
    "activePlayer" in data &&
    typeof data.activePlayer === "number" &&
    Array.isArray(data.cells) &&
    data.cells.length === 25 &&
    data.cells.every((value: unknown) => typeof value === "number")
  )
    return true;
  return false;
}

export function save(key: string, data: object) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function load(key: string) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const parsed = JSON.parse(item);
  return isValidCells(parsed) ? parsed : null;
}

export function clear() {
  localStorage.clear();
}
