import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/lang/message/message_locations.dart';
import 'package:flutter_app/lang/supported_locales.dart';

class MessageDelegate extends LocalizationsDelegate<MessageLocations> {
  const MessageDelegate();

  @override
  bool isSupported(Locale locale) => locales.contains(locale);

  @override
  Future<MessageLocations> load(Locale locale) {
    return SynchronousFuture<MessageLocations>(MessageLocations(locale));
  }

  @override
  bool shouldReload(MessageDelegate old) => false;
}
