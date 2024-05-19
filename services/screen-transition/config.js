import Gdk from "gi://Gdk";

const screen = Widget.Window({
    name: 'transition',
    class_name: "animated",
    layer: "overlay",
    anchor: ['top', 'left', 'right', 'bottom'],
    exclusivity: "ignore",
    child: Widget.Box({
        class_name: "transition"
    })
    // child: Widget.DrawingArea(
    //
    // ),
})

const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
function forMonitors(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).map(widget).flat(1);
}

App.config({
    style: `${App.configDir}/transition.css`,
    windows: [screen]
})