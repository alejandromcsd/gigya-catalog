This project serves as a portfolio. Originally intended as a catalog of websites/apps, but can also be adapted to other types of portfolio. Built on React 16.2, Material UI 0.19.4. [Kea](https://kea.js.org/) for state management. The project features:

## Features

- Grid view with material ui card items preview
- Autocomplete search on multiple fields
- Item details dialog
- Edit form with rich editor (markdown)
- Reporting view
- Integrates with Gigya for registration/social login
- Integrates with Google Firebase database
- Integrates with SparkPost for sending emails (Node JS)
- Integrates with Slack notifications API (Node JS)

Note: JWT Authentication w/ Firebase, and integration with SpartPost/Slack APIs is done via simple Node JS, not part of this repo.

## Screenshots

Grid view:
![Catalog Preview 1](https://alejandro.gigya-cs.com/images/catalog1.png)

Auto complete filter:
![Catalog Preview 2](https://alejandro.gigya-cs.com/images/catalog2.png)

Item preview:
![Catalog Preview 3](https://alejandro.gigya-cs.com/images/catalog3.png)

Item edition:
![Catalog Preview 4](https://alejandro.gigya-cs.com/images/catalog4.png)

## Deployment

```
cf target -s ap-sandbox -o emea-coe-aws
npm run build
cf push
```