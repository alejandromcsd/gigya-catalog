import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import LinearProgress from 'material-ui/LinearProgress'
import propertyLogic from './logic/property.logic'
import {blue500} from 'material-ui/styles/colors'
import PropertyCapture from './PropertyCapture'
import constants from '../constants'
import {fromHTML} from '../utils'

const styles = {
  errorStyle: {
    color: '#354A5F'
  },
  underlineStyle: {
    borderColor: '#354A5F'
  },
  floatingLabelStyle: {
    color: '#354A5F'
  },
  label: {
    color: '#354A5F',
    lineHeight: 4
  },
  floatingLabelFocusStyle: {
    color: blue500
  },
  button: {
    backgroundColor: '#0070b1',
    color: 'white',
    marginLeft: 10
  },
  dialogTitle: {
    backgroundColor: '#354A5F',
    color: 'white'
  },
  progress: {
    marginTop: 50
  },
  autoCompleteList: {
    maxHeight: 200,
    overflow: 'auto'
  },
  checkbox: {
    marginBottom: 16,
    width: 200
  },
  slackCheckbox: {
    marginTop: 16
  },
  dialog: {
    width: '60%',
    maxWidth: 'none'
  },
  inline: {
    display: 'flex'
  }
}

@connect({
  props: [
    propertyLogic, [
      'propertyOnEdit',
      'customersList',
      'amList',
      'icList',
      'tcList',
      'taList',
      'countryList',
      'platformList',
      'categoryList',
      'keywordsList',
      'nextId',
      'uploadedImageUrl',
      'uploadingImage',
      'currentUser'
    ]
  ],
  actions: [
    propertyLogic, [
      'setPropertyOnEdit',
      'submitPropertyEdit',
      'uploadImage'
    ]
  ]
})

export default class PropertyEdit extends React.Component {
  constructor () {
    super()
    this.state = {
      withNotification: true,
      useIdentity: false,
      useConsent: false,
      useProfile: false,
      useCXMarketing: false,
      useCXCommerce: false,
      useCXSales: false,
      useCXServices: false,
      useAsReference: false,
      implementation: '',
      url: '',
      customer: '',
      kickOffDate: new Date(),
      goLiveDate: new Date(),
      created: '',
      lastModified: '',
      createdBy: '',
      createdByEmail: '',
      lastModifiedBy: '',
      lastModifiedByEmail: '',
      am: '',
      ic: '',
      tc: '',
      ta: '',
      country: '',
      platform: '',
      category: '',
      tddUrl: '',
      apiKey: '',
      customFlows: '',
      cms: '',
      serverSession: '',
      centralizedLoginSSO: '',
      frontEndLibraries: '',
      overridingNativeBrowser: '',
      description: '',
      keywords: [],
      otherKeywords: '',
      errors: {
        implementationError: '',
        customerError: '',
        keywordsError: '',
        imageError: '',
        kickOffError: ''
      }
    }
  }

