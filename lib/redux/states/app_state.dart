import 'package:ugma_today/redux/states/counter_state.dart';

class AppState {
  CounterState counter;

  AppState({this.counter});

  AppState.initialState() : this.counter = CounterState.initialState();

  AppState.from(AppState prevState) : this.counter = prevState.counter;
}
