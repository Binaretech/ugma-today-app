import 'package:flutter/material.dart';
import 'package:ugma_today/screens/home.dart';
import 'package:ugma_today/utils/http/http.dart';

Map<String, Widget Function(BuildContext)> routes() {
  return {
    '/': (context) => _route(context, Home()),
  };
}

Widget _route(BuildContext context, Widget route) {
  Request.buildContext = context;
  return route;
}
