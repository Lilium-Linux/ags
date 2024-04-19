import GLib from "gi://GLib?version=2.0";

function getEnumName<T extends Record<string, unknown>>(enumObj: T, value: T[keyof T]): string | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
}

const envs: Map<string, string> = new Map([
    ["LILIUM_PALETTE_NAME", "Name"],
    ["LILIUM_DARK_THEME", "$is-dark-theme"],
    // Add more key-value pairs here for LinuxColorEnvironments
    ["LILIUM_COLOR_50", "$color-50"],
    ["LILIUM_COLOR_100", "$color-100"],
    ["LILIUM_COLOR_200", "$color-200"],
    ["LILIUM_COLOR_300", "$color-300"],
    ["LILIUM_COLOR_400", "$color-400"],
    ["LILIUM_COLOR_500", "$color-500"],
    ["LILIUM_COLOR_600", "$color-600"],
    ["LILIUM_COLOR_700", "$color-700"],
    ["LILIUM_COLOR_800", "$color-800"],
    ["LILIUM_COLOR_900", "$color-900"],
    ["LILIUM_COLOR_950", "$color-950"],
]);

enum LinuxThemeEnvironments{
    LILIUM_PALETTE_NAME = "Default",
    LILIUM_DARK_THEME = "true",
}

enum LinuxColorEnvironments{
    LILIUM_PALETTE_NAME = "Default",
    LILIUM_DARK_THEME = "true",
    LILIUM_COLOR_50 = "$color-50",
    LILIUM_COLOR_100 = "$color-100",
    LILIUM_COLOR_200 = "$color-200",
    LILIUM_COLOR_300 = "$color-300",
    LILIUM_COLOR_400 = "$color-400",
    LILIUM_COLOR_500 = "$color-500",
    LILIUM_COLOR_600 = "$color-600",
    LILIUM_COLOR_700 = "$color-700",
    LILIUM_COLOR_800 = "$color-800",
    LILIUM_COLOR_900 = "$color-900",
    LILIUM_COLOR_950 = "$color-950",
}

export class LinuxEnvironmentHandler {
    public tryLoadEnvironments(){
        //GLib.setenv()
    }

    public static setEnv(json: any){
        envs.forEach((value, key) => {
            console.log(`${value} = ${key}`)
        });
    }

    private envsInitialized(){
        const paletteString = getEnumName(
            LinuxThemeEnvironments,
            LinuxThemeEnvironments[LinuxThemeEnvironments.LILIUM_PALETTE_NAME]);

        return typeof paletteString === 'string';
    }
}