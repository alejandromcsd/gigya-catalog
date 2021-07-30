import React from 'react'
import { connect } from 'kea'
import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/FlatButton'
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone'
import RetailIcon from 'material-ui/svg-icons/communication/business'
import MailIcon from 'material-ui/svg-icons/communication/contact-mail'
import ChinaIcon from 'material-ui/svg-icons/social/public'
import ProductIcon from 'material-ui/svg-icons/device/devices'
import ImplementationIcon from 'material-ui/svg-icons/social/domain'
import CategoryIcon from 'material-ui/svg-icons/places/business-center'
import CustomerIcon from 'material-ui/svg-icons/communication/contacts'
import PartnerIcon from 'material-ui/svg-icons/maps/local-parking'
import KeywordIcon from 'material-ui/svg-icons/toggle/check-box'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import propertyLogic from './logic/property.logic'
import constants from '../constants'

const styles = {
  filterContainer: {
    width: 400
  },
  filterChip: {
    background: '#354A5F',
    padding: 7,
    borderRadius: 15,
    marginRight: 5,
    color: 'white'
  },
  filterIcon: {
    color: 'white',
    paddingTop: 10,
    marginRight: 5
  },
  chipDeleteStyle: {
    fill: 'white'
  },
  chip: {
    margin: 4
  },
  chipLabelStyle: {
    color: 'white'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  autoComplete: {
    padding: 10,
    marginBottom: 10
  },
  autoCompleteList: {
    maxHeight: 400,
    overflow: 'auto'
  },
  toolbarTitle: {
    marginLeft: 10,
    minWidth: 120
  },
  toolbar: {
  }
}

@connect({
  actions: [propertyLogic, ['addFilter', 'removeFilter', 'setSortBy']],
  props: [propertyLogic, ['keywords', 'filters', 'sortBy', 'fullScreen']]
})
export class PropertyFilters extends React.Component {
  state = {
    searchText: ''
  }

  constructor () {
    super()
    this.keywordsStyled = []
  }

  componentWillReceiveProps ({ keywords }) {
    if ((!this.keywordsStyled.length && keywords.length) ||
    (this.props.keywords.length && !this.arrayEquals(this.props.keywords, keywords))) {
      this.keywordsStyled = keywords.map(item => {
        return {
          text: item,
          value: (
            <MenuItem
              primaryText={(
                <div style={styles.filterContainer}>
                  {this.renderFilterIcon(item)}
                  <span>{item.split(':')[1]}</span>
                </div>)}
            />
          )
        }
      })
    }
  }

  renderFilterIcon = (filter) => {
    const icons = []
    icons[constants.fields.implementation] = <CategoryIcon style={styles.filterIcon} />
    icons[constants.fields.category] = <ImplementationIcon style={styles.filterIcon} />
    icons[constants.fields.country] = <ChinaIcon style={styles.filterIcon} />
    icons[constants.fields.region] = <ChinaIcon style={styles.filterIcon} />
    icons[constants.fields.customer] = <CustomerIcon style={styles.filterIcon} />
    icons[constants.fields.implementationPartner] = <PartnerIcon style={styles.filterIcon} />
    icons[constants.fields.platform] = <PhoneIcon style={styles.filterIcon} />
    icons['Keyword'] = <KeywordIcon style={styles.filterIcon} />

    const category = filter.split(':')[0]
    return (<span style={styles.filterChip}>
      {icons[category] || <ProductIcon style={styles.filterIcon} />}
      {`${category}:`}</span>)
  }

  arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
  }

  handleNewRequest = selectedItem => {
    const { keywords } = this.props
    if (!keywords.includes(selectedItem.text)) return false
    this.actions.addFilter(selectedItem.text)
    this.setState({
      searchText: ''
    })
  }

  handleUpdateInput = searchText => {
    this.setState({
      searchText: searchText
    })
  }

  renderChip = data => {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.actions.removeFilter(data)}
        style={styles.chip}
        labelColor={styles.chipLabelStyle.color}
        deleteIconStyle={styles.chipDeleteStyle}
      >
        {data}
      </Chip>
    )
  }

  currentFilters = filters => <div style={styles.wrapper}>{filters.map(this.renderChip, this)}</div>

  render () {
    const { filters, sortBy, fullScreen } = this.props
    const { setSortBy, addFilter } = this.actions
    const { searchText } = this.state

    if (fullScreen) return this.currentFilters(filters)

    // eslint-disable-next-line
    const w = jQuery(window).width()
    const filterLabel =
      w >= 1200
        ? 'Or search by Customer, Implementation, Country, Region, Platform, Category or Keyword'
        : 'Or search by...'

    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={styles.toolbarTitle} text='Quick filters:' />
            <RaisedButton
              style={styles.button}
              label={constants.friendlyLabels.b2bProduct}
              icon={<RetailIcon />}
              onClick={() => addFilter(constants.friendlyFilters.b2bProduct)}
            />
            <RaisedButton
              style={styles.button}
              label='Mobile Apps'
              icon={<PhoneIcon />}
              onClick={() => addFilter('Platform: iOS, Android')}
            />
            <RaisedButton
              style={styles.button}
              label='Lite Registration'
              icon={<MailIcon />}
              onClick={() => addFilter('Keyword: Lite Registration')}
            />
            <RaisedButton
              style={styles.button}
              label='China'
              icon={<ChinaIcon />}
              onClick={() => addFilter('Country: China')}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <DropDownMenu
              value={sortBy}
              className='catalog-sortby'
              onChange={(event, index, value) => setSortBy(value)}
            >
              <MenuItem value={constants.fields.id} primaryText='Sort results by: Date Added' />
              <MenuItem
                value={constants.fields.goLiveDate}
                primaryText='Sort results by: Go Live Date'
              />
              <MenuItem
                value={constants.fields.customer}
                primaryText='Sort results by: Customer'
              />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
        <AutoComplete
          floatingLabelText={filterLabel}
          searchText={searchText}
          style={styles.autoComplete}
          listStyle={styles.autoCompleteList}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.keywordsStyled}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          openOnFocus
          fullWidth
        />

        {this.currentFilters(filters)}
      </div>
    )
  }
}

export default PropertyFilters
