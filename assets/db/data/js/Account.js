if (bridge.args["switch"] == "constructor") {
    let isAuth = bridge.call('GetStorage', {
        "key": "isAuth",
        "default": "false"
    })["isAuth"];

    bridge.log("Hello constructor: " + isAuth);

    bridge.call('SetStateData', {
        "map": {
            "SwitchKey": isAuth == "true" ? "auth" : "default"
        }
    });

    bridge.call('DbQuery', {
        "sql": "select count(*) as count from data UNION ALL select count(*) as count from data where type_data = ? UNION ALL select count(*) as count from data where type_data = ? and revision_data = 0",
        "args": ["userDataRSync", "userDataRSync"],
        "onFetch": {
            "jsInvoke": "Account.js",
            "args": {
                "switch": "onFetchCountAllData"
            }
        }
    });
}

if (bridge.args["switch"] == "onFetchCountAllData") {
    bridge.call('SetStateData', {
        "map": {
            "countAllData": bridge.args["fetchDb"][0]["count"],
            "countPersonData": bridge.args["fetchDb"][1]["count"],
            "countSyncData": bridge.args["fetchDb"][1]["count"]
        }
    });
}

if (bridge.args["switch"] == "GetCode") {
    bridge.call("Hide", {"case": "keyboard"});
    bridge.call("Show", {"case": "customLoader"});
    bridge.call('Http', {
        "uri": "/GetCode",
        "body": {
            "mail": bridge.state["EmailValue"]
        },
        "onResponse": {
            "jsInvoke": "Account.js",
            "args": {
                "includeStateData": true,
                "switch": "GetCodeResponse"
            }
        }
    });
}

function checkHttpResponse() {
    if (bridge.args["httpResponse"]["status"] == false) {
        bridge.call("Alert", {
            "duration": 7000,
            "label": mapError(bridge.args["httpResponse"]["error"])
        });
        return false;
    }
    return true;
}

function mapError(error) {
    bridge.log(error);
    var map = [
        {
            error: "$.mail: is missing but it is required",
            display: "E-mail не может быть пустым"
        },
        {
            error: "$.mail: does not match",
            display: "E-mail введён не корректно"
        },
        {
            error: "RangeError (end): Invalid value:",
            display: "Неизвестная ошибка от сервера"
        },
        {
            error: "Request timeout",
            display: "Сервер не ответил за отведённое время"
        }
    ];
    for (var i = 0; i < map.length; i++) {
        if (error == map[i]["error"] || error.startsWith(map[i]["error"])) {
            return map[i]["display"]
        }
    }
    return error;
}

if (bridge.args["switch"] == "GetCodeResponse") {
    bridge.call("Hide", {"case": "customLoader"});
    //bridge.log(bridge.args);
    if (checkHttpResponse()) {
        bridge.call("NavigatorPush", {
            "type": "BottomSheet",
            "mail": bridge.state["EmailValue"],
            "link": {
                "template": "AccountCode.json",
            }
        });
    }
}

if (bridge.args["switch"] == "ConfirmCode") {
    //bridge.log(bridge.state);
    bridge.call('Http', {
        "uri": "/SignIn",
        "body": {
            "code": bridge.state["CodeValue"] * 1,
            "mail": bridge.pageArgs["mail"]
        },
        "onResponse": {
            "jsInvoke": "Account.js",
            "args": {
                "includePageArgument": true,
                "switch": "ConfirmCodeResponse"
            }
        }
    });
}

if (bridge.args["switch"] == "ConfirmCodeResponse") {
    //bridge.log(bridge.args);
    if (checkHttpResponse()) {
        bridge.call('SetStorage', {
            "key": "isAuth",
            "value": "true"
        });
        bridge.call('SetStorage', {
            "map": {
                "mail": bridge.pageArgs["mail"]
            }
        });
        bridge.call("NavigatorPop", {
            "reloadParent": true
        });
    }
}