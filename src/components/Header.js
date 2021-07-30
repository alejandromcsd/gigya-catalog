import React from 'react'
import { connect } from 'kea'
import AppBar from 'material-ui/AppBar'
import NavigationClose from 'material-ui/svg-icons/file/folder-shared'
import Open from 'material-ui/svg-icons/action/aspect-ratio'
import Chat from 'material-ui/svg-icons/communication/chat'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import propertyLogic from './logic/property.logic'
import { logout, showProfile } from '../gigya'
import { isMobile } from '../utils'
import constants from '../constants'

const styles = {
  title: {
    color: 'white',
    fontSize: 14
  },
  button: {
    color: 'white'
  },
  header: {
    fontSize: 15
  },
  bar: {
    marginTop: -10,
    height: 60
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
      'setPropertyOnEdit',
      'toggleFullScreen'
    ]
  ]
})
export default class Header extends React.Component {
  addImplementation = () => {
    this.actions.setPropertyOnEdit({
      'Implementation': '',
      'Url': '',
      'Customer': '',
      'ImageUrl': '',
      'KickOffDate': null,
      'GoLiveDate': new Date(),
      'AM': '',
      'IC': '',
      'TC': '',
      'TA': '',
      'Country': '',
      'Region': '',
      'Platform': '',
      'Category': '',
      'ImplementationPartner': '',
      'Description': '',
      'TechnicalDescription': '',
      'Keywords': []
    })
  }

  render () {
    const { currentUser } = this.props
    const { toggleFullScreen } = this.actions

    if (!currentUser) return null
    return (
      <AppBar
        title={<span>Customer Data Go-Lives Catalog</span>}
        style={styles.bar}
        titleStyle={styles.header}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={
          <div>
            {(currentUser && currentUser.profile) && (
              <div>
                <FlatButton style={styles.button} onClick={showProfile} label='YOUR ACCOUNT' />
                { !isMobile() &&
                <FlatButton style={styles.button} onClick={this.addImplementation} label='ADD NEW IMPLEMENTATION' />
                }
                <FlatButton style={styles.button} onClick={logout} label='LOGOUT' />

                <IconButton tooltip='Go to Slack channel' tooltipPosition='bottom-left' onClick={() => window.open(constants.slackUrl, '_blank')}>
                  <Chat color={styles.button.color} />
                </IconButton>
                <IconButton tooltip='Full screen' tooltipPosition='bottom-left' onClick={() => toggleFullScreen()}>
                  <Open color={styles.button.color} />
                </IconButton>

              </div>
            )}
          </div>
        }
      />
    )
  }
}
