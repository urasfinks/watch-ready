function LessRouter() {
    this.onContextUpdate = function () {
        //bridge.log("onContextUpdate: " + JSON.stringify(bridge.args));
        if (
            bridge.args["contextKey"] == "inputLessData"
            && bridge.contextMap["inputLessData"]["data"] != undefined
            && bridge.contextMap["inputLessData"]["data"]["children"] != undefined
        ) {

            var currentIndex = bridge.selector(bridge.state, ["sw", "index"], 0);
            var isFinish = bridge.selector(bridge.state, ["sw", "finish"], false);
            var listCard = genListCard(bridge.contextMap["inputLessData"]["data"]["children"]);
            bridge.call("SetStateData", {
                "state": "card",
                "map": {
                    "card": listCard
                }
            });
            //bridge.log("SET speech: "+listCard[currentIndex].speech);
            bridge.call("SetStateData", {
                "state": "speech",
                "map": {
                    "speech": listCard[currentIndex].speech
                }
            });
        }
    };

    this.onFinish = function () {
        // var gUuid = getGeneralUuid();
        var curPrc = Math.floor((bridge.state["sw"]["swiped"]["right"] || 0) * 100 / bridge.state["sw"]["size"]);
        saveLessState(curPrc);
    };

    this.onChangeAutoplay = function () {
        var autoPlay = bridge.selector(bridge.state, ["autoPlay", "autoPlay"], true);
        bridge.call("SetStorage", {
            "map": {
                "autoPlay": autoPlay.toString()
            }
        });
    };

    this.onFlip = function () {
        bridge.call("SetStateData", {
            "state": "flip",
            "map": {
                "flipOpacity": 0
            }
        });
    };

    this.onFetchLessState = function () {
        var lastValue = bridge.args["fetchDb"].length > 0 ? bridge.args["fetchDb"][0]["value_data"] : {};
        if (typeof lastValue === "string") {
            lastValue = {};
        }
        lastValue["lastScore"] = bridge.args["lastScore"];
        if (lastValue["countSuccess"] == undefined) {
            lastValue["countSuccess"] = 0;
        }
        if (lastValue["countFail"] == undefined) {
            lastValue["countFail"] = 0;
        }
        if (bridge.args["lastScore"] == 100) {
            lastValue["countSuccess"]++;
            var gUuid = getGeneralUuid();
            bridge.call("DbQuery", {
                "sql": "WITH sq1 AS (\n" +
                    "SELECT \n" +
                    "  uuid_data, type_data, value_data, \n" +
                    "  ROW_NUMBER () OVER (ORDER BY meta_data) AS row_num\n" +
                    " FROM data \n" +
                    " WHERE 1 = 1\n" +
                    "  AND parent_uuid_data = ?\n" +
                    "  AND key_data = ?\n" +
                    "  AND is_remove_data = 0\n" +
                    " ORDER BY meta_data\n" +
                    ")\n" +
                    "SELECT uuid_data, type_data, value_data FROM sq1 WHERE row_num > (SELECT row_num FROM sq1 WHERE uuid_data = ?) LIMIT 1",
                "args": [gUuid["serialUuid"], "Less", gUuid["lessUuid"]],
                "onFetch": {
                    "jsRouter": "Less.ai.js",
                    "args": {
                        "includeAll": true,
                        "lastScore": lastValue["lastScore"],
                        "serialUuid": gUuid["serialUuid"],
                        "method": "onFetchNextState"
                    }
                }
            });
        } else {
            lastValue["countFail"]++;
            bridge.call("NavigatorPush", {
                "type": "dialog",
                "blur": true,
                "uuid": "PopupLessRepeat.json",
                "message": lastValue["lastScore"] + "%"
            });
        }

        bridge.call("DataSourceSet", {
            "uuid": bridge.args["fetchDb"][0]["uuid_data"],
            "value": lastValue,
            "type": "userDataRSync",
            "updateIfExist": true,
            "onUpdateOverlayJsonValue": true
        });
    };

    this.onFetchNextState = function () {
        if (bridge.args["fetchDb"].length > 0) {
            bridge.call("NavigatorPush", {
                "type": "dialog",
                "blur": true,
                "uuid": "PopupLessComplete.json",
                "message": bridge.args["lastScore"] + "%",
                "nextLessUuid": bridge.args["fetchDb"][0]["uuid_data"],
                "windowLabel": bridge.args["fetchDb"][0]["value_data"]["label"],
                "serialUuid": bridge.args["serialUuid"]
            });
        } else {
            setNewLessState("", bridge.args["serialUuid"]);
            bridge.call("NavigatorPush", {
                "type": "dialog",
                "blur": true,
                "uuid": "PopupSerialComplete.json"
            });
        }
    };

    this.nextLess = function () {
        setNewLessState(bridge.args["nextLessUuid"], bridge.args["serialUuid"]);
        bridge.call("NavigatorPop", {
            "reloadParent": true,
            "count": 2
        });
        var gUuid = getGeneralUuid();
        bridge.call("NavigatorPush", getNavigatorPush(gUuid["serialUuid"], bridge.args["nextLessUuid"], bridge.args["windowLabel"]));
    }

    this.onSwipeCompleted = function () {
        var listCard = bridge.selector(bridge.state, ["card", "card"], []);
        var swipedIndex = bridge.selector(bridge.state, ["sw", "swipedIndex"], -1);
        bridge.call("Audio", {
            "case": "stop"
        });
        // Последний свайп уже не имеет карточек, так как индекс уже за границей
        var speech = "";
        if (listCard[swipedIndex + 1] != undefined) {
            speech = listCard[swipedIndex + 1].speech;
        }
        bridge.call("SetStateData", {
            "state": "speech",
            "map": {
                "speech": speech
            }
        });

        // При первом свайпе сохранять LessState.uuid в [StartLessState, SerialState.data.startLessState]
        if (swipedIndex == 0) {
            var gUuid = getGeneralUuid();
            var lessStateUuid = "LessState-" + gUuid["lessUuid"];
            //Что бы не проверять наличие LessState будем его каждый раз сохронять с флагом updateIfExist = false
            bridge.call("DataSourceSet", {
                "uuid": lessStateUuid,
                "parent": gUuid["lessUuid"],
                "value": {},
                "type": "userDataRSync",
                "key": "LessState",
                "updateIfExist": false //Если уже есть, мы ничего не будем делать
            });
            setNewLessState(lessStateUuid, gUuid["serialUuid"]);
        }
        bridge.call("SetStateData", {
            "state": "flip",
            "map": {
                "flipOpacity": 0
            }
        });
    };

    this.prev = function () {
        var listCard = bridge.selector(bridge.state, ["card", "card"], []);
        var currentIndex = bridge.selector(bridge.state, ["sw", "index"], 0);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        bridge.call("Controller", {
            "controller": "sw",
            "case": "index",
            "index": currentIndex,
            "direction": "right",
            "setState": true
        });
        bridge.call("SetStateData", {
            "state": "speech",
            "map": {
                "speech": listCard[currentIndex].speech
            }
        });
    };
}

