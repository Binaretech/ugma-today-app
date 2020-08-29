import 'package:ugma_today/redux/states/counter_state.dart';
import 'package:ugma_today/redux/states/util_state.dart';

class AppState {
  final CounterState counter;
  final UtilState utils;

  AppState({this.counter, this.utils});

  AppState.initialState()
      : this.counter = CounterState.initialState(),
        this.utils = UtilState.initialState();

  AppState.from(AppState prevState)
      : this.counter = prevState.counter,
        this.utils = prevState.utils;
}
