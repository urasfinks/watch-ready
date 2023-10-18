import 'package:flutter/material.dart';
import 'package:rjdu/global_settings.dart';
import 'package:rjdu/rjdu.dart';

void main() async {
  GlobalSettings().setHost("http://watchready.ru");
  GlobalSettings().setWs("ws://watchready.ru");
  runApp(await RjDu.runApp());
}