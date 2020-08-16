import 'package:flutter/material.dart';
import 'package:ugma_today/routes/api_routes.dart';
import 'package:ugma_today/utils/http/http.dart';
import 'package:ugma_today/models/cost.dart';

/// Home screen with costs list
class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool loading = true;
  List<Cost> costs = [];

  Request request;

  final GlobalKey<ScaffoldState> _key = GlobalKey();

  @override
  void initState() {
    super.initState();

    request = Request.get(apiRoutes.cost, scaffoldKey: _key)
      ..send()
          .then(
        (value) => setState(() {
          costs = Cost.fromResponseList(value.body['data']);
          loading = false;
        }),
      )
          .catchError(
        (error) {
          print(error.toString());
          setState(() => loading = false);
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
          children: [
            Center(
              child: Text('${cost.price} ${cost.currencyName}'),
            ),
            cost.comment != null ? Text(cost.comment) : null,
          ].where((el) => el != null).toList(),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text("Ugma today"),
      ),
      body: Center(
        child: loading
            ? CircularProgressIndicator()
            : ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 100),
                itemCount: costs.length,
                itemBuilder: (context, index) => FractionallySizedBox(
                  widthFactor: 1,
                  child: Container(
                    constraints: BoxConstraints(maxWidth: 400.0),
                    child: Card(
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
                            style: Theme.of(context).textTheme.headline4,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
      ),
    );
  }
}
