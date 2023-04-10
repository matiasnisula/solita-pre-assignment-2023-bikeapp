# Bikeapp
[Pre-assignment](https://github.com/solita/dev-academy-2023-exercise) for Solita Dev Academy Finland 2023.

App for showing data about journeys made with city bikes in Helsinki. Data is read from csv files.
App is made using Node.js, TypeScript and React. Database choice is Postgres.

App is not production ready yet. To run it with Linux, you need to have [npm, node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and docker installed.

##### Running app locally with Linux

1. Clone to your local computer and navigate to app's root
2. Run script to download csv files.
```
./download-csv.sh
```
You may need to give execute permissions with 
```
chmod u+x download-csv.sh
```
Script will download 4 csv files, 3 contains information about journeys and 1 information about stations.
Files are quite large so it will take 1-2 minutes.

3. Inside app's root **and** inside directory *frontend*, run
```
npm install
```
4. Start Postgres Docker image
```
docker compose -f docker-compose.dev.yml up
```
5. On the first run when the csv files are not yet imported to database, backend can be started with (inside app's root)
```
INIT_FROM_CSV=true npm run dev
```
If already imported, run
```
npm run dev
```
Environment variable **PORT=PORT_NUMBER** can be added if you want to switch the default port used (3001).
Csv files contains over 3 million rows, so validating and saving them to database may take a while.

6. Start frontend
```
cd frontend/
npm start
```
Frontend doesn't yet have any tests, but backend unit tests can be run with
```
npm run test
```

### Description

App's purpose is to validate and save journey and station datasets to database and then show information to user.
Database has two tables; journeys and stations.
 Journey and station datapoints have following properties;
```javascript
export type JourneyDataPoint = {
  departure: string; // Date
  return: string; // Date
  departureStationId: number; // references to StationDataPoint.id
  returnStationId: number; // // references to StationDataPoint.id
  coveredDistance: number; // in meters
  duration: number; // in seconds
};

export type StationDataPoint = {
  id: number;
  name: string;
  address: string;
  city: string;
  operator: string;
  capacity: number;
  x: number; // coordinate x
  y: number; // coordinate y
};
```
Data is validated before saving to database.
* Journeys without departure or return date are not imported. Dates must be valid dates.
* Journeys that lasted less than 10 seconds are not imported
* Journeys that covered distances shorter than ten seconds are not imported
* Journeys that departure station id or return station id don't match station id
* Stations with missing id, name or address are not imported

Database has approximately three million rows so pagination is implemented. Page size is 80.
Frontend has three views; journey list view, station list view and single station view.

Journey list view lists all journeys. View shows 80 (page size) rows at once. User can fetch next or previous
page. Each journey shows departure and return station, covered distance (m) and and duration (s).

Station list view lists all the stations. Infinite scrolling is implemented.

Single station view shows station name, station address, total number of journeys starting from the station and
total number of jouneys ending at the station.


### TODO

* Run backend and frontend in Docker (both development and production)
* Integration tests for backend
* E2E tests
* Searching, filtering and ordering in stations and journeys views
* Show station location on map in single station view
* Endpoints to store new journeys or stations



