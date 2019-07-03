import React from 'react'
import { connect } from 'kea'
import {Tabs, Tab} from 'material-ui/Tabs'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import TableIcon from 'material-ui/svg-icons/action/reorder'
import PropertyGrid from './PropertyGrid'
import PropertyReport from './PropertyReport'
import propertyLogic from './logic/property.logic'
import constants from '../constants'

const styles = {
  hiddenTab: {
    height: 0
  },
  hiddenBar: {
    height: 0
  },
  inkBar: {
    backgroundColor: '#0070B1',
    height: 5,
    marginTop: -5
  }
}

@connect({
  props: [
    propertyLogic, [
      'searchResults',
      'fullScreen',
      'activeTab',
      'filters',
      'isLoading'
    ]
  ],
  actions: [
    propertyLogic, [
      'changeTab',
      'addFilter'
    ]
  ]
})
export class PropertyTabs extends React.Component {
  componentWillMount () {

  }

    filterPeriod = newPeriod => {
      const { addFilter } = this.actions
      newPeriod = `Go-Live: ${newPeriod}`
      addFilter(newPeriod)
    }

    onChangeTab = e => {
      const { activeTab, searchResults, filters } = this.props
      const { changeTab } = this.actions

      if (activeTab === 'grid' && !filters.some(f => f.startsWith('Go-Live:'))) {
        this.filterPeriod(constants.periods.thisYear)
      }
      changeTab(e, searchResults.length)
    }

    render () {
      const { fullScreen, activeTab, isLoading } = this.props
      return (
        <Tabs
          inkBarStyle={fullScreen ? styles.hiddenBar : styles.inkBar}
          value={activeTab}
          onChange={e => this.onChangeTab(e)}>
          <Tab
            icon={<DashboardIcon />}
            label='Grid view'
            value='grid'
            disabled={isLoading}
            style={fullScreen ? styles.hiddenTab : null}
          >
            <PropertyGrid />
          </Tab>
          <Tab
            icon={<TableIcon />}
            label='Report view'
            value='report'
            disabled={isLoading}
            style={fullScreen ? styles.hiddenTab : null}
          >
            <PropertyReport />
          </Tab>
        </Tabs>
      )
    }
}
export default PropertyTabs
