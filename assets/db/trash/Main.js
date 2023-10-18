if (bridge.args["switch"] == "constructor") {
    bridge.call("DbQuery", {
        "sql": "select * from data where key_data = ? and is_remove_data = 0 order by id_data",
        "args": ["less"],
        "onFetch": {
            "jsInvoke": "Main.js",
            "args": {
                "includeStateData": true,
                "switch": "selectLess"
            }
        }
    });
    parser([
            {
                "word": "Gravy boat",
                "translation": "Соусник",
                "phrase": "I was in this room where we were keeping all the presents, and I was looking at this gravy boat.",
                "phrase_translation": "Я был в этой комнате, где мы хранили все подарки, и я смотрел на этот соусник.",
                "start_time_seconds": 307.94,
                "end_time_seconds": 312.68,
                "fileName": "604d1253-fc69-4e26-bc82-e4ad6f2a3702.mp3"
            },
            {
                "word": "Drifted",
                "translation": "Отдалились",
                "phrase": "I know that you and I have kind of drifted apart.",
                "phrase_translation": "Я знаю, что ты и я как бы отдалились.",
                "start_time_seconds": 348.34,
                "end_time_seconds": 350.34,
                "fileName": "6e7fec6b-637f-479e-ac8e-245dd21ec747.mp3"
            },
            {
                "word": "Issue",
                "translation": "Проблема",
                "phrase": "I'm guessing that he bought her the big pipe organ, and she's really not happy about it.",
                "phrase_translation": "Я предполагаю, что он купил ей большой орган, и ей это совсем не нравится.",
                "start_time_seconds": 374.84,
                "end_time_seconds": 379.1,
                "fileName": "86301d00-6a03-45ae-9ab8-a1a832f6a2a5.mp3"
            },
            {
                "word": "Metaphor",
                "translation": "Метафора",
                "phrase": "It's a metaphor, Daddy.",
                "phrase_translation": "Это метафора, папа.",
                "start_time_seconds": 446.58,
                "end_time_seconds": 447.92,
                "fileName": "b5a8d425-abc8-4e37-840c-4234c419208f.mp3"
            },
            {
                "word": "Independence",
                "translation": "Независимость",
                "phrase": "Independence, taking control of your life.",
                "phrase_translation": "Независимость, взятие жизни в свои руки.",
                "start_time_seconds": 514.52,
                "end_time_seconds": 517.22,
                "fileName": "424e1555-2268-49c8-8476-42884206cac4.mp3"
            },
            {
                "word": "Hit on",
                "translation": "Флиртовать с кем-либо",
                "phrase": "Joey, stop hitting on her.",
                "phrase_translation": "Джоуи, перестань флиртовать с ней.",
                "start_time_seconds": 528.9000000000001,
                "end_time_seconds": 530.6,
                "fileName": "365bafd6-0c7c-432b-b9a7-e5e1cdb4d04c.mp3"
            },
            {
                "word": "Complain",
                "translation": "Жаловаться",
                "phrase": "What does that mean? Does he sell it, drink it, or he just complains a lot?",
                "phrase_translation": "Что это означает? Он его продает, пьет или просто много жалуется?",
                "start_time_seconds": 578.72,
                "end_time_seconds": 582.04,
                "fileName": "4c4f469c-b002-4847-b85b-cc4a82184893.mp3"
            },
            {
                "word": "Catch",
                "translation": "Понять, услышать",
                "phrase": "I'm sorry, I didn't catch your name.",
                "phrase_translation": "Прошу прощения, я не расслышал ваше имя.",
                "start_time_seconds": 592.54,
                "end_time_seconds": 594.28,
                "fileName": "9ba0b6c5-b920-454a-baa1-825399d940f5.mp3"
            },
            {
                "word": "Wondering",
                "translation": "Сомневающийся",
                "phrase": "I've just got to go, uh, go, uh. A wondering?",
                "phrase_translation": "Мне просто нужно уйти, эм, уйти. Вы уходите?",
                "start_time_seconds": 599.02,
                "end_time_seconds": 601.48,
                "fileName": "0d027d34-e573-40f1-afd7-957d93a85dfe.mp3"
            },
            {
                "word": "Strip joints",
                "translation": "Стрип-клубы",
                "phrase": "Can I tell you what the answer is? Strip joints.",
                "phrase_translation": "Могу ли я сказать вам ответ? Стрип-клубы.",
                "start_time_seconds": 235.04,
                "end_time_seconds": 239.46,
                "fileName": "04a80e5d-1ead-4b06-8cbf-14d170472986.mp3"
            },
            {
                "word": "Turned on",
                "translation": "Включиться, возбудиться",
                "phrase": "I realized that I was more turned on by this gravy boat than by Barry.",
                "phrase_translation": "Я поняла, что меня больше возбуждает этот соусник, чем Барри.",
                "start_time_seconds": 320.06,
                "end_time_seconds": 325.62,
                "fileName": "bcde5792-87da-4255-a36c-0d4b8433038d.mp3"
            },
            {
                "word": "Hump",
                "translation": "Горб",
                "phrase": "So does he have a hump, a hump and a hair piece?",
                "phrase_translation": "Итак, у него есть горб, горб и парик?",
                "start_time_seconds": 66.74,
                "end_time_seconds": 68.74,
                "fileName": "837ea442-5c7f-42cd-bc01-e5cdf87c6ee2.mp3"
            },
            {
                "word": "Eyelashes",
                "translation": "Ресницы",
                "phrase": "Ooh, I just pulled out four eyelashes.",
                "phrase_translation": "Ой, я только что вытащила четыре ресницы.",
                "start_time_seconds": 606.46,
                "end_time_seconds": 612.8,
                "fileName": "f652e124-f57c-4b52-bd92-83dea07de36f.mp3"
            },
            {
                "word": "Rub",
                "translation": "Поглаживать",
                "phrase": "She really likes it when you rub her neck in the same spot over and over and over again.",
                "phrase_translation": "Ей очень нравится, когда ты поглаживаешь ей шею в одном и том же месте снова и снова и снова.",
                "start_time_seconds": 621.76,
                "end_time_seconds": 626.94,
                "fileName": "b467ca9f-2dc3-4d36-a005-019a8a1bf1aa.mp3"
            },
            {
                "word": "Honeymoon",
                "translation": "Медовый месяц",
                "phrase": "Well, I was kind of supposed to be headed for Aruba on my honeymoon, so nothing.",
                "phrase_translation": "Ну, я как бы должна была быть в пути на Арубу в свой медовый месяц, так что ничего.",
                "start_time_seconds": 636.54,
                "end_time_seconds": 641.32,
                "fileName": "3595f916-fa19-42be-9692-b70c869013eb.mp3"
            },
            {
                "word": "Lizards",
                "translation": "Ящерицы",
                "phrase": "Talk about your... big lizards.",
                "phrase_translation": "Говоря о... больших ящерицах.",
                "start_time_seconds": 650.72,
                "end_time_seconds": 654.1,
                "fileName": "bb3a42ba-175b-4c9a-9242-c3ff3636f173.mp3"
            },
            {
                "word": "Bracket",
                "translation": "Скобка",
                "phrase": "I'm supposed to attach a brackety thing to the side things using a bunch of these little worm guys.",
                "phrase_translation": "Мне нужно прикрепить скобку к боковым частям, используя кучу этих маленьких червячков.",
                "start_time_seconds": 720.9,
                "end_time_seconds": 727.82,
                "fileName": "83ba27fe-bed4-4465-8cfe-53923749116e.mp3"
            },
            {
                "word": "Bookcase",
                "translation": "Книжный шкаф",
                "phrase": "I'm thinking we got a bookcase here. It's a beautiful thing.",
                "phrase_translation": "Мне кажется, у нас есть книжный шкаф. Это прекрасно.",
                "start_time_seconds": 740.48,
                "end_time_seconds": 743.22,
                "fileName": "3c427c8d-3960-4e1e-a1b2-6236accb9703.mp3"
            },
            {
                "word": "Beer",
                "translation": "Пиво",
                "phrase": "This was Carol's favorite beer. She always drank it out of the can.",
                "phrase_translation": "Это было любимое пиво Кэрол. Она всегда пила его из банки.",
                "start_time_seconds": 764.02,
                "end_time_seconds": 770.06,
                "fileName": "59593415-36e7-4eb7-86d4-dddd4e0f09f3.mp3"
            },
            {
                "word": "Shredded",
                "translation": "Разорванный",
                "phrase": "The worst thing that I ever did was I shredded my old boyfriend's favorite bath towel.",
                "phrase_translation": "Самое ужасное, что я когда-либо сделала, - это разорвала любимое полотенце моего бывшего парня.",
                "start_time_seconds": 821.72,
                "end_time_seconds": 826.44,
                "fileName": "1ee5ce34-b1ef-4639-af7f-439a8c2da628.mp3"
            },
            {
                "word": "Relationship",
                "translation": "Отношения",
                "phrase": "Between us, we haven't had a relationship that's lasted longer than a mento.",
                "phrase_translation": "Между нами не было отношений, которые продлились бы дольше ментоса.",
                "start_time_seconds": 889.38,
                "end_time_seconds": 893.2,
                "fileName": "4124cd00-f3f5-4fa2-ace8-815bfecc798a.mp3"
            },
            {
                "word": "Flavor",
                "translation": "Вкус",
                "phrase": "Let me tell you something, Ross. There's lots of flavors out there. There's Rocky Road and cookie dough and bing!",
                "phrase_translation": "Давай я тебе скажу, Росс. Там много вкусов. Есть Рокки Роуд и куки-тесто и бинг!",
                "start_time_seconds": 935.22,
                "end_time_seconds": 942.86,
                "fileName": "9f708834-2378-40d0-9b5c-77c12c74d703.mp3"
            },
            {
                "word": "Perform",
                "translation": "Выполнять",
                "phrase": "Ever since she left me, I haven't been able to perform sexually.",
                "phrase_translation": "С тех пор как она ушла от меня, я не мог выполнять половой акт.",
                "start_time_seconds": 999.52,
                "end_time_seconds": 1007.56,
                "fileName": "4b91f5ed-bdc1-4e99-9090-128749146dd5.mp3"
            },
            {
                "word": "Matrimony",
                "translation": "Брак",
                "phrase": "I call us in the bond of holy matrimony.",
                "phrase_translation": "Я объединяю нас в узах святого брака.",
                "start_time_seconds": 1050.92,
                "end_time_seconds": 1054.52,
                "fileName": "8cbaf016-78fd-4c4e-9b3c-d029b49c0606.mp3"
            },
            {
                "word": "Roll",
                "translation": "Удача",
                "phrase": "Listen, while you're on a roll, if you feel like you gotta make like a western omelette or something.",
                "phrase_translation": "Пока удача на твоей стороне, если захочешь сделать что-нибудь типа западного омлета или что-то в этом роде.",
                "start_time_seconds": 1145.76,
                "end_time_seconds": 1149.88,
                "fileName": "64c35cc3-564b-4964-b18b-cbb562ce8650.mp3"
            },
            {
                "word": "Gratulations",
                "translation": "Поздравления",
                "phrase": "Last night was like all my birthdays both graduations plus the barn raising scene in Witness. Gratulations!",
                "phrase_translation": "Вчера было как все мои дни рождения и оба выпускных плюс сцена поднятия сарая в фильме 'Свидетель'. Поздравляю!",
                "start_time_seconds": 1182.52,
                "end_time_seconds": 1188.24,
                "fileName": "8382c06e-7517-4fb5-aca1-a0d71a132464.mp3"
            },
            {
                "word": "Abuse",
                "translation": "Злоупотребление",
                "phrase": "I will not take this abuse.",
                "phrase_translation": "Я не буду терпеть это злоупотребление.",
                "start_time_seconds": 1263.82,
                "end_time_seconds": 1265.94,
                "fileName": "dd0bf379-75ac-45fe-b2bf-b99823c6c34a.mp3"
            },
            {
                "word": "Wooden",
                "translation": "Деревянный",
                "phrase": "Once I was a wooden boy, a little wooden boy.",
                "phrase_translation": "Когда-то я был деревянным мальчиком, маленьким деревянным мальчиком.",
                "start_time_seconds": 1268.16,
                "end_time_seconds": 1270.8,
                "fileName": "a64a1d0b-25ff-491f-bb2c-efba7398a712.mp3"
            },
            {
                "word": "Push",
                "translation": "Толкать",
                "phrase": "I'm pushing my Aunt Roz through Parrot Jungle.",
                "phrase_translation": "Я толкаю свою тётю Розу в Парк Попугаев.",
                "start_time_seconds": 1354.66,
                "end_time_seconds": 1356.7,
                "fileName": "1a1776cf-2388-4092-8e62-0f5bc87c2b65.mp3"
            },
            {
                "word": "Sophisticated",
                "translation": "Сложный",
                "phrase": "I assume we're looking for an answer more sophisticated than to get you into bed.",
                "phrase_translation": "Предполагаю, мы ищем более сложный ответ, чем просто чтобы тебя в постель.",
                "start_time_seconds": 1388.8,
                "end_time_seconds": 1393.2,
                "fileName": "618e204a-5dc9-4160-8147-ba0ea45bd2b4.mp3"
            },
            {
                "word": "Beacon",
                "translation": "Маяк",
                "phrase": "Is it like I have some sort of beacon that only dogs and men with severe emotional problems can hear?",
                "phrase_translation": "Мне как будто бы дали маяк, который слышат только собаки и мужчины с серьезными эмоциональными проблемами?",
                "start_time_seconds": 1402.1599999999999,
                "end_time_seconds": 1410.34,
                "fileName": "78252069-015b-416c-8687-e8959676cd18.mp3"
            },
            {
                "word": "Universe",
                "translation": "Вселенная",
                "phrase": "You don't want to put that out in the universe.",
                "phrase_translation": "Ты не хочешь, чтобы это попало во Вселенную.",
                "start_time_seconds": 1398.76,
                "end_time_seconds": 1400.58,
                "fileName": "872c2224-f366-475e-872d-c0f9ca0d9067.mp3"
            },
            {
                "word": "Snap",
                "translation": "Щелкать",
                "phrase": "You know, before me there was no snapping his turtle for two years.",
                "phrase_translation": "Знаешь, до меня его черепашка не щелкала два года.",
                "start_time_seconds": 1375.32,
                "end_time_seconds": 1379.2,
                "fileName": "16e02e25-1492-4ad7-ad35-776776263f4e.mp3"
            },
            {
                "word": "Line",
                "translation": "Фраза",
                "phrase": "Of course it was a line. Why? Why? Why would anybody do something like that?",
                "phrase_translation": "Конечно, это была фраза. Почему? Почему? Почему кто-то мог сделать что-то подобное?",
                "start_time_seconds": 1382.74,
                "end_time_seconds": 1388.7,
                "fileName": "355346d8-673c-4e7e-9627-04a7eaef98be.mp3"
            },
            {
                "word": "Screamer",
                "translation": "Крикун",
                "phrase": "Oh, man. Andrea's the screamer.",
                "phrase_translation": "О, чувак, Андреа - крикун.",
                "start_time_seconds": 1085.8000000000002,
                "end_time_seconds": 1088.18,
                "fileName": "685581a9-14a6-4adb-9004-5e5fd69ab351.mp3"
            },
            {
                "word": "Upbeat",
                "translation": "Оптимистичный",
                "phrase": "And yet you're surprisingly upbeat.",
                "phrase_translation": "И всё равно ты удивительно оптимистичен.",
                "start_time_seconds": 1442.46,
                "end_time_seconds": 1444.38,
                "fileName": "d6d4140b-9d78-463a-b7b0-c5b9c62f6cc4.mp3"
            },
            {
                "word": "Charging",
                "translation": "Заряжать",
                "phrase": "I can stop charging any time I want.",
                "phrase_translation": "Я могу перестать заряжать в любой момент.",
                "start_time_seconds": 1473.72,
                "end_time_seconds": 1475.58,
                "fileName": "04131329-b552-4063-8441-c94b583a304e.mp3"
            },
            {
                "word": "Symbolic",
                "translation": "Символический",
                "phrase": "Kind of like a symbolic gesture.",
                "phrase_translation": "Что-то вроде символического жеста.",
                "start_time_seconds": 1546.88,
                "end_time_seconds": 1549.3,
                "fileName": "fd92cb84-33f2-4f8f-b073-e05ae9729729.mp3"
            },
            {
                "word": "Crush",
                "translation": "Симпатия",
                "phrase": "Back in high school I had a major crush on you.",
                "phrase_translation": "Ещё в старших классах у меня была большая симпатия к тебе.",
                "start_time_seconds": 1626.18,
                "end_time_seconds": 1630.44,
                "fileName": "5671964f-3ebd-4463-a858-ed6b4bbfdeb9.mp3"
            },
            {
                "word": "Vulnerability",
                "translation": "Уязвимость",
                "phrase": "Try not to let my intense vulnerability become any kind of a factor here.",
                "phrase_translation": "Постарайся не давать моей глубокой уязвимости влиять на наши отношения.",
                "start_time_seconds": 1650.02,
                "end_time_seconds": 1653.28,
                "fileName": "23c5dbb2-fb8b-4cc3-b6c1-4052071a8ce0.mp3"
            },
            {
                "word": "Couch",
                "translation": "Диван",
                "phrase": "You wanna crash on the couch?",
                "phrase_translation": "Ты хочешь переночевать на диване?",
                "start_time_seconds": 1581.06,
                "end_time_seconds": 1582.34,
                "fileName": "65f4bd4a-77c1-43e8-be2c-ba0cb6b44468.mp3"
            },
            {
                "word": "Librarian",
                "translation": "Библиотекарь",
                "phrase": "That was a library card.",
                "phrase_translation": "Это была библиотечная карта.",
                "start_time_seconds": 1550.08,
                "end_time_seconds": 1551.2,
                "fileName": "bc210cc5-4216-4d40-86b5-a9cda258cce2.mp3"
            },
            {
                "word": "Butt",
                "translation": "Зад",
                "phrase": "I said that you had a nice butt. It's just not a great butt.",
                "phrase_translation": "Я сказал, что у тебя хорошая попа. Просто не супер.",
                "start_time_seconds": 1726.1799999999998,
                "end_time_seconds": 1730.62,
                "fileName": "bdcb8968-822f-4c75-8cb6-ae700611ed3b.mp3"
            }
        ]
    );
}

