import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import { snackbarMessage } from './redux/actions/snackbarActions';
import { trans } from './trans/trans';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

BigNumber.set({
  decimalSeparator: ',',
  groupSeparator: '.',
  DECIMAL_PLACES: 2,
});

dayjs.extend(relativeTime);
dayjs.locale('es');

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register({
  onUpdate: () =>
    store.dispatch(snackbarMessage(trans('Components.snackbar.updateMessage'))),
});

reportWebVitals();
