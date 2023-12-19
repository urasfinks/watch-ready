if (bridge.args["switch"] === "constructor") {
    bridge.call("DbQuery", {
        "sql": "SELECT d2.* FROM data d1 \n" +
            "INNER JOIN data d2 ON d2.parent_uuid_data = d1.uuid_data\n" +
            "WHERE 1 = 1\n" +
            "  AND d1.parent_uuid_data = ?\n" +
            "  AND d1.key_data = ?\n" +
            "  AND d2.key_data = ?\n",
        "args": [bridge.pageArgs["link"]["data"], "Less", "LessState"],
        "onFetch": {
            "jsInvoke": "Serial.js",
            "args": {
                "includeAll": true,
                "switch": "selectLessState"
            }
        }
    });
}

if (bridge.args["switch"] === "selectLessState") {
    bridge.call("SetStateData", {
        "state": "selectLessState",
        "map": {
            "listLessState": bridge.args["fetchDb"]
        }
    });
    if (bridge.contextMap["inputSerialData"] != undefined && bridge.contextMap["inputSerialData"]["data"] != undefined) {
        update(bridge.contextMap["inputSerialData"]["data"]["seasonList"], bridge.args["fetchDb"]);
    }
}

if (bridge.args["switch"] === "onContextUpdate") {
    if (
        bridge.args["contextKey"] == "inputSerialData"
        && bridge.contextMap["inputSerialData"]["data"] != undefined
    ) {
        //bridge.log(bridge.contextMap["inputSerialData"]["data"]);
        var listLessState = bridge.selector(bridge.state, ["selectLessState", "listLessState"], []);
        update(bridge.contextMap["inputSerialData"]["data"]["seasonList"], listLessState);
    }
}

function update(seasonList, listLessState) {
    var mapState = {};
    for (var i = 0; i < listLessState.length; i++) {
        mapState[listLessState[i]["parent_uuid_data"]] = listLessState[i]["value_data"];
    }
    //bridge.log(mapState);
    var state = [];
    for (var i = 0; i < seasonList.length; i++) {
        state.push({
            "templateCustom": "templateSeason",
            "label": seasonList[i]["label"]
        });
        for (var j = 0; j < seasonList[i]["episodeList"].length; j++) {
            if (mapState[seasonList[i]["episodeList"][j]["uuid"]] != undefined) {
                var lessState = mapState[seasonList[i]["episodeList"][j]["uuid"]];
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