import 'package:flutter/material.dart';

class ErrorsLocations {
  ErrorsLocations(this.locale);
  final Locale locale;

  static ErrorsLocations of(BuildContext context) {
    return Localizations.of<ErrorsLocations>(context, ErrorsLocations);
  }

  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'network_error': 'A connection error has occurred, please try again.',
      'general_error': 'An unexpected error has occurred, please try again.',
    },
    'es': {
      'network_error': 'Ha ocurrido un error de conexión, intente de nuevo.',
      'general_error': 'Ha ocurrido un error inesperado, intente de nuevo.',
    },
  };

  String get networkError {
    return _localizedValues[locale.languageCode]['network_error'];
  }

  String get generalError {
    return _localizedValues[locale.languageCode]['network_error'];
  }
}
