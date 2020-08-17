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

/// Manage http requests
class Request {
  final http.Client _client;
  final String _url;
  final _Method _method;
  final Duration timeout;

  final BuildContext _context;

  Request._instantiate(this._client, this._url, this._method, this._context,
      {this.timeout = const Duration(seconds: 10)});

  /// Return request instance prepared to send a get request
  static Request get(String url, BuildContext context,
      {bool useBaseUrl = true}) {
    var client = http.Client();

    if (useBaseUrl) {
      url = '${Config.get('url')}/$url';
    }

    return Request._instantiate(client, url, _Method.Get, context);
  }

  /// Send request and return a response future
  Future<Response> send({bool handleEvent = true}) async {
    Future<http.Response> resFuture;
    switch (_method) {
      case _Method.Get:
        resFuture = _client.get(_url);
        break;

      case _Method.Post:
        resFuture = _client.post(_url);
        break;

      case _Method.Put:
        resFuture = _client.put(_url);
        break;

      case _Method.Delete:
        resFuture = _client.delete(_url);
        break;
    }

    try {
      http.Response res = await resFuture.timeout(timeout);

      Response response = Response(
        body: jsonDecode(res.body) as Map<String, dynamic>,
        status: res.statusCode,
      );

      return _dispatchEvent(response);
    } catch (error) {
      return Future.error(ErrorsLocations.of(_context).networkError);
    }
  }

  /// Close active request
  void close() {
    try {
      _client.close();
    } catch (_) {}
  }

  Future<Response> _onSuccess(Response response) {
    String message = _getMessageFromResponse(response.body);

    if (message != null) {
      Scaffold.of(_context).showSnackBar(
        SnackBar(
          content: Text(message),
        ),
      );
    }

    return Future.value(response);
  }

  Future<Response> _onError(Response response) {
    String message = _getMessageFromResponse(response.body);
    if (message != null) {
      Scaffold.of(_context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Theme.of(_context).errorColor,
        ),
      );
    }

    return Future.error(message ?? ErrorsLocations.of(_context).generalError);
  }

  Future<Response> _dispatchEvent(Response response) {
    if (response.status >= 200 && response.status < 300) {
      return _onSuccess(response);
    }

    if (response.status >= 400 && response.status < 500) {
      return _onError(response);
    }

    if (response.status >= 500) {
      return _onError(response);
    }

    return _onError(
      Response(body: {'message': ErrorsLocations.of(_context).networkError}),
    );
  }

  String _getMessageFromResponse(Map<String, dynamic> response,
      {String defaultMessage}) {
    return response.containsKey('message')
        ? response['message']
        : defaultMessage;
  }
}
