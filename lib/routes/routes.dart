import 'package:flutter/material.dart';
import 'package:ugma_today/screens/home.dart';

Map<String, Widget Function(BuildContext)> routes() {
  return {
    '/': (context) => Home(),
  };
}
