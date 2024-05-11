import { PaletteManager } from "../../../services/configuration-system/palette-manager";
import { BarStyle, LayoutManager } from "../../../services/layout-manager/LayoutManager";

export const applications = await Service.import("applications");
export const tray = await Service.import("systemtray");
export const hyprlandService = await Service.import("hyprland");

//1000ms * 60s
export const time = Variable("", {poll: [1000, 'date "+%H:%M"']})
export const date = Variable("", {poll: [1000, 'date +"%b %d"']})
export const liliumLogoLight = `${IMAGES}/lilium_logo_light.svg`;
export const liliumLogoDark = `${IMAGES}/lilium_logo_dark.svg`;
export const getLiliumLogo = () =>
    PaletteManager.Palette["$is-dark-theme"] ? `${IMAGES}/lilium_logo_light.svg` : `${IMAGES}/lilium_logo_dark.svg`;

export const barStyleClass = () => LayoutManager.layout.barStyle  == BarStyle.Fill ? "bar" : "barRounded";
