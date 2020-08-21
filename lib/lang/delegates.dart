import 'package:flutter/material.dart';
import 'package:ugma_today/lang/localization_delegate.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

final Iterable<LocalizationsDelegate<dynamic>> delegates = [
  const LocalizationDelegate(),
  GlobalMaterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
  GlobalCupertinoLocalizations.delegate,
];
