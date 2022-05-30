This project (which I've developed end-to-end) allows you organising projects/websites/implementations and displaying on a beautiful web portfolio. Originally intended as a catalog of websites/apps, but can also be adapted to other types of portfolio. Built on React 16.2, Material UI 0.19.4. [Kea](https://kea.js.org/) for state management. The project features:

https://user-images.githubusercontent.com/9474865/170953081-053c126e-6ee1-4193-b06f-3a50d9c84967.mp4

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

## Deployment

```
cf target -s ap-sandbox -o emea-coe-aws
npm run build
cf push
```
