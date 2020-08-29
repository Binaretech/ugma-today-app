import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:ugma_today/redux/actions/util_actions.dart';
import 'package:ugma_today/redux/reducers/reducers.dart';
import 'package:ugma_today/redux/states/app_state.dart';
import 'package:redux/redux.dart';
import 'package:ugma_today/service_worker.dart';
import 'package:ugma_today/ugma_today.dart';
import 'package:universal_html/html.dart';

void main() {
  final store = Store<AppState>(
    appReducer,
    initialState: AppState.initialState(),
  );

  if (kIsWeb) {
    document.getElementById('root').remove();
    register((message) => store.dispatch(ShowSnackbarAction(message)));
  }

  runApp(UgmaToday(
    store: store,
  ));
}
