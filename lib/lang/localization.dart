/// This class returns the translated string
/// to register new words update the files located in lib/lang/trans.
/// you also can add a new translations category, just create a file in lib/lang/trans with the
/// category name, add translations and append an `..addAll` in each locale in `_sentences`

import 'package:flutter/material.dart';
import 'package:ugma_today/lang/trans/errors.dart';
import 'package:ugma_today/lang/trans/messages.dart';

/// Handle app custom translations
class Localization {
  Localization(this._locale);
  final Locale _locale;

  /// Get an instance of `Localization` from the current build context
  static Localization of(BuildContext context) {
    return Localizations.of<Localization>(context, Localization);
  }

  /// This member stores all the translations
  final Map<String, Map<String, String>> _sentences = {
    'es': Map()..addAll(errors['es'])..addAll(messages['es']),
    'en': Map()..addAll(errors['en'])..addAll(messages['en']),
  };

  /// This method acts like acessor for the translations
  /// if the key exists in `_sentences` returns the translated word/phrase
  /// otherwise returns the given key
  String trans(String key) {
    if (key == null) {
      return '...';
    }

    return _sentences[_locale.languageCode][key] ?? key;
  }
}
