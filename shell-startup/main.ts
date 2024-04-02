//import { LayoutManager } from "layout-manager/LayoutManager"


function TestBar(){
    return Widget.Window({
        anchor: ["top", "right", "left"],//LayoutManager.GetAnchor()
        exclusivity: "exclusive",
        child: Widget.Slider(),
    })
}

function TestAddonWindow() {
    return Widget.Window({
        anchor: ["top", "right", "left"],//LayoutManager.GetAnchor()
        exclusivity: "exclusive",
        child: Widget.Label({
            label: "Hello! im Addon Window!"
        }),
    })
}

App.config({
    windows: [TestBar(), TestAddonWindow()]
})