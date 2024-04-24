import { PaletteManager } from "./palette-manager";
import { HyprlandManager } from "./hyprland-manager";

export class ConfigLoader{
    public static async load() {
        PaletteManager.loadPalette();
        await HyprlandManager.updateHyprland();
    }
}