import React from 'react'
import { connect } from 'kea'
import { withRouter } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import List from 'material-ui/List/List'
import Snackbar from 'material-ui/Snackbar'
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import ShareIcon from 'material-ui/svg-icons/social/share'
import ReferenceIcon from 'material-ui/svg-icons/maps/local-offer'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import propertyLogic from './logic/property.logic'
import {toHTML, copyURLToClipboard} from '../utils'
import MobileTearSheet from './MobileTearSheet'
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
    marginRight: 4,
    marginTop: 4
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
  },
  subDetailSection: {
    paddingTop: '10px',
    paddingBottom: '5px',
    display: 'list-item',
    listStyleType: 'disc',
    marginLeft: 25
  },
  dialog: {
    width: '60%',
    maxWidth: 'none'
  },
  dialogBody: {
    backgroundColor: '#edeff0'
  },
  headerAvatar: {
    backgroundColor: '#0070b1',
    color: 'white'
  },
  headerLabel: {
    fontWeight: 'bold'
  },
  subHeaderLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: '5px 0 5px'
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
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
      {selectedProperty['Url'] && <RaisedButton
        label='View Implementation'
        labelPosition='before'
        primary
        icon={<LanguageIcon />}
        href={selectedProperty['Url']}
        target='_blank'
        style={styles.button}
      />}
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

    const created = `Created: ${selectedProperty['Created']}
      (<a href='mailto:${selectedProperty['CreatedByEmail']}'>${selectedProperty['CreatedBy']}</a>) |`

    const modified = `Last Modified: ${selectedProperty['LastModified']}
      (<a href='mailto:${selectedProperty['LastModifiedByEmail']}'>${selectedProperty['LastModifiedBy']}</a>) |`

    const renderSubLabel = (label, field) => field ? `${label}: ${field} |` : ''

    const subtitle = `
      ${renderSubLabel('AM', selectedProperty['AM'])}
      ${renderSubLabel('IC', selectedProperty['IC'])}
      ${renderSubLabel('TC', selectedProperty['TC'])}
      ${renderSubLabel('TA', selectedProperty['TA'])}
      ${renderSubLabel('Kick-off', selectedProperty['KickOffDate'])}
      ${renderSubLabel('Go Live', selectedProperty['GoLiveDate'])}
      ${renderSubLabel('Platform', selectedProperty['Platform'])}
      ${renderSubLabel('Country', selectedProperty['Country'])}
      ${renderSubLabel('Category', selectedProperty['Category'])}
      ${selectedProperty['Created'] ? created : ''} ${selectedProperty['LastModified'] ? modified : ''}
    `

    const divSubtitle = <div dangerouslySetInnerHTML={{__html: subtitle}} />

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
          contentStyle={styles.dialog}
          bodyStyle={styles.dialogBody}
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
              subtitle={divSubtitle}
            />
            <CardText>
              <div style={styles.wrapper}>
                {selectedProperty['Keywords'].map(this.renderChip, this)}
              </div>

              {/* PRODUCTS */}
              <div style={styles.productsContainer}>
                <MobileTearSheet>
                  <List>
                    <Subheader>SAP Customer Data Cloud Products</Subheader>
                    {selectedProperty[constants.fields.useIdentity] &&
                    <ListItem
                      primaryText='Customer Identity'
                      disabled
                    />
                    }
                    {selectedProperty[constants.fields.useConsent] &&
                    <ListItem
                      primaryText='Customer Consent'
                      disabled
                    />
                    }
                    {selectedProperty[constants.fields.useProfile] &&
                    <ListItem
                      primaryText='Customer Profile'
                      disabled
                    />
                    }
                  </List>
                </MobileTearSheet>
                <MobileTearSheet>
                  <List>
                    <Subheader>{constants.labels.otherCXProducts}</Subheader>
                    {(!selectedProperty[constants.fields.useCXMarketing] &&
                      !selectedProperty[constants.fields.useCXCommerce] &&
                      !selectedProperty[constants.fields.useCXSales] &&
                      !selectedProperty[constants.fields.useCXServices]) &&
                      <ListItem
                        primaryText='None'
                        disabled
                      />
                    }
                    {selectedProperty[constants.fields.useCXMarketing] &&
                    <ListItem
                      primaryText={constants.friendlyLabels.marketingProduct}
                      disabled
                    />}
                    {selectedProperty[constants.fields.useCXCommerce] &&
                    <ListItem
                      primaryText={constants.friendlyLabels.commerceProduct}
                      disabled
                    />}
                    {selectedProperty[constants.fields.useCXSales] &&
                    <ListItem
                      primaryText={constants.friendlyLabels.salesProduct}
                      disabled
                    />}
                    {selectedProperty[constants.fields.useCXServices] &&
                    <ListItem
                      primaryText={constants.friendlyLabels.servicesProduct}
                      disabled
                    />}
                  </List>
                </MobileTearSheet>
              </div>
              {/* END PRODUCTS */}

              <div>
                <Divider />
                <List>
                  <ListItem
                    disabled
                    leftAvatar={
                      <Avatar
                        icon={<ReferenceIcon />}
                        color={styles.headerAvatar.color}
                        backgroundColor={styles.headerAvatar.backgroundColor}
                      />
                    }
                  >
                    <div style={styles.headerLabel}>{constants.labels.referenceLabel}</div>
                  </ListItem>
                </List>
                <div>{selectedProperty[constants.fields.useAsReference]
                  ? 'Yes, customer has authorised to use this implementation as a reference with externals'
                  : 'No, customer has not authorised yet to use this implementation as a reference with externals'
                }</div>
              </div>

              <div style={styles.detailsSection}>
                <Divider />
                <List>
                  <ListItem
                    disabled
                    leftAvatar={
                      <Avatar
                        icon={<DescriptionIcon />}
                        color={styles.headerAvatar.color}
                        backgroundColor={styles.headerAvatar.backgroundColor}
                      />
                    }
                  >
                    <div style={styles.headerLabel}>{constants.labels.descriptionLabel}</div>
                  </ListItem>
                </List>
                {selectedProperty[constants.fields.description] &&
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.description])}} />
                }
              </div>

              <div style={styles.detailsSection}>
                <Divider />
                <List>
                  <ListItem
                    disabled
                    leftAvatar={
                      <Avatar
                        icon={<ExtensionIcon />}
                        color={styles.headerAvatar.color}
                        backgroundColor={styles.headerAvatar.backgroundColor}
                      />
                    }
                  >
                    <div style={styles.headerLabel}>{constants.labels.technicalDetails}</div>
                  </ListItem>
                </List>

                {selectedProperty[constants.fields.tdd] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.headerLabel}>{constants.labels.tddLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.tdd])}} />
                </div>
                }

                {selectedProperty[constants.fields.apiKey] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.apiKeyLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.apiKey])}} />
                </div>
                }

                {selectedProperty[constants.fields.customFlows] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.customFlowsLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.customFlows])}} />
                </div>
                }

                {selectedProperty[constants.fields.cms] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.cmsLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.cms])}} />
                </div>
                }

                {selectedProperty[constants.fields.serverSession] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.serverSessionLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.serverSession])}} />
                </div>
                }

                {selectedProperty[constants.fields.centralizedLogin] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.centralizedLoginLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.centralizedLogin])}} />
                </div>
                }

                {selectedProperty[constants.fields.frontEnd] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.frontEndLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.frontEnd])}} />
                </div>
                }

                {selectedProperty[constants.fields.overriding] &&
                <div style={styles.subDetailSection}>
                  <div style={styles.subHeaderLabel}>{constants.labels.overridingLabel}</div>
                  <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty[constants.fields.overriding])}} />
                </div>
                }
              </div>
            </CardText>
          </Card>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(PropertyDetails)
