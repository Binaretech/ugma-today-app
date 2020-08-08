enum Env {
  Development,
  Stagging,
  Production,
}

class Config {
  static final _appEnv = Env.Production;

  static final Map<String, String> _devConf = {
    'url': 'https://localhost/api',
  };

  static final Map<String, String> _staggingConf = {
    'url': 'https://production.com'
  };

  static final Map<String, String> _prodConf = {
    'url': 'https://production.com'
  };

  static String get(String name) {
    switch (_appEnv) {
      case Env.Development:
        return _devConf[name];
        break;
      case Env.Stagging:
        return _staggingConf[name];
        break;
      default:
        return _prodConf[name];
        break;
    }
  }
}
