import GLib from "gi://GLib?version=2.0";

interface Style{
    palette: string;
}

interface Palette {
    "$is-dark-theme": boolean;
    "$color-50": string;
    "$color-100": string;
    "$color-200": string;
    "$color-300": string;
    "$color-400": string;
    "$color-500": string;
    "$color-600": string;
    "$color-700": string;
    "$color-800": string;
    "$color-900": string;
    "$color-950": string;
}

export class PaletteManager {
    public static Palette : Palette;
    public static loadPalette(){
        const rawStyle = Utils.readFile(CURRENT_STYLE);
        const style: Style = JSON.parse(rawStyle.toString());

        const rawPalette = Utils.readFile(`${PALETTES}/${style.palette}.json`);
        this.Palette = JSON.parse(rawPalette.toString());

        console.log("Style:\n" + rawStyle);
        console.log("Palette:\n" + rawPalette);

        this.writeSCSS();
    }

    private static writeSCSS(){
        console.log("Writing to _palette.scss...");
        const filePath = `${App.configDir}/services/style/scss-globals/_palette.scss`;

        // Prepare the data to write
        let data = Object.entries(this.Palette)
            .map(([key, value]) => `${key}: ${value};`)
            .join('\n');

        console.log("New _palette.scss:\n" + data);
        GLib.file_set_contents(filePath, new TextEncoder().encode(data))
    }
}