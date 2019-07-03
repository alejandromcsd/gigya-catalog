import PropTypes from 'prop-types'
import { kea } from 'kea'

export default kea({
  actions: () => ({
    toggleReportDrawer: () => ({}),
    toggleColumnAM: () => ({}),
    toggleColumnIC: () => ({}),
    toggleColumnTC: () => ({}),
    toggleColumnTA: () => ({}),
    toggleColumnCDCProducts: () => ({})
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
    isCDCProductsVisible: [false, PropTypes.bool, {
      [actions.toggleColumnCDCProducts]: (state) => !state
    }]
  })
})
