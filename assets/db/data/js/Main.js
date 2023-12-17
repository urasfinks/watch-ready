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

    // bridge.call("SetStateData", {
    //     "map": {
    //         "listSerial": [
    //             {
    //                 "templateCustom": "templateLabel",
    //                 "label": "Детективные сериалы"
    //             },
    //             {
    //                 "templateCustom": "templateSerialLine",
    //                 "label1": "Парижская полиция 1905",
    //                 "label2": "Riverdale",
    //                 "src1":"pp1905.jpg",
    //                 "src2":"riverdale.jpg",
    //                 "extra1": "",
    //                 "extra2": "templateLockScreen",
    //                 "onTap1": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "Less.json",
    //                         "serial_uuid": "a1b3c3"
    //                     }
    //                 },
    //                 "onTap2": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "SerialRequest.json",
    //                         "message": "Riverdale"
    //                     }
    //                 }
    //             },
    //             {
    //                 "templateCustom": "templateLabel",
    //                 "label": "Учится никогда не поздно"
    //             },
    //             {
    //                 "templateCustom": "templateSerialLine",
    //                 "label1": "Капкан",
    //                 "label2": "Сексуальная жизнь студентик",
    //                 "src1":"kapkan.jpeg",
    //                 "src2":"szs.jpeg",
    //                 "extra1": "templateLockScreen",
    //                 "extra2": "templateLockScreen",
    //                 "onTap1": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "SerialRequest.json",
    //                         "message": "Капкан"
    //                     }
    //                 },
    //                 "onTap2": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "SerialRequest.json",
    //                         "message": "Сексуальная жизнь студентик"
    //                     }
    //                 }
    //             },
    //             {
    //                 "templateCustom": "templateLabel",
    //                 "label": "Лучшие проекты НВО/НВО Max"
    //             },
    //             {
    //                 "templateCustom": "templateSerialLine",
    //                 "label1": "Супермен",
    //                 "label2": "Настоящий датектив",
    //                 "src1":"superman.webp",
    //                 "src2":"td.webp",
    //                 "extra1": "templateLockScreen",
    //                 "extra2": "templateLockScreen",
    //                 "onTap1": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "SerialRequest.json",
    //                         "message": "Супермен"
    //                     }
    //                 },
    //                 "onTap2": {
    //                     "sysInvoke": "NavigatorPush",
    //                     "args": {
    //                         "uuid": "SerialRequest.json",
    //                         "message": "Настоящий датектив"
    //                     }
    //                 }
    //             },
    //         ]
    //     }
    // });
}

if (bridge.args["switch"] === "selectSerial") {
    if (bridge.args["fetchDb"].length > 0) {
        var group = [];
        var state = [];
        for (var i = 0; i < bridge.args["fetchDb"].length; i++) {
            var serial = bridge.args["fetchDb"][i]["value_data"];
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
                    "onTap1": getActiveTap(active1, group[i].list[j]["label"]),
                    "onTap2":getActiveTap(active2, get(group[i].list[j + 1], "label"))
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

function getActiveTap(active, nameSerial, serialUuid) {
    if (active) {
        return {
            "flutterType": "Notify",
            "link": {"template": "Serial.json", "data": serialUuid},
            "windowLabel": nameSerial,
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
                    "includeStateData": true,
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