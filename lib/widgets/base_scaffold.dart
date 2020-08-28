import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:ugma_today/lang/localization.dart';
import 'package:ugma_today/redux/actions/util_actions.dart';
import 'package:ugma_today/redux/states/app_state.dart';

/// BaseScaffold is a Scaffold wrapper to give to the `_ScaffoldBody` a
/// Scaffold context, required to display `Snackbar` and `Dialog`
class BaseScaffold extends StatelessWidget {
  /// Works same as Scaffold body
  final Widget body;

  /// Works same as Scaffold appBar
  final PreferredSizeWidget appBar;

  BaseScaffold({@required this.body, this.appBar});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar,
      body: _ScaffoldBody(
        body: body,
      ),
    );
  }
}

/// `_Model` represents the redux connection
class _Model {
  final String snackbarText;

  final void Function() removeSnackbar;

  _Model(this.snackbarText, this.removeSnackbar);

  @override
  operator ==(other) {
    return other.hashCode == hashCode;
  }

  @override
  int get hashCode => this.snackbarText.hashCode;
}

/// Because Snackbar depends on a context with Scaffold
/// this widget is required, is only a wrapper with the store connector
/// logic related with redux must be here
class _ScaffoldBody extends StatelessWidget {
  final Widget body;

  _ScaffoldBody({@required this.body});

  void Function(_Model) onDidChange(BuildContext context) {
    return (_Model model) {
      if (model.snackbarText != null) {
        Scaffold.of(context).showSnackBar(
          SnackBar(
            content: Text(Localization.of(context).trans(model.snackbarText)),
          ),
        );
      }
    };
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _Model>(
      converter: (store) => _Model(
        store.state.utils.snackbar,
        () => store.dispatch(RemoveSnackbar()),
      ),
      builder: (context, model) => body,
      onDidChange: onDidChange(context),
      distinct: true,
    );
  }
}
