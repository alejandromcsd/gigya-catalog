import React from 'react'
import { connect } from 'kea'
import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/FlatButton'
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone'
import RetailIcon from 'material-ui/svg-icons/action/done-all'
import MailIcon from 'material-ui/svg-icons/communication/contact-mail'
import GroupIcon from 'material-ui/svg-icons/action/group-work'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import propertyLogic from './logic/property.logic'
import constants from '../constants'

const styles = {
  chipLabelStyle: {
    color: 'white'
  },
  chipDeleteStyle: {
    fill: 'white'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20
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
    overflowX: 'scroll'
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

  handleNewRequest = text => {
    this.actions.addFilter(text)
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

  render () {
    const { keywords, filters, sortBy, fullScreen } = this.props
    const { setSortBy, addFilter } = this.actions
    const { searchText } = this.state

    if (fullScreen) return null

    // eslint-disable-next-line
    const w = jQuery(window).width()
    const filterLabel =
      w >= 1200
        ? 'Or search by Customer, Implementation, Country, Platform, Category or Keyword'
        : 'Or search by...'

    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={styles.toolbarTitle} text='Quick filters:' />
            <RaisedButton
              style={styles.button}
              label='Consent'
              icon={<RetailIcon />}
              onClick={() => addFilter('SAP Customer Consent: Yes')}
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
              label='SSO'
              icon={<GroupIcon />}
              onClick={() => addFilter('Keyword: SSO')}
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
          dataSource={keywords}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          openOnFocus
          fullWidth
        />

        <div style={styles.wrapper}>{filters.map(this.renderChip, this)}</div>
      </div>
    )
  }
}

export default PropertyFilters
