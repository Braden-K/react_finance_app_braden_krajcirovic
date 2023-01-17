Stock Tracker Web App - visit site at https://stock-tracker-braden-krajcirovic.netlify.app/

This app is created with React JS and makes use of various React libraries and self-made components. Firebase is used for authenication and firebase firestore is used to allow each user to have their own watchlist of stocks. The Alpha Vantage API is used for the daily stock data that displays on a user's watchlist. For each stock on the watchlist, clicking on the ticker symbol takes the user to a stock info page that displays additional metrics and a stock graph, created using chartJS. The app also allows or users to delete stocks from their watchlist, and ensures that a valid, non-duplicate ticker symbol is typed in. 

Stock tracker makes use of various React hooks such as useContext, useLocation, and useState, as well as common JS functions such as map and filter. It also makes frequent use of the fetch function to access API data. 

Much of the styling is done using Bootstrap 5.

https://stock-tracker-braden-krajcirovic.netlify.app/
