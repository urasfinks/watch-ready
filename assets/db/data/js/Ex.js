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
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["eng"]:nsiList[i]["rus"]
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
                            "label": bridge.pageArgs["direction"] == "eng" ? nsiList[i]["rus"]:nsiList[i]["eng"]
                        }
                    }
                }
            }
        });
    }
    return result;
}

if (bridge.args["switch"] == "onSwipeCompleted") {
    bridge.call('DbQuery', {
        "sql": "select * from data where parent_uuid_data = ? order by id_data",
        "args": [bridge.pageArgs["link"]["data"]],
        "onFetch": {
            "jsInvoke": "Ex.js",
            "args": {
                "includeAll": true,
                "switch": "selectPersonData",
                "swipedIndex": bridge.state["sw"]["swipedIndex"],
                "swipedDirection": bridge.state["sw"]["swipedDirection"],
            }
        }
    });
}

if (bridge.args["switch"] == "selectPersonData") {
    var userDataUuid = bridge.args["fetchDb"][0]["uuid_data"];
    var userData = bridge.args["fetchDb"][0]["value_data"];
    var listCard = bridge.state["card"];
    var swipedIndex = bridge.args["swipedIndex"];
    var swipedDirection = bridge.args["swipedDirection"];
    var idCard = listCard[swipedIndex]["id"];
    if (userData[idCard] == undefined) {
        userData[idCard] = {left: 0, right: 0};
    }
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