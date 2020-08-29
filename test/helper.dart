import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:ugma_today/lang/delegates.dart';
import 'package:ugma_today/lang/supported_locales.dart';
import 'package:ugma_today/redux/reducers/reducers.dart';
import 'package:ugma_today/redux/states/app_state.dart';

Widget makeTestableWidget({Widget child}) {
  return MediaQuery(
    data: MediaQueryData(),
    child: MaterialApp(
      localizationsDelegates: delegates,
      supportedLocales: locales,
      home: child,
    ),
  );
}

Widget makeReduxTestableWidget({Widget child}) {
  final Store<AppState> store = Store<AppState>(
    appReducer,
    initialState: AppState.initialState(),
  );

  return MediaQuery(
    data: MediaQueryData(),
    child: StoreProvider<AppState>(
      store: store,
      child: MaterialApp(
        localizationsDelegates: delegates,
        supportedLocales: locales,
        home: child,
      ),
    ),
  );
}
