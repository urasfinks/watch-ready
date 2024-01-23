function SerialRouter() {
    this.onContextUpdate = function () {
        bridge.log(bridge.contextMap["inputSerialData"]);
        if (bridge.args["contextKey"] == "inputSerialData") {
            var listSql = [];
            if (bridge.contextMap["inputSerialData"]["data"] != undefined) {
                listSql.push({
                    "sql": "SELECT d2.* FROM data d1 \n" +
                        "INNER JOIN data d2 ON d2.parent_uuid_data = d1.uuid_data\n" +
                        "WHERE 1 = 1\n" +
                        "  AND d1.parent_uuid_data = ?\n" +
                        "  AND d1.key_data = ?\n" +
                        "  AND d1.is_remove_data = 0\n" +
                        "  AND d2.is_remove_data = 0\n" +
                        "  AND d2.key_data = ?\n",
                    "args": [bridge.pageArgs["link"]["data"], "Less", "LessState"]
                });
            } else {
                //Надо всегда, что бы был первый sql не важно какой
                listSql.push({
                    "sql": "select 1",
                    "args": []
                });
            }
            if (bridge.contextMap["inputSerialData"]["serialState"] != undefined) {
                listSql.push({
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
                        "  AND d1.is_remove_data = 0\n" +
                        "  AND d2.is_remove_data = 0\n" +
                        "  AND d3.is_remove_data = 0\n" +
                        "  AND d1.key_data = ?",
                    "args": [bridge.contextMap["inputSerialData"]["serialState"]["startLessState"], "LessState"]
                });
            }

            if (listSql.length > 0) {
                bridge.call("DbQuery", {
                    "multiple": listSql,
                    "onFetch": {
                        "jsRouter": "Serial.ai.js",
                        "args": {
                            "includeAll": true,
                            "method": "selectLessState"
                        }
                    }
                });
            }
        }
    };

    this.selectLessState = function () {
        bridge.log(bridge.args["fetchDb"]);
        var showButtonResetScore = false;
        var seasonList = bridge.contextMap["inputSerialData"]["data"]["seasonList"];
        var listLessState = bridge.args["fetchDb"][0];

        var mapState = {};
        for (var i = 0; i < listLessState.length; i++) {
            mapState[listLessState[i]["parent_uuid_data"]] = listLessState[i]["value_data"];
        }

        var state = [];
        var continueLess = this.createStartCard(bridge.args["fetchDb"][1]);
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
    };

    this.resetLessState = function () {
        bridge.call("DbQuery", {
            "sql": "UPDATE data SET value_data = ?, revision_data = 0 WHERE key_data = ? AND parent_uuid_data IN (SELECT uuid_data FROM data WHERE key_data = ? AND parent_uuid_data = ? AND is_remove_data = 0)",
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
    };

    this.createStartCard = function(fetchDb) {
        if (fetchDb != undefined && fetchDb.length > 0) {
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

bridge.addRouter(new SerialRouter());

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