# Instructions

### Running the process

It is recommended to `docker` to have a better experience while running the project

```bash
docker-compose up -d
```

To access the service is recommended to not have any things running on the port :80

```bash
kill -9 $(lsof -i :80 | awk '{if (NR!=1) {pids[$2] += 1; total += 1; }} END {for (pid in pids) { print  pid; }  }' | sort -n;)
```

The cypress test is in the cypress container

```bash
docker-compose up cypress
```

To run the unit tests locally

```bash
yarn install
yarn build
yarn run test:unit --coverage
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) all recommended extensions are in `./.vscode/extensions.json`.

## Accessing the project

I used TRAEFIK as reverse proxy so it can get a prettier URL while working
[http://raidiam.localhost/](http://raidiam.localhost/)
If you want to check the TRAEFIK you can access via
[http://traefik.localhost:8080](http://traefik.localhost:8080/dashboard/#/)

## My food for thoughts :)

As it was a while that I didn't have contact with Vue, I got this opportunity to take it back and get a little bit into it, so the choosen version was Vue3 with TS, TailwindCSS as style framework, Cypress to (e2e test), ViTest to unit tests, Vue-Chart and Ag-Grid-Vue to data grid.

All components are agnostic in the sense that it does not have many business logic inside it, the one that has the business logic it the view, for this challenge I used simplest as possible in the main time.

Inside the store we have the participant store, to have better reaction with the hooks inside the view.

Some components are a little bit different from the others, to show more about the life-cycle

One nice thing it was the VGraph component whitch everytime that the component unmount we need to clear the `chartData` and we need to mount each time that will be on the screen, it's a issue with the `vue-chartjs` but it was simple to work with it using the component life-cycle.

In sake of simplicity got the vanilla JS to manipulate the `VTabOption` component to format with the right class in some situations.

At last but not least the test are splited in my own convension block, I feel more confortable reading in this way

```javascript
SETUP;

EXECUTION;

ASSERTION;
```
