import app from "../types/app";

interface AnchorData {
    uiAnchor: string;
}

export class LayoutManager {
    private static jsonFilePath: string = `${app.configDir}/layout-manager/uiLayout.json`;

    public static GetAnchor() : ("bottom" | "left" | "right" | "top" )[] {
        try {
            const Glib = imports.gi.GLib;
            const [, content] = Glib.file_get_contents(this.jsonFilePath);

            const data: AnchorData = JSON.parse(content.toString());
            switch(data.uiAnchor) {
                case 'bottom':
                    return ['bottom', 'left', 'right'];
                case 'top':
                    return ['top', 'left', 'right'];
                case 'left':
                    return ['left', 'top', 'bottom'];
                case 'right':
                    return ['right', 'top', 'bottom'];
                default:
                    return ['bottom', 'left', 'right'];
            }
        } catch (error) {
            console.error("Error reading JSON file:", error);
            return ['bottom', 'left', 'right'];
        }
    }
}