import React from 'react'
import { connect } from 'kea'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import UnfoldMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import propertyLogic from './logic/property.logic'

const styles = {
  paper: {
    marginTop: 20
  }
}

@connect({
  props: [
    propertyLogic, [
      'searchResults',
      'scrollCount'
    ]
  ],
  actions: [
    propertyLogic, [
      'showMoreItems',
      'showAll'
    ]
  ]
})
export default class LoadMore extends React.Component {
  render () {
    const { searchResults, scrollCount } = this.props

    if (scrollCount > searchResults.length) return null

    return (
      <Paper style={styles.paper} zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            label={`Show more (Displaying ${scrollCount})`}
            icon={<ExpandMore />}
            onClick={() => this.actions.showMoreItems()}
          />
          <BottomNavigationItem
            label={`Show all (Total ${searchResults.length})`}
            icon={<UnfoldMore />}
            onClick={() => this.actions.showAll(searchResults.length)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
