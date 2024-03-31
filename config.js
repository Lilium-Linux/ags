const percent = Variable(0);

function RightClickMenu() {
    return Widget.ToggleButton({
        "onToggled": ({ active }) => print(active),
    })
}

function Left(){
    return Widget.Button({
        hpack: "start",
        height_request: 100,
        label: percent.bind().as(String),
    })
}

function Center(){
    return Widget.Slider({
        width_request: 300,
        value: percent.bind(),
    })
}

function Right(){
    return Widget.Button({
        hpack: "end",
        label: 'Right',
    })
}


const Bar = () => Widget.Window({
    name: 'bar',
    class_name: 'bar',
    anchor: ['bottom', 'left', 'right'],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
        start_widget: Left(),
        center_widget: Center(),
        end_widget: RightClickMenu(),
    }),
})


App.config({
    windows: [
        Bar(),
    ],
})