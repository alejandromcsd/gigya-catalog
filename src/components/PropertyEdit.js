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
    marginBottom: 16
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
      'countryList',
      'platformList',
      'categoryList',
      'keywordsList',
      'nextId',
      'uploadedImageUrl',
      'uploadingImage'
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
      useIdentity: false,
      useConsent: false,
      useProfile: false,
      useAsReference: false,
      implementation: '',
      url: '',
      customer: '',
      goLiveDate: new Date(),
      am: '',
      ic: '',
      tc: '',
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
        imageError: ''
      }
    }
  }

  componentWillReceiveProps ({ propertyOnEdit }) {
    if (propertyOnEdit && JSON.stringify(propertyOnEdit) !== JSON.stringify(this.props.propertyOnEdit)) {
      this.setState({
        useIdentity: propertyOnEdit[constants.fields.useIdentity] || false,
        useConsent: propertyOnEdit[constants.fields.useConsent] || false,
        useProfile: propertyOnEdit[constants.fields.useProfile] || false,
        useAsReference: propertyOnEdit[constants.fields.useAsReference] || false,
        implementation: propertyOnEdit['Implementation'],
        url: propertyOnEdit['Url'],
        customer: propertyOnEdit['Customer'],
        goLiveDate: new Date(propertyOnEdit['GoLiveDate']),
        am: propertyOnEdit['AM'],
        ic: propertyOnEdit['IC'],
        tc: propertyOnEdit['TC'],
        country: propertyOnEdit['Country'],
        platform: propertyOnEdit['Platform'],
        category: propertyOnEdit['Category'],
        tddUrl: propertyOnEdit[constants.fields.tdd],
        apiKey: propertyOnEdit[constants.fields.apiKey],
        customFlows: this.renderTextbox(propertyOnEdit[constants.fields.customFlows]),
        cms: this.renderTextbox(propertyOnEdit[constants.fields.cms]),
        serverSession: this.renderTextbox(propertyOnEdit[constants.fields.serverSession]),
        centralizedLoginSSO: this.renderTextbox(propertyOnEdit[constants.fields.centralizedLogin]),
        frontEndLibraries: this.renderTextbox(propertyOnEdit[constants.fields.frontEnd]),
        overridingNativeBrowser: this.renderTextbox(propertyOnEdit[constants.fields.overriding]),
        description: this.renderTextbox(propertyOnEdit[constants.fields.description]),
        keywords: propertyOnEdit['Keywords'],
        otherKeywords: '',
        errors: {
          implementationError: '',
          customerError: '',
          keywordsError: '',
          imageError: ''
        }
      })
    }
  }

  renderTextbox = (val) => val ? val.replace(/<br\s*[/]?>/gi, '\n') : '';

  encodeTextbox = (val) => val.replace(/(?:\r\n|\r|\n)/g, '<br />');

  ensureHTTPS = (url) => !url.match(/^[a-zA-Z]+:\/\//) ? `http://${url}` : url

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
      useAsReference,
      implementation,
      url,
      goLiveDate,
      am,
      ic,
      tc,
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
      otherKeywords
    } = this.state

    // TODO: Add centralised validations
    this.setState({ errors: {
      implementationError: implementation ? '' : 'This field is required',
      customerError: customer ? '' : 'This field is required',
      keywordsError: keywords && keywords.length ? '' : 'Please select one or more keywords',
      imageError: this.props.uploadedImageUrl || this.props.propertyOnEdit.ImageUrl ? '' : 'Please upload a screenshot of the implementation'
    }})

    if (!implementation || !customer || !keywords || !keywords.length ||
      (!this.props.uploadedImageUrl && !this.props.propertyOnEdit.ImageUrl)) return

    this.actions.submitPropertyEdit({
      'Id': this.props.propertyOnEdit['Id'] || this.props.nextId,
      [constants.fields.useIdentity]: useIdentity || false,
      [constants.fields.useConsent]: useConsent || false,
      [constants.fields.useProfile]: useProfile || false,
      [constants.fields.useAsReference]: useAsReference || false,
      'Implementation': implementation,
      'Url': this.ensureHTTPS(url),
      'Customer': customer,
      'ImageUrl': this.props.uploadedImageUrl || this.props.propertyOnEdit.ImageUrl,
      'GoLiveDate': goLiveDate ? goLiveDate.toDateString() : '',
      'AM': am,
      'IC': ic,
      'TC': tc,
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
      'Keywords': [
        ...keywords,
        ...(otherKeywords.length ? otherKeywords.split(',').map(v => v.trim()) : [])
      ]
    })

    this.setState({ errors: {
      implementationError: '',
      customerError: '',
      keywordsError: '',
      imageError: ''
    }})
  }

  render () {
    const {
      propertyOnEdit,
      customersList,
      amList,
      icList,
      tcList,
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
      useAsReference,
      implementation,
      url,
      goLiveDate,
      am,
      ic,
      tc,
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
      otherKeywords
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

    const imageButtonLabel = this.props.propertyOnEdit['Id'] ? 'Replace' : 'Add'

    return (
      <div>
        <Dialog
          title='Edit Property'
          modal={false}
          actions={actions}
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
          <Checkbox
            label='Identity'
            checked={useIdentity}
            onCheck={e => this.setState({ useIdentity: !this.state.useIdentity })}
            style={styles.checkbox}
          />
          <Checkbox
            label='Consent'
            checked={useConsent}
            onCheck={e => this.setState({ useConsent: !this.state.useConsent })}
            style={styles.checkbox}
          />
          <Checkbox
            label='Profile'
            checked={useProfile}
            onCheck={e => this.setState({ useProfile: !this.state.useProfile })}
          />
          <label style={styles.label}>{constants.labels.referenceLabel}</label>
          <Checkbox
            label='Only tick if you have received customer consent to use as reference material'
            checked={useAsReference}
            onCheck={e => this.setState({ useAsReference: !this.state.useAsReference })}
          />
          <TextField
            floatingLabelText='Implementation Name'
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
            floatingLabelText='Customer'
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
            hintText='Go Live date'
            floatingLabelText='Go Live date'
            value={goLiveDate}
            onChange={(_, goLiveDate) => this.setState({ goLiveDate })}
            mode='landscape'
            okLabel='Set Go Live date'
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            ref={(input) => { this.datePickerGoLive = input }}
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
            onNewRequest={() => this.autoCompleteCountry.focus()}
            ref={(input) => { this.autoCompleteTC = input }}
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
          <SelectField
            multiple
            floatingLabelText='Keywords'
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
        </Dialog>
      </div>
    )
  }
}
