# NRL Live Ladder

NRL Live Ladder is **LIVE** at: [nrlladder.live](https://www.nrlladder.live)

Live ladder is a project developed in `Tailwind` and `Nodejs` to visualise the NRL ladder midgame. Live ladders main use-case is for NRL fanatics and overthinkers to understand how the current result of a game will effect the ladder.

Live ladder provides the additional benefit of being able to sort the ladder by **win count** or **win percentage**, rather than just points. During the midpoint of the season, this is crucial to get a proper understanding of how teams actually compare.

## Key Features

### Historical Mode
To experience the ladder after seasons end, a debug button is present which will transport you to a time in the past since **2003**. From **2013** onwards, halftime data is available and the app will place you at halftime during a random game during the round.

> [!NOTE]
> Pressing the debug button doesn't automatically generate a new set of historical data. The server periodically updates with a new dataset; the frontend will automatically update to reflect it.

![image pointing to the location of the debug button](/assets/image/debug.png)
![gif showing the UI change when switching in and out of debug mode](/assets/gif/history.gif)

### Light/Dark Theme
User preferences for light/dark theme are stored in local storage.

![gif showing the UI change colour when switching in and out of dark mode](/assets/gif/dark.gif)

### Ladder Sorting
See which team is _really_ on top by sorting the ladder by either **win count**, **points**, or **win percentage**.

![gif showing the order of ladder rows changing as different columns are selected for sorting](/assets/gif/sorting.gif)

### Mobile Responsive
The app is built to adjust to any screen width, including mobile screens.

![gif showing the UI respond as the width of the screen is manually dragged inwards](/assets/gif/mobile.gif)

## Scraper

Halftime data for past games is not available through the API I used. Instead, a selenium script was created to extract the data off the relevant HTML pages and dump it into a json file.

Because every season is ever-so-slightly different, the script needed to deviate slightly for each season. Some notable checks include:

1. Manually checking the draw page of a season to check what the _last round_ of that season was (used as the end condition of the loop),
2. Reading certain chunks of the HTML page in _reverse_ because the number of divs with the same id as the halftime-score div was variable, but the halftime div was _always last_,
3. Manually inserting halftime data for 4 games where `nrl.com` does not have match data entered