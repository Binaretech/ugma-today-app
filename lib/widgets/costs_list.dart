import 'package:flutter/material.dart';
import 'package:ugma_today/lang/localization.dart';
import 'package:ugma_today/models/cost.dart';

class CostList extends StatelessWidget {
  final List<Cost> costs;

  CostList({Key key, this.costs}) : super(key: key);

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

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(maxWidth: 400.0, minWidth: 250.0),
      child: costs.length > 0
          ? ListView.builder(
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
            )
          : Text(
              Localization.of(context).trans('messages.temporalyNoRecords'),
              style: Theme.of(context).textTheme.headline5,
              textAlign: TextAlign.center,
            ),
    );
  }
}
