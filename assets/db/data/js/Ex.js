if (bridge.args["switch"] == "onContextUpdate") {
    //bridge.log("onContextUpdate: " + JSON.stringify(bridge.args));
    if (bridge.args["updateUuidList"].includes("data") && bridge.args["contextKey"] == "inputExData") {
        if (bridge.contextMap["inputExData"]["data"] != undefined
            && bridge.contextMap["inputExData"]["data"]["children"] != undefined
        ) {
            var currentIndex = bridge.selector(bridge.state, ["sw", "index"], 0);
            var isFinish = bridge.selector(bridge.state, ["sw", "finish"], false);
            var listCard = genListCard(bridge.contextMap["inputExData"]["data"]["children"]);
            bridge.call("SetStateData", {
                "map": {
                    "card": listCard,
                    "additionalMaterials": isFinish == true ? [] : getAdditionalMaterials(listCard, currentIndex, bridge.pageArgs["direction"])
                }
            });
        }
    }
}

function genListCard(nsiList) {
    var result = [];
    nsiList = shuffle(nsiList);
    for (var i = 0; i < nsiList.length; i++) {
        result.push({
            "id": nsiList[i]["id"],
            "additionalMaterials": nsiList[i]["additionalMaterials"],
            "template": {
                "flutterType": "FlipCard",
                "key": "x" + i,
                "onTap": {
                    "jsInvoke": "Ex.js",
                    "args": {
                        "switch": "flip",
                        "includeAll": true,
                        "key": "x" + i
                    }
                },
                "front": {
                    "flutterType": "Container",
                    "width": 999,
                    "height": 200,
                    "decoration": {
                        "flutterType": "BoxDecoration",
                        "color": "schema:onBackground",
                        "borderRadius": 10
                    },
                    "child": {
                        "flutterType": "Center",
                        "child": {
                            "flutterType": "Text",
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["card"]["eng"] : nsiList[i]["card"]["rus"]
                        }
                    }
                },
                "back": {
                    "flutterType": "Container",
                    "width": 999,
                    "height": 200,
                    "decoration": {
                        "flutterType": "BoxDecoration",
                        "color": "schema:secondary",
                        "borderRadius": "10"
                    },
                    "child": {
                        "flutterType": "Center",
                        "child": {
                            "flutterType": "Text",
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["card"]["rus"] : nsiList[i]["card"]["eng"]
                        }
                    }
                }
            }
        });
    }
    //bridge.log(result);
    return result;
}

if (bridge.args["switch"] == "onSwipeCompleted") {
    var listCard = bridge.state["card"];
    var swipedIndex = bridge.state["sw"]["swipedIndex"];
    var idCard = listCard[swipedIndex]["id"];

    var isFinish = bridge.state["sw"]["finish"] == true || bridge.state["sw"]["finish"] == "true";
    bridge.call("SetStateData", {
        "map": {
            "additionalMaterials": isFinish == true ? [] : getAdditionalMaterials(listCard, bridge.selector(bridge.state, ["sw", "index"], 0), bridge.pageArgs["direction"])
        },
        "notify": false
    });
    bridge.call("DbQuery", {
        "sql": "select * from data where uuid_data = ? order by id_data",
        "args": [bridge.pageArgs["userData"]],
        "onFetch": {
            "jsInvoke": "Ex.js",
            "args": {
                "includeAll": true,
                "switch": "selectPersonData",
                "swipedDirection": bridge.state["sw"]["swipedDirection"],
                "idCard": idCard
            }
        }
    });
}

if (bridge.args["switch"] == "selectPersonData") {
    //Это асинхрон => страница и состояния могли уже быть обновлены, а именно state.card от setState finish
    // Это когда swipable переходит в конечное положение и перерисовывает всю страницу через setState, что больше
    // карточки не нарисовались
    var userDataUuid = bridge.pageArgs["userData"];
    var userData = bridge.args["fetchDb"][0]["value_data"];
    if (userData == undefined || userData == null) {
        userData = {};
    }

    var idCard = bridge.args["idCard"];
    var swipedDirection = bridge.args["swipedDirection"];

    if (userData[idCard] == undefined || userData[idCard] == null) {
        userData[idCard] = {left: 0, right: 0};
    }
    //bridge.log("swipedIndex: " + swipedIndex + "; swipedDirection: " + swipedDirection + ";");
    userData[idCard][swipedDirection]++;
    bridge.call("DataSourceSet", {
        "uuid": userDataUuid,
        "value": userData,
        "type": "userDataRSync",
        "key": "myProgressValue",
        //"debugTransaction": true
    });
}

if (bridge.args["switch"] == "flip") {
    bridge.log(bridge.state[bridge.args["key"]]);
    bridge.call("Audio", {
        "case": "stop"
    });
}

function getAdditionalMaterials(listCard, currentIndex, direction) {
    //bridge.log("getAdditionalMaterials() listCard: " + listCard.length + "; currentIndex: " + currentIndex + "; direction: " + direction);
    var result = [];
    var matList = bridge.selector(listCard, [currentIndex, "additionalMaterials"], []);
    for (var i = 0; i < matList.length; i++) {
        if (matList[i]["lang"] == direction || matList[i]["lang"] == "") {
            result.push(matList[i]);
        }
    }
    return result;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}