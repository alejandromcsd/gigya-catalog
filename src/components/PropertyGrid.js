import React from 'react'
import { connect } from 'kea'
import {GridList} from 'material-ui/GridList'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card'
import LinearProgress from 'material-ui/LinearProgress'
import propertyLogic from './logic/property.logic'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  progress: {
    marginTop: 50
  },
  tile: {
    cursor: 'pointer',
    margin: 10
  },
  media: {
    maxHeight: 160,
    overflowY: 'hidden'
  }
}

@connect({
  props: [
    propertyLogic, [
      'properties',
      'isLoading',
      'searchResults',
      'error'
    ]
  ],
  actions: [
    propertyLogic, [
      'selectProperty'
    ]
  ]
})
export class PropertyGrid extends React.Component {
  getCols (resultsCount) {
    // eslint-disable-next-line
    // debugger;

    // eslint-disable-next-line
    var w = jQuery(window).width()

    if (resultsCount > 3 && w >= 1200) return 4
    if (resultsCount > 2 && w >= 1024) return 3
    if (resultsCount > 1 && w >= 768) return 2
    return 1
  }

  render () {
    const { searchResults, isLoading, error } = this.props
    const { selectProperty } = this.actions

    return (
      <div style={styles.root}>
        {isLoading ? (
          <div style={styles.progress}>
            Loading...
            <LinearProgress mode='indeterminate' />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <GridList
              cellHeight={300}
              style={styles.gridList}
              cols={this.getCols(searchResults.length)}
            >
              {searchResults.map((tile) => (
                <Card
                  key={tile['Id']}
                  style={styles.tile}
                  onClick={() => selectProperty(tile)}
                >
                  <CardHeader
                    title={tile['Customer']}
                    subtitle={tile['Implementation']}
                    avatar={tile['ImageUrl']}
                  />
                  <CardMedia style={styles.media}>
                    <img src={tile['ImageUrl']} alt={tile['Implementation']} />
                  </CardMedia>
                  <CardActions>
                    <FlatButton primary label='View' onClick={() => selectProperty(tile)} />
                  </CardActions>
                </Card>
              ))}
            </GridList>
          </div>
        ) : (
          <div style={styles.progress}>
            {error ? `Error: ${error}` : 'No properties found'}
          </div>
        )
        }
      </div>
    )
  }
}
export default PropertyGrid
