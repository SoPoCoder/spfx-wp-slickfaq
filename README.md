# Slick FAQ

## Summary

- Adds a collapsible accordion widget ideal for displaying FAQs to a SharePoint page or Teams Tab.
- Generates an accordion with one section for each item in the list.
- Webpart saves questions/answers in an array stored on the host page.
- Title and FAQ array items are stored as strings on the page for search indexing.
- Uses React Accordion and React Sortable HOC for drag and drop sorting of FAQs.
- Allow Zero Expand and Allow Multiple Expanded options available.

## Usage

1. Add the `spfx-wp-slickfaq.sppkg` to your SharePoint App Catalog and enable it on any sites you wish to add it to.
2. Edit a SharePoint page and select the new Slick FAQ webpart.
3. Configure the webpart, add FAQs and publish the page.

## Used SharePoint Framework Version

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![version](https://img.shields.io/badge/version-1.22.0-green.svg)
![Node.js v22.14.0](https://img.shields.io/badge/Node.js-v22.14.0-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Minimal Path to Awesome

- Clone or download this repository
- Run in command line:
  - `npm install` to install the npm dependencies
  - `gulp serve` to display in Developer Workbench (recommend using your tenant workbench so you can test on your site)
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---