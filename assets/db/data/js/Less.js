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

if (bridge.args["switch"] == "onSwipeCompleted") {
    var listCard = bridge.selector(bridge.state, ["card", "card"], []);
    var swipedIndex = bridge.selector(bridge.state, ["sw", "swipedIndex"], -1);
    bridge.call("Audio", {
        "case": "stop"
    });
    bridge.call("SetStateData", {
        "state": "speech",
        "map": {
            "speech": listCard[swipedIndex + 1].speech
        }
    });
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