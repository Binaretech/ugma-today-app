import 'package:flutter_test/flutter_test.dart';
import 'package:ugma_today/widgets/costs_list.dart';
import '../helper.dart';

void main() {
  testWidgets('show cost list', (WidgetTester tester) async {
    await tester.pumpWidget(
      makeTestableWidget(child: CostList()),
    );
  });
}
