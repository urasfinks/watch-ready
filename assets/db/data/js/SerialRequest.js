if (bridge.args["switch"] === "request") {
    bridge.call("Hide", {"case": "keyboard"});
    bridge.call("Show", {"case": "customLoader"});
    bridge.call("Http", {
        "uri": "/AppComment",
        "body": {
            "email": bridge.state["main"]["mail"],
            "name":"-",
            "subject":"Потребность в сериале",
            "message":bridge.state["main"]["serial"],
            "g-recaptcha-response":"app-api"
        },
        "onResponse": {
            "jsInvoke": "SerialRequest.js",
            "args": {
                "switch": "GetResponse"
            }
        }
    });
}

if (bridge.args["switch"] == "GetResponse") {
    bridge.call("Hide", {"case": "customLoader"});
    if (bridge.checkHttpResponse([])) {
        bridge.call("NavigatorPush", {
            "type": "dialog",
            "blur": true,
            "uuid": "Popup.json"
        });
    }
}