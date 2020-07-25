import 'package:flutter/material.dart';
import 'package:flutter_app/redux/actions/counter_actions.dart';
import 'package:flutter_app/redux/states/app_state.dart';
import 'package:flutter_app/widgets/home.dart';
import 'package:flutter_redux/flutter_redux.dart';

class _Model {
  final Function() increaseAction;
  final int count;

  _Model(this.count, this.increaseAction);
}

class HomeContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _Model>(
      converter: (store) => _Model(
        store.state.counter.count,
        () => store.dispatch(increaseCount()),
      ),
      builder: (context, model) => Home(
        count: model.count,
        increaseAction: model.increaseAction,
      ),
    );
  }
}
