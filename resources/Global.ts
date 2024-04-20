import GLib from "gi://GLib?version=2.0";

declare global
{
    const TEMP: string
    const USER: string
    const OPTIONS: string
    const IMAGES: string
    const CURRENT_STYLE: string
    const PALETTES: string
}

Object.assign(globalThis, {
    TEMP: `${GLib.get_user_cache_dir()}/ags/options.json`,
    USER: GLib.get_user_name(),
    OPTIONS: `${GLib.get_tmp_dir()}/assets`,
    IMAGES: `${GLib.get_user_config_dir()}/ags/resources/images`,
    CURRENT_STYLE: `${App.configDir}/services/style/current_style.json`,
    PALETTES: `${App.configDir}/services/style/palettes`,
})