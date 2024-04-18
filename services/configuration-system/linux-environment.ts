import GLib from "gi://GLib?version=2.0";

function getEnumName<T extends Record<string, unknown>>(enumObj: T, value: T[keyof T]): string | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
}

enum LinuxThemeEnvironments{
    LILIUM_PALETTE_NAME = "Default",
    LILIUM_DARK_THEME = "true",
}

enum LinuxColorEnvironments{
    LILIUM_COLOR_50,
    LILIUM_COLOR_100,
    LILIUM_COLOR_200,
    LILIUM_COLOR_300,
    LILIUM_COLOR_400,
    LILIUM_COLOR_500,
    LILIUM_COLOR_600,
    LILIUM_COLOR_700,
    LILIUM_COLOR_800,
    LILIUM_COLOR_900,
    LILIUM_COLOR_950,
}

class LinuxEnvironmentHandler {
    public tryLoadEnvironments(){
        if(!GLib.getenv(LinuxThemeEnvironments.LILIUM_PALETTE_NAME)){
            const someData = LinuxThemeEnvironments.LILIUM_PALETTE_NAME.toString();
        }
    }
}