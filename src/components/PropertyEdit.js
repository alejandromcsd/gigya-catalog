import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
import {
  Step,
  Stepper,
  StepButton,
  StepLabel
} from 'material-ui/Stepper'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import LinearProgress from 'material-ui/LinearProgress'
import propertyLogic from './logic/property.logic'
import {blue500, red500} from 'material-ui/styles/colors'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import PropertyCapture from './PropertyCapture'
import constants from '../constants'
import {fromHTML} from '../utils'
import 'react-mde/lib/styles/css/react-mde-all.css'

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
    width: '80%',
    maxWidth: 'none'
  },
  inline: {
    display: 'flex'
  },
  inlineChild: {
    width: '50%',
    margin: 10,
    marginLeft: 0
  },
  region: {
    width: '50%',
    margin: 10,
    marginTop: 34,
    marginLeft: 0
  },
  regionLabel: {
    color: '#354A5F',
    fontSize: 'initial'
  },
  editorInput: {
    marginTop: 25,
    fontSize: 14
  },
  editorContainer: {
    color: '#333333'
  }
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

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
      'regionList',
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
      kickOffDate: null,
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
      region: '',
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
      technicalDescription: '',
      keywords: [],
      otherKeywords: '',
      errors: {
        implementationError: '',
        customerError: '',
        regionError: '',
        keywordsError: '',
        imageError: '',
        kickOffError: ''
      },
      stepIndex: 0,
      visited: [],
      descriptionMKTab: 'write',
      technicalDescriptionMKTab: 'write',
      pendingErrors: false
    }
  }

  componentWillMount () {
    const {stepIndex, visited} = this.state
    this.setState({visited: visited.concat(stepIndex)})
  }

  componentWillUpdate (nextProps, nextState) {
    const {stepIndex, visited} = nextState
    if (visited.indexOf(stepIndex) === -1) {
      this.setState({visited: visited.concat(stepIndex)})
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
        kickOffDate: propertyOnEdit['KickOffDate'] ? new Date(propertyOnEdit['KickOffDate']) : null,
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
        region: propertyOnEdit['Region'] || '',
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
        description: propertyOnEdit[constants.fields.description]
          ? converter.makeMarkdown(propertyOnEdit[constants.fields.description]) : '',
        technicalDescription: propertyOnEdit[constants.fields.technicalDescription]
          ? converter.makeMarkdown(propertyOnEdit[constants.fields.technicalDescription]) : '',
        keywords: propertyOnEdit['Keywords'],
        otherKeywords: '',
        errors: {
          implementationError: '',
          customerError: '',
          regionError: '',
          keywordsError: '',
          imageError: '',
          kickOffError: ''
        },
        stepIndex: 0,
        visited: [],
        descriptionMKTab: 'write',
        technicalDescriptionMKTab: 'write',
        pendingErrors: false
      })
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (stepIndex < 2) this.setState({stepIndex: stepIndex + 1}, this.ensureTemplate)
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) this.setState({stepIndex: stepIndex - 1}, this.ensureTemplate)
  }

  ensureTemplate = () => !this.state.description &&
    this.setState({description:
      converter.makeMarkdown(constants.goLiveTemplate.replace(/{CUSTOMER}/g, this.state.customer || '{CUSTOMER}'))})

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

  runValidations = () => {
    const {
      customer,
      region,
      implementation,
      kickOffDate,
      goLiveDate,
      keywords
    } = this.state

    const pendingErrors = (!implementation || !customer || !region || !keywords || !keywords.length ||
      (!this.props.uploadedImageUrl && !this.props.propertyOnEdit.ImageUrl) || (kickOffDate && (kickOffDate >= goLiveDate)))

    this.setState({ errors: {
      implementationError: implementation ? '' : 'This field is required',
      customerError: customer ? '' : 'This field is required',
      regionError: region ? '' : 'This field is required',
      keywordsError: keywords && keywords.length ? '' : 'Please select one or more keywords',
      imageError: this.props.uploadedImageUrl || this.props.propertyOnEdit.ImageUrl ? '' : 'Please upload a screenshot of the implementation',
      kickOffError: !kickOffDate || (kickOffDate < goLiveDate) ? '' : 'Please check Kick-off and Go-Live dates'
    },
    pendingErrors })

    return pendingErrors
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
      region,
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
      technicalDescription,
      keywords,
      otherKeywords,
      withNotification
    } = this.state

    const { currentUser } = this.props

    if (this.runValidations()) return

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
      'KickOffDate': kickOffDate ? kickOffDate.toDateString() : null,
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
      'Region': region,
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
      [constants.fields.description]: description && (description !==
      converter.makeMarkdown(constants.goLiveTemplate.replace(/{CUSTOMER}/g, this.state.customer || '{CUSTOMER}')))
        ? converter.makeHtml(description) : '',
      [constants.fields.technicalDescription]: technicalDescription ? converter.makeHtml(technicalDescription) : '',
      [constants.fields.keywords]: [
        ...keywords,
        ...(otherKeywords.length ? otherKeywords.split(',').map(v => v.trim()) : [])
      ]
    }, isUpdate, withNotification)

    this.setState({ errors: {
      implementationError: '',
      customerError: '',
      regionError: '',
      keywordsError: '',
      imageError: '',
      kickOffError: ''
    },
    pendingErrors: false})
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
      regionList,
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
      region,
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
      technicalDescription,
      keywords,
      otherKeywords,
      withNotification,
      stepIndex,
      visited,
      descriptionMKTab,
      technicalDescriptionMKTab,
      pendingErrors
    } = this.state

    if (!propertyOnEdit) return null

    const actions = [
      <RaisedButton
        label='Cancel'
        style={styles.button}
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Back'
        disabled={stepIndex === 0}
        style={styles.button}
        onClick={this.handlePrev}
      />,
      <RaisedButton
        label='Next'
        style={styles.button}
        primary
        onClick={this.handleNext}
      />,
      <RaisedButton
        label='Save'
        style={styles.button}
        primary
        onClick={this.handleSubmit}
      />
    ]

    const isUpdate = !!this.props.propertyOnEdit['Id']
    const imageButtonLabel = isUpdate ? 'Replace' : '(REQUIRED) Add'

    const stepErrorIcon = {}
    if (pendingErrors) stepErrorIcon.icon = <WarningIcon color={red500} />

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
          <Stepper linear={false}>
            <Step completed={visited.indexOf(0) !== -1} active={stepIndex === 0}>
              <StepButton {...stepErrorIcon} onClick={() => this.setState({stepIndex: 0})}>
                <StepLabel
                  style={pendingErrors ? {color: red500} : null}
                >
                  Enter Basic Information
                </StepLabel>
              </StepButton>
            </Step>
            <Step completed={visited.indexOf(1) !== -1} active={stepIndex === 1}>
              <StepButton onClick={() => this.setState({stepIndex: 1}, this.ensureTemplate)}>
              Enter Business Information
              </StepButton>
            </Step>
            <Step completed={visited.indexOf(2) !== -1} active={stepIndex === 2}>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Enter Technical Information
              </StepButton>
            </Step>
          </Stepper>

          {stepIndex === 0 && (<div>
            <label style={styles.label}>Implementation screenshot</label>
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
                this.setState({implementation: e.target.value}, this.runValidations)
              }}
              errorText={this.state.errors.implementationError}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              fullWidth
            />
            <div style={styles.inline}>
              <AutoComplete
                floatingLabelText='Customer (Required)'
                searchText={customer}
                style={styles.inlineChild}
                listStyle={styles.autoCompleteList}
                filter={AutoComplete.fuzzyFilter}
                dataSource={customersList}
                onUpdateInput={customer => this.setState({customer}, this.runValidations)}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.errors.customerError}
                onNewRequest={() => this.autoCompleteCategory.focus()}
                ref={(input) => { this.autoCompleteCustomer = input }}
                openOnFocus
                fullWidth
              />
              <AutoComplete
                floatingLabelText='Category'
                searchText={category}
                style={styles.inlineChild}
                listStyle={styles.autoCompleteList}
                filter={AutoComplete.fuzzyFilter}
                dataSource={categoryList}
                onUpdateInput={category => this.setState({ category })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onNewRequest={() => this.websiteURL.focus()}
                ref={(input) => { this.autoCompleteCategory = input }}
                openOnFocus
                fullWidth
              />
            </div>
            <div style={styles.inline}>
              <TextField
                floatingLabelText='Website URL / App Store URL'
                value={url}
                style={styles.inlineChild}
                onChange={e => this.setState({ url: e.target.value })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                ref={(input) => { this.websiteURL = input }}
                fullWidth
              />
              <SelectField
                value={region}
                onChange={(_, i, region) => this.setState({region}, this.runValidations)}
                labelStyle={styles.regionLabel}
                errorText={this.state.errors.regionError}
                style={styles.region}>
                <MenuItem value='' primaryText='Region' />
                {regionList.map(r => <MenuItem key={r} value={r} primaryText={r} />)}
              </SelectField>
            </div>
            <div style={styles.inline}>
              <DatePicker
                hintText='Kick-off date (If applicable)'
                floatingLabelText='Kick-off date (If applicable)'
                value={kickOffDate}
                onChange={(_, kickOffDate) => this.setState({kickOffDate}, this.runValidations)}
                style={styles.inlineChild}
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
                onChange={(_, goLiveDate) => this.setState({goLiveDate}, this.runValidations)}
                style={styles.inlineChild}
                mode='landscape'
                okLabel='Set Go Live date'
                errorText={this.state.errors.kickOffError}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                ref={(input) => { this.datePickerGoLive = input }}
                fullWidth
              />
            </div>
            <div style={styles.inline}>
              <AutoComplete
                floatingLabelText='Account Manager'
                searchText={am}
                style={styles.inlineChild}
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
                style={styles.inlineChild}
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
            </div>
            <div style={styles.inline}>
              <AutoComplete
                floatingLabelText='Technical Consultant'
                searchText={tc}
                style={styles.inlineChild}
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
                style={styles.inlineChild}
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
            </div>
            <div style={styles.inline}>
              <AutoComplete
                floatingLabelText='Country'
                searchText={country}
                style={styles.inlineChild}
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
                style={styles.inlineChild}
                listStyle={styles.autoCompleteList}
                filter={AutoComplete.fuzzyFilter}
                dataSource={platformList}
                onUpdateInput={platform => this.setState({ platform })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                ref={(input) => { this.autoCompletePlatform = input }}
                openOnFocus
                fullWidth
              />
            </div>
            <div style={styles.inline}>
              <SelectField
                multiple
                floatingLabelText='Keywords (Required)'
                value={keywords}
                style={styles.inlineChild}
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
                style={styles.inlineChild}
                floatingLabelText='Other keywords (comma separated)'
                value={otherKeywords}
                onChange={e => this.setState({ otherKeywords: e.target.value })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth
              />
            </div>
          </div>)}

          {stepIndex === 1 && (<div style={styles.editorContainer}>
            <h1>Let's get recognition throughout the organisation!</h1>
            <span>The information in this step is important to support our Global DBS Go-Live notification process. Once completed, you will also be able to send this template as an email notification (in dev). Please fill out as much information as possible :)</span>
            <div style={styles.editorInput}>
              <ReactMde
                value={description}
                onChange={e => this.setState({ description: e })}
                selectedTab={descriptionMKTab}
                onTabChange={e => this.setState({ descriptionMKTab: e })}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
              />
            </div>
          </div>)}

          {stepIndex === 2 && (<div style={styles.editorContainer}>
            <h1>It is all about the lessons learned...</h1>
            <span>With each Go-Live, we learned a lot. Please share some details about the architecture, integrations, workarounds or any other technical details that you or someone else can re-use in the future :)</span>
            <div style={styles.editorInput}>
              <ReactMde
                minEditorHeight={120}
                value={technicalDescription}
                onChange={e => this.setState({ technicalDescription: e })}
                selectedTab={technicalDescriptionMKTab}
                onTabChange={e => this.setState({ technicalDescriptionMKTab: e })}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
              />
            </div>
            <div style={styles.inline}>
              <TextField
                floatingLabelText={constants.labels.tddLabel}
                value={tddUrl}
                onChange={e => this.setState({ tddUrl: e.target.value })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                style={styles.inlineChild}
                ref={(input) => { this.inputTDD = input }}
                fullWidth
              />
              <TextField
                floatingLabelText={constants.labels.apiKeyLabel}
                value={apiKey}
                onChange={e => this.setState({ apiKey: e.target.value })}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                style={styles.inlineChild}
                fullWidth
              />
            </div>
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
            {!isUpdate && <Checkbox
              label='Send notification to #customer-data-cloud Slack channel'
              checked={withNotification}
              style={styles.slackCheckbox}
              onCheck={e => this.setState({ withNotification: !this.state.withNotification })}
            />}
          </div>)}

        </Dialog>
      </div>
    )
  }
}
