import React from 'react'
import { connect } from 'kea'
import Header from './Header'
import PropertyTabs from './PropertyTabs'
import PropertyFilters from './PropertyFilters'
import PropertyDetails from './PropertyDetails'
import Login from './Login'
import PropertyEdit from './PropertyEdit'
import LoadMore from './LoadMore'
import propertyLogic from './logic/property.logic'
import reportLogic from './logic/report.logic'

@connect({
  props: [
    propertyLogic, [
      'isLoading',
      'searchResults',
      'isOpen',
      'activeTab'
    ],
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [
    propertyLogic, [
      'selectProperty',
      'toggleDialog'
    ]
  ]
})
export class PropertyContainer extends React.Component {
  componentWillReceiveProps ({ isLoading, searchResults, match, isOpen }) {
    const currentPropertyUrlId = match.params.id

    if (!isLoading && searchResults.length > 0 && currentPropertyUrlId) {
      const propertyByUrl = searchResults.filter(p => p.Id === parseInt(currentPropertyUrlId))
      if (propertyByUrl.length) this.actions.selectProperty(propertyByUrl[0])
    } else if (!currentPropertyUrlId && isOpen) {
      this.actions.toggleDialog()
    }
  }

  render () {
    const {activeTab, reportDrawer} = this.props
    let drawerOpenStyle = {}
    if (activeTab === 'report' && reportDrawer) drawerOpenStyle = {marginLeft: 245}
    if (activeTab === 'report' && !reportDrawer) drawerOpenStyle = {marginLeft: 64}

    return (
      <div style={drawerOpenStyle}>
        <Header />
        <PropertyFilters />
        <PropertyTabs />
        <PropertyDetails />
        <Login />
        <PropertyEdit />
        <LoadMore />
      </div>
    )
  }
}
export default PropertyContainer
