interface AnchorData {
    uiAnchor: string;
}

export class LayoutManager {
    private static jsonFilePath: string = `${App.configDir}/services/layout-manager/uiLayout.json`;

    public static getAnchor() : ("bottom" | "left" | "right" | "top" )[] {
        try {
            const content = Utils.readFile(this.jsonFilePath);
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