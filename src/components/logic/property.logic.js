import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call, take } from 'redux-saga/effects'
import { delay, channel } from 'redux-saga'
import fire from '../../fire'
import constants from '../../constants'
import { sendNotification } from '../../gigya'
import { includesNonCase, removeCategory, removeCategoryValue, reduceToList, toOneLine, isMatchGoLiveDate } from '../../utils'

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
    submitPropertyEdit: (property, isUpdate) => ({ property, isUpdate }),
    toggleDialog: () => ({}),
    selectProperty: (property) => ({ property }),
    uploadImage: (image) => ({ image }),
    setUploadedImageUrl: (imageUrl) => ({ imageUrl }),
    showMoreItems: () => ({}),
    showAll: (resultsCount) => ({ resultsCount }),
    setSortBy: (sortField) => ({ sortField }),
    toggleFullScreen: () => ({}),
    changeTab: (activeTab, resultsCount) => ({ activeTab, resultsCount })
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
    }],
    scrollCount: [constants.pageSize, PropTypes.number, {
      [actions.showMoreItems]: (state) => state + 20,
      [actions.showAll]: (_, payload) => payload.resultsCount + 1,
      [actions.fetchProperties]: () => constants.pageSize,
      [actions.addFilter]: () => constants.pageSize,
      [actions.removeFilter]: () => constants.pageSize,
      [actions.changeTab]: (_, payload) => payload.activeTab === 'report' ? payload.resultsCount + 1 : constants.pageSize
    }],
    sortBy: [constants.fields.id, PropTypes.string, {
      [actions.setSortBy]: (_, payload) => payload.sortField
    }],
    fullScreen: [false, PropTypes.bool, {
      [actions.toggleFullScreen]: (state) => !state
    }],
    activeTab: ['grid', PropTypes.string, {
      [actions.changeTab]: (_, payload) => payload.activeTab
    }]
  }),

  selectors: ({ selectors }) => ({
    searchResults: [
      () => [selectors.properties, selectors.filters, selectors.sortBy],
      (properties, filters, sortBy) => !filters ? properties : properties
        .filter(propertyItem => filters.every(filter => {
          // friendly keys replacement (i.e. from Product Name: Yes to use useConsent: true)
          const unfriendlyKeys = (rawKey) => ({
            [constants.friendlyFilters.identityProduct]: `${constants.fields.useIdentity}: true`,
            [constants.friendlyFilters.consentProduct]: `${constants.fields.useConsent}: true`,
            [constants.friendlyFilters.identityProductNOT]: `${constants.fields.useIdentity}: false`,
            [constants.friendlyFilters.consentProductNOT]: `${constants.fields.useConsent}: false`,
            [constants.friendlyFilters.profileProduct]: `${constants.fields.useProfile}: true`
          })[rawKey] || rawKey

          filter = unfriendlyKeys(filter)
          const filterCategory = removeCategoryValue(filter)

          // actual filter happens here: look into keywords > field values
          return propertyItem['Keywords'].some(k => k.toLowerCase().includes(removeCategory(filter).toLowerCase())) ||
          (filter.startsWith('Go-Live') && isMatchGoLiveDate(propertyItem[constants.fields.goLiveDate], filter)) ||
            Object.keys(propertyItem).some((key) =>
              !constants.skipAttributes.includes(key) &&
              key === filterCategory &&
              includesNonCase(propertyItem[key], removeCategory(filter)))
        }))
        .sort((a, b) => {
          switch (sortBy) {
            case constants.fields.id:
              return b[sortBy] - a[sortBy]
            case constants.fields.goLiveDate:
              return new Date(b[sortBy]) - new Date(a[sortBy])
            case constants.fields.customer:
              const titleA = a[sortBy].toLowerCase()
              const titleB = b[sortBy].toLowerCase()
              if (titleA < titleB) return -1
              if (titleA > titleB) return 1
              return 0
          }
        }),
      PropTypes.array
    ],
    keywords: [
      () => [selectors.properties],
      (properties) => properties.reduce((keysArray, item) => {
        // on each property, push all simple attributes and keywords
        Object.keys(item).map((key) => {
          // friendly keys replacement (i.e. from use useConsent: true to Product Name: Yes)
          const friendlyKeys = (rawKey) => ({
            [constants.fields.useIdentity]: constants.friendlyLabels.identityProduct,
            [constants.fields.useConsent]: constants.friendlyLabels.consentProduct,
            [constants.fields.useProfile]: constants.friendlyLabels.profileProduct
          })[rawKey] || rawKey

          const keyVal = `${friendlyKeys(key)}: ${item[key] === true ? 'Yes' : item[key]}`
          return !constants.skipAttributes.includes(key) &&
            !keysArray.includes(keyVal) &&
            item[key]
            ? keysArray.push(keyVal) : null
        })

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
    taList: [
      () => [selectors.properties], (p) => reduceToList(p, 'TA'), PropTypes.array
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
          [...keywords, ...item['Keywords'].filter(k => !keywords.includes(k))], []).sort(), PropTypes.array
    ]
  }),

  start: function * () { },

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
      yield fire.auth().signInWithCustomToken(user.FirebaseToken).catch((error) => {
        console.log(`${new Date().toTimeString()} - Error calling Firebase signInWithCustomToken`)
        console.log(error)
      })
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
        fire.database().ref('/properties').on('value', fetchCallback, (err) => {
          console.log(`${new Date().toTimeString()} - Error fetching Firebase records`)
          console.log(err)
        })

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
      const { property, isUpdate } = action.payload

      yield fire.database().ref(`/properties/${property.Id}`).update(property, err => console.log(err))

      // Send notification via API
      if (property && !isUpdate) {
        const msg = {
          text: [
            {
              fallback: `Implementation: ${property[constants.fields.implementation]}`,
              color: '#36a64f',
              pretext: 'An implementation has been added to the catalog:',
              author_name: property[constants.fields.implementation],
              title: property[constants.fields.customer],
              title_link: `${constants.appUrl}/${property[constants.fields.id]}/`,
              fields: [
                {
                  title: 'Keywords',
                  value: property[constants.fields.keywords].join(', '),
                  short: false
                }
              ],
              image_url: property[constants.fields.imageUrl],
              footer: 'Customer Data Cloud Catalog',
              footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
              ts: Math.round(+new Date() / 1000),
              actions: [
                {
                  type: 'button',
                  text: 'View in Catalog :open_file_folder:',
                  url: `${constants.appUrl}/${property[constants.fields.id]}/`
                },
                ...(property[constants.fields.url] ? [{
                  type: 'button',
                  text: 'View implementation :earth_americas:',
                  url: property[constants.fields.url]
                }] : [])
              ],
              ...(property[constants.fields.description] && { text: toOneLine(property[constants.fields.description]) })
            }
          ]
        }
        sendNotification(msg)
      }

      yield put(selectProperty(property))
    },

    * fireUploadImage (action) {
      const { setUploadedImageUrl } = this.actions
      const { image } = action.payload

      var ref = fire.storage().ref().child(`images/${new Date().valueOf()}_${image.name}`)
      var snapshot = yield ref.put(image)
      var docUrl = yield snapshot.ref.getDownloadURL()

      yield put(setUploadedImageUrl(docUrl))
    }
  }
})