  componentWillReceiveProps ({ propertyOnEdit }) {
    if (propertyOnEdit && JSON.stringify(propertyOnEdit) !== JSON.stringify(this.props.propertyOnEdit)) {
      this.setState({
        useIdentity: propertyOnEdit[constants.fields.useIdentity] || false,
        useConsent: propertyOnEdit[constants.fields.useConsent] || false,
        useProfile: propertyOnEdit[constants.fields.useProfile] || true,
        useCXMarketing: propertyOnEdit[constants.fields.useCXMarketing] || false,
        useCXCommerce: propertyOnEdit[constants.fields.useCXCommerce] || false,
        useCXSales: propertyOnEdit[constants.fields.useCXSales] || false,
        useCXServices: propertyOnEdit[constants.fields.useCXServices] || false,
        useAsReference: propertyOnEdit[constants.fields.useAsReference] || false,
        implementation: propertyOnEdit['Implementation'],
        url: propertyOnEdit['Url'],
        customer: propertyOnEdit['Customer'],
        kickOffDate: new Date(propertyOnEdit['KickOffDate'] || new Date()),
        goLiveDate: new Date(propertyOnEdit['GoLiveDate']),
        created: propertyOnEdit['Created'] ? new Date(propertyOnEdit['Created']) : '',
        createdBy: propertyOnEdit['CreatedBy'] || '',
        createdByEmail: propertyOnEdit['CreatedByEmail'] || '',
        lastModifiedBy: propertyOnEdit['LastModifiedBy'],
        lastModifiedByEmail: propertyOnEdit['LastModifiedByEmail'],
        am: propertyOnEdit['AM'],
        ic: propertyOnEdit['IC'],
        tc: propertyOnEdit['TC'],
        ta: propertyOnEdit['TA'] || '',
        country: propertyOnEdit['Country'],
        platform: propertyOnEdit['Platform'],
        category: propertyOnEdit['Category'],
        tddUrl: propertyOnEdit[constants.fields.tdd],
        apiKey: propertyOnEdit[constants.fields.apiKey],
        customFlows: fromHTML(propertyOnEdit[constants.fields.customFlows]),
        cms: fromHTML(propertyOnEdit[constants.fields.cms]),
        serverSession: fromHTML(propertyOnEdit[constants.fields.serverSession]),
        centralizedLoginSSO: fromHTML(propertyOnEdit[constants.fields.centralizedLogin]),
        frontEndLibraries: fromHTML(propertyOnEdit[constants.fields.frontEnd]),
        overridingNativeBrowser: fromHTML(propertyOnEdit[constants.fields.overriding]),
        description: fromHTML(propertyOnEdit[constants.fields.description]),
        keywords: propertyOnEdit['Keywords'],
        otherKeywords: '',
        errors: {
          implementationError: '',
          customerError: '',
          keywordsError: '',
          imageError: '',
          kickOffError: ''
        }
      })
    }
  }

  encodeTextbox = (val) => val.replace(/(?:\r\n|\r|\n)/g, '<br />')

