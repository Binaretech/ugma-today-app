import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:ugma_today/redux/reducers/reducers.dart';
import 'package:ugma_today/redux/states/app_state.dart';
import 'package:redux/redux.dart';
import 'package:ugma_today/ugma_today.dart';
import 'package:universal_html/html.dart';

void main() {
  if (kIsWeb) {
    document.getElementById('root').remove();
  }

  runApp(UgmaToday(
    store: Store<AppState>(
      appReducer,
      initialState: AppState.initialState(),
    ),
  ));
}
