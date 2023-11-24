import 'package:flutter/material.dart';
import 'package:rjdu/global_settings.dart';
import 'package:rjdu/rjdu.dart';
import 'package:rjdu/theme_provider.dart';

void main() async {
  GlobalSettings().setHost("http://watchready.ru");
  GlobalSettings().setWs("ws://watchready.ru");
  ThemeProvider.setColor("#019ba1", "white", "#f27f1b", "white");
  runApp(await RjDu.runApp());
}