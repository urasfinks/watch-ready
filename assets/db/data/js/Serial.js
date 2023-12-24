if (bridge.args["switch"] === "onContextUpdate") {
    if (bridge.args["contextKey"] == "inputSerialData") {
        if (
            bridge.contextMap["inputSerialData"]["data"] != undefined
            && bridge.contextMap["inputSerialData"]["serialState"] != undefined
        ) {
            bridge.call("DbQuery", {
                "multiple": [
                    {
                        "sql": "SELECT d2.* FROM data d1 \n" +
                            "INNER JOIN data d2 ON d2.parent_uuid_data = d1.uuid_data\n" +
                            "WHERE 1 = 1\n" +
                            "  AND d1.parent_uuid_data = ?\n" +
                            "  AND d1.key_data = ?\n" +
                            "  AND d2.key_data = ?\n",
                        "args": [bridge.pageArgs["link"]["data"], "Less", "LessState"]
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
                        "args": [bridge.contextMap["inputSerialData"]["serialState"]["startLessState"], "LessState"]
                    }
                ],
                "onFetch": {
                    "jsInvoke": "Serial.js",
                    "args": {
                        "includeAll": true,
                        "switch": "selectLessState"
                    }
                }
            });
        }
    }
}

function createStartCard(fetchDb) {
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

if (bridge.args["switch"] === "selectLessState") {
    var showButtonResetScore = false;
    var seasonList = bridge.contextMap["inputSerialData"]["data"]["seasonList"];
    var listLessState = bridge.args["fetchDb"][0];

    var mapState = {};
    for (var i = 0; i < listLessState.length; i++) {
        mapState[listLessState[i]["parent_uuid_data"]] = listLessState[i]["value_data"];
    }

    var state = [];
    var continueLess = createStartCard(bridge.args["fetchDb"][1]);
    if (continueLess["templateCustom"] !== "emptyStartCard") {
        state.push({
            "templateCustom": "templateSeason",
            "label": "Продолжить обучение"
        });
        state.push(continueLess);
    }

    for (var i = 0; i < seasonList.length; i++) {
        state.push({
            "templateCustom": "templateSeason",
            "label": seasonList[i]["label"]
        });
        for (var j = 0; j < seasonList[i]["episodeList"].length; j++) {
            var lessState = mapState[seasonList[i]["episodeList"][j]["uuid"]];
            if (lessState != undefined && lessState["lastScore"] != undefined && lessState["lastScore"] != -1) {
                showButtonResetScore = true;
                state.push({
                    "templateCustom": "templateLessStat",
                    "label": seasonList[i]["episodeList"][j]["label"],
                    "countFail": lessState["countFail"],
                    "lastScore": lessState["lastScore"],
                    "countSuccess": lessState["countSuccess"],
                    "onPressed": openLess(
                        bridge.pageArgs["link"]["data"],
                        seasonList[i]["episodeList"][j]["uuid"],
                        seasonList[i]["episodeList"][j]["label"]
                    )
                });
            } else {
                state.push({
                    "templateCustom": "templateLess",
                    "label": seasonList[i]["episodeList"][j]["label"],
                    "onPressed": openLess(
                        bridge.pageArgs["link"]["data"],
                        seasonList[i]["episodeList"][j]["uuid"],
                        seasonList[i]["episodeList"][j]["label"]
                    )
                });
            }
        }
    }
    bridge.call("SetStateData", {
        "map": {
            "showButtonResetScore": showButtonResetScore,
            "listLess": state
        }
    });
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
                "jsInvoke": "Less.js",
                "args": {
                    "includeStateData": true,
                    "switch": "constructor"
                }
            },
            "onContextUpdate": {
                "jsInvoke": "Less.js",
                "args": {
                    "includeAll": true,
                    "switch": "onContextUpdate"
                }
            }
        }
    };
}

if (bridge.args["switch"] === "resetLessState") {
    bridge.call("DbQuery", {
        "sql": "UPDATE data SET value_data = ?, revision_data = 0 WHERE key_data = ? AND parent_uuid_data IN (SELECT uuid_data FROM data WHERE key_data = ? AND parent_uuid_data = ?)",
        "args": [
            JSON.stringify({"lastScore": -1, "countSuccess": 0, "countFail": 0}),
            "LessState",
            "Less",
            bridge.pageArgs["link"]["data"]
        ]
    });
    setNewLessState("", bridge.pageArgs["link"]["data"]);
    bridge.call("PageReload", {
        "case": "current"
    });
}

function setNewLessState(newLessStateUUid, serialUuid) {
    // Состояние сериала может уже существовать, поэтому точечно перезаписывем SerialState в режиме
    // updateIfExist = true и onUpdateOverlayJsonValue = true
    bridge.call("DataSourceSet", {
        "uuid": "SerialState-" + serialUuid,
        "parent": serialUuid,
        "value": {
            "startLessState": newLessStateUUid
        },
        "type": "userDataRSync",
        "key": "SerialState",
        "updateIfExist": true,
        "onUpdateOverlayJsonValue": true
    });
    bridge.call("SetStorage", {
        "map": {
            "StartLessState": newLessStateUUid
        }
    });
}