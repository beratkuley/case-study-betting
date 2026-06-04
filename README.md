# Football Betting App
 
Football betting interface where users can browse listed matches, add odds to a basket, and place multi-selection bets.


## Getting Started
 
```bash
npm install
npm start
```

## Tech Stack

**React** - (Webpack) UI framework and build toolchain
**react-window** - Virtualizes the match list — only the visible rows are mounted in the DOM at any given time, keeping scroll performance smooth
**styled-components** Component-scoped CSS-in-JS styling 
**whatwg-fetch** Polyfills the Fetch API for legacy browsers that lack native support
**core-js** Polyfills modern JavaScript built-ins for older browser environments

## How It Works
 
### Data loading
 
When the Dashboard component mounts, it fires a request to fetch all available betting odds. The response is normalized into a dictionary and grouped by date for display.
 
### Virtualized list
 
Rendering hundreds of match rows at once would be expensive. Instead, react-window keeps only 40 rows in the DOM at any time. As the user scrolls, rows that leave the viewport are unmounted and new ones are inserted so that resulting in a consistently smooth experience regardless of how many fixtures are loaded.
 
### Basket
 
The basket is a simple add/remove structure. Clicking an odds cell adds that selection; clicking it again (or using the remove control inside the basket) removes it. Once 4 selections are in the basket, the user can submit the bet via the play button.

### Notes
Due to limited time and a late review of the requirements, MBS (minimum bet selection) validation was not implemented. Instead, the play button is enabled when 4 selections are made.