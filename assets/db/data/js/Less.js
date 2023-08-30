if (bridge.args["switch"] == "constructor") {
    //Пытаемся загрузить свои данные по этому занятию
    bridge.call("DbQuery", {
        "sql": "select * from data where parent_uuid_data = ? order by id_data",
        "args": [bridge.pageArgs["link"]["data"]],
        "onFetch": {
            "jsInvoke": "Less.js",
            "args": {
                "includeAll": true,
                "switch": "selectPersonData"
            }
        }
    });
}

if (bridge.args["switch"] == "selectPersonData") {
    // bridge.log(bridge.state);
    // bridge.log(bridge.args);
    // bridge.log(bridge.contextMap);
    var state = bridge.selector(bridge.state, ["main"], {});

    if (bridge.args["fetchDb"].length == 0) { //Своих данных в БД не оказалось, создаём
        var uuid = bridge.call("Uuid", {})["uuid"];
        bridge.call("DataSourceSet", {
            "uuid": uuid,
            "value": JSON.stringify({}),
            "parent": bridge.pageArgs["link"]["data"],
            "type": "userDataRSync",
            "key": "myProgressValue"
        });
        state["myProgressUuid"] = uuid;
        state["myProgressValue"] = {};
    } else {
        state["myProgressUuid"] = bridge.args["fetchDb"][0]["uuid_data"];
        state["myProgressValue"] = bridge.args["fetchDb"][0]["value_data"];
    }
    bridge.call("SubscribeReload", { //Подписываемся на перезагрузку страницы, если личные данные будут обновлены
        "uuid": state["myProgressUuid"]
    });
    // Тут нет данных inputLessData, что бы построить list
    var lessData = bridge.selector(bridge.contextMap, ["inputLessData", "data"], undefined);
    if (lessData != undefined) {
        state["list"] = genList(state["myProgressValue"] || {}, lessData)
    }
    bridge.call("SetStateData", {
        "map": state
    });
}

if (bridge.args["switch"] == "onContextUpdate") { //Были обновлены данные Less.json или само задание
    // bridge.log(bridge.contextMap["inputLessData"]["data"]);
    // bridge.log(bridge.state["main"]["myProgressValue"]);
    bridge.call("SetStateData", {
        "map": {
            "list": genList(bridge.state["main"]["myProgressValue"] || {}, bridge.contextMap["inputLessData"]["data"] || {})
        }
    });
}

function genList(userData, nsiData) {
    var result = [];
    if (nsiData["children"] != undefined) {
        for (var i = 0; i < nsiData["children"].length; i++) {
            var id = nsiData["children"][i]["id"];
            var right = 0, left = 0;
            if (userData[id] != undefined) {
                right = userData[id]["right"] || 0;
                left = userData[id]["left"] || 0;
            }
            var prc = (right + left == 0) ? 0 : Math.ceil(right * 100 / (left + right));
            result.push({
                rus: nsiData["children"][i]["card"]["rus"],
                eng: nsiData["children"][i]["card"]["eng"],
                prc: prc + "",
                right: right + "",
                left: left + "",
                "templateWidgetSrc": "Card"
            });
        }
    }
    return result;
}

if (bridge.args["switch"] == "startExRus") {
    startEx("rus");
}
if (bridge.args["switch"] == "startExEng") {
    startEx("eng");
}

function startEx(direction) {
    bridge.call("NavigatorPush", {
        "name": "Ex",
        "userData": bridge.state["main"]["myProgressUuid"],
        "direction": direction,
        "link": {
            "template": "Ex.json",
            "data": bridge.pageArgs["link"]["data"]
        },
        "context": {
            "key": "inputExData",
            "data": {
                "template": {
                    "flutterType": "Scaffold",
                    "appBar": {
                        "flutterType": "AppBar",
                        "title": {"flutterType": "Text", "label": ""}
                    }
                }
            }
        },
        "onContextUpdate": {
            "jsInvoke": "Ex.js",
            "args": {
                "includeAll": true,
                "switch": "onContextUpdate"
            }
        }
    });
}