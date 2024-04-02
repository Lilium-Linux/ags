//import { LayoutManager } from "layout-manager/LayoutManager"


function TestBar(){
    return Widget.Window({
        anchor: ["top", "right", "left"],//LayoutManager.GetAnchor()
        exclusivity: "exclusive",
        child: Widget.Slider(),
    })
}

App.config({
    windows: [TestBar()]
})