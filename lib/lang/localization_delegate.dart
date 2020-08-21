import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:ugma_today/lang/localization.dart';
import 'package:ugma_today/lang/supported_locales.dart';

class LocalizationDelegate extends LocalizationsDelegate<Localization> {
  const LocalizationDelegate();

  @override
  bool isSupported(Locale locale) => locales.contains(locale);

  @override
  Future<Localization> load(Locale locale) {
    return SynchronousFuture<Localization>(Localization(locale));
  }

  @override
  bool shouldReload(LocalizationDelegate old) => false;
}
