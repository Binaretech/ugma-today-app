import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ugma_today/config/config.dart';
import 'package:ugma_today/lang/errors/errors_locations.dart';

/// Response model
class Response {
  /// response json body
  final Map<String, dynamic> body;

  /// response status
  final int status;

  Response({this.body, this.status});
}

/// http methods enum
enum _Method { Get, Post, Put, Delete }

/// Manage requests
class Request {
  final http.Client _client;
  final String _url;
  final _Method _method;
  final Duration timeout;

  /// GlobalKey to generate snackbars
  final GlobalKey<ScaffoldState> scaffoldKey;

  /// build context to get locales
  static BuildContext _context;

  static set buildContext(BuildContext context) {
    _context = context;
  }

  Request._instantiate(this._client, this._url, this._method,
      {this.timeout = const Duration(seconds: 10), this.scaffoldKey});

  /// Return request instance prepared to send a get request
  static Request get(String url,
      {bool useBaseUrl = true, GlobalKey<ScaffoldState> scaffoldKey}) {
    var client = http.Client();

    if (useBaseUrl) {
      url = '${Config.get('url')}/$url';
    }

    return Request._instantiate(client, url, _Method.Get,
        scaffoldKey: scaffoldKey);
  }

  /// Send request and return a response future
  Future<Response> send({bool handleEvent = true}) async {
    Future<http.Response> res;
    switch (_method) {
      case _Method.Get:
        res = _client.get(_url);
        break;

      case _Method.Post:
        res = _client.post(_url);
        break;

      case _Method.Put:
        res = _client.put(_url);
        break;

      case _Method.Delete:
        res = _client.delete(_url);
        break;
    }

    try {
      http.Response response = await res.timeout(timeout);

      var body = jsonDecode(response.body) as Map<String, dynamic>;

      if (scaffoldKey != null) _dispatchEvent(response.statusCode, body);

      return Response(
        body: body,
        status: response.statusCode,
      );
    } catch (error) {
      scaffoldKey.currentState.showSnackBar(
        SnackBar(content: Text(ErrorsLocations.of(_context).networkError)),
      );

      return Future.error(error);
    }
  }

  /// Close active request
  void close() {
    try {
      _client.close();
    } catch (_) {}
  }

  void _onSuccess(String message) {
    if (message != null) {
      scaffoldKey.currentState.showSnackBar(
        SnackBar(
          content: Text(message),
        ),
      );
    }
  }

  void _onError(String message) {
    if (message != null) {
      scaffoldKey.currentState.showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Theme.of(_context).errorColor,
        ),
      );
    }
  }

  void _dispatchEvent(int statusCode, Map<String, dynamic> body) {
    if (statusCode >= 200 && statusCode < 300) {
      return _onSuccess(_getMessageFromResponse(body));
    }

    if (statusCode >= 400 && statusCode < 500) {
      return _onError(_getMessageFromResponse(body));
    }

    if (statusCode >= 500) {
      return _onError(_getMessageFromResponse(body));
    }

    return _onError(ErrorsLocations.of(_context).networkError);
  }

  String _getMessageFromResponse(Map<String, dynamic> response,
      {String defaultMessage}) {
    return response.containsKey('message')
        ? response['message']
        : defaultMessage;
  }
}
