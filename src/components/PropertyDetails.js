import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import propertyLogic from './logic/property.logic'
import {toHTML} from '../utils'
import constants from '../constants'

const styles = {
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
    backgroundColor: 'black',
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
    backgroundColor: '#FFB407',
    color: '#000000'
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
export default class PropertyDetails extends React.Component {
  renderChip = (data) => {
    return (
      <Chip
        key={data}
        style={styles.chip}
      >
        {data}
      </Chip>
    )
  };

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
        // onClick={() => window.open(selectedProperty['Url'], '_blank')}
        style={styles.button}
      />
    </div>
  )

  render () {
    const { isOpen, selectedProperty } = this.props
    const { toggleDialog } = this.actions

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
        <RaisedButton label='Dialog' onClick={toggleDialog} />
        <Dialog
          title='Implementation details'
          modal={false}
          autoScrollBodyContent
          titleStyle={styles.dialogTitle}
          open={isOpen}
          onRequestClose={toggleDialog}
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
              {selectedProperty[constants.fields.tdd] &&
              <div>
                <h3>{constants.labels.tddLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.tdd])}} />
              </div>
              }

              {selectedProperty[constants.fields.apiKey] &&
              <div>
                <h3>{constants.labels.apiKeyLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.apiKey])}} />
              </div>
              }

              {selectedProperty[constants.fields.customFlows] &&
              <div>
                <h3>{constants.labels.customFlowsLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.customFlows])}} />
              </div>
              }

              {selectedProperty[constants.fields.cms] &&
              <div>
                <h3>{constants.labels.cmsLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.cms])}} />
              </div>
              }

              {selectedProperty[constants.fields.serverSession] &&
              <div>
                <h3>{constants.labels.serverSessionLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.serverSession])}} />
              </div>
              }

              {selectedProperty[constants.fields.centralizedLogin] &&
              <div>
                <h3>{constants.labels.centralizedLoginLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.centralizedLogin])}} />
              </div>
              }

              {selectedProperty[constants.fields.frontEnd] &&
              <div>
                <h3>{constants.labels.frontEndLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.frontEnd])}} />
              </div>
              }

              {selectedProperty[constants.fields.overriding] &&
              <div>
                <h3>{constants.labels.overridingLabel}</h3>
                <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.overriding])}} />
              </div>
              }

              {selectedProperty[constants.fields.description] &&
              <div>
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
