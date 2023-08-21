if (bridge.args["switch"] == "constructor") {
    bridge.call('DbQuery', {
        "sql": "select * from data where key_data = ? order by id_data",
        "args": ["less"],
        "onFetch": {
            "jsInvoke": "Main.js",
            "args": {
                "includeStateData": true,
                "switch": "selectLess"
            }
        }
    });
}

if (bridge.args["switch"] == "selectLess") {
    bridge.log(bridge.args["fetchDb"]);
    var newStateData = {};
    var listLess = [];
    for (var i = 0; i < bridge.args["fetchDb"].length; i++) {
        var data = bridge.args["fetchDb"][i]["value_data"];
        listLess.push({
            "label": data["label"],
            "templateWidgetSrc": "ButtonIcon",
            "onTap": {
                "sysInvoke": "NavigatorPush",
                "args": {
                    "link": {
                        "template": "Less.json",
                        "data": bridge.args["fetchDb"][i]["uuid_data"]
                    },
                    "context": {
                        "key": "inputData"
                    },
                    "constructor": {
                        "jsInvoke": "Less.js",
                        "args": {
                            "includeAll": true,
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
            }
        });
    }
    newStateData["listLess"] = listLess;
    bridge.call('SetStateData', {
        "map": newStateData
    });
}