interface Layout {
    uiAnchor: string;
    gaps: number;
    borderAngle: number;
    borderSize: number;
    barStyle: BarStyle
}

export enum BarStyle {
    RoundedCorners = "RoundedCorners",
    Floating = "Floating",
    Fill = "Fill",
}

export class LayoutManager {
    private static jsonFilePath: string = `${App.configDir}/services/layout-manager/layout.json`;
    public static rawJson: string = Utils.readFile(this.jsonFilePath);
    public static layout: Layout = JSON.parse(this.rawJson.toString());
    public static getAnchor() : ("bottom" | "left" | "right" | "top" )[] {
        switch(this.layout.uiAnchor) {
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
    }

    static getMenuMargins() : number[] | undefined {
        if (this.layout.barStyle == BarStyle.Fill ||
            this.layout.barStyle == BarStyle.RoundedCorners)
            return undefined;

        const doubleGaps = this.layout.gaps * 2;
        switch (this.layout.uiAnchor)
        {
            case 'bottom':
                return [0, doubleGaps, doubleGaps, doubleGaps];
            case 'top':
                return [doubleGaps, doubleGaps, 0, doubleGaps];
            case 'left':
                return [doubleGaps, 0, doubleGaps, doubleGaps];
            case 'right':
                return [doubleGaps, doubleGaps, doubleGaps, 0];
            default:
                return [0, doubleGaps, doubleGaps, doubleGaps];
        }
    }
}