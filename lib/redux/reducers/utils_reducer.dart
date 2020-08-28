import 'package:ugma_today/redux/actions/util_actions.dart';
import 'package:ugma_today/redux/states/util_state.dart';

UtilState utilsReducer(UtilState state, UtilsAction action) {
  if (action is ShowSnackbarAction) {
    return UtilState(snackbar: action.message);
  }

  if (action is RemoveSnackbar) {
    return UtilState(snackbar: null);
  }

  return state;
}
