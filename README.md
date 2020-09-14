# AssetsApp

**Author** _Markandey Pathak_

A simple single page application to display assets using data table.

*Sample data set is given below*

```
[
  {
    "ticker": "ALPHA",
    "price": 3150.67,
    "assetClass": "Credit"
  },
  {
    "ticker": "BETA",
    "price": 3791.37,
    "assetClass": "Equities"
  },
  {
    "ticker": "GAMMA",
    "price": 2299.1,
    "assetClass": "Equities"
  }
]
```

The data table is by default **grouped by _Asset Class_** and **sorted alphabetically by _Asset Name (Ticker)_**. Clicking headers in data table will sort the data based on the column clicked. The arrow next to column header represents the sort order.

## Demo

See demo of this application [here](https://asset-app.glitch.me/) 

## Clone the repository

`git clone https://github.com/markandeyp/assets-app-angular.git`

## Running the application

Open _terminal_ and navigate to the _cloned repository_ and run below command

`npm start`

Open [here](http://localhost:4200) to open the application in browser.

## Running the test cases

Open _terminal_ and navigate to the _cloned repository_ and run below command

`npm test`
