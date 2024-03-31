import app from "../types/app";

interface AnchorData {
    uiAnchor: string;
}

class LayoutManager {
    private jsonFilePath: string = `${app.configDir}/layout-manager/uiLayout.json`;

    public GetAnchor(): string[] | null {
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
                    console.error("Invalid anchor value in JSON:", data.uiAnchor);
                    return null;
            }
        } catch (error) {
            console.error("Error reading JSON file:", error);
            return null;
        }
    }
}