  ensureHTTPS = (url) => url ? (!url.match(/^[a-zA-Z]+:\/\//) ? `https://${url}` : url) : ''

  handleClose = () => this.actions.setPropertyOnEdit(null)

  setImage = (image) => {
    this.selectedImage = image
    if (image) {
      this.actions.uploadImage(image)

      this.setState({errors: {imageError: ''}})
    }
  }

  handleSubmit = () => {
    const {
      customer,
      useIdentity,
      useConsent,
      useProfile,
      useCXMarketing,
      useCXCommerce,
      useCXSales,
      useCXServices,
      useAsReference,
      implementation,
      url,
      kickOffDate,
      goLiveDate,
      created,
      createdBy,
      createdByEmail,
      am,
      ic,
      tc,
      ta,
      country,
      platform,
      category,
      tddUrl,
      apiKey,
      customFlows,
      cms,
      serverSession,
      centralizedLoginSSO,
      frontEndLibraries,
      overridingNativeBrowser,
      description,
      keywords,
      otherKeywords,
      withNotification
    } = this.state

    const { currentUser } = this.props

    // TODO: Add centralised validations
    this.setState({ errors: {
      implementationError: implementation ? '' : 'This field is required',
      customerError: customer ? '' : 'This field is required',
      keywordsError: keywords && keywords.length ? '' : 'Please select one or more keywords',
      imageError: this.props.uploadedImageUrl || this.props.propertyOnEdit.ImageUrl ? '' : 'Please upload a screenshot of the implementation',
      kickOffError: kickOffDate < goLiveDate ? '' : 'Please check Kick-off and Go-Live dates'
    }})

    if (!implementation || !customer || !keywords || !keywords.length ||
      (!this.props.uploadedImageUrl && !this.props.propertyOnEdit.ImageUrl) || (kickOffDate >= goLiveDate)) return

    const isUpdate = !!this.props.propertyOnEdit['Id']
    const createdDate = isUpdate ? created : new Date()

    this.actions.submitPropertyEdit({
      [constants.fields.id]: this.props.propertyOnEdit['Id'] || this.props.nextId,
      [constants.fields.useIdentity]: useIdentity || false,
      [constants.fields.useConsent]: useConsent || false,
      [constants.fields.useProfile]: useProfile || false,
      [constants.fields.useCXMarketing]: useCXMarketing || false,
      [constants.fields.useCXCommerce]: useCXCommerce || false,
      [constants.fields.useCXSales]: useCXSales || false,
      [constants.fields.useCXServices]: useCXServices || false,
      [constants.fields.useAsReference]: useAsReference || false,
      [constants.fields.implementation]: implementation,
      [constants.fields.url]: this.ensureHTTPS(url),
      [constants.fields.customer]: customer,
      [constants.fields.imageUrl]: this.props.uploadedImageUrl || this.props.propertyOnEdit.ImageUrl,
      'KickOffDate': kickOffDate ? kickOffDate.toDateString() : '',
      'GoLiveDate': goLiveDate ? goLiveDate.toDateString() : '',
      'Created': createdDate ? createdDate.toDateString() : '',
      'LastModified': new Date().toDateString(),
      'CreatedBy': isUpdate ? createdBy : `${currentUser.profile.firstName} ${currentUser.profile.lastName}`,
      'CreatedByEmail': isUpdate ? createdByEmail : currentUser.profile.email,
      'LastModifiedBy': `${currentUser.profile.firstName} ${currentUser.profile.lastName}`,
      'LastModifiedByEmail': currentUser.profile.email,
      'AM': am,
      'IC': ic,
      'TC': tc,
      'TA': ta,
      'Country': country,
      'Platform': platform,
      'Category': category,
      [constants.fields.tdd]: tddUrl || '',
      [constants.fields.apiKey]: apiKey || '',
      [constants.fields.customFlows]: this.encodeTextbox(customFlows),
      [constants.fields.cms]: this.encodeTextbox(cms),
      [constants.fields.serverSession]: this.encodeTextbox(serverSession),
      [constants.fields.centralizedLogin]: this.encodeTextbox(centralizedLoginSSO),
      [constants.fields.frontEnd]: this.encodeTextbox(frontEndLibraries),
      [constants.fields.overriding]: this.encodeTextbox(overridingNativeBrowser),
      [constants.fields.description]: this.encodeTextbox(description),
      [constants.fields.keywords]: [
        ...keywords,
        ...(otherKeywords.length ? otherKeywords.split(',').map(v => v.trim()) : [])
      ]
    }, isUpdate, withNotification)

    this.setState({ errors: {
      implementationError: '',
      customerError: '',
      keywordsError: '',
      imageError: '',
      kickOffError: ''
    }})
  }

  render () {
    const {
      propertyOnEdit,
      customersList,
      amList,
      icList,
      tcList,
      taList,
      countryList,
      platformList,
      categoryList,
      keywordsList,
      uploadedImageUrl,
      uploadingImage
    } = this.props

    const {
      customer,
      useIdentity,
      useConsent,
      useProfile,
      useCXMarketing,
      useCXCommerce,
      useCXSales,
      useCXServices,
      useAsReference,
      implementation,
      url,
      kickOffDate,
      goLiveDate,
      am,
      ic,
      tc,
      ta,
      country,
      platform,
      category,
      tddUrl,
      apiKey,
      customFlows,
      cms,
      serverSession,
      centralizedLoginSSO,
      frontEndLibraries,
      overridingNativeBrowser,
      description,
      keywords,
      otherKeywords,
      withNotification
    } = this.state

    if (!propertyOnEdit) return null

    const actions = [
      <RaisedButton
        label='Cancel'
        style={styles.button}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label='Submit'
        style={styles.button}
        onClick={this.handleSubmit}
      />
    ]

    const isUpdate = !!this.props.propertyOnEdit['Id']
    const imageButtonLabel = isUpdate ? 'Replace' : '(REQUIRED) Add'

    return (
      <div>
        <Dialog
          title='Edit Property'
          modal={false}
          actions={actions}
          contentStyle={styles.dialog}
          titleStyle={styles.dialogTitle}
          autoScrollBodyContent
          open={!!propertyOnEdit}
        >
          <PropertyCapture
            setImage={this.setImage}
            uploadLabel={`${imageButtonLabel} Login or Registration screenshot`}
          />

          {uploadingImage &&
            <div style={styles.progress}>
              Loading...
              <LinearProgress mode='indeterminate' />
            </div>
          }

          {uploadedImageUrl && (
            <div>
              <br />
              <b>{uploadedImageUrl ? `File uploaded: ${this.selectedImage.name}` : ''}</b>
              <br />
            </div>
          )}
          {this.state.errors.imageError && <p><span style={{color: '#ff0000'}}>{this.state.errors.imageError}</span></p>}

          <label style={styles.label}>{constants.labels.productsLabel}</label>
          <div style={styles.inline}>
            <Checkbox
              label='Customer Identity'
              checked={useIdentity}
              onCheck={e => this.setState({ useIdentity: !this.state.useIdentity })}
              style={styles.checkbox}
            />
            <Checkbox
              label='Customer Consent'
              checked={useConsent}
              onCheck={e => this.setState({ useConsent: !this.state.useConsent })}
              style={styles.checkbox}
            />
            <Checkbox
              label='Customer Profile'
              checked={useProfile}
              style={styles.checkbox}
              onCheck={e => this.setState({ useProfile: !this.state.useProfile })}
            />
          </div>
          <label style={styles.label}>{constants.labels.otherCXProducts}</label>
          <div style={styles.inline}>
            <Checkbox
              label={constants.friendlyLabels.marketingProduct}
              checked={useCXMarketing}
              onCheck={e => this.setState({ useCXMarketing: !this.state.useCXMarketing })}
              style={styles.checkbox}
            />
            <Checkbox
              label={constants.friendlyLabels.commerceProduct}
              checked={useCXCommerce}
              onCheck={e => this.setState({ useCXCommerce: !this.state.useCXCommerce })}
              style={styles.checkbox}
            />
            <Checkbox
              label={constants.friendlyLabels.salesProduct}
              checked={useCXSales}
              onCheck={e => this.setState({ useCXSales: !this.state.useCXSales })}
              style={styles.checkbox}
            />
            <Checkbox
              label={constants.friendlyLabels.servicesProduct}
              checked={useCXServices}
              onCheck={e => this.setState({ useCXServices: !this.state.useCXServices })}
              style={styles.checkbox}
            />
          </div>
          <label style={styles.label}>{constants.labels.referenceLabel}</label>
          <Checkbox
            label='Only tick if you have received customer consent to use as reference material'
            checked={useAsReference}
            onCheck={e => this.setState({ useAsReference: !this.state.useAsReference })}
          />
          <TextField
            floatingLabelText='Implementation Name (Required)'
            value={implementation}
            onChange={e => {
              this.setState({
                implementation: e.target.value,
                errors: {implementationError: e.target.value ? '' : 'This field is required'}
              })
            }}
            errorText={this.state.errors.implementationError}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth
          />
          <TextField
            floatingLabelText='Website URL / App Store URL'
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Customer (Required)'
            searchText={customer}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={customersList}
            onUpdateInput={customer => this.setState({
              customer,
              errors: {customerError: customer ? '' : 'This field is required'}
            })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            errorText={this.state.errors.customerError}
            onNewRequest={() => this.datePickerGoLive.focus()}
            ref={(input) => { this.autoCompleteCustomer = input }}
            openOnFocus
            fullWidth
          />
          <DatePicker
            hintText='Kick-off date'
            floatingLabelText='Kick-off date'
            value={kickOffDate}
            onChange={(_, kickOffDate) => this.setState({
              kickOffDate,
              errors: {kickOffError: kickOffDate < this.state.goLiveDate ? '' : 'Please check Kick-off and Go-Live dates'}
            })}
            mode='landscape'
            okLabel='Set Kick-off date'
            errorText={this.state.errors.kickOffError}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            ref={(input) => { this.datePickerKickOff = input }}
            fullWidth
          />
          <DatePicker
            hintText='Go Live date'
            floatingLabelText='Go Live date'
            value={goLiveDate}
            onChange={(_, goLiveDate) => this.setState({
              goLiveDate,
              errors: {kickOffError: goLiveDate > this.state.kickOffDate ? '' : 'Please check Kick-off and Go-Live dates'}
            })}
            mode='landscape'
            okLabel='Set Go Live date'
            errorText={this.state.errors.kickOffError}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            ref={(input) => { this.datePickerGoLive = input }}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.descriptionLabel}
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Account Manager'
            searchText={am}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={amList}
            onUpdateInput={am => this.setState({ am })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompleteIC.focus()}
            ref={(input) => { this.autoCompleteAM = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Implementation Consultant'
            searchText={ic}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={icList}
            onUpdateInput={ic => this.setState({ ic })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompleteTC.focus()}
            ref={(input) => { this.autoCompleteIC = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Technical Consultant'
            searchText={tc}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={tcList}
            onUpdateInput={tc => this.setState({ tc })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompleteTA.focus()}
            ref={(input) => { this.autoCompleteTC = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Technical Architect'
            searchText={ta}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={taList}
            onUpdateInput={ta => this.setState({ ta })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompleteCountry.focus()}
            ref={(input) => { this.autoCompleteTA = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Country'
            searchText={country}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={countryList}
            onUpdateInput={country => this.setState({ country })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompletePlatform.focus()}
            ref={(input) => { this.autoCompleteCountry = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Platform'
            searchText={platform}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={platformList}
            onUpdateInput={platform => this.setState({ platform })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.autoCompleteCategory.focus()}
            ref={(input) => { this.autoCompletePlatform = input }}
            openOnFocus
            fullWidth
          />
          <AutoComplete
            floatingLabelText='Category'
            searchText={category}
            style={styles.autoComplete}
            listStyle={styles.autoCompleteList}
            filter={AutoComplete.fuzzyFilter}
            dataSource={categoryList}
            onUpdateInput={category => this.setState({ category })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onNewRequest={() => this.inputTDD.focus()}
            ref={(input) => { this.autoCompleteCategory = input }}
            openOnFocus
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.tddLabel}
            value={tddUrl}
            onChange={e => this.setState({ tddUrl: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            ref={(input) => { this.inputTDD = input }}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.apiKeyLabel}
            value={apiKey}
            onChange={e => this.setState({ apiKey: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.customFlowsLabel}
            value={customFlows}
            onChange={e => this.setState({ customFlows: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.cmsLabel}
            value={cms}
            onChange={e => this.setState({ cms: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.serverSessionLabel}
            value={serverSession}
            onChange={e => this.setState({ serverSession: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.centralizedLoginLabel}
            value={centralizedLoginSSO}
            onChange={e => this.setState({ centralizedLoginSSO: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.frontEndLabel}
            value={frontEndLibraries}
            onChange={e => this.setState({ frontEndLibraries: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <TextField
            floatingLabelText={constants.labels.overridingLabel}
            value={overridingNativeBrowser}
            onChange={e => this.setState({ overridingNativeBrowser: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            multiLine
            rows={2}
            fullWidth
          />
          <SelectField
            multiple
            floatingLabelText='Keywords (Required)'
            value={keywords}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onChange={(e, i, keywords) => this.setState({
              keywords,
              errors: {keywordsError: keywords.length ? '' : 'Please select one or more keywords'}
            })}
            errorText={this.state.errors.keywordsError}
            fullWidth
          >
            { keywordsList.map((keyword) => (
              <MenuItem
                key={keyword}
                insetChildren
                checked={keywords && keywords.includes(keyword)}
                value={keyword}
                primaryText={keyword}
              />)) }
          </SelectField>
          <TextField
            floatingLabelText='Other keywords (comma separated)'
            value={otherKeywords}
            onChange={e => this.setState({ otherKeywords: e.target.value })}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            fullWidth
          />
          {!isUpdate && <Checkbox
            label='Send notification to #customer-data-cloud Slack channel'
            checked={withNotification}
            style={styles.slackCheckbox}
            onCheck={e => this.setState({ withNotification: !this.state.withNotification })}
          />}
        </Dialog>
      </div>
    )
  }
}
