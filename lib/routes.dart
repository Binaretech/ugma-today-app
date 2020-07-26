import 'package:flutter/material.dart';
import 'package:ugma_today/containers/home_container.dart';

final Map<String, Widget Function(BuildContext)> routes = {
  '/': (context) => HomeContainer(),
};
