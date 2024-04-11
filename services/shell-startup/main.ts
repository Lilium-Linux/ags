import "resources/Global"
import { BarView } from "../../mvvm/views/bar/bar-view";

App.config({
    windows: [
        BarView.BuildBar(0),
        BarView.BuildBar(1),
        BarView.BuildBar(2),
    ]
})