const constants = {
  appUrl: 'https://cdc-catalog.cfapps.eu10.hana.ondemand.com',
  skipAttributes: [
    'Id',
    'ImageUrl',
    'Keywords',
    'GoLiveDate',
    'Description',
    'Url',
    'TDDUrl',
    'APIKey',
    'CustomFlows',
    'CMS',
    'ServerSession',
    'CentralizedLoginSSO',
    'FrontEndLibraries',
    'OverridingNativeBrowser',
    'useAsReference'
  ],
  labels: {
    tddLabel: 'TDD URL',
    apiKeyLabel: 'API Key',
    customFlowsLabel: 'Custom registration/login flows?',
    cmsLabel: 'Is using CMS?',
    serverSessionLabel: 'Has also server session?',
    centralizedLoginLabel: 'Has one login page for all sites in Group?',
    frontEndLabel: 'Front end libraries? (React, Angular, Vue, other)',
    overridingLabel: 'Overriding native browser methods?',
    descriptionLabel: 'Short description (Executive Summary or Technical Details)',
    productsLabel: 'Customer Data Cloud Products',
    referenceLabel: 'Customer authorised to use this implementation as a reference?'
  },
  fields: {
    id: 'Id',
    goLiveDate: 'GoLiveDate',
    customer: 'Customer',
    useIdentity: 'UseIdentity',
    useConsent: 'UseConsent',
    useProfile: 'UseProfile',
    useAsReference: 'UseAsReference',
    tdd: 'TDDUrl',
    apiKey: 'APIKey',
    customFlows: 'CustomFlows',
    cms: 'CMS',
    serverSession: 'ServerSession',
    centralizedLogin: 'CentralizedLoginSSO',
    frontEnd: 'FrontEndLibraries',
    overriding: 'OverridingNativeBrowser',
    description: 'Description',
    implementation: 'Implementation',
    keywords: 'Keywords',
    imageUrl: 'ImageUrl',
    url: 'Url'
  },
  friendlyLabels: {
    identityProduct: 'SAP Customer Identity',
    consentProduct: 'SAP Customer Consent',
    profileProduct: 'SAP Customer Profile'
  },
  friendlyFilters: {
    identityProduct: 'SAP Customer Identity: Yes',
    consentProduct: 'SAP Customer Consent: Yes',
    profileProduct: 'SAP Customer Profile: Yes'
  }
}

export default constants
