if (bridge.args["switch"] == "onContextUpdate") {
    if (bridge.args["key"] == "inputData" && bridge.args["updKeys"] != undefined && bridge.args["updKeys"].includes("data")) {
        if (bridge.container["inputData"]["data"] != undefined && bridge.container["inputData"]["data"]["children"] != undefined) {
            bridge.call('SetStateData', {
                "map": {
                    "card": genListCard(bridge.container["inputData"]["data"]["children"])
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
            "template": {
                "flutterType": "FlipCard",
                "key": "x" + i,
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
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["eng"] : nsiList[i]["rus"]
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
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["rus"] : nsiList[i]["eng"]
                        }
                    }
                }
            }
        });
    }
    return result;
}

if (bridge.args["switch"] == "onSwipeCompleted") {
    var listCard = bridge.state["card"];
    var swipedIndex = bridge.state["sw"]["swipedIndex"];
    var idCard = listCard[swipedIndex]["id"];
    bridge.call('DbQuery', {
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
    bridge.log("swipedIndex: " + swipedIndex + "; swipedDirection: " + swipedDirection + ";");
    userData[idCard][swipedDirection]++;
    bridge.call('DataSourceSet', {
        "uuid": userDataUuid,
        "value": userData,
        "type": "userDataRSync",
        "key": "myProgressValue",
        //"debugTransaction": true
    });
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