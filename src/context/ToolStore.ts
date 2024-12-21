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
  setPixels: (pixels: string[][]) => void;
  clearPixels: (pixels: string[][]) => void;

  pixelCount: number; // Number of pixels
  setPixelCount: (count: number) => void;

  gridRef: React.RefObject<HTMLDivElement>; // Reference to the grid

  canvasRef: React.RefObject<HTMLCanvasElement>;

  paintCanvas: (x: number, y: number) => void;
}

export const useToolStore = create<ToolState>((set, get) => ({
  selectedTool: Tool.Pencil, // Default tool
  setSelectedTool: (tool) => set(() => ({ selectedTool: tool })),

  color: "#000000", // Default paint color
  setColor: (color) => {
    console.log("Color Change to ", color);
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
  setPixels: (pixels) => {
    //set Grid
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
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = get().color;
    const width = canvas!.width / get().pixelCount;
    const height = canvas!.height / get().pixelCount;
    ctx.fillRect((y-1) * height,(x-1) * width,  width, height);
  },
}));