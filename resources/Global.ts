import GLib from "gi://GLib?version=2.0";

declare global
{
    const TEMP: string
    const USER: string
    const OPTIONS: string
    const IMAGES: string
}

Object.assign(globalThis, {
    TEMP: `${GLib.get_user_cache_dir()}/ags/options.json`,
    USER: GLib.get_user_name(),
    OPTIONS: `${GLib.get_tmp_dir()}/assets`,
    IMAGES: `${GLib.get_user_cache_dir()}/ags/resources/images`,
})