import { Anchor, BarStyle, LayoutManager } from "../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
import { CairoCorner, CornerPosition } from "./cairoCorner";

export class CornerBuilder {
    public static buildCorners() {
        if (LayoutManager.layout.barStyle === BarStyle.Fill) return [];

        const corners = [
            CornerPosition.TopRight,
            CornerPosition.TopLeft,
            CornerPosition.BottomLeft,
            CornerPosition.BottomRight,
        ];

        if (LayoutManager.layout.barStyle === BarStyle.Corners)
            return corners.flatMap(corner =>
                GlobalWidget.getWindowsForMonitors(new CairoCorner(corner)));

        const anchorCorners = LayoutManager.layout.uiAnchor === Anchor.Top
            ? [CornerPosition.BottomRight, CornerPosition.BottomLeft]
            : [CornerPosition.TopRight, CornerPosition.TopLeft];

        return anchorCorners.flatMap(corner =>
            GlobalWidget.getWindowsForMonitors(new CairoCorner(corner)));
    }
}