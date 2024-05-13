// NOTE! I use ts-nocheck because Cairo is not an introspectable lib

// ts-nocheck

//import { Anchor, LayoutManager } from "../../services/layout-manager/LayoutManager";
import { GlobalWidget } from "../../Contracts/Widgets/GlobalWidget";
import Gtk from "@girs/gtk-3.0/gtk-3.0";

export class Corners extends GlobalWidget{
    buildWindow(monitor: number): Gtk.Window
    {
        // const drawingArea = Widget.DrawingArea({
        //     widthRequest: 50,
        //     heightRequest: 50,
        //     hpack: 'start',
        //     vpack: 'end',
        //     drawFn: (self, cr, w, h) =>
        //     {
        //         const center = {
        //             x: w / 2,
        //             y: h / 2,
        //         };
        //
        //         cr.setSourceRGBA(1, 1, 1, 1)
        //         cr.setLineWidth(8)
        //         cr.arc(center.x, center.y, 3, 0, Math.PI * 2)
        //         cr.stroke()
        //     },
        // })

        const drawingArea = Widget.DrawingArea({
            hpack: place.includes('left') ? 'start' : 'end',
            vpack: place.includes('top') ? 'start' : 'end',
            setup: (widget) => Utils.timeout(1, () => {
                const c = widget.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL);
                const r = widget.get_style_context().get_property('border-radius', Gtk.StateFlags.NORMAL);
                widget.set_size_request(r, r);
                widget.connect('draw', Lang.bind(widget, (widget, cr) => {
                    const c = widget.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL);
                    const r = widget.get_style_context().get_property('border-radius', Gtk.StateFlags.NORMAL);
                    // const borderColor = widget.get_style_context().get_property('color', Gtk.StateFlags.NORMAL);
                    // const borderWidth = widget.get_style_context().get_border(Gtk.StateFlags.NORMAL).left; // ur going to write border-width: something anyway
                    widget.set_size_request(r, r);

                    switch (place) {
                        case 'topleft':
                            cr.arc(r, r, r, Math.PI, 3 * Math.PI / 2);
                            cr.lineTo(0, 0);
                            break;

                        case 'topright':
                            cr.arc(0, r, r, 3 * Math.PI / 2, 2 * Math.PI);
                            cr.lineTo(r, 0);
                            break;

                        case 'bottomleft':
                            cr.arc(r, 0, r, Math.PI / 2, Math.PI);
                            cr.lineTo(0, r);
                            break;

                        case 'bottomright':
                            cr.arc(0, 0, r, 0, Math.PI / 2);
                            cr.lineTo(r, r);
                            break;
                    }

                    cr.closePath();
                    cr.setSourceRGBA(c.red, c.green, c.blue, c.alpha);
                    cr.fill();
                    // cr.setLineWidth(borderWidth);
                    // cr.setSourceRGBA(borderColor.red, borderColor.green, borderColor.blue, borderColor.alpha);
                    // cr.stroke();
                }));
            })
        });

        return Widget.Window({
            monitor,
            name: `corner${monitor}`,
            anchor: 'bottom left'.split(' '),
            class_name: "unset",
            exclusivity: 'ignore',
            visible: true,
            child: drawingArea,
        });
    }
}