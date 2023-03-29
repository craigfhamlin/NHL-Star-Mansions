/*This code fetches data from the https://api.example.com/hockey-odds API using 
the Fetch API. The response is in JSON format, so we use 
the response.json() method to parse it into a JavaScript object.

Next, we loop through the data using the data.forEach() method and create HTML table 
rows for each game. We use string interpolation to dynamically insert the team names, 
moneyline odds, puck line odds, and total goals odds into the table rows.

Finally, we insert the table rows into the odds table using the 
oddsTable.insertAdjacentHTML() method. We use the beforeend position parameter 
to insert the rows at the end of the table body.

Note that you will need to replace the https://api.example.com/hockey-odds URL 
with a real API URL that provides hockey betting odds data.*/

const oddsTable = document.querySelector("#betting-odds table tbody");

fetch("https://api.example.com/hockey-odds")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the data and add rows to the table
    data.forEach((game) => {
      const row1 = `
          <tr>
              <td>${game.team1}</td>
              <td>${game.moneyline1}</td>
              <td>${game.puckline1}</td>
              <td>${game.total}</td>
          </tr>`;
      const row2 = `
          <tr>
              <td>${game.team2}</td>
              <td>${game.moneyline2}</td>
              <td>${game.puckline2}</td>
              <td>${game.total}</td>
          </tr>`;
      oddsTable.insertAdjacentHTML("beforeend", row1 + row2);
    });
  })
  .catch((error) => console.error(error));
