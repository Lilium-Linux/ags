const screen = Widget.Window({
    name: 'transition',
    anchor: ['top', 'left', 'right', ],
    child: Widget.DrawingArea(

    ),
})

App.config({
    style: `${App.configDir}/transition.css`,
    windows: [screen]
})