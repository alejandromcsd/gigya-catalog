import React from 'react'
import { connect } from 'kea'
import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/FlatButton'
import PhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone'
import RetailIcon from 'material-ui/svg-icons/action/shopping-cart'
import AirlineIcon from 'material-ui/svg-icons/device/airplanemode-active'
import MailIcon from 'material-ui/svg-icons/communication/contact-mail'
import GroupIcon from 'material-ui/svg-icons/action/group-work'
import propertyLogic from './logic/property.logic'

const styles = {
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
  }
}

@connect({
  actions: [
    propertyLogic, [
      'addFilter',
      'removeFilter'
    ]
  ],
  props: [
    propertyLogic, [
      'keywords',
      'filters'
    ]
  ]
})
export class PropertyFilters extends React.Component {
  state = {
    searchText: ''
  };

  handleNewRequest = (text) => {
    this.actions.addFilter(text)
    this.setState({
      searchText: ''
    })
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText
    })
  };

  renderChip = (data) => {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.actions.removeFilter(data)}
        style={styles}
      >
        {data}
      </Chip>
    )
  };

  render () {
    const { keywords, filters } = this.props
    const { searchText } = this.state

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild lastChild>
            <ToolbarTitle style={styles.toolbarTitle} text='Quick filters' />
            <RaisedButton
              style={styles.button}
              label='Retail'
              icon={<RetailIcon />}
              onClick={() => this.actions.addFilter('Category: Retail')}
            />
            <RaisedButton
              style={styles.button}
              label='Travel'
              icon={<AirlineIcon />}
              onClick={() => this.actions.addFilter('Category: Travel')}
            />
            <RaisedButton
              style={styles.button}
              label='Mobile Apps'
              icon={<PhoneIcon />}
              onClick={() => this.actions.addFilter('Platform: iOS, Android')}
            />
            <RaisedButton
              style={styles.button}
              label='Lite Registration'
              icon={<MailIcon />}
              onClick={() => this.actions.addFilter('Keyword: Lite Registration')}
            />
            <RaisedButton
              style={styles.button}
              label='SSO'
              icon={<GroupIcon />}
              onClick={() => this.actions.addFilter('Keyword: SSO')}
            />
          </ToolbarGroup>
        </Toolbar>
        <AutoComplete
          floatingLabelText='Or search by Customer, Implementation, AM, IC, TC, Url, Country, Platform, Category or Keyword'
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

        <div style={styles.wrapper}>
          {filters.map(this.renderChip, this)}
        </div>
      </div>
    )
  }
}

export default PropertyFilters
