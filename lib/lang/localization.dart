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
  final _sentences = {
    'es': Map()..addAll(errors['es'])..addAll(messages['es']),
    'en': Map()..addAll(errors['en'])..addAll(messages['en']),
  };

  /// This method acts like acessor for the translations using dot notation
  /// if the key exists in `_sentences` returns the translated word/phrase
  /// otherwise returns the given trans string
  /// ### Example
  /// ```dart
  /// Localization.of(context).trans('messages.updatedApp') // Returns 'There is an application update, please refresh' if the locale is `en`
  /// ```
  String trans(String trans) {
    if (trans == null) {
      return '...';
    }

    final keys = trans.split('.');

    dynamic message;

    message = _sentences[_locale.languageCode];

    for (var key in keys) {
      message = message[key];

      if (message == null) return trans;
    }

    if (!(message is String)) return trans;

    return message;
  }
}
