if (bridge.args["switch"] === "request") {
    bridge.call("NavigatorPush", {
        "type": "dialog",
        "blur": true,
        "uuid": "Popup.json"
    });
}