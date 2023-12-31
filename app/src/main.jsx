import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';

import App from './components/App';
import './index.css'

const _root = document.getElementById('root')
const root = ReactDOM.createRoot(_root);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
