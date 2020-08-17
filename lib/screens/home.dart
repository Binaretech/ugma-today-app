import 'package:flutter/material.dart';
import 'package:ugma_today/widgets/costs_list.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Ugma today"),
      ),
      body: CostList(),
    );
  }
}
