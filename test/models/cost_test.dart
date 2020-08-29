import 'package:ugma_today/models/cost.dart';
import 'package:ugma_today/utils/http/http.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Cost from response', () async {
    Response response = Response(status: 200, body: {
      'name': 'name',
      'price': '10000',
      'comment': 'comment',
      'currency': 0,
      'currencyName': 'currencyName'
    });

    Cost cost = Cost.fromResponse(response.body);

    expect(cost, isA<Cost>());

    expect(cost.name, 'name');
    expect(cost.comment, 'comment');
    expect(cost.price, '10000');
    expect(cost.currency, 0);
    expect(cost.currencyName, 'currencyName');
  });

  test('Cost list from respose', () async {
    Response response = Response(
      status: 200,
      body: {
        'data': List.generate(
          10,
          (_) => {
            'name': 'name',
            'price': '10000',
            'comment': 'comment',
            'currency': 0,
            'currencyName': 'currencyName'
          },
        ),
      },
    );

    List<Cost> costs = Cost.fromResponseList(response.body['data']);

    expect(costs, isA<List<Cost>>());

    costs.forEach((cost) {
      expect(cost.name, 'name');
      expect(cost.comment, 'comment');
      expect(cost.price, '10000');
      expect(cost.currency, 0);
      expect(cost.currencyName, 'currencyName');
    });
  });
}
