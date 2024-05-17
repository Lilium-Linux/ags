import { Anchor, BarStyle, LayoutManager } from "../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
import { CairoCorner, CornerPosition } from "./cairoCorner";

export class CornerBuilder {
    public static buildCorners(){
        if (LayoutManager.layout.barStyle == BarStyle.Fill)
            return [];

        if (LayoutManager.layout.barStyle == BarStyle.Corners)
            return [...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopRight)),
                ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopLeft)),
                ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomLeft)),
                ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomRight)),]

        if (LayoutManager.layout.barStyle == BarStyle.Floating){
            if (LayoutManager.layout.uiAnchor == Anchor.Bottom){
                return [...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopRight)),
                    ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopLeft)),]
            }
            else if (LayoutManager.layout.uiAnchor == Anchor.Top){
                return [...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomRight)),
                    ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomLeft)),]
            }
            else if (LayoutManager.layout.uiAnchor == Anchor.Left){
                return [...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopRight)),
                    ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomRight)),]
            }
            else if (LayoutManager.layout.uiAnchor == Anchor.Right){
                return [...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.TopLeft)),
                    ...GlobalWidget.getWindowsForMonitors(new CairoCorner(CornerPosition.BottomLeft)),]
            }
        }
        return [];
    }
}