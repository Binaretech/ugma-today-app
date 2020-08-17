import 'package:flutter/material.dart';
import 'package:ugma_today/models/cost.dart';
import 'package:ugma_today/routes/api_routes.dart';
import 'package:ugma_today/utils/http/http.dart';

class CostList extends StatefulWidget {
  @override
  _CostListState createState() => _CostListState();
}

class _CostListState extends State<CostList> {
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

  /// Display dialog with cost details
  void showCostDialog(BuildContext context, Cost cost) {
    showDialog(
      context: context,
      builder: (_) {
        return SimpleDialog(
          title: Center(child: Text(cost.name)),
          contentPadding:
              EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          children: [
            Center(
              child: Text(
                '${cost.price} ${cost.currencyName}',
                style: Theme.of(context).textTheme.headline3,
                textAlign: TextAlign.center,
              ),
            ),
            cost.comment != null
                ? Center(
                    child: Text(
                      cost.comment,
                      textAlign: TextAlign.center,
                    ),
                  )
                : null,
          ].where((el) => el != null).toList(),
        );
      },
    );
  }

  Widget showContent() {
    if (errorMessage != null) {
      return Text(
        errorMessage,
        style: Theme.of(context).textTheme.headline5,
      );
    }

    return Container(
      constraints: BoxConstraints(maxWidth: 400.0, minWidth: 250.0),
      child: ListView.builder(
        itemCount: costs.length,
        itemBuilder: (context, index) => Card(
          child: ListTile(
            onTap: () => showCostDialog(context, costs[index]),
            title: Center(
              child: Text(
                costs[index].name,
              ),
            ),
            subtitle: Center(
              child: Text(
                '${costs[index].price} ${costs[index].currencyName}',
                style: Theme.of(context).textTheme.headline5,
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: loading ? CircularProgressIndicator() : showContent(),
    );
  }
}
