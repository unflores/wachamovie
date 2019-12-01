# Wachamovie

Wachamovie is a webapp that will scan some directory for movie files, store them in a mongo database and allow you to watch them from that app. You can manually rescan when adding new movies to the scan directory.

## To run server

```
  sudo apt-get install mongodb
  git clone <project>

  echo "DEV_DB_URI=<mongodb_uri>" >> .env
  echo "MOVIE_DIR=<movie directory relative to project base>" >> .env

  cd front && yarn run build
  cd ../ && yarn run build && yarn run dev

```
## TODO

* Implement streaming of files
* Test scraping all subdirectories of video paths
