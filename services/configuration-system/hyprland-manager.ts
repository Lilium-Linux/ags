import { LayoutManager } from "services/layout-manager/LayoutManager";
//import hyprland from "../../types/service/hyprland";
import { PaletteManager } from "./palette-manager";
export const hyprlandService = await Service.import("hyprland");


export class HyprlandManager
{
    public static async updateHyprland() {
        const activeBorderColor = this.getByteColor(PaletteManager.Palette["$color-50"]);
        const inactiveBorderColor = "0x80000000" //this.getByteColor(PaletteManager.Palette["$color-950"]);
        const borderSize = LayoutManager.layout.borderSize;
        const gapsIn = LayoutManager.layout.gaps + LayoutManager.layout.borderSize;
        const gapsOut = gapsIn * 2;
        const rounding = PaletteManager.Palette.$rounding.slice(0, -2);

        await this.setHyprlandConfig("general:gaps_in", gapsIn.toString());
        await this.setHyprlandConfig("general:gaps_out", gapsOut.toString());
        await this.setHyprlandConfig("decoration:rounding", rounding.toString());
        await this.setHyprlandConfig("general:col.active_border", activeBorderColor);
        await this.setHyprlandConfig("general:col.inactive_border", inactiveBorderColor);
        await this.setHyprlandConfig("general:border_size", borderSize.toString());
    }

    private static async setHyprlandConfig(key: string, value: string) {
        console.log(`Hyprland config updated:  ${key} = ${value}`);
        await hyprlandService.messageAsync(`keyword ${key} ${value}`);
    }

    private static getByteColor(hexColor: string){
        const rawValue = hexColor.slice(1);
        return `0x80${rawValue}`;
    }
}