import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call, take } from 'redux-saga/effects'
import { delay, channel } from 'redux-saga'
import fire from '../../fire'
import constants from '../../constants'
import { includesNonCase, removeCategory, reduceToList } from '../../utils'

export default kea({
  actions: () => ({
    onLogin: (user) => ({ user }),
    onLogout: () => ({}),
    startFire: () => ({}),
    search: (searchText) => ({ searchText }),
    setSearchText: (searchText) => ({ searchText }),
    fetchProperties: (properties) => ({ properties }),
    setProperties: (properties) => ({ properties }),
    addFilter: (filter) => ({ filter }),
    removeFilter: (filter) => ({ filter }),
    setFetchError: (message) => ({ message }),
    setPropertyOnEdit: (property) => ({ property }),
    submitPropertyEdit: (property) => ({ property }),
    toggleDialog: () => ({}),
    selectProperty: (property) => ({ property }),
    uploadImage: (image) => ({ image }),
    setUploadedImageUrl: (imageUrl) => ({ imageUrl })
  }),

  reducers: ({ actions }) => ({
    currentUser: [null, PropTypes.object, {
      [actions.onLogin]: (state, payload) => payload.user,
      [actions.onLogout]: (_, payload) => null
    }],
    propertyOnEdit: [null, PropTypes.object, {
      [actions.setPropertyOnEdit]: (_, payload) => payload.property,
      [actions.selectProperty]: () => null
    }],
    searchText: ['', PropTypes.string, {
      [actions.search]: () => '',
      [actions.setSearchText]: (_, payload) => payload.searchText
    }],
    properties: [[], PropTypes.array, {
      [actions.fetchProperties]: () => [],
      [actions.setProperties]: (_, payload) => payload.properties
    }],
    filters: [[], PropTypes.array, {
      [actions.fetchProperties]: () => [],
      [actions.addFilter]: (state, payload) => !state.includes(payload.filter) ? [...state, payload.filter] : state,
      [actions.removeFilter]: (state, payload) => state.filter(e => e !== payload.filter)
    }],
    isLoading: [true, PropTypes.bool, {
      [actions.search]: () => true,
      [actions.setSearchText]: () => false,
      [actions.fetchProperties]: () => true,
      [actions.setProperties]: () => false,
      [actions.setFetchError]: () => false
    }],
    nextId: [0, PropTypes.number, {
      [actions.fetchProperties]: (_, payload) =>
        payload.properties ? payload.properties.sort((a, b) => b.Id - a.Id)[0].Id + 1 : 0
    }],
    error: [null, PropTypes.string, {
      [actions.fetchProperties]: () => null,
      [actions.setFetchError]: (_, payload) => payload.message
    }],
    isOpen: [false, PropTypes.bool, {
      [actions.toggleDialog]: (state, payload) => !state,
      [actions.selectProperty]: () => true
    }],
    selectedProperty: [{}, PropTypes.object, {
      [actions.selectProperty]: (_, payload) => payload.property
    }],
    uploadingImage: [false, PropTypes.bool, {
      [actions.uploadImage]: () => true,
      [actions.setUploadedImageUrl]: () => false,
      [actions.setPropertyOnEdit]: () => false
    }],
    uploadedImageUrl: ['', PropTypes.string, {
      [actions.setUploadedImageUrl]: (_, payload) => payload.imageUrl,
      [actions.uploadImage]: () => '',
      [actions.setPropertyOnEdit]: () => ''
    }]
  }),

  selectors: ({ selectors }) => ({
    searchResults: [
      () => [selectors.properties, selectors.filters],
      (properties, filters) => !filters ? properties : properties
        .filter(obj => filters.every(word =>
          obj['Keywords'].some(k => k.toLowerCase().includes(removeCategory(word).toLowerCase())) ||
          Object.keys(obj).some((key) => !constants.skipAttributes.includes(key) && includesNonCase(obj[key], removeCategory(word)))))
        .sort((a, b) => b.Id - a.Id),
      PropTypes.array
    ],
    keywords: [
      () => [selectors.properties],
      (properties) => properties.reduce((keysArray, item) => {
        // on each property, push all simple attributes and keywords
        Object.keys(item).map((key) =>
          !constants.skipAttributes.includes(key) && !keysArray.includes(`${key}: ${item[key]}`)
            ? keysArray.push(`${key}: ${item[key]}`)
            : null)
        keysArray = keysArray.concat(
          item.Keywords.filter(keyword => !keysArray.includes(`Keyword: ${keyword}`)).map(k => `Keyword: ${k}`)
        )
        return keysArray
      }, []).sort(),
      PropTypes.array
    ],
    customersList: [
      () => [selectors.properties], (p) => reduceToList(p, 'Customer'), PropTypes.array
    ],
    amList: [
      () => [selectors.properties], (p) => reduceToList(p, 'AM'), PropTypes.array
    ],
    icList: [
      () => [selectors.properties], (p) => reduceToList(p, 'IC'), PropTypes.array
    ],
    tcList: [
      () => [selectors.properties], (p) => reduceToList(p, 'TC'), PropTypes.array
    ],
    countryList: [
      () => [selectors.properties], (p) => reduceToList(p, 'Country'), PropTypes.array
    ],
    platformList: [
      () => [selectors.properties], (p) => reduceToList(p, 'Platform'), PropTypes.array
    ],
    categoryList: [
      () => [selectors.properties], (p) => reduceToList(p, 'Category'), PropTypes.array
    ],
    keywordsList: [
      () => [selectors.properties], (properties) =>
        properties.reduce((keywords, item) =>
          [...keywords, ...item['Keywords'].filter(k => !keywords.includes(k))], []), PropTypes.array
    ]
  }),

  start: function * () {},

  takeLatest: ({ actions, workers }) => ({
    [actions.onLogin]: workers.fireAuth,
    [actions.onLogout]: workers.fireSignOut,
    [actions.search]: workers.fetchSearch,
    [actions.fetchProperties]: workers.fetchProperties,
    [actions.submitPropertyEdit]: workers.fireEdit,
    [actions.uploadImage]: workers.fireUploadImage,
    [actions.startFire]: workers.fireLoad
  }),

  workers: {
    * fireAuth (action) {
      const { startFire } = this.actions
      const { user } = action.payload

      if (!user || !user.FirebaseToken) return
      yield fire.auth().signInWithCustomToken(user.FirebaseToken).catch(error => console.log(error))
      yield put(startFire())
    },

    * fireSignOut () {
      fire.auth().signOut().then(() => {
        console.log('Signed out from firebase...')
      }).catch(function (error) {
        console.log(error)
      })
    },

    * fireLoad () {
      const { fetchProperties } = this.actions

      const fetchChange = function * () {
        const fetchChannel = channel()

        const fetchWrapper = channel => snapshot => {
          const data = snapshot.val()
          channel.put(fetchProperties(data))
        }

        const fetchCallback = fetchWrapper(fetchChannel)
        fire.database().ref('/properties').on('value', fetchCallback, err => console.log(err))

        while (true) {
          const action = yield take(fetchChannel)
          yield put(action)
        }
      }

      yield call(fetchChange)
    },

    * fetchProperties (action) {
      const { setProperties } = this.actions
      const { properties } = action.payload

      var data = properties.sort((a, b) => b.Id - a.Id)
      yield put(setProperties(data))
    },

    * fetchSearch (action) {
      const { setSearchText } = this.actions
      const { searchText } = action.payload

      yield delay(100) // debounce for 100ms

      put(setSearchText(searchText))
    },

    * fireEdit (action) {
      const { selectProperty } = this.actions
      const { property } = action.payload

      yield fire.database().ref(`/properties/${property.Id}`).update(property, err => console.log(err))
      yield put(selectProperty(property))
    },

    * fireUploadImage (action) {
      const { setUploadedImageUrl } = this.actions
      const { image } = action.payload

      var ref = fire.storage().ref().child(`images/${new Date().valueOf()}_${image.name}`)

      var snapshot = yield ref.put(image)
      yield put(setUploadedImageUrl(snapshot.metadata.downloadURLs[0]))
    }
  }
})
