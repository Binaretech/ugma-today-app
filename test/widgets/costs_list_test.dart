import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ugma_today/models/cost.dart';
import 'package:ugma_today/widgets/costs_list.dart';
import '../helper.dart';

void main() {
  final costs = List.generate(
    20,
    (index) => Cost(
      name: 'name$index',
      comment: 'asdadasdasd',
      currency: 0,
      currencyName: 'Bs',
      id: index,
      price: (index + 1 * 100).toString(),
    ),
  );

  testWidgets('show cost list', (WidgetTester tester) async {
    await tester.pumpWidget(
      makeTestableWidget(
          child: CostList(
        costs: costs,
      )),
    );

    await tester.pumpAndSettle();

    expect(find.byType(Card, skipOffstage: false), findsWidgets);
  });
}
