const constants = {
  pageSize: 16,
  appUrl: 'https://cdc-catalog.cfapps.eu10.hana.ondemand.com',
  slackUrl: 'https://sap-cx.slack.com/archives/C01CG87K9B8',
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
    productsLabel: 'Customer Data Products',
    referenceLabel: 'Customer authorised to use this implementation as a reference?',
    otherCXProducts: 'Other SAP CX Solutions',
    selectedKeywords: 'Selected keywords'
  },
  fields: {
    id: 'Id',
    implementationPartner: 'ImplementationPartner',
    kickOffDate: 'KickOffDate',
    goLiveDate: 'GoLiveDate',
    customer: 'Customer',
    category: 'Category',
    country: 'Country',
    platform: 'Platform',
    region: 'Region',
    useIdentity: 'UseIdentity',
    useConsent: 'UseConsent',
    useProfile: 'UseProfile',
    useB2B: 'UseB2B',
    useCDP: 'UseCDP',
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
    identityProduct: 'CIAM for B2C',
    b2bProduct: 'CIAM for B2B',
    consentProduct: 'ECPM (Consent)',
    cdpProduct: 'CDP',
    profileProduct: 'Customer Profile',
    marketingProduct: 'CX Marketing',
    commerceProduct: 'CX Commerce',
    salesProduct: 'CX Sales',
    servicesProduct: 'CX Services',
    cdcProducts: 'CDC Products',
    implementationPartner: 'Implementation Partner'
  },
  friendlyFilters: {
    identityProduct: 'CIAM for B2C: Yes',
    b2bProduct: 'CIAM for B2B: Yes',
    cdpProduct: 'CDP: Yes',
    consentProduct: 'ECPM (Consent): Yes',
    profileProduct: 'Customer Profile: Yes',
    identityProductNOT: 'CIAM for B2C: No',
    b2bProductNOT: 'CIAM for B2B: No',
    cdpProductNOT: 'CDP: No',
    consentProductNOT: 'ECPM (Consent): No',
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
    identity: 'CIAM (no Consent)',
    consent: 'Consent (no CIAM)',
    all: 'CIAM and Consent',
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
