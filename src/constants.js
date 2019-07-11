const constants = {
  pageSize: 16,
  appUrl: 'https://cdc-catalog.cfapps.eu10.hana.ondemand.com',
  skipAttributes: [
    'Id',
    'ImageUrl',
    'Keywords',
    'KickOffDate',
    'GoLiveDate',
    'Description',
    'TechnicalDescription',
    'Url',
    'TDDUrl',
    'APIKey',
    'CustomFlows',
    'CMS',
    'ServerSession',
    'CentralizedLoginSSO',
    'FrontEndLibraries',
    'OverridingNativeBrowser',
    'UseAsReference',
    'Created',
    'LastModified',
    'CreatedBy',
    'CreatedByEmail',
    'LastModifiedBy',
    'LastModifiedByEmail',
    'AM',
    'IC',
    'TC',
    'TA'
  ],
  labels: {
    tddLabel: 'TDD Url',
    apiKeyLabel: 'API Key',
    customFlowsLabel: 'Custom registration/login flows?',
    cmsLabel: 'Is using CMS?',
    serverSessionLabel: 'Has also server session?',
    centralizedLoginLabel: 'Has one login page for all sites in Group?',
    frontEndLabel: 'Front end libraries? (React, Angular, Vue, other)',
    overridingLabel: 'Overriding native browser methods?',
    descriptionLabel: 'Implementation Description',
    technicalDetails: 'Technical Details',
    productsLabel: 'Customer Data Cloud Products',
    referenceLabel: 'Customer authorised to use this implementation as a reference?',
    otherCXProducts: 'Other SAP CX Solutions'
  },
  fields: {
    id: 'Id',
    kickOffDate: 'KickOffDate',
    goLiveDate: 'GoLiveDate',
    customer: 'Customer',
    useIdentity: 'UseIdentity',
    useConsent: 'UseConsent',
    useProfile: 'UseProfile',
    useCXMarketing: 'UseCXMarketing',
    useCXCommerce: 'useCXCommerce',
    useCXSales: 'useCXSales',
    useCXServices: 'useCXServices',
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
    technicalDescription: 'TechnicalDescription',
    implementation: 'Implementation',
    keywords: 'Keywords',
    imageUrl: 'ImageUrl',
    url: 'Url'
  },
  friendlyLabels: {
    identityProduct: 'Customer Identity',
    consentProduct: 'Customer Consent',
    profileProduct: 'Customer Profile',
    marketingProduct: 'CX Marketing',
    commerceProduct: 'CX Commerce',
    salesProduct: 'CX Sales',
    servicesProduct: 'CX Services',
    cdcProducts: 'CDC Products'
  },
  friendlyFilters: {
    identityProduct: 'Customer Identity: Yes',
    consentProduct: 'Customer Consent: Yes',
    profileProduct: 'Customer Profile: Yes',
    identityProductNOT: 'Customer Identity: No',
    consentProductNOT: 'Customer Consent: No',
    marketingProduct: 'CX Marketing: Yes',
    commerceProduct: 'CX Commerce: Yes',
    salesProduct: 'CX Sales: Yes',
    servicesProduct: 'CX Services: Yes',
    crossPillar: 'Cross CX-pillar: Yes'
  },
  periods: {
    thisYear: 'This year',
    lastYear: 'Last year',
    thisQuarter: 'This quarter',
    lastQuarter: 'Last quarter',
    thisMonth: 'This month',
    lastMonth: 'Last month'
  },
  productCombos: {
    identity: 'Identity, Profile',
    consent: 'Consent, Profile',
    all: 'All CDC Products',
    crossPillar: 'Cross CX-pillar'
  },
  goLiveTemplate: `<p><strong>Sample template (Please delete if not in use):</strong></p>
  <p>{CUSTOMER} was looking for the best-in-class solution to provide... Therefore, the company decided to go with SAP Customer Data Cloud and...!</p>
  <p><strong>About {CUSTOMER}</strong></p>
  <p>As a leading XXX provider, {CUSTOMER} is renowned for...</p>
  <p><strong>Customer&rsquo;s Business Challenges</strong></p>
  <p>To support its fast-growing business, {CUSTOMER} was looking for a new solution for...</p>
  <p><strong>Expected Business Value</strong></p>
  <p>With SAP Customer Data Cloud, {CUSTOMER} has introduced a new XXX solution for its...</p>
  <p>Due to the integration into XXX, visitors can easily XXX...</p>
  <p><strong>Go-Live Highlights</strong></p>
  <p>{CUSTOMER} has gone live with a first wave of...</p>
  <p>The initial implementation took only...</p>
  <p>Further international roll-outs are in progress, including key markets like...</p>`
}

export default constants
