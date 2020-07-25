import 'package:flutter_app/redux/reducers/counter_reducer.dart';
import 'package:flutter_app/redux/states/app_state.dart';

AppState appReducer(AppState state, dynamic action) {
  return AppState(
    counter: counterReducer(state.counter, action),
  );
}
