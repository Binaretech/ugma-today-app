class Cost {
  final String name;
  final String price;
  final String comment;
  final int currency;
  final String currencyName;
  final int id;

  Cost(
      {this.id,
      this.name,
      this.price,
      this.comment,
      this.currency,
      this.currencyName});

  Cost.fromResponse(dynamic data)
      : this.name = data['name'],
        this.price = data['price'],
        this.comment = data['comment'],
        this.currency = data['currency'],
        this.currencyName = data['currencyName'],
        this.id = data['id'];

  static List<Cost> fromResponseList(List<dynamic> data) =>
      data.map((cost) => Cost.fromResponse(cost)).toList();
}
