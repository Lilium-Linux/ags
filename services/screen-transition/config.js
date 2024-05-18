import Gdk from "../../types/@girs/gdk-3.0/gdk-3.0";

const screen = Widget.Window({
    name: 'transition',
    layer: "overlay",
    anchor: ['top', 'left', 'right', 'bottom'],
    child: Widget.Calendar()
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
    windows: [...forMonitors(screen)]
})