import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContactIcon from 'material-ui/svg-icons/communication/contact-mail'
import propertyLogic from './logic/property.logic'
import Snackbar from 'material-ui/Snackbar'
import { sendEmail } from '../gigya'

const styles = {
  header: {
    paddingTop: 40
  },
  icon: {
    paddingTop: 20
  },
  address: {
    width: '100%'
  },
  dialogTitle: {
    backgroundColor: '#354A5F',
    color: 'white'
  },
  addressBar: {
    display: 'flex'
  },
  dialog: {
    width: '70%',
    maxWidth: 1000
  },
  menu: {
    width: 400
  }
}

@connect({
  props: [
    propertyLogic, [
      'isSendEmail'
    ]
  ],
  actions: [
    propertyLogic, [
      'toggleSendEmail'
    ]
  ]
})
export default class SendEmail extends React.Component {
  state = {
    sendTo: '',
    sentOpen: false,
    sentDisabled: false
  }
  handleSentRequestClose = () => {
    this.setState({
      sentOpen: false
    })
  }

  send = () => {
    const {customer, implementation} = this.props
    if (this.state.sendTo && customer && implementation) {
      sendEmail(this.state.sendTo, customer, implementation)
      this.setState({
        sentOpen: true,
        sentDisabled: true
      })
    }
  }

  render () {
    const {isSendEmail} = this.props
    const {toggleSendEmail} = this.actions

    const actions = [
      <FlatButton
        label='Close'
        primary
        onClick={toggleSendEmail}
      />,
      <FlatButton
        label='Send'
        primary
        keyboardFocused
        disabled={this.state.sentDisabled}
        onClick={this.send}
      />
    ]

    return (
      <Dialog
        title='Send Go-live notification via email'
        actions={actions}
        modal={false}
        open={isSendEmail}
        titleStyle={styles.dialogTitle}
        contentStyle={styles.dialog}
        onRequestClose={toggleSendEmail}
      >
        <Snackbar
          open={this.state.sentOpen}
          message='The Go-Live notification has been sent'
          autoHideDuration={8000}
          onRequestClose={this.handleSentRequestClose}
        />
        <div style={styles.header}>
          Here is a list of relevant staff that might be interested in this Go-live. Before sending a notification, we recommend
        sending it to yourself and making sure it looks accurate ;)
        </div>
        <div style={styles.addressBar}>
          <TextField
            style={styles.address}
            hintText='Type @sap.com email address to send to...'
            floatingLabelText='Send to:'
            value={this.state.sendTo}
            onChange={e => this.setState({sendTo: e.target.value})}
          />
          <IconMenu
            iconButtonElement={<IconButton><ContactIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={styles.icon}
          >
            <MenuItem
              style={styles.menu}
              primaryText='Marchesani, Stephanie'
              secondaryText='(Jam Go-live tracker)'
              onClick={() => this.setState({sendTo: 'stephanie.marchesani@sap.com'})} />
          </IconMenu>
        </div>
      </Dialog>
    )
  }
}
