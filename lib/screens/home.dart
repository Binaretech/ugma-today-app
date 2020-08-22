import 'package:flutter/material.dart';
import 'package:ugma_today/models/cost.dart';
import 'package:ugma_today/routes/api_routes.dart';
import 'package:ugma_today/utils/http/http.dart';
import 'package:ugma_today/widgets/costs_list.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool loading = true;
  List<Cost> costs = [];
  String errorMessage;

  Request request;
  @override
  void initState() {
    super.initState();

    request = Request.get(apiRoutes.cost, context)
      ..send()
          .then(
        (value) => setState(() {
          costs = Cost.fromResponseList(value.body['data']);
          loading = false;
        }),
      )
          .catchError(
        (error) {
          setState(
            () {
              loading = false;
              errorMessage = error;
            },
          );
        },
      );
  }

  @override
  void dispose() {
    request.close();

    super.dispose();
  }

  Widget showContent() {
    if (errorMessage != null) {
      return Text(
        errorMessage,
        style: Theme.of(context).textTheme.headline5,
        textAlign: TextAlign.center,
      );
    }
    return CostList(
      costs: costs,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Ugma today"),
      ),
      body: Center(
        child: loading ? CircularProgressIndicator() : showContent(),
      ),
    );
  }
}
