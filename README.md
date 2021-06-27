# screeps-grafana

Pretty graphs for Screeps stats. 
![sampleDashboard](sampleDashboard.png)

## Installation
You can run this project locally, with all the drawbacks that entails.

Install [Docker Desktop](https://docs.docker.com/desktop/#download-and-install)

Copy and edit the example config file:

```
cp .example.env .env
$EDITOR .env
```

Run the setup:

```
./setup.sh
```

Go to http://localhost:3000 in your browser, then see Usage below.

## Usage

Go to http://localhost:3000 or your own real-life server's IP. Login with the following default credentials:

```
username: admin
password: admin
```
You are now ready to [create some dashboards](https://www.youtube.com/watch?v=OUvJamHeMpw).

To use the Sample Dashboard, copy the contents of [src/stats.js](src/stats.js)
A sample dashboard is already installed that displays the stats from [src/stats.js](src/stats.js)


To send stats to the dashboard, simply write them to `Memory.stats`. For example:

```
Memory.stats["room." + room.name + ".energyAvailable"] = room.energyAvailable;
Memory.stats["room." + room.name + ".energyCapacityAvailable"] = room.energyCapacityAvailable;
Memory.stats["room." + room.name + ".controllerProgress"] = room.controller.progress;
```
All values on the `Memory.stats` object are forwarded to Grafana verbatim.

## Adding Grafana plugins
Just run 
`docker-compose exec grafana grafana-cli plugins install grafana-clock-panel`
to install the plugins, then 
`docker-compose restart grafana`
to apply. Refresh your browser and voila!

## Development
To make changes to the stats fetching script ([src/main.js](src/main.js)) you can either:

- A: Edit [src/main.ts](src/main.ts) and execute `npm run build` (make sure to run `npm i` first to download dependencies).
- B: Edit [src/main.js](src/main.js) directly.

After either method A or B you have to and execute the following command to restart the container:
```
docker-compose down && docker-compose build node && docker-compose up -d
```
The stats data and grafana config are stored in persistent volumes so will be preserved after you restart the container.

## License

This software is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.
