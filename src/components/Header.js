import React from 'react'
import { connect } from 'kea'
import AppBar from 'material-ui/AppBar'
import NavigationClose from 'material-ui/svg-icons/file/folder-shared'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import {ToolbarTitle} from 'material-ui/Toolbar'
import propertyLogic from './logic/property.logic'
import { logout, showProfile } from '../gigya'

const styles = {
  title: {
    color: 'white',
    fontSize: 14
  },
  button: {
    color: 'white'
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
      'setPropertyOnEdit'
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
      'GoLiveDate': new Date(),
      'AM': '',
      'IC': '',
      'TC': '',
      'Country': '',
      'Platform': '',
      'Category': '',
      'Description': '',
      'Keywords': []
    })
  }

  render () {
    const { currentUser } = this.props

    if (!currentUser) return null
    return (
      <AppBar
        title={<span>Gigya Catalog</span>}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={
          <div>
            {(currentUser && currentUser.profile) && (
              <div>
                <ToolbarTitle style={styles.title} text={`Hi ${currentUser.profile.firstName}!`} />
                {/* <FlatButton style={styles.button} onClick={showCommunications} label='COMMUNICATIONS' />
                <FlatButton style={styles.button} onClick={showPrivacy} label='PRIVACY' /> */}
                <FlatButton style={styles.button} onClick={showProfile} label='PROFILE' />
                <FlatButton style={styles.button} onClick={this.addImplementation} label='ADD NEW IMPLEMENTATION' />
                <FlatButton style={styles.button} onClick={logout} label='LOGOUT' />
              </div>
            )}
          </div>
        }
      />
    )
  }
}
