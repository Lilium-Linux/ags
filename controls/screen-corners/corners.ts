// NOTE! I use ts-nocheck because Cairo is not an introspectable lib

// @ts-nocheck

//import { Anchor, LayoutManager } from "../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
import Gtk from "@girs/gtk-3.0/gtk-3.0";

export class Corners extends GlobalWidget{
    buildWindow(monitor: number): Gtk.Window
    {
        const drawingArea = Widget.DrawingArea({
            widthRequest: 50,
            heightRequest: 50,
            drawFn: (self, cr, w, h) =>
            {
                const center = {
                    x: w / 2,
                    y: h / 2,
                };

                cr.setSourceRGBA(255, 0, 0, 1)
                cr.draw_rectangle(50, 50, 100, 100);
                cr.stroke();
            },
        })

        return Widget.Window({
            monitor,
            child: drawingArea,
        });
    }
}