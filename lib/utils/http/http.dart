import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ugma_today/config/config.dart';
import 'package:ugma_today/lang/localization.dart';

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

/// Wrapper for the http package
/// This class must be instantiated with the static `get` `post` `put` and `delete` methods
class Request {
  /// This store the http client instance
  final http.Client _client;

  /// Request's URL
  final String _url;

  /// HTTP Method
  final _Method _method;

  /// Request timeout. default `10s`
  final Duration timeout;

  final BuildContext _context;

  static http.Client _customClient;

  static set customClient(http.Client customClient) =>
      _customClient = customClient;

  Request._instantiate(this._client, this._url, this._method, this._context,
      {this.timeout = const Duration(seconds: 10)});

  /// Return request instance prepared to send a get request
  static Request get(String url, BuildContext context,
      {bool useBaseUrl = true}) {
    var client = _customClient ?? http.Client();

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
      Scaffold.of(_context, nullOk: true).showSnackBar(
        SnackBar(
          content:
              Text(Localization.of(_context).trans('errors.network_error')),
          backgroundColor: Theme.of(_context).errorColor,
        ),
      );

      return Future.error(
          Localization.of(_context).trans('errors.network_error'));
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
      Scaffold.of(_context, nullOk: true).showSnackBar(
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
      Scaffold.of(_context, nullOk: true).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Theme.of(_context).errorColor,
        ),
      );
    }

    return Future.error(
        message ?? Localization.of(_context).trans('errors.general_error'));
  }

  /// Handle the request's sucess or failure
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
      Response(body: {
        'message': Localization.of(_context).trans('errors.network_error')
      }),
    );
  }

  /// Acts like a helper to get the message from the request response
  String _getMessageFromResponse(Map<String, dynamic> response,
      {String defaultMessage}) {
    return response.containsKey('message')
        ? response['message']
        : defaultMessage;
  }
}
