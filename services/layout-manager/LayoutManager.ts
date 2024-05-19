interface Layout {
    uiAnchor: Anchor;
    gaps: number;
    borderAngle: number;
    borderSize: number;
    barStyle: BarStyle
}

export enum Anchor{
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
}

export enum BarStyle {
    Floating = "Floating",
    Corners = "Corners",
    Fill = "Fill",
}

export class LayoutManager {
    private static jsonFilePath: string = `${App.configDir}/services/layout-manager/layout.json`;
    public static rawJson: string = Utils.readFile(this.jsonFilePath);
    public static layout: Layout = JSON.parse(this.rawJson.toString());
    public static getAnchor() : ("bottom" | "left" | "right" | "top" )[] {
        switch(this.layout.uiAnchor) {
            case Anchor.Bottom:
                return ['bottom', 'left', 'right'];
            case Anchor.Top:
                return ['top', 'left', 'right'];
            case Anchor.Left:
                return ['left', 'top', 'bottom'];
            case Anchor.Right:
                return ['right', 'top', 'bottom'];
            default:
                return ['bottom', 'left', 'right'];
        }
    }

    static getMenuMargins(): number[] | undefined {
        return Array(4).fill(this.layout.gaps * 3);
    }


    static getBarMargins() : number[] | undefined {
        if (this.layout.barStyle == BarStyle.Fill || this.layout.barStyle == BarStyle.Corners)
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