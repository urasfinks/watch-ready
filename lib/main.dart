import 'package:flutter/material.dart';
import 'package:rjdu/global_settings.dart';
import 'package:rjdu/rjdu.dart';
import 'package:rjdu/theme_provider.dart';

void main() async {
  //GlobalSettings().setHost("http://192.168.0.14");
  //GlobalSettings().setWs("ws://192.168.0.14");
  GlobalSettings().setHost("http://watch-ready.ru");
  GlobalSettings().setWs("ws://watch-ready.ru");
  ThemeProvider.setColor("#019ba1", "white", "#f27f1b", "white");
  runApp(await RjDu.runApp());
}