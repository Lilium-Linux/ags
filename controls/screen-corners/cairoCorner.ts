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

export class CairoCorner{
    public getWindow(parent: Gtk.Window, monitor: number, position: CornerPosition): Gtk.Window
    {
        const radius = PaletteManager.getRounding();
        //const color = widget.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL);
        // const color = PaletteManager.hexToRgb(PaletteManager.Palette["$color-50"]);
        const drawingArea = Widget.DrawingArea({
            widthRequest: radius,
            heightRequest: radius,
            hpack: 'start',
            vpack: 'end',
            drawFn: (self, cr, w, h) => {
                //cr.setSourceRGBA(color.red, color.green, color.blue, 1)
                //cr.setSourceRGBA(color?.r, color?.g, color?.b, 1)
                cr.arc(radius,0, radius, Math.PI / 2, Math.PI);
                cr.lineTo(0, radius);
                cr.fill();
            },
        })

        return Widget.Window({
            monitor,
            name: `corner${position + monitor}`,
            anchor: 'bottom left'.split(' '),
            class_name: "unset",
            exclusivity: 'normal',
            visible: true,
            child: drawingArea,
            setup: (self) => self.input_shape_combine_region(new cairo10.Region()),
        });
    }
}