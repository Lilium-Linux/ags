import Gdk from "gi://Gdk";
import Gtk from "@girs/gtk-3.0";

export function range(length: number, start = 1) {
    console.log("range() called");
    return Array.from({ length }, (_, i) => i + start)
}

export class MonitorManager {
    public static spawnOnMonitors(widget: (monitor: number) => Gtk.Window) {
        console.log("Looking for monitors...");
        const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
        console.log(`Monitors count: ${n}`);
        return range(n, 0).flatMap(widget);
    }

    // private static range(length: number, start = 1) {
    //     return Array.from({ length }, (_, i) => i + start);
    // }
}