import React from 'react';
import ReactDOM from'react-dom';
import ReactDOMServer from'react-dom/server';
import {Router, browserHistory, createMemoryHistory} from 'react-router';
import DocumentMeta from 'react-document-meta';
import Routes from './routes';
import Root from '../components/Root/Root.js';

if (typeof document !== 'undefined') {
  const app = document.getElementById('app');
  ReactDOM.render(<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={Routes}/>, app);
}

export default (locals, callback) => {
  const history = createMemoryHistory(locals.path);
  const app = {__html: ReactDOMServer.renderToString(<Router history={history} routes={Routes}/>)};
  const meta = DocumentMeta.renderAsReact();
  const html = ReactDOMServer.renderToStaticMarkup(<Root meta={meta} app={app}/>);
  callback(null, '<!DOCTYPE html>' + html);
};
