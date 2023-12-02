if (bridge.args["switch"] === "constructor") {
    bridge.call("SetStateData", {
        "map": {
            "listSerial": [
                {
                    "templateCustom": "templateLabel",
                    "label": "Детективные сериалы"
                },
                {
                    "templateCustom": "templateSerialLine",
                    "label1": "Парижская полиция 1905",
                    "label2": "Riverdale",
                    "src1":"pp1905.jpg",
                    "src2":"riverdale.jpg",
                    "extra1": "",
                    "extra2": "templateLockScreen",
                    "onTap1": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "Less.json",
                            "serial_uuid": "a1b3c3"
                        }
                    },
                    "onTap2": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "SerialRequest.json",
                            "message": "Riverdale"
                        }
                    }
                },
                {
                    "templateCustom": "templateLabel",
                    "label": "Учится никогда не поздно"
                },
                {
                    "templateCustom": "templateSerialLine",
                    "label1": "Капкан",
                    "label2": "Сексуальная жизнь студентик",
                    "src1":"kapkan.jpeg",
                    "src2":"szs.jpeg",
                    "extra1": "templateLockScreen",
                    "extra2": "templateLockScreen",
                    "onTap1": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "SerialRequest.json",
                            "message": "Капкан"
                        }
                    },
                    "onTap2": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "SerialRequest.json",
                            "message": "Сексуальная жизнь студентик"
                        }
                    }
                },
                {
                    "templateCustom": "templateLabel",
                    "label": "Лучшие проекты НВО/НВО Max"
                },
                {
                    "templateCustom": "templateSerialLine",
                    "label1": "Супермен",
                    "label2": "Настоящий датектив",
                    "src1":"superman.webp",
                    "src2":"td.webp",
                    "extra1": "templateLockScreen",
                    "extra2": "templateLockScreen",
                    "onTap1": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "SerialRequest.json",
                            "message": "Супермен"
                        }
                    },
                    "onTap2": {
                        "sysInvoke": "NavigatorPush",
                        "args": {
                            "uuid": "SerialRequest.json",
                            "message": "Настоящий датектив"
                        }
                    }
                },
            ]
        }
    });
}