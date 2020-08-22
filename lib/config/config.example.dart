/// Environment enum
///
/// there are 3 environments `[Development]` `[Stagging]` and `[Production]`
/// `[Development]` is the local enviroment
/// `[Stagging]` is a testing environment before go to production
/// `[Production]` is the final environment, where the final users can
/// access to the app
enum Env {
  Development,
  Stagging,
  Production,
}

/// Config handler
///
/// Store different configurations for each env
class Config {
  /// App current env configuration
  static final _appEnv = Env.Production;

  /// Development configurations
  static final Map<String, String> _devConf = {
    'url': 'http://localhost/api',
  };

  /// Stagging configurations
  static final Map<String, String> _staggingConf = {
    'url': 'https://production.com'
  };

  /// Production configurations
  static final Map<String, String> _prodConf = {
    'url': 'https://api-ugma-today.herokuapp.com/api'
  };

  /// config accessor
  ///
  /// ## Example
  /// ```dart
  /// Config.get('url') // returns 'http://localhost/api' if `_appEnv` is Development
  /// ```
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
