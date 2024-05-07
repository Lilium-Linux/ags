import Gdk from "gi://Gdk";
import Gtk from "@girs/gtk-3.0";

export class MonitorManager {
    public static spawnOnMonitors(widget: any) {
        const n = Gdk.Display.get_default()?.get_n_monitors() || 1
        return MonitorManager.range(n, 0).flatMap(widget);
    }

    private static range(length: number, start = 1) {
        return Array.from({ length }, (_, i) => i + start);
    }
}