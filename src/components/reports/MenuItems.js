import React from 'react'
import { connect } from 'kea'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import ConsentIcon from 'material-ui/svg-icons/toggle/check-box'
import IdentityIcon from 'material-ui/svg-icons/action/account-box'
import AllIcon from 'material-ui/svg-icons/places/all-inclusive'
import CalendarIcon from 'material-ui/svg-icons/action/date-range'
import propertyLogic from '../logic/property.logic'
import reportLogic from '../logic/report.logic'
import constants from '../../constants'

@connect({
  props: [
    propertyLogic, [
      'filters'
    ]
  ],
  actions: [propertyLogic, ['addFilter', 'removeFilter']]
})
export class MainListItems extends React.Component {
  filterPeriod = newPeriod => {
    const { removeFilter, addFilter } = this.actions
    const { filters } = this.props

    const existingPeriod = filters.find(f => f.startsWith('Go-Live:'))
    if (existingPeriod) removeFilter(existingPeriod)

    newPeriod = `Go-Live: ${newPeriod}`
    addFilter(newPeriod)
  }

  render () {
    return (
      <List>
        <ListItem primaryText={constants.periods.thisYear}
          onClick={() => this.filterPeriod(constants.periods.thisYear)} leftIcon={<CalendarIcon />} />
        <ListItem primaryText={constants.periods.lastYear}
          onClick={() => this.filterPeriod(constants.periods.lastYear)} leftIcon={<CalendarIcon />} />
        <ListItem primaryText={constants.periods.thisQuarter}
          onClick={() => this.filterPeriod(constants.periods.thisQuarter)} leftIcon={<CalendarIcon />} />
        <ListItem primaryText={constants.periods.lastQuarter}
          onClick={() => this.filterPeriod(constants.periods.lastQuarter)} leftIcon={<CalendarIcon />} />
        <ListItem primaryText={constants.periods.thisMonth}
          onClick={() => this.filterPeriod(constants.periods.thisMonth)} leftIcon={<CalendarIcon />} />
        <ListItem primaryText={constants.periods.lastMonth}
          onClick={() => this.filterPeriod(constants.periods.lastMonth)} leftIcon={<CalendarIcon />} />
      </List>
    )
  }
}

@connect({
  props: [
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [propertyLogic, ['addFilter', 'removeFilter']]
})
export class SecondaryListItems extends React.Component {
    filterProduct = products => {
      const { removeFilter, addFilter } = this.actions

      removeFilter(constants.friendlyFilters.identityProduct)
      removeFilter(constants.friendlyFilters.consentProduct)
      removeFilter(constants.friendlyFilters.identityProductNOT)
      removeFilter(constants.friendlyFilters.consentProductNOT)
      addFilter(constants.friendlyFilters.profileProduct)

      products.forEach(p => addFilter(p))
    }

    render () {
      const { reportDrawer } = this.props
      return (
        <List>
          <Subheader>{reportDrawer && 'By CDC Products'}</Subheader>
          <ListItem primaryText={constants.productCombos.identity}
            onClick={() => this.filterProduct([constants.friendlyFilters.identityProduct, constants.friendlyFilters.consentProductNOT])}
            leftIcon={<IdentityIcon />} />
          <ListItem primaryText={constants.productCombos.consent}
            onClick={() => this.filterProduct([constants.friendlyFilters.consentProduct, constants.friendlyFilters.identityProductNOT])}
            leftIcon={<ConsentIcon />} />
          <ListItem primaryText={constants.productCombos.all}
            onClick={() => this.filterProduct([constants.friendlyFilters.identityProduct, constants.friendlyFilters.consentProduct])}
            leftIcon={<AllIcon />} />
        </List>
      )
    }
}
