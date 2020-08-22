import 'package:flutter/material.dart';
import 'package:ugma_today/lang/delegates.dart';
import 'package:ugma_today/lang/supported_locales.dart';

Widget makeTestableWidget({Widget child}) {
  return MediaQuery(
    data: MediaQueryData(),
    child: MaterialApp(
      localizationsDelegates: delegates,
      supportedLocales: locales,
      home: child,
    ),
  );
}
