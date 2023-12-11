if (bridge.args["switch"] == "onContextUpdate") {
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

if (bridge.args["switch"] == "onFinish") {
    var gUuid = getGeneralUuid();
    bridge.log(gUuid);
}

if (bridge.args["switch"] == "onSwipeCompleted") {
    var listCard = bridge.selector(bridge.state, ["card", "card"], []);
    var swipedIndex = bridge.selector(bridge.state, ["sw", "swipedIndex"], -1);
    bridge.call("Audio", {
        "case": "stop"
    });
    //Последний свайп уже не имеет карточек, так как индекс уже за границей
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
    if (swipedIndex == 0) {
        var gUuid = getGeneralUuid();
        var lessStateUuid = "LessState-" + gUuid["lessUuid"];

        bridge.call("DataSourceSet", {
            "uuid": lessStateUuid,
            "parent": gUuid["lessUuid"],
            "value": {},
            "type": "userDataRSync",
            "key": "LessState",
            "updateIfExist": false //Если уже есть, мы ничего не будем делать
            //"debugTransaction": true
        });
        bridge.call("DataSourceSet", {
            "uuid": "SerialState-" + gUuid["serialUuid"],
            "parent": gUuid["serialUuid"],
            "value": {
                "startLessState": lessStateUuid
            },
            "type": "userDataRSync",
            "key": "SerialState",
            "updateIfExist": true,
            "onUpdateOverlayJsonValue": true
            //"debugTransaction": true
        });
        bridge.call("SetStorage", {
            "map": {
                "StartLessState": lessStateUuid
            }
        });
    }
}

if (bridge.args["switch"] == "prev") {
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
}