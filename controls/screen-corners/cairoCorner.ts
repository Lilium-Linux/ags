// NOTE! I use ts-nocheck because Cairo is not an introspectable lib
// @ts-nocheck
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
//import Gtk from "@girs/gtk-3.0/gtk-3.0";
import Gtk from "../../types/@girs/gtk-3.0";
import cairo10 from "../../types/@girs/cairo-1.0/cairo-1.0";
import { PaletteManager } from "../../services/configuration-system/palette-manager";

export enum CornerPosition {
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight",
}

export class CairoCorner extends GlobalWidget{
    buildWindow(monitor: number): Gtk.Window {
        const radius = PaletteManager.getRounding();
        const color = PaletteManager.hexToFloatRgb(PaletteManager.Palette["$color-950"]);
        const drawingArea = Widget.DrawingArea({
            widthRequest: radius,
            heightRequest: radius,
            hpack: 'start',
            vpack: 'end',
            drawFn: (self, cr, w, h) => {
                cr.setSourceRGBA(color.r, color.g, color.r, 1)
                cr.arc(radius,0, radius, Math.PI / 2, Math.PI);
                cr.lineTo(0, radius);
                cr.fill();
            },
        })

        let window = Widget.Window({
            monitor,
            name: `corner${monitor}`,
            anchor: 'bottom left'.split(' '),
            class_name: "unset",
            exclusivity: 'normal',
            visible: true,
            child: drawingArea,
            setup: (self) => self.input_shape_combine_region(new cairo10.Region()),
        });
        console.log(`Adding ${window.name} with radius: ${radius} | Color:${JSON.stringify(color)}`);
        return window;

    }
}