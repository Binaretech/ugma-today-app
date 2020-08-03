import 'package:flutter/material.dart';
import 'package:ugma_today/containers/home_container.dart' deferred as home;

Map<String, Widget Function(BuildContext)> routes() {
  return {
    '/': (context) => home.HomeContainer(),
  };
}
