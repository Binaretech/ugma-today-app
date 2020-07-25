import 'package:flutter/material.dart';
import 'package:flutter_app/containers/home_container.dart';

final Map<String, Widget Function(BuildContext)> routes = {
  '/': (context) => HomeContainer(),
};
