import React from 'react'
import { connect } from 'kea'
import {ListItem} from 'material-ui/List'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ConsentIcon from 'material-ui/svg-icons/toggle/check-box'
import IdentityIcon from 'material-ui/svg-icons/action/account-box'
import AllIcon from 'material-ui/svg-icons/places/all-inclusive'
import CrossIcon from 'material-ui/svg-icons/action/view-week'
import CalendarIcon from 'material-ui/svg-icons/action/date-range'
import B2BIcon from 'material-ui/svg-icons/communication/business'
import CDPIcon from 'material-ui/svg-icons/communication/contacts'
import NAIcon from 'material-ui/svg-icons/editor/attach-money'
import EMEAIcon from 'material-ui/svg-icons/action/euro-symbol'
import APJIcon from 'material-ui/svg-icons/action/translate'
import propertyLogic from '../logic/property.logic'
import reportLogic from '../logic/report.logic'
import constants from '../../constants'

const styles = {
  item: {
    fontSize: 14
  }
}

@connect({
  props: [
    propertyLogic, [
      'filters'
    ],
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [
    propertyLogic, [
      'addFilter',
      'removeFilter'
    ]
  ]
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
    const { reportDrawer } = this.props
    if (!reportDrawer) return null

    return (
      <Menu desktop>
        <ListItem
          primaryText='By Go-Live Date'
          initiallyOpen
          primaryTogglesNestedList
          nestedItems={[
            <MenuItem key={0} style={styles.item} primaryText={constants.periods.thisYear}
              onClick={() => this.filterPeriod(constants.periods.thisYear)}
              leftIcon={<CalendarIcon />}
            />,
            <MenuItem key={1} style={styles.item} primaryText={constants.periods.lastYear}
              onClick={() => this.filterPeriod(constants.periods.lastYear)}
              leftIcon={<CalendarIcon />}
            />,
            <MenuItem key={2} style={styles.item} primaryText={constants.periods.thisQuarter}
              onClick={() => this.filterPeriod(constants.periods.thisQuarter)}
              leftIcon={<CalendarIcon />}
            />,
            <MenuItem key={3} style={styles.item} primaryText={constants.periods.lastQuarter}
              onClick={() => this.filterPeriod(constants.periods.lastQuarter)}
              leftIcon={<CalendarIcon />}
            />,
            <MenuItem key={4} style={styles.item} primaryText={constants.periods.thisMonth}
              onClick={() => this.filterPeriod(constants.periods.thisMonth)}
              leftIcon={<CalendarIcon />}
            />,
            <MenuItem key={5} style={styles.item} primaryText={constants.periods.lastMonth}
              onClick={() => this.filterPeriod(constants.periods.lastMonth)}
              leftIcon={<CalendarIcon />}
            />
          ]}
        />
      </Menu>
    )
  }
}

@connect({
  props: [
    propertyLogic, [
      'filters'
    ],
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [
    propertyLogic, [
      'addFilter',
      'removeFilter'
    ]
  ]
})
export class RegionListItems extends React.Component {
  filterRegion = newRegion => {
    const { removeFilter, addFilter } = this.actions

    removeFilter('Region: EMEA')
    removeFilter('Region: NA')
    removeFilter('Region: APJ')
    addFilter(`Region: ${newRegion}`)
  }

  render () {
    const { reportDrawer } = this.props
    if (!reportDrawer) return null

    return (
      <Menu desktop>
        <ListItem
          primaryText='By Region'
          initiallyOpen
          primaryTogglesNestedList
          nestedItems={[
            <MenuItem key={0} style={styles.item} primaryText='EMEA'
              onClick={() => this.filterRegion('EMEA')}
              leftIcon={<EMEAIcon />}
            />,
            <MenuItem key={1} style={styles.item} primaryText='NA'
              onClick={() => this.filterRegion('NA')}
              leftIcon={<NAIcon />}
            />,
            <MenuItem key={2} style={styles.item} primaryText='APJ'
              onClick={() => this.filterRegion('APJ')}
              leftIcon={<APJIcon />}
            />
          ]}
        />
      </Menu>
    )
  }
}

@connect({
  props: [
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [
    propertyLogic, [
      'addFilter',
      'removeFilter'
    ]
  ]
})
export class SecondaryListItems extends React.Component {
    filterProduct = products => {
      const { removeFilter, addFilter } = this.actions

      removeFilter(constants.friendlyFilters.identityProduct)
      removeFilter(constants.friendlyFilters.consentProduct)
      removeFilter(constants.friendlyFilters.identityProductNOT)
      removeFilter(constants.friendlyFilters.consentProductNOT)
      removeFilter(constants.friendlyFilters.crossPillar)

      products.forEach(p => addFilter(p))
    }

    filterCrossPillar = () => {
      const { removeFilter, addFilter } = this.actions
      removeFilter(constants.friendlyFilters.identityProduct)
      removeFilter(constants.friendlyFilters.consentProduct)
      removeFilter(constants.friendlyFilters.identityProductNOT)
      removeFilter(constants.friendlyFilters.consentProductNOT)
      addFilter(constants.friendlyFilters.crossPillar)
    }

    render () {
      const { reportDrawer } = this.props
      const { addFilter } = this.actions

      if (!reportDrawer) return null

      return (
        <Menu desktop>
          <ListItem
            primaryText='By Products'
            primaryTogglesNestedList
            nestedItems={[
              <MenuItem style={styles.item} key={0} primaryText={constants.productCombos.identity}
                onClick={() => this.filterProduct([constants.friendlyFilters.identityProduct, constants.friendlyFilters.consentProductNOT])}
                leftIcon={<IdentityIcon />} />,
              <MenuItem style={styles.item} key={1} primaryText={constants.productCombos.consent}
                onClick={() => this.filterProduct([constants.friendlyFilters.consentProduct, constants.friendlyFilters.identityProductNOT])}
                leftIcon={<ConsentIcon />} />,
              <MenuItem style={styles.item} key={2} primaryText={constants.productCombos.all}
                onClick={() => this.filterProduct([constants.friendlyFilters.identityProduct, constants.friendlyFilters.consentProduct])}
                leftIcon={<AllIcon />} />,
              <MenuItem style={styles.item} key={3} primaryText={constants.friendlyLabels.b2bProduct}
                onClick={() => addFilter(constants.friendlyFilters.b2bProduct)}
                leftIcon={<B2BIcon />} />,
              <MenuItem style={styles.item} key={4} primaryText={constants.friendlyLabels.cdpProduct}
                onClick={() => addFilter(constants.friendlyFilters.cdpProduct)}
                leftIcon={<CDPIcon />} />,
              <MenuItem style={styles.item} key={5} primaryText={constants.productCombos.crossPillar}
                onClick={this.filterCrossPillar}
                leftIcon={<CrossIcon />} />
            ]}
          />
        </Menu>
      )
    }
}
