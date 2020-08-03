import 'package:flutter/material.dart';
import 'package:ugma_today/lang/delegates.dart';
import 'package:ugma_today/lang/supported_locales.dart';
import 'package:ugma_today/redux/reducers/reducers.dart';
import 'package:ugma_today/redux/states/app_state.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:ugma_today/routes/routes.dart';

void main() {
  runApp(UgmaToday(
    store: Store<AppState>(
      appReducer,
      initialState: AppState.initialState(),
    ),
  ));
}

class UgmaToday extends StatelessWidget {
  final Store<AppState> store;

  UgmaToday({Key key, this.store}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreProvider<AppState>(
      store: this.store,
      child: MaterialApp(
        title: 'Ugma Today',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        initialRoute: '/',
        routes: routes(),
        localizationsDelegates: delegates,
        supportedLocales: locales,
      ),
    );
  }
}
