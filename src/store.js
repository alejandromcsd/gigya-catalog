// store.js
import { getStore } from 'kea'
import sagaPlugin from 'kea-saga'

export default getStore({
  plugins: [ sagaPlugin ]
})
