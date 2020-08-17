import 'package:flutter/material.dart';
import 'package:ugma_today/screens/home.dart' deferred as home;

Map<String, Widget Function(BuildContext)> routes() {
  return {
    '/': (context) => _route(context, home.Home()),
  };
}

Widget _route(BuildContext context, Widget route) {
  return route;
}
