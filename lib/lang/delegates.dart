import 'package:flutter/material.dart';
import 'package:ugma_today/lang/message/message_delegate.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

final Iterable<LocalizationsDelegate<dynamic>> delegates = [
  GlobalMaterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
  GlobalCupertinoLocalizations.delegate,
  const MessageDelegate(),
];
