import { LayoutManager } from "services/layout-manager/LayoutManager";
//import hyprland from "../../types/service/hyprland";
import { PaletteManager } from "./palette-manager";
export const hyprlandService = await Service.import("hyprland");


export class HyprlandManager
{
    public static async updateHyprland() {
        const someData = PaletteManager.Palette["$color-950"]
        const gapsIn = LayoutManager.layout.gaps;
        const gapsOut = LayoutManager.layout.gaps * 2;
        const activeBorder =
            `${PaletteManager.Palette["$color-600"]} ${PaletteManager.Palette["$color-950"]} ${LayoutManager.layout.borderAngle}deg`;
        //const activeBorder = `rgba(${PaletteManager.Palette["$color-600"]}ee) rgba(${PaletteManager.Palette["$color-950"]}ee) ${LayoutManager.layout.borderAngle}deg`;
        //const inactiveBorder = `rgba(${PaletteManager.Palette["$color-600"]}ee)`;

        await this.setHyprlandConfig("general:gaps_in", gapsIn.toString());
        await this.setHyprlandConfig("general:gaps_out", gapsOut.toString());
        await this.setHyprlandConfig("general:col.active_border", activeBorder);
        //await this.setHyprlandConfig("general:col.inactive_border", LayoutManager.layout.gaps.toString());
    }

    private static async setHyprlandConfig(key: string, value: string) {
        console.log(`Hyprland config updated:  ${key} = ${value}`);
        await hyprlandService.messageAsync(`keyword ${key} ${value}`);
    }
}