import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:ugma_today/config/config.dart';
import 'package:ugma_today/utils/http/http.dart';

class MockRequest extends Mock implements http.Client {}

void main() {
  test('Test success get method', () async {
    http.Client client = MockRequest();
    final url = '${config('url')}/test';
    when(client.get(url))
        .thenAnswer((_) async => http.Response('{"test": "It works"}', 200));

    Request.customClient = client;

    final response = await Request.get('test', null).send();

    expect(response.body['test'], 'It works');
  });
}
