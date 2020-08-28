import 'package:universal_html/html.dart';

void register(void Function(String) showSnackbar) {
  if (window.navigator.serviceWorker != null) {
    window.addEventListener('load', (_) {
      window.navigator.serviceWorker
          .register('flutter_service_worker.js')
          .then((reg) {
        reg.addEventListener('updatefound', (_) {
          final installworker = reg.installing;
          installworker.addEventListener('statechange', (_) {
            switch (installworker.state) {
              case 'installed':
                if (window.navigator.serviceWorker.controller != null) {
                  installworker.postMessage('skipWaiting');
                  showSnackbar('messages.updatedApp');
                }
                break;
            }
          });
        });
      });
    });
  }
}
