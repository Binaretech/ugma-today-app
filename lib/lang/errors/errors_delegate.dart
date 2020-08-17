import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:ugma_today/lang/errors/errors_locations.dart';
import 'package:ugma_today/lang/supported_locales.dart';

class ErrorsDelegate extends LocalizationsDelegate<ErrorsLocations> {
  const ErrorsDelegate();

  @override
  bool isSupported(Locale locale) => locales.contains(locale);

  @override
  Future<ErrorsLocations> load(Locale locale) {
    return SynchronousFuture<ErrorsLocations>(ErrorsLocations(locale));
  }

  @override
  bool shouldReload(ErrorsDelegate old) => false;
}
