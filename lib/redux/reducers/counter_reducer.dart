import 'package:flutter_app/redux/actions/counter_actions.dart';
import 'package:flutter_app/redux/states/counter_state.dart';

CounterState counterReducer(CounterState state, CounterAction action) {
  switch (action) {
    case CounterAction.increase:
      return CounterState(
        count: state.count + 1,
      );
      break;
    default:
      return state;
  }
}
