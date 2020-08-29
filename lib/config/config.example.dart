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

/// App current env configuration
const _appEnv = Env.Production;

/// Development configurations
const Map<String, String> _devConf = {
  'url': 'http://localhost/api',
};

/// Stagging configurations
const Map<String, String> _staggingConf = {'url': 'https://production.com'};

/// Production configurations
const Map<String, String> _prodConf = {
  'url': 'https://api-ugma-today.herokuapp.com/api'
};

/// config accessor
///
/// ## Example
/// ```dart
/// config('url') // returns 'http://localhost/api' if `_appEnv` is Development
/// ```
String config(String name) {
  switch (_appEnv) {
    case Env.Development:
      return _devConf[name];
    case Env.Stagging:
      return _staggingConf[name];
    default:
      return _prodConf[name];
  }
}
