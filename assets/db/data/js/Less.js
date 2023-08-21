if (bridge.args["switch"] == "constructor") {
    bridge.call('DbQuery', {
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

if (bridge.args["switch"] == "selectPersonData") { //Need includeContainer+includePageArgument
    if (bridge.args["fetchDb"].length == 0) {
        var uuid = bridge.call('Uuid', {})["uuid"];
        bridge.call('DataSourceSet', {
            "uuid": uuid,
            "value": JSON.stringify({}),
            "parent": bridge.pageArgs["link"]["data"],
            "type": "userDataRSync",
            "key": "myProgressValue"
        });
        bridge.state["myProgressUuid"] = uuid;
        bridge.state["myProgressValue"] = {};
    } else {
        bridge.state["myProgressUuid"] = bridge.args["fetchDb"][0]["uuid_data"];
        //console.log(bridge.args["fetchDb"][0]);
        bridge.state["myProgressValue"] = bridge.args["fetchDb"][0]["value_data"];
    }
    bridge.call('SubscribeRefresh', {
        "uuid": bridge.state["myProgressUuid"]
    });
    bridge.call('SetStateData', {
        "map": {
            "myProgressUuid": bridge.state["myProgressUuid"],
            "myProgressValue": bridge.state["myProgressValue"],
            "list": genList(bridge.state["myProgressValue"] || {}, bridge.container["inputData"]["data"] || {})
        }
    });
}

if (bridge.args["switch"] == "onContextUpdate") { //Need includeStateData+includeContainer
    bridge.call('SetStateData', {
        "map": {
            "list": genList(bridge.state["myProgressValue"] || {}, bridge.container["inputData"]["data"] || {})
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
                rus: nsiData["children"][i]["rus"],
                eng: nsiData["children"][i]["eng"],
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
        "userData": bridge.state["myProgressUuid"],
        "direction": direction,
        "link": {
            "template": "Ex.json",
            "data": bridge.pageArgs["link"]["data"]
        },
        "context": {
            "key": "inputData"
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