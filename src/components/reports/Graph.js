import React from 'react'
import { connect } from 'kea'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  LabelList
} from 'recharts'
import IconButton from 'material-ui/IconButton'
import { schemeCategory10 } from 'd3-scale-chromatic'
import HelpIcon from 'material-ui/svg-icons/action/help'
import { scaleOrdinal } from 'd3-scale'
import propertyLogic from '../logic/property.logic'
import reportLogic from '../logic/report.logic'

const styles = {
  smallIcon: {
    width: 16,
    height: 16,
    fill: '#BABABA'
  },
  iconButton: {
    position: 'absolute',
    marginLeft: 249,
    top: 31,
    width: 20,
    height: 20,
    padding: 0
  },
  mainColor: {
    color: '#35495F'
  },
  amount: {
    fontWeight: 300,
    fontSize: 70,
    lineHeight: '10px'
  },
  subtitle: {
    color: '#757575',
    fontWeight: 400
  },
  root: {
    height: 160
  },
  inline: {
    display: 'flex'
  },
  radioGroup: {
    display: 'flex',
    marginTop: 17,
    marginLeft: 20
  },
  radioButton: {
    width: 180
  }
}

const colors = scaleOrdinal(schemeCategory10).range()
const colorsBlue = ['#172533', '#35495F', '#4a6684', '#849ab2']

@connect({
  props: [
    propertyLogic, [
      'searchResults'
    ],
    reportLogic, [
      'currentGraph'
    ]
  ],
  actions: [
    reportLogic, [
      'changeGraph'
    ]
  ]
})
export default class Graph extends React.Component {
  render () {
    const { searchResults, currentGraph } = this.props
    const { changeGraph } = this.actions

    const data = currentGraph === 'countries' ? searchResults.reduce((items, item) => { // Countries data:
      items.find(e => e.Country === item.Country && e.Count++) || items.push({ Country: item.Country, Count: 1 })
      return items
    }, [])
      : searchResults.reduce((items, item) => { // Duration data:
        if (!item['KickOffDate'] || !item['GoLiveDate']) return items
        const diffTime = Math.abs(new Date(item['GoLiveDate']).getTime() - new Date(item['KickOffDate']).getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (true) {
          case (diffDays < 90):
            items[0].Count++
            break
          case (diffDays < 180):
            items[1].Count++
            break
          case (diffDays < 365):
            items[2].Count++
            break
          case (diffDays >= 365):
            items[3].Count++
            break
        }
        return items
      }, [
        { 'Count': 0, 'name': 'less 90 days' },
        { 'Count': 0, 'name': 'less 180 days' },
        { 'Count': 0, 'name': 'less 395 days' },
        { 'Count': 0, 'name': 'over 1 year' }
      ]).map((e, _, results) => {
        return {...e, pct: `${e.Count ? Math.round((e.Count * 100) / results.reduce((c, i) => i.Count + c, 0)) : 0}%`}
      })

    return (
      <div style={styles.root}>
        <div style={styles.inline}>
          <h3 style={styles.mainColor}>Go-Lives: </h3>
          <IconButton
            tooltip='Based on Go-Lives in the Catalog with a Kick-off date, filtered by search criteria'
            tooltipPosition='bottom-right'
            style={styles.iconButton}
            iconStyle={styles.smallIcon}>
            <HelpIcon />
          </IconButton>
          <RadioButtonGroup
            style={styles.radioGroup}
            name='graphType'
            onChange={(_, v) => changeGraph(v)}
            valueSelected={currentGraph}>
            <RadioButton
              value='duration'
              label='Time to go live'
              style={styles.radioButton}
              inputStyle={styles.mainColor}
              labelStyle={styles.mainColor}
            />
            <RadioButton
              value='countries'
              label='Countries'
              style={styles.radioButton}
              inputStyle={styles.mainColor}
              labelStyle={styles.mainColor}
            />
          </RadioButtonGroup>
        </div>
        {currentGraph === 'duration' && (
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 16,
                bottom: 5,
                left: 5
              }}
              layout='vertical'
            >
              <XAxis tick={{fontSize: 12}} domain={['auto', 'dataMax + 1']} allowDecimals={false} type='number' />
              <YAxis tick={{fontSize: 13}} dataKey='name' type='category' width={180} />
              <Tooltip />
              <CartesianGrid horizontal={false} />
              <Bar isAnimationActive={false} dataKey='Count' fill='#ff7300'>
                <LabelList position='right' dataKey='pct' />
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorsBlue[index]} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
        {currentGraph === 'countries' && (
          <ResponsiveContainer>
            <BarChart
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24
              }}
              data={data}
            >
              <XAxis tick={{fontSize: 11}} dataKey='Country' />
              <YAxis tick={{fontSize: 11}} yAxisId='a' />
              <Tooltip />
              <CartesianGrid vertical={false} />
              <Bar yAxisId='a' dataKey='Count'>
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 10]} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    )
  }
}
