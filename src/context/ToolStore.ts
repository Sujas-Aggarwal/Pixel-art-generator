import { create } from "zustand";
import { Tool } from "../types/Tools";
import React from "react";

interface ToolState {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;

  color: string; // Current tool's color
  setColor: (color: string) => void;

  brushSize: number; // Optional: Brush size
  setBrushSize: (size: number) => void;

  pixels: string[][]; // Pixel data
  setPixels: (pixels: string[][], saveHistory?: boolean) => void;
  clearPixels: (pixels: string[][]) => void;

  pixelCount: number; // Number of pixels
  setPixelCount: (count: number) => void;

  gridRef: React.RefObject<HTMLDivElement>; // Reference to the grid

  canvasRef: React.RefObject<HTMLCanvasElement>;

  paintCanvas: (x: number, y: number) => void;

  exportImage: () => void;

  history: string[][][];

  addToHistory: (newPixel: string[][]) => void;
  undo: () => void;
  redo: () => void;
  rotateCW: () => void;
  rotateCCW: () => void;

  generateCanvas: (pixels?: string[][]) => void;

  pencil: (x: number, y: number) => void;
  eraser: (x: number, y: number) => void;

  bucketFill: (x: number, y: number) => void;
}

export const useToolStore = create<ToolState>((set, get) => ({
  selectedTool: Tool.Pencil, // Default tool
  setSelectedTool: (tool) => set(() => ({ selectedTool: tool })),

  color: "#000000", // Default paint color
  setColor: (color) => {
    set(() => ({ color }));
  },

  brushSize: 1, // Default brush size
  setBrushSize: (size) => set(() => ({ brushSize: size })),

  pixelCount: 16, // Default pixel count
  setPixelCount: (count) => {
    set(() => ({ pixelCount: count }));

    // Automatically update pixels when pixelCount changes
    const newPixels = new Array(count)
      .fill("")
      .map(() => new Array(count).fill(""));
    set(() => ({ pixels: newPixels }));
  },

  pixels: new Array(16).fill("").map(() => new Array(16).fill("")), // Default 16x16 pixels
  setPixels: (pixels, saveHistory = false) => {
    if (saveHistory) get().addToHistory(pixels);
    get().generateCanvas(pixels);
    set(() => ({ pixels }));
  },
  clearPixels: (pixels) =>
    set(() => ({
      pixels: new Array(pixels.length)
        .fill("")
        .map(() => new Array(pixels.length).fill("")),
    })),

  gridRef: React.createRef<HTMLDivElement>(),

  canvasRef: React.createRef<HTMLCanvasElement>(),

  paintCanvas: (x, y) => {
    const canvas = get().canvasRef.current;
    const selectedTool = get().selectedTool;
    let ctx = canvas?.getContext("2d");
    if (!ctx) return;
    if (selectedTool == Tool.Pencil) {
      get().pencil(x, y);
    } else if (selectedTool == Tool.Eraser) {
      get().eraser(x, y);
    } else if (selectedTool == Tool.BucketFill) {
      get().bucketFill(x, y);
    }
    ctx = null;
  },

  pencil: (x: number, y: number) => {
    x = x - 1;
    y = y - 1;
    const pixels = get().pixels;
    const color = get().color;
    pixels[x][y] = color;
    get().setPixels(pixels, true);
  },

  eraser: (x: number, y: number) => {
    x = x - 1;
    y = y - 1;
    const pixels = get().pixels;
    pixels[x][y] = "";
    get().setPixels(pixels, true);
  },

  generateCanvas: (pixels?: string[][]) => {
    const canvas = get().canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    if (!pixels) {
      pixels = get().pixels;
    }
    const pixelSize = canvas.width / get().pixelCount;
    for (let i = 0; i < get().pixelCount; i++) {
      for (let j = 0; j < get().pixelCount; j++) {
        if (!pixels[i][j] || pixels[i][j] == "") continue;
        ctx.fillStyle = pixels[i][j];
        ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
      }
    }
  },
  exportImage: () => {
    const canvas = get().canvasRef.current;
    if (!canvas) return;
    //resize to pixelSize
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "pixel-art.png";
    a.click();
  },

  history: [new Array(16).fill("").map(() => new Array(16).fill(""))],

  addToHistory: (newPixel: string[][]) => {
    const oldHistory = get().history;
    const newPixelCopy = newPixel.map((row) => [...row]);
    const newHistory: string[][][] = [...oldHistory, newPixelCopy];
    set(() => ({ history: newHistory }));
  },

  undo: () => {
    const history = get().history;
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const last = newHistory[newHistory.length - 1];
      const lastCopy = last.map((row) => [...row]);

      set(() => ({ history: newHistory }));
      get().setPixels(lastCopy, false);
    }
  },
  redo: () => {
    const history = get().history;
    const last = history[history.length - 1];
    if (last) {
      get().setPixels(last, false);
    }
  },

  rotateCW: () => {
    const pixels = get().pixels;
    const newPixels = pixels.map((row, i) =>
      row.map((_, j) => pixels[pixels.length - j - 1][i])
    );
    get().setPixels(newPixels, true);
  },
  rotateCCW: () => {
    const pixels = get().pixels;
    const newPixels = pixels.map((row, i) =>
      row.map((_, j) => pixels[j][pixels.length - i - 1])
    );
    get().setPixels(newPixels, true);
  },

  bucketFill: (x: number, y: number) => {
    const pixels = get().pixels;
    const color = get().color;
    const oldColor = pixels[x-1][y-1];
    const fill = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= pixels.length || y >= pixels.length) return;
      if (pixels[x][y] != oldColor) return;
      pixels[x][y] = color;
      fill(x + 1, y);
      fill(x - 1, y);
      fill(x, y + 1);
      fill(x, y - 1);
    };
    fill(x - 1, y - 1);
    get().setPixels(pixels, true);
  },
}));
