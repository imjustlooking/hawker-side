import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import NavParent from './Routes'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NavParent />, document.getElementById('root'));
registerServiceWorker()
