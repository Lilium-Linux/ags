// NOTE! I use ts-nocheck because Cairo is not an introspectable lib
// @ts-nocheck
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
//import Gtk from "@girs/gtk-3.0/gtk-3.0";
import Gtk from "../../types/@girs/gtk-3.0";
import cairo10 from "../../types/@girs/cairo-1.0/cairo-1.0";
import { PaletteManager } from "../../services/configuration-system/palette-manager";

export enum CornerPosition {
    TopLeft = "Top-Left",
    TopRight = "Top-Right",
    BottomLeft = "Bottom-Left",
    BottomRight = "Bottom-Right",
}

export class CairoCorner extends GlobalWidget{
    private static position = CornerPosition.BottomLeft;
    constructor(cornerPosition: CornerPosition) {
        super();
        CairoCorner.position = cornerPosition;
    }
    buildWindow(monitor: number): Gtk.Window {
        const radius = PaletteManager.getRounding();
        const color = PaletteManager.hexToFloatRgb(PaletteManager.Palette["$color-950"]);
        const drawingArea = Widget.DrawingArea({
            widthRequest: radius,
            heightRequest: radius,
            hpack: 'start',
            vpack: 'end',
            drawFn: (self, cairo, w, h) => {
                cairo.setSourceRGBA(color.r, color.g, color.r, 1)
                this.drawCorner(cairo);
                cairo.fill();
            },
        })

        let window = Widget.Window({
            monitor,
            name: `corner${CairoCorner.position}${monitor}`,
            anchor: CairoCorner.position.toLowerCase().split('-'),
            class_name: "unset",
            exclusivity: 'normal',
            visible: true,
            child: drawingArea,
            setup: (self) => self.input_shape_combine_region(new cairo10.Region()),
        });
        console.log(`Adding ${window.name} with radius: ${radius} | Color:${JSON.stringify(color)}`);
        return window;
    }

    private drawCorner(cairo: cairo10.Context) {
        const radius = PaletteManager.getRounding();
        const arcParams: Record<CornerPosition, { x: number; y: number; startAngle: number; endAngle: number; lineToX: number; lineToY: number }> = {
            [CornerPosition.TopLeft]: { x: radius, y: radius, startAngle: Math.PI, endAngle: 3 * Math.PI / 2, lineToX: 0, lineToY: 0 },
            [CornerPosition.TopRight]: { x: 0, y: radius, startAngle: 3 * Math.PI / 2, endAngle: 2 * Math.PI, lineToX: radius, lineToY: 0 },
            [CornerPosition.BottomLeft]: { x: radius, y: 0, startAngle: Math.PI / 2, endAngle: Math.PI, lineToX: 0, lineToY: radius },
            [CornerPosition.BottomRight]: { x: 0, y: 0, startAngle: 0, endAngle: Math.PI / 2, lineToX: radius, lineToY: radius },
        };

        const params = arcParams[CairoCorner.position];
        cairo.arc(params.x, params.y, r, params.startAngle, params.endAngle);
        cairo.lineTo(params.lineToX, params.lineToY);
    }
}