import React from 'react'
import { connect } from 'kea'
import { withRouter } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import Snackbar from 'material-ui/Snackbar'
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import ShareIcon from 'material-ui/svg-icons/social/share'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import propertyLogic from './logic/property.logic'
import {toHTML, copyURLToClipboard} from '../utils'
import constants from '../constants'

const styles = {
  chipLabelStyle: {
    color: 'white'
  },
  button: {
    margin: 10,
    float: 'right'
  },
  chip: {
    marginRight: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  dialogTitle: {
    backgroundColor: '#354A5F',
    color: 'white'
  },
  image: {
    minHeight: 300
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  avatar: {
    backgroundColor: '#0070b1',
    color: 'white'
  },
  detailsSection: {
    paddingTop: '30px',
    paddingBottom: '10px'
  }
}

@connect({
  props: [
    propertyLogic, [
      'isOpen',
      'selectedProperty'
    ]
  ],
  actions: [
    propertyLogic, [
      'setPropertyOnEdit',
      'toggleDialog'
    ]
  ]
})
export class PropertyDetails extends React.Component {
  constructor () {
    super()
    this.state = {
      copyUrlOpen: false
    }
  }

  handleCopyRequestClose = () => {
    this.setState({
      copyUrlOpen: false
    })
  }

  copyURL = () => {
    copyURLToClipboard()
    this.setState({
      copyUrlOpen: true
    })
  }

  renderChip = (data) => {
    return (
      <Chip
        key={data}
        style={styles.chip}
        labelColor={styles.chipLabelStyle.color}
      >
        {data}
      </Chip>
    )
  }

  renderMedia = (selectedProperty) => (
    <div>
      <RaisedButton
        label='Edit'
        labelPosition='before'
        primary
        icon={<ModeEdit />}
        onClick={() => this.actions.setPropertyOnEdit(selectedProperty)}
        style={styles.button}
      />
      <RaisedButton
        label='View Implementation'
        labelPosition='before'
        primary
        icon={<LanguageIcon />}
        href={selectedProperty['Url']}
        target='_blank'
        style={styles.button}
      />
      <RaisedButton
        label='Share'
        labelPosition='before'
        primary
        icon={<ShareIcon />}
        onClick={this.copyURL}
        target='_blank'
        style={styles.button}
      />
    </div>
  )

  toggleDetails = () => {
    this.props.history.push('/')
    this.actions.toggleDialog()
  }

  render () {
    const { isOpen, selectedProperty } = this.props

    const subtitle = `
      AM: ${selectedProperty['AM']} |
      IC: ${selectedProperty['IC']} |
      TC: ${selectedProperty['TC']} |
      Go Live: ${selectedProperty['GoLiveDate']} |
      Platform: ${selectedProperty['Platform']} |
      Country: ${selectedProperty['Country']} |
      Category: ${selectedProperty['Category']}
    `

    if (!isOpen) return null
    return (
      <div>
        <Snackbar
          open={this.state.copyUrlOpen}
          message='The link has been copied to your Clipboard'
          autoHideDuration={4000}
          onRequestClose={this.handleCopyRequestClose}
        />
        <Dialog
          title='Implementation details'
          modal={false}
          autoScrollBodyContent
          titleStyle={styles.dialogTitle}
          open={isOpen}
          onRequestClose={this.toggleDetails}
        >
          <Card>
            <CardHeader
              title={selectedProperty['Implementation']}
              subtitle={selectedProperty['Customer']}
              avatar={selectedProperty['ImageUrl']}
            />
            <CardMedia
              overlay={this.renderMedia(selectedProperty)}
            >
              {selectedProperty['ImageUrl'] && <img src={selectedProperty['ImageUrl']} alt='' style={styles.image} />}
            </CardMedia>
            <CardTitle
              title={selectedProperty['Implementation']}
              subtitle={subtitle}
            />
            <CardText>
              <div style={styles.wrapper}>
                {selectedProperty['Keywords'].map(this.renderChip, this)}
              </div>

              {(selectedProperty[constants.fields.useIdentity] ||
                selectedProperty[constants.fields.useConsent] ||
                selectedProperty[constants.fields.useProfile]) &&
                <div>
                  <h3>{constants.labels.productsLabel}</h3>
                  <List style={styles.avatarContainer}>
                    {selectedProperty[constants.fields.useIdentity] &&
                    <ListItem
                      disabled
                      leftAvatar={
                        <Avatar
                          color={styles.avatar.color}
                          size={30}
                          backgroundColor={styles.avatar.backgroundColor}
                        >
                        I
                        </Avatar>
                      }
                    >
                    Identity
                    </ListItem>
                    }
                    {selectedProperty[constants.fields.useConsent] &&
                    <ListItem
                      disabled
                      leftAvatar={
                        <Avatar
                          color={styles.avatar.color}
                          size={30}
                          backgroundColor={styles.avatar.backgroundColor}
                        >
                        C
                        </Avatar>
                      }
                    >
                    Consent
                    </ListItem>
                    }
                    {selectedProperty[constants.fields.useProfile] &&
                    <ListItem
                      disabled
                      leftAvatar={
                        <Avatar
                          color={styles.avatar.color}
                          size={30}
                          backgroundColor={styles.avatar.backgroundColor}
                        >
                        P
                        </Avatar>
                      }
                    >
                    Profile
                    </ListItem>
                    }
                  </List>
                </div>
              }

              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.referenceLabel}</h3>
                <div>{selectedProperty[constants.fields.useAsReference]
                  ? 'Yes, customer has authorised to use this implementation as a reference with externals'
                  : 'No, customer has not authorised yet to use this implementation as a reference with externals'
                }</div>
              </div>

              {selectedProperty[constants.fields.tdd] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.tddLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.tdd])}} />
              </div>
              }

              {selectedProperty[constants.fields.apiKey] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.apiKeyLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.apiKey])}} />
              </div>
              }

              {selectedProperty[constants.fields.customFlows] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.customFlowsLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.customFlows])}} />
              </div>
              }

              {selectedProperty[constants.fields.cms] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.cmsLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.cms])}} />
              </div>
              }

              {selectedProperty[constants.fields.serverSession] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.serverSessionLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.serverSession])}} />
              </div>
              }

              {selectedProperty[constants.fields.centralizedLogin] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.centralizedLoginLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.centralizedLogin])}} />
              </div>
              }

              {selectedProperty[constants.fields.frontEnd] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.frontEndLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.frontEnd])}} />
              </div>
              }

              {selectedProperty[constants.fields.overriding] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.overridingLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.overriding])}} />
              </div>
              }

              {selectedProperty[constants.fields.description] &&
              <div style={styles.detailsSection}>
                <Divider />
                <h3>{constants.labels.descriptionLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.description])}} />
              </div>
              }
            </CardText>
          </Card>

        </Dialog>
      </div>
    )
  }
}

export default withRouter(PropertyDetails)
