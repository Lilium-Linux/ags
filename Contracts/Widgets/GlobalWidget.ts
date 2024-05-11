import Gtk from "@girs/gtk-3.0";
import Gdk from "gi://Gdk";

export abstract class GlobalWidget{

    abstract buildWindow(monitor: number): Gtk.Window;
    static getWidgetsForMonitors(widgetClass: GlobalWidget) {
        const monitorsCount = Gdk.Display.get_default()?.get_n_monitors() || 1;
        const widgets: Gtk.Window[] = [];

        for (let i = 0; i < monitorsCount; i++)
            widgets[i] = widgetClass.buildWindow(i);

        return widgets;
    }
    static getWindowsForMonitors(widgetClass: GlobalWidget): Gtk.Window[] {
        const monitorsCount = Gdk.Display.get_default()?.get_n_monitors() || 1;
        return Array.from({ length: monitorsCount }, (_, i) => widgetClass.buildWindow(i));
    }
}