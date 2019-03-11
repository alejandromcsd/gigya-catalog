import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
// import {Tabs, Tab} from 'material-ui/Tabs'
import propertyLogic from './logic/property.logic'
import { addEventHandlers, getAccountInfo } from '../gigya'

const styles = {
  dialogTitle: {
    backgroundColor: 'black',
    color: 'white',
    borderBottom: '3px solid #0070b1'
  }
}

@connect({
  props: [
    propertyLogic, [
      'currentUser'
    ]
  ],
  actions: [
    propertyLogic, [
      'onLogin',
      'onLogout',
      'startFire'
    ]
  ]
})
export default class Login extends React.Component {
  constructor () {
    super()
    this.state = { loading: true }
  }

  componentWillMount () {
    const { onLogin, onLogout } = this.actions
    addEventHandlers(onLogin, onLogout)
    getAccountInfo((user) => {
      this.setState({ loading: false })
      onLogin(user)
    })
  }

  render () {
    const { currentUser } = this.props
    const { loading } = this.state

    if (currentUser || loading) {
      return null
    }

    return (
      <div>
        <Dialog
          title='CDC Catalog'
          titleStyle={styles.dialogTitle}
          modal
          autoScrollBodyContent
          open={!currentUser}
        >
          <div id='gigya-container-login' />
        </Dialog>
      </div>
    )
  }
}
