import 'package:flutter/material.dart';

abstract class UtilsAction {}

class ShowSnackbarAction extends UtilsAction {
  final String message;
  final SnackBarAction action;

  ShowSnackbarAction(this.message, {this.action});
}

class RemoveSnackbar extends UtilsAction {
  RemoveSnackbar();
}
