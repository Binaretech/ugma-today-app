import 'package:flutter/material.dart';
import 'package:flutter_app/lang/message/message_locations.dart';
import 'package:flutter_app/lang/supported_locales.dart';

class Home extends StatelessWidget {
  final Function() increaseAction;
  final int count;

  Home({Key key, this.count, this.increaseAction}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Ugma today"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(MessageLocations.of(context).click),
            Text(
              '$count',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: increaseAction,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
