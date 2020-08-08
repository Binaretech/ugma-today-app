import 'package:http/http.dart' as http;
import 'package:ugma_today/config/config.dart';

class Http {
  static String _token;

  static void setToken(String token) {
    _token = token;
  }

  Future<http.Response> get(String url,
      {bool useBaseUrl = false,
      Map<String, String> headers = const {},
      bool useAuthorization = true}) {
    final String fullUrl = useBaseUrl ? '${Config.get('url')}/$url' : url;

    if (useAuthorization) {
      headers = headers
        ..addAll({
          'Authorization': 'Bearer $_token',
        });
    }

    return http.get(fullUrl, headers: headers);
  }

  Future<http.Response> post(
    String url, {
    bool useBaseUrl = false,
    Map<String, String> headers = const {},
    bool useAuthorization = true,
    Map<String, dynamic> body,
  }) {
    final String fullUrl = useBaseUrl ? '${Config.get('url')}/$url' : url;

    if (useAuthorization) {
      headers = headers
        ..addAll({
          'Authorization': 'Bearer $_token',
        });
    }

    return http.post(fullUrl, headers: headers, body: body);
  }

  Future<http.Response> put(
    String url, {
    bool useBaseUrl = false,
    Map<String, String> headers = const {},
    bool useAuthorization = true,
    Map<String, dynamic> body,
  }) {
    final String fullUrl = useBaseUrl ? '${Config.get('url')}/$url' : url;

    if (useAuthorization) {
      headers = headers
        ..addAll({
          'Authorization': 'Bearer $_token',
        });
    }

    return http.put(fullUrl, headers: headers, body: body);
  }

  Future<http.Response> delete(
    String url, {
    bool useBaseUrl = false,
    Map<String, String> headers = const {},
    bool useAuthorization = true,
    Map<String, dynamic> body,
  }) {
    final String fullUrl = useBaseUrl ? '${Config.get('url')}/$url' : url;

    if (useAuthorization) {
      headers = headers
        ..addAll({
          'Authorization': 'Bearer $_token',
        });
    }

    return http.delete(fullUrl, headers: headers);
  }
}
