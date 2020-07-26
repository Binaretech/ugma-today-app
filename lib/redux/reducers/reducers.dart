import 'package:ugma_today/redux/reducers/counter_reducer.dart';
import 'package:ugma_today/redux/states/app_state.dart';

AppState appReducer(AppState state, dynamic action) {
  return AppState(
    counter: counterReducer(state.counter, action),
  );
}
