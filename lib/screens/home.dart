import 'package:flutter/material.dart';
import 'package:ugma_today/widgets/base_scaffold.dart';
import 'package:ugma_today/widgets/costs_list.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Center(
        child: CostList(),
      ),
    );
  }
}
