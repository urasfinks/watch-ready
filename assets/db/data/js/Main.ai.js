function MainRouter(){
    this.constructor = function(){
        var startLessState = bridge.getStorage("StartLessState", "");
        bridge.call("DbQuery", {
            "multiple": [
                {
                    "sql": "select * from data where key_data = ? and is_remove_data = 0 order by meta_data",
                    "args": ["Serial"],
                },
                {
                    "sql": "SELECT \n" +
                        "  d1.value_data AS less_sate,\n" +
                        "  d2.value_data AS less,\n" +
                        "  d2.uuid_data AS less_uuid,\n" +
                        "  d3.uuid_data AS serial_uuid,\n" +
                        "  d3.value_data AS serial\n" +
                        "FROM data d1\n" +
                        "INNER JOIN data d2 ON d1.parent_uuid_data = d2.uuid_data\n" +
                        "INNER JOIN data d3 ON d2.parent_uuid_data = d3.uuid_data\n" +
                        "  WHERE 1 = 1\n" +
                        "  AND d1.uuid_data = ? \n" +
                        "  AND d1.key_data = ?",
                    "args": [startLessState, "LessState"]
                }
            ],

            "onFetch": {
                "jsRouter": "Main.ai.js",
                "args": {
                    "includeStateData": true,
                    "method": "selectSerial"
                }
            }
        });
    };

    this.selectSerial = function(){
        var listSerial = bridge.args["fetchDb"][0];
        if (listSerial.length > 0) {
            var group = [];
            var state = [];
            var continueLess = this.createStartCard(bridge.args["fetchDb"][1]);
            if (continueLess["templateCustom"] !== "emptyStartCard") {
                state.push({
                    "templateCustom": "templateLabel",
                    "label": "Продолжить обучение"
                });
                state.push(continueLess);
            }
            for (var i = 0; i < listSerial.length; i++) {
                var serial = listSerial[i]["value_data"];
                serial["serialUuid"] = listSerial[i]["uuid_data"];
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
    };

    this.createStartCard = function(fetchDb) {
        if (fetchDb.length > 0) {
            var lessSate = JSON.parse(fetchDb[0]["less_sate"]);
            var less = JSON.parse(fetchDb[0]["less"]);
            var serial = JSON.parse(fetchDb[0]["serial"]);
            return {
                "templateCustom": "startCard",
                "lessName": less["label"] || "?",
                "serialGroup": serial["group"] || "?",
                "serialName": serial["label"] || "?",
                "lastScore": Math.max(lessSate["lastScore"], 0) || 0,
                "countSuccess": lessSate["countSuccess"] || 0,
                "countFail": lessSate["countFail"] || 0,
                "onTap": openLess(
                    fetchDb[0]["serial_uuid"],
                    fetchDb[0]["less_uuid"],
                    less["label"] || "?"
                )
            };
        }
        return {
            "templateCustom": "emptyStartCard"
        };
    }
}

bridge.addRouter(new MainRouter());

function getActiveTap(active, nameSerial, serialUuid, serialImageSrc) {
    if (active) {
        return {
            "sysInvoke": "NavigatorPush",
            "args": {
                "flutterType": "Notify",
                "link": {"template": "Serial.json", "data": serialUuid, "serialState": ("SerialState-" + serialUuid)},
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
                "onContextUpdate": {
                    "jsRouter": "Serial.ai.js",
                    "args": {
                        "includeAll": true,
                        "method": "onContextUpdate"
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

function openLess(serialUuid, lessUuid, windowLabel) {
    return {
        "sysInvoke": "NavigatorPush",
        "args": {
            "flutterType": "Notify",
            "link": {"template": "Less.json", "data": lessUuid},
            "lazySync": [lessUuid],
            "serialUuid": serialUuid,
            "windowLabel": windowLabel,
            "context": {
                "key": "inputLessData",
                "data": {
                    "template": {
                        "flutterType": "Scaffold",
                        "appBar": {
                            "flutterType": "AppBar",
                            "title": {"flutterType": "Text", "label": windowLabel}
                        }
                    }
                }
            },
            "constructor": {
                "jsRouter": "Less.ai.js",
                "args": {
                    "includeStateData": true,
                    "method": "constructor"
                }
            },
            "onContextUpdate": {
                "jsRouter": "Less.ai.js",
                "args": {
                    "includeAll": true,
                    "method": "onContextUpdate"
                }
            }
        }
    };
}