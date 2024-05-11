import Gdk from "gi://Gdk";
import Gtk from "@girs/gtk-3.0";

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
}

export class MonitorManager {
    public static spawnOnMonitors(widget: (monitor: number) => Gtk.Window) : Gtk.Window[] {
        console.log("Looking for monitors...");
        const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
        console.log(`Monitors count: ${n}`);
        return range(0, n).flatMap(widget);
    }

    // private static range(length: number, start = 1) {
    //     return Array.from({ length }, (_, i) => i + start);
    // }
}