bridge.addRouter(new LessRouter());

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
    //Надо фоново запустить синхронизацию, иначе если будут не синхронизированные
}


function getNavigatorPush(serialUuid, lessUuid, windowLabel) {
    return {
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
    };
}

function genListCard(nsiList) {
    var result = [];
    nsiList = bridge.shuffle(nsiList);
    for (var i = 0; i < nsiList.length; i++) {
        result.push({
            id: nsiList[i]["id"],
            eng: nsiList[i]["card"]["eng"],
            rus: nsiList[i]["card"]["rus"],
            engSentence: nsiList[i]["card"]["engSentence"],
            rusSentence: nsiList[i]["card"]["rusSentence"],
            speech: nsiList[i]["speech"],
            "template": {
                "flutterType": "Template",
                "src": "NewCard"
            }
        });
    }
    //bridge.log(result);
    return result;
}

function getGeneralUuid() {
    return {
        "lessUuid": bridge.pageArgs["link"]["data"],
        "serialUuid": bridge.pageArgs["serialUuid"]
    };
}


function saveLessState(lastScore) {
    var gUuid = getGeneralUuid();
    var lessStateUuid = "LessState-" + gUuid["lessUuid"];
    bridge.call("DbQuery", {
        "sql": "select * from data where uuid_data = ? and is_remove_data = 0",
        "args": [lessStateUuid],
        "onFetch": {
            "jsRouter": "Less.ai.js",
            "args": {
                "includeAll": true,
                "lastScore": lastScore,
                "method": "onFetchLessState",
                "serialUuid": gUuid["serialUuid"]
            }
        }
    });
}