if (bridge.args["switch"] === "constructor") {
    bridge.call("DbQuery", {
        "sql": "select * from data where key_data = ? and is_remove_data = 0 order by meta_data",
        "args": ["Serial"],
        "onFetch": {
            "jsInvoke": "Main.js",
            "args": {
                "includeStateData": true,
                "switch": "selectSerial"
            }
        }
    });
}

if (bridge.args["switch"] === "selectSerial") {
    if (bridge.args["fetchDb"].length > 0) {
        var group = [];
        var state = [];
        for (var i = 0; i < bridge.args["fetchDb"].length; i++) {
            var serial = bridge.args["fetchDb"][i]["value_data"];
            serial["serialUuid"] = bridge.args["fetchDb"][i]["uuid_data"];
            var curGroup = getGroup(group, serial["group"]);
            curGroup.list.push(serial);
        }
        for (var i = 0; i < group.length; i++) {
            state.push({
                "templateCustom": "templateLabel",
                "label": group[i].name
            });
            for (var j = 0; j < group[i].list.length; j += 2) {
                var active1 = group[i].list[j]["active"];
                var active2 = get(group[i].list[j + 1], "active") == "true";
                state.push({
                    "templateCustom": "templateSerialLine",
                    "label1": group[i].list[j]["label"],
                    "label2": get(group[i].list[j + 1], "label"),
                    "src1": group[i].list[j]["srcPoster"],
                    "src2": get(group[i].list[j + 1], "srcPoster"),
                    "childKey1": active1 ? "" : "templateLockScreen",
                    "childKey2": active2 ? "" : "templateLockScreen",
                    "onTap1": getActiveTap(
                        active1,
                        group[i].list[j]["label"],
                        group[i].list[j]["serialUuid"],
                        group[i].list[j]["srcPoster"]
                    ),
                    "onTap2": getActiveTap(
                        active2,
                        get(group[i].list[j + 1], "label"),
                        get(group[i].list[j + 1], "serialUuid"),
                        get(group[i].list[j + 1], "srcPoster")
                    )
                });
            }
        }
        bridge.call("SetStateData", {
            "map": {
                "listSerial": state
            }
        });
        //bridge.log(state);
    }
}

function getActiveTap(active, nameSerial, serialUuid, serialImageSrc) {
    if (active) {
        return {
            "sysInvoke": "NavigatorPush",
            "args": {
                "flutterType": "Notify",
                "link": {"template": "Serial.json", "data": serialUuid},
                "windowLabel": nameSerial,
                "serialImageSrc": serialImageSrc,
                "context": {
                    "key": "inputSerialData",
                    "data": {
                        "template": {
                            "flutterType": "Scaffold",
                            "appBar": {
                                "flutterType": "AppBar",
                                "title": {"flutterType": "Text", "label": nameSerial}
                            }
                        }
                    }
                },
                "constructor": {
                    "jsInvoke": "Serial.js",
                    "args": {
                        "includeAll": true,
                        "switch": "constructor"
                    }
                },
                "onContextUpdate": {
                    "jsInvoke": "Serial.js",
                    "args": {
                        "includeAll": true,
                        "switch": "onContextUpdate"
                    }
                }
            }
        };
    } else {
        return {
            "sysInvoke": "NavigatorPush",
            "args": {
                "uuid": "SerialRequest.json",
                "message": nameSerial
            }
        }
    }
}

function get(obj, key) {
    if (obj != undefined) {
        return obj[key];
    }
    return "";
}

function getGroup(group, name) {
    for (var i = 0; i < group.length; i++) {
        if (group[i].name === name) {
            return group[i];
        }
    }
    group.push({
        "name": name,
        "list": []
    });
    return group[group.length - 1];
}