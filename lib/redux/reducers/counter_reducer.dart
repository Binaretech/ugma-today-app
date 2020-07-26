import 'package:ugma_today/redux/actions/counter_actions.dart';
import 'package:ugma_today/redux/states/counter_state.dart';

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
