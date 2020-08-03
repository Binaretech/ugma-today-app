import 'package:flutter/material.dart';
import 'package:ugma_today/containers/home_container.dart';

Map<String, Widget Function(BuildContext)> routes() {
  return {
    '/': (context) => HomeContainer(),
  };
}
