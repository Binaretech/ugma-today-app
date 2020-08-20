import 'package:flutter/material.dart';

class MessageLocations {
  MessageLocations(this.locale);
  final Locale locale;

  static MessageLocations of(BuildContext context) {
    return Localizations.of<MessageLocations>(context, MessageLocations);
  }

  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'click': 'You have pushed the button this many times:',
      'temporalyNoRecords': 'There are no records at this time'
    },
    'es': {
      'click': 'Has dado click en el botón esta cantidad de veces',
      'temporalyNoRecords': 'No hay registros en este momento'
    },
  };

  String get click {
    return _localizedValues[locale.languageCode]['click'];
  }

  String get temporalyNoRecords {
    return _localizedValues[locale.languageCode]['temporalyNoRecords'];
  }
}
