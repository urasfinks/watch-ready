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
    // parser([
    //     {
    //         "word": "fixating",
    //         "translation": "фиксировать, заострять",
    //         "phrase": "Why does everyone keep fixating on that?",
    //         "phrase_translation": "Почему все продолжают фиксироваться на этом?",
    //         "fileName": "15a66db9-f3a4-41fb-8847-613aec2abfc5.mp3",
    //         "start_time_seconds": 200.367,
    //         "end_time_seconds": 203.912
    //     },
    //     {
    //         "word": "intestine",
    //         "translation": "кишечник",
    //         "phrase": "I feel like someone pulled my intestine out of my mouth.",
    //         "phrase_translation": "Мне кажется, будто кто-то вытащил мне кишечник изо рта.",
    //         "fileName": "78cb85d7-67de-461c-9e51-a5d15cbb82a4.mp3",
    //         "start_time_seconds": 155.405,
    //         "end_time_seconds": 159.868
    //     },
    //     {
    //         "word": "hump",
    //         "translation": "горб",
    //         "phrase": "So does he have a hump and a hairpiece?",
    //         "phrase_translation": "Так у него есть горб и парик?",
    //         "fileName": "343c3af9-b237-46ed-a725-7b100d306c70.mp3",
    //         "start_time_seconds": 71.154,
    //         "end_time_seconds": 73.615
    //     },
    //     {
    //         "word": "aura",
    //         "translation": "аура",
    //         "phrase": "No, don't! Stop cleansing my aura.",
    //         "phrase_translation": "Нет, не надо! Прекрати очищать мою ауру.",
    //         "fileName": "7d2a2b8d-2b5c-4653-99f7-01005336accf.mp3",
    //         "start_time_seconds": 175.092,
    //         "end_time_seconds": 179.721
    //     },
    //     {
    //         "word": "lesbian",
    //         "translation": "лесбиянка",
    //         "phrase": "Sometimes I wish I was a lesbian.",
    //         "phrase_translation": "Иногда мне хочется быть лесбиянкой.",
    //         "fileName": "ce06662f-a866-46ff-90d7-cebf7ba7c6fe.mp3",
    //         "start_time_seconds": 209.459,
    //         "end_time_seconds": 211.67
    //     },
    //     {
    //         "word": "decaf",
    //         "translation": "без кофеина",
    //         "phrase": "Can I get you some coffee? - Decaf.",
    //         "phrase_translation": "Можно принести вам кофе? - Без кофеина.",
    //         "fileName": "0408cc1b-ffa3-4a65-8d81-6919c399fe8d.mp3",
    //         "start_time_seconds": 277.361,
    //         "end_time_seconds": 280.739
    //     },
    //     {
    //         "word": "organ",
    //         "translation": "орган",
    //         "phrase": "I guess he bought her the pipe organ.",
    //         "phrase_translation": "Думаю, он купил ей орган.",
    //         "fileName": "be88b1ac-739d-4b18-b66a-8423a610a709.mp3",
    //         "start_time_seconds": 381.173,
    //         "end_time_seconds": 383.759
    //     },
    //     {
    //         "word": "drifted",
    //         "translation": "отдаляться, удаляться",
    //         "phrase": "I know we've drifted apart..",
    //         "phrase_translation": "Я знаю, что мы отдалились друг от друга.",
    //         "fileName": "4fb9cfe9-4f3e-4604-88b0-92f7394d71fe.mp3",
    //         "start_time_seconds": 350.767,
    //         "end_time_seconds": 353.604
    //     },
    //     {
    //         "word": "invited",
    //         "translation": "приглашенный",
    //         "phrase": "Who wasn't invited to the wedding.",
    //         "phrase_translation": "Кто не был приглашен на свадьбу?",
    //         "fileName": "c55b18e4-9518-440d-b18d-6f166684bfe2.mp3",
    //         "start_time_seconds": 375.626,
    //         "end_time_seconds": 380.547
    //     },
    //     {
    //         "word": "metaphor",
    //         "translation": "метафора",
    //         "phrase": "It's a metaphor, Daddy!",
    //         "phrase_translation": "Это метафора, папа!",
    //         "fileName": "a394ebd0-923c-4c0c-ada4-9f9df096f6cc.mp3",
    //         "start_time_seconds": 450.617,
    //         "end_time_seconds": 454.079
    //     },
    //     {
    //         "word": "decided",
    //         "translation": "решать, определить",
    //         "phrase": "\"Tuna or egg salad! Decide!\"",
    //         "phrase_translation": "\"Тунец или яичный салат! Реши!\"",
    //         "fileName": "ab2a610d-fc2e-41ed-afea-f0fee027ff6c.mp3",
    //         "start_time_seconds": 385.302,
    //         "end_time_seconds": 390.015
    //     },
    //     {
    //         "word": "pushed",
    //         "translation": "толкнул",
    //         "phrase": "Push her! Push her down the stairs!",
    //         "phrase_translation": "Толкни ее! Толкни ее вниз по лестнице!",
    //         "fileName": "b98571cb-d76c-44aa-bafe-faebe97dbb53.mp3",
    //         "start_time_seconds": 424.341,
    //         "end_time_seconds": 426.969
    //     },
    //     {
    //         "word": "decision",
    //         "translation": "решение",
    //         "phrase": "Well, maybe that's my decision.",
    //         "phrase_translation": "Ну, может быть, это мое решение.",
    //         "fileName": "28db8a4b-e3a9-4d87-8d51-f9700cb33de6.mp3",
    //         "start_time_seconds": 472.097,
    //         "end_time_seconds": 474.308
    //     },
    //     {
    //         "word": "independence",
    //         "translation": "независимость",
    //         "phrase": "Independence. Controlling your life. The whole hat thing.",
    //         "phrase_translation": "Независимость. Управление своей жизнью. Вся эта шляпная история.",
    //         "fileName": "55249b4f-2c18-4f84-9e3f-111aecd3a467.mp3",
    //         "start_time_seconds": 519.311,
    //         "end_time_seconds": 523.44
    //     },
    //     {
    //         "word": "complain",
    //         "translation": "жаловаться",
    //         "phrase": "Or he just complains a lot?",
    //         "phrase_translation": "Или он просто много жалуется?",
    //         "fileName": "b5419c15-c707-4ded-80b4-7a6baea466ed.mp3",
    //         "start_time_seconds": 584.168,
    //         "end_time_seconds": 586.503
    //     },
    //     {
    //         "word": "horrible",
    //         "translation": "ужасный",
    //         "phrase": "Please don't do that again. It's a horrible sound.",
    //         "phrase_translation": "Пожалуйста, больше так не делай. Это ужасный звук.",
    //         "fileName": "35a0ff65-298c-4654-bafc-aef287b508ce.mp3",
    //         "start_time_seconds": 543.752,
    //         "end_time_seconds": 545.254
    //     },
    //     {
    //         "word": "furniture",
    //         "translation": "мебель",
    //         "phrase": "Your \"not a real date\" is with Paul, the wine guy?",
    //         "phrase_translation": "Твое «не настоящее свидание» с Полом, винным гурманом?",
    //         "fileName": "93018931-7228-4fa7-8380-f2e0fed07594.mp3",
    //         "start_time_seconds": 556.473,
    //         "end_time_seconds": 558.934
    //     },
    //     {
    //         "word": "excited",
    //         "translation": "взволнованный",
    //         "phrase": "We're very excited about it.",
    //         "phrase_translation": "Мы очень взволнованы этим.",
    //         "fileName": "84fe2be2-26f3-4118-a8bc-d630394d6cef.mp3",
    //         "start_time_seconds": 668.544,
    //         "end_time_seconds": 671.713
    //     },
    //     {
    //         "word": "steer clear",
    //         "translation": "избегать",
    //         "phrase": "Steer clear of you.",
    //         "phrase_translation": "Избегай тебя.",
    //         "fileName": "8a5dada0-0ed1-4782-a952-5c59c7c68c32.mp3",
    //         "start_time_seconds": 830.622,
    //         "end_time_seconds": 833.584
    //     },
    //     {
    //         "word": "attach",
    //         "translation": "прикрепить",
    //         "phrase": "I'm supposed to attach a bracket-y thing to the side things..",
    //         "phrase_translation": "Мне нужно прикрепить вещь в форме скобки к боковым частям..",
    //         "fileName": "eaed7693-4cd8-42d1-a3b2-6706aceead62.mp3",
    //         "start_time_seconds": 725.517,
    //         "end_time_seconds": 728.312
    //     },
    //     {
    //         "word": "break",
    //         "translation": "сломать, разбить",
    //         "phrase": "He might accidentally break something valuable of hers.",
    //         "phrase_translation": "Он может случайно сломать что-то ценное у нее.",
    //         "fileName": "24927810-08b7-4c97-8941-a134fba19c1f.mp3",
    //         "start_time_seconds": 812.896,
    //         "end_time_seconds": 814.523
    //     },
    //     {
    //         "word": "hang out",
    //         "translation": "тусить, проводить время",
    //         "phrase": "Thanks. But I'm just going to hang out here.",
    //         "phrase_translation": "Спасибо. Но я просто побуду здесь.",
    //         "fileName": "c5b0fb63-7875-4ce7-bbf3-54f7a485b468.mp3",
    //         "start_time_seconds": 671.922,
    //         "end_time_seconds": 674.007
    //     },
    //     {
    //         "word": "rub",
    //         "translation": "тереть, натирать",
    //         "phrase": "She really likes it when you rub her neck in the same spot..",
    //         "phrase_translation": "Ей очень нравится, когда ты теребишь ей шею в том же месте..",
    //         "fileName": "94f91de9-c64e-4b52-ae75-6832dc3170af.mp3",
    //         "start_time_seconds": 626.71,
    //         "end_time_seconds": 629.546
    //     },
    //     {
    //         "word": "screw",
    //         "translation": "обмануть, надуть",
    //         "phrase": "You got screwed.",
    //         "phrase_translation": "Вас обманули.",
    //         "fileName": "3c0ed279-d569-4690-9908-91e3faf9e378.mp3",
    //         "start_time_seconds": 792.835,
    //         "end_time_seconds": 797.422
    //     },
    //     {
    //         "word": "honeymoon",
    //         "translation": "медовый месяц",
    //         "phrase": "Right. You're not even getting your honeymoon.",
    //         "phrase_translation": "Правильно. Ты даже не получаешь медовый месяц.",
    //         "fileName": "85a3becd-d5d1-4804-96d5-efb964e2c947.mp3",
    //         "start_time_seconds": 647.439,
    //         "end_time_seconds": 650.4
    //     },
    //     {
    //         "word": "control",
    //         "translation": "контроль, управление",
    //         "phrase": "Independence. Controlling your life. The whole hat thing.",
    //         "phrase_translation": "Независимость. Управление своей жизнью. Вся эта шляпная история.",
    //         "fileName": "919cc3f7-76d6-4f3f-a54a-c27650ac6442.mp3",
    //         "start_time_seconds": 519.311,
    //         "end_time_seconds": 523.44
    //     },
    //     {
    //         "word": "giant",
    //         "translation": "гигантский",
    //         "phrase": "Is like a giant pigeon\nCrapping on my heart",
    //         "phrase_translation": "Похоже на гигантского голубя,\nкакающего на мое сердце",
    //         "fileName": "651cf696-7f16-4ccd-8167-59b9e1862928.mp3",
    //         "start_time_seconds": 704.454,
    //         "end_time_seconds": 708.125
    //     },
    //     {
    //         "word": "closeness",
    //         "translation": "близость",
    //         "phrase": "Four years of closeness and sharing, after which she ripped your heart out.",
    //         "phrase_translation": "Четыре года близости и совместного времяпровождения, после чего она вырвала твоё сердце.",
    //         "fileName": "1fb3f3cf-19e5-4097-a5f1-f1ee311ceec8.mp3",
    //         "start_time_seconds": 905.656,
    //         "end_time_seconds": 908.659
    //     },
    //     {
    //         "word": "difference",
    //         "translation": "разница",
    //         "phrase": "But Joanie loved Chachi. That's the difference.",
    //         "phrase_translation": "Но Джоани любила Чачи. В этом и заключается разница.",
    //         "fileName": "ce480a78-c123-4b8f-b920-61e61d29b09f.mp3",
    //         "start_time_seconds": 1064.857,
    //         "end_time_seconds": 1066.692
    //     },
    //     {
    //         "word": "revelation",
    //         "translation": "разоблачение, откровение",
    //         "phrase": "It's more of a fifth date kind of revelation.",
    //         "phrase_translation": "Это больше откровение на пятом свидании.",
    //         "fileName": "debc9386-a052-463c-8d53-f8854c37deec.mp3",
    //         "start_time_seconds": 983.025,
    //         "end_time_seconds": 987.529
    //     },
    //     {
    //         "word": "perform",
    //         "translation": "выполнять, исполнять",
    //         "phrase": "I haven't been able to perform.. sexually.",
    //         "phrase_translation": "У меня не получается выполнять.. сексуальные действия.",
    //         "fileName": "721860df-f6d8-4f01-8b42-403b4f5e829e.mp3",
    //         "start_time_seconds": 1007.09,
    //         "end_time_seconds": 1008.884
    //     },
    //     {
    //         "word": "regional",
    //         "translation": "региональный",
    //         "phrase": "I doubt it. Mostly regional work.",
    //         "phrase_translation": "Сомневаюсь. В основном региональная работа.",
    //         "fileName": "e4d5826f-1f70-4b82-93ba-bc61eb803fe2.mp3",
    //         "start_time_seconds": 1250.0,
    //         "end_time_seconds": 1253.462
    //     },
    //     {
    //         "word": "invade",
    //         "translation": "вторгаться, захватывать",
    //         "phrase": "If I can invade Poland, there's nothing I can't do.",
    //         "phrase_translation": "Если я могу вторгнуться в Польшу, то нет ничего, чего я не мог бы сделать.",
    //         "fileName": "9ab91884-2bbb-40b7-9159-0600911e37fc.mp3",
    //         "start_time_seconds": 1146.355,
    //         "end_time_seconds": 1151.026
    //     },
    //     {
    //         "word": "bonds",
    //         "translation": "связь, узы",
    //         "phrase": "We are gathered here to join Joanie Louise Cunningham.. and Charles. Chachi, Chachi, Chachi.. in the bonds of holy matrimony.",
    //         "phrase_translation": "Мы собрались здесь, чтобы соединить Джоани Луиз Каннингем.. и Чарльза. Чачи, Чачи, Чачи.. в узы святого брака.",
    //         "fileName": "6b5a800a-f6c9-4b2c-9a8c-04f3c78f2db4.mp3",
    //         "start_time_seconds": 1046.296,
    //         "end_time_seconds": 1051.635
    //     },
    //     {
    //         "word": "abuse",
    //         "translation": "оскорбление, насилие",
    //         "phrase": "- I will not take this abuse. - You're right, I'm sorry.",
    //         "phrase_translation": "- Я не буду терпеть этого оскорбления. - Ты прав, прошу прощения.",
    //         "fileName": "9b4c52de-7ea9-4b85-8eae-fe65dcb93272.mp3",
    //         "start_time_seconds": 1268.018,
    //         "end_time_seconds": 1270.687
    //     },
    //     {
    //         "word": "invasion",
    //         "translation": "вторжение, захват",
    //         "phrase": "Do the words, \"Billy, don't be a hero,\" mean anything to you?",
    //         "phrase_translation": "Слова \"Билли, не будь героем\" что-то значат для тебя?",
    //         "fileName": "57bc0274-423b-42f2-9271-8eab631b9a15.mp3",
    //         "start_time_seconds": 1078.537,
    //         "end_time_seconds": 1081.623
    //     },
    //     {
    //         "word": "input",
    //         "translation": "ввод, внесение данных",
    //         "phrase": "If I don't input those numbers, it doesn't make much of a difference.",
    //         "phrase_translation": "Если я не введу эти числа, это не сделает большой разницы.",
    //         "fileName": "0459db7a-295b-4826-b514-c247b895d914.mp3",
    //         "start_time_seconds": 1232.608,
    //         "end_time_seconds": 1235.194
    //     },
    //     {
    //         "word": "actor",
    //         "translation": "актер",
    //         "phrase": "- Yeah, I'm an actor. - Have I seen you in anything?",
    //         "phrase_translation": "- Да, я актер. - Я тебя видела где-то?",
    //         "fileName": "867095f9-7474-498c-88d8-c0e74b348b9d.mp3",
    //         "start_time_seconds": 1247.456,
    //         "end_time_seconds": 1249.791
    //     },
    //     {
    //         "word": "congratulations",
    //         "translation": "поздравления",
    //         "phrase": "- That is amazing. - Congratulations.",
    //         "phrase_translation": "- Это удивительно. - Поздравляю.",
    //         "fileName": "5744f307-1959-437e-92c1-8b3b279be778.mp3",
    //         "start_time_seconds": 1136.72,
    //         "end_time_seconds": 1140.432
    //     },
    //     {
    //         "word": "sophisticated",
    //         "translation": "сложный, утонченный",
    //         "phrase": "I assume we want an answer more sophisticated than: \"To get you into bed.\"",
    //         "phrase_translation": "Я предполагаю, что нам нужен более утонченный ответ, чем: \"Чтобы тебя затащить в постель.\"",
    //         "fileName": "75b80c2a-bf7d-4cbe-82bc-1b0e8f1d183a.mp3",
    //         "start_time_seconds": 1392.226,
    //         "end_time_seconds": 1395.145
    //     },
    //     {
    //         "word": "universe",
    //         "translation": "вселенная",
    //         "phrase": "Don't hate. You don't want to put that out into the universe.",
    //         "phrase_translation": "Не ненавидь. Ты не хочешь отправлять это во Вселенную.",
    //         "fileName": "00307127-0249-4843-b5ab-95c66f402991.mp3",
    //         "start_time_seconds": 1402.319,
    //         "end_time_seconds": 1403.612
    //     },
    //     {
    //         "word": "beacon",
    //         "translation": "сигнал, маяк",
    //         "phrase": "Is it like I have some sort of beacon that only dogs.. and men with emotional problems can hear?",
    //         "phrase_translation": "Это как будто у меня есть своего рода маяк, который слышат только собаки.. и мужчины с эмоциональными проблемами?",
    //         "fileName": "f59f6451-d6d5-484f-8b7c-869e5d0a9bf7.mp3",
    //         "start_time_seconds": 1407.699,
    //         "end_time_seconds": 1410.41
    //     },
    //     {
    //         "word": "vulnerability",
    //         "translation": "уязвимость",
    //         "phrase": "Listen, do you think..? Try not to let my vulnerability become a factor here.",
    //         "phrase_translation": "Послушай, думаешь..? Постарайся не допустить, чтобы моя уязвимость стала здесь фактором.",
    //         "fileName": "c43f1275-613d-4273-ab2a-fc5f7a490845.mp3",
    //         "start_time_seconds": 1649.691,
    //         "end_time_seconds": 1654.655
    //     },
    //     {
    //         "word": "symbolic",
    //         "translation": "символический",
    //         "phrase": "That's it. Are you going to crash on the couch?\n\nNo, I gotta go home sometime.\n\nAre you gonna be okay?\n\nLook what I just found on the floor.",
    //         "phrase_translation": "Вот и всё. Ты будешь спать на диване?\n\nНет, мне надо когда-то домой.\n\nТы будешь в порядке?\n\nПосмотри, что я только что нашёл на полу.",
    //         "fileName": "f4155be6-3d3e-459a-902e-fdf4b3563ecb.mp3",
    //         "start_time_seconds": 1582.457,
    //         "end_time_seconds": 1586.628
    //     },
    //     {
    //         "word": "retailers",
    //         "translation": "розничные продавцы",
    //         "phrase": "If you listen closely, you can hear a thousand retailers scream.",
    //         "phrase_translation": "Если внимательно прислушаться, можно услышать тысячу криков розничных продавцов.",
    //         "fileName": "b03599d9-3b5b-42e8-8b89-4973ed08cb0a.mp3",
    //         "start_time_seconds": 1566.191,
    //         "end_time_seconds": 1567.86
    //     },
    //     {
    //         "word": "upbeat",
    //         "translation": "оптимистичный, жизнерадостный",
    //         "phrase": "You're surprisingly upbeat.",
    //         "phrase_translation": "Ты удивительно оптимистичен.",
    //         "fileName": "2ac414ec-7f76-41db-9762-0d7445d58c48.mp3",
    //         "start_time_seconds": 1444.57,
    //         "end_time_seconds": 1447.823
    //     },
    //     {
    //         "word": "albino",
    //         "translation": "альбинос",
    //         "phrase": "I ended up living with this albino guy who was cleaning windshields.",
    //         "phrase_translation": "В итоге я оказался живущим с этим альбиносом, который чистил лобовые стёкла.",
    //         "fileName": "667da8b7-b3a8-4c08-b754-92afb6206898.mp3",
    //         "start_time_seconds": 1500.751,
    //         "end_time_seconds": 1502.544
    //     },
    //     {
    //         "word": "geeky",
    //         "translation": "ботанический, странный",
    //         "phrase": "I figured you thought I was Monica's geeky brother.",
    //         "phrase_translation": "Я думал, ты думала, что я ботанический брат Моники.",
    //         "fileName": "07c5e8cc-8b51-4566-9fad-7958128668cc.mp3",
    //         "start_time_seconds": 1641.183,
    //         "end_time_seconds": 1643.227
    //     },
    //     {
    //         "word": "crash",
    //         "translation": "остановиться, переночевать (неформально)",
    //         "phrase": "That's it. Are you going to crash on the couch?\n\nNo, I gotta go home sometime.",
    //         "phrase_translation": "Вот и всё. Ты будешь спать на диване?\n\nНет, мне надо когда-то домой.",
    //         "fileName": "aec6fefa-bf10-4f22-bf36-2404e1955982.mp3",
    //         "start_time_seconds": 1582.457,
    //         "end_time_seconds": 1586.628
    //     },
    //     {
    //         "word": "cupboard",
    //         "translation": "шкаф, буфет",
    //         "phrase": "Look what I just found on the floor.",
    //         "phrase_translation": "Посмотри, что я только что нашёл на полу.",
    //         "fileName": "4576de08-365a-4319-a311-509623491775.mp3",
    //         "start_time_seconds": 1592.676,
    //         "end_time_seconds": 1594.178
    //     },
    //     {
    //         "word": "jump out of the plane with no parachute",
    //         "translation": "прыгнуть из самолёта без парашюта (идиома)",
    //         "phrase": "\"Ready to jump out of the plane with no parachute?\"",
    //         "phrase_translation": "\"Готов прыгнуть из самолёта без парашюта?\"",
    //         "fileName": "56693a3e-bce6-43e8-990d-fa68aef18d1e.mp3",
    //         "start_time_seconds": 1527.444,
    //         "end_time_seconds": 1529.696
    //     },
    //     {
    //         "word": "grab",
    //         "translation": "взять, хватать",
    //         "phrase": "I just grabbed a spoon.",
    //         "phrase_translation": "Я просто взял ложку.",
    //         "fileName": "a4ae2e2b-cee7-4613-844f-870bc3ed2a4f.mp3",
    //         "start_time_seconds": 1713.463,
    //         "end_time_seconds": 1717.634
    //     }
    // ]);
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
    bridge.log(result);
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