function parser(input) {
    var list = [];
    for (var i = 0; i < input.length; i++) {
        var item = input[i];
        // {
        //     "word": "grab",
        //     "translation": "взять, хватать",
        //     "phrase": "I just grabbed a spoon.",
        //     "phrase_translation": "Я просто взял ложку.",
        //     "fileName": "a4ae2e2b-cee7-4613-844f-870bc3ed2a4f.mp3",
        //     "start_time_seconds": 1713.463,
        //     "end_time_seconds": 1717.634
        // }
        list.push({
            "id": item["fileName"].split(".mp3")[0],
            "card": {
                "eng": item["word"],
                "rus": item["translation"]
            },
            "additionalMaterials": [
                {
                    "lang": "",
                    "speech": item["fileName"],
                    "subtitles": item["phrase"] + "\n\n" + item["phrase_translation"]
                }
            ]
        });
    }
    var result = {
        "label": "Друзья #1",
        "children": list
    };
    //bridge.log(result);
}

if (bridge.args["switch"] == "selectLess") {
    //bridge.log(bridge.args["fetchDb"]);
    var newStateData = {};
    var listLess = [];
    for (var i = 0; i < bridge.args["fetchDb"].length; i++) {
        var data = bridge.args["fetchDb"][i]["value_data"];
        listLess.push({
            "label": data["label"],
            "templateWidgetSrc": "IteratorButtonIcon",
            "onTap": {
                "sysInvoke": "NavigatorPush",
                "args": {
                    "link": {
                        "template": "Less.json",
                        "data": bridge.args["fetchDb"][i]["uuid_data"]
                    },
                    "context": {
                        "key": "inputLessData",
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
    bridge.call("SetStateData", {
        "map": newStateData
    });
}