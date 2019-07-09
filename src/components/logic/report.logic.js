import PropTypes from 'prop-types'
import { kea } from 'kea'

export default kea({
  actions: () => ({
    toggleReportDrawer: () => ({}),
    toggleColumnAM: () => ({}),
    toggleColumnIC: () => ({}),
    toggleColumnTC: () => ({}),
    toggleColumnTA: () => ({}),
    toggleColumnCDCProducts: () => ({}),
    toggleColumnOtherCXProducts: () => ({}),
    toggleColumnKickOffDate: () => ({}),
    changeGraph: (graphType) => ({ graphType })
  }),

  reducers: ({ actions }) => ({
    reportDrawer: [true, PropTypes.bool, {
      [actions.toggleReportDrawer]: (state) => !state
    }],
    isColumnAMVisible: [false, PropTypes.bool, {
      [actions.toggleColumnAM]: (state) => !state
    }],
    isColumnICVisible: [false, PropTypes.bool, {
      [actions.toggleColumnIC]: (state) => !state
    }],
    isColumnTCVisible: [false, PropTypes.bool, {
      [actions.toggleColumnTC]: (state) => !state
    }],
    isColumnTAVisible: [false, PropTypes.bool, {
      [actions.toggleColumnTA]: (state) => !state
    }],
    isColumnKickOffDateVisible: [false, PropTypes.bool, {
      [actions.toggleColumnKickOffDate]: (state) => !state
    }],
    isCDCProductsVisible: [false, PropTypes.bool, {
      [actions.toggleColumnCDCProducts]: (state) => !state
    }],
    isOtherCXProductsVisible: [false, PropTypes.bool, {
      [actions.toggleColumnOtherCXProducts]: (state) => !state
    }],
    currentGraph: ['duration', PropTypes.string, {
      [actions.changeGraph]: (_, payload) => payload.graphType
    }]
  })
})
