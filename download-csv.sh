#!/bin/bash

mkdir -p data

# Download the CSV files and save them with a new name
# Fisrt three files contain information about journeys and last one
# contains information about stations
wget -O data/2021-05.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
wget -O data/2021-06.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
wget -O data/2021-07.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

wget -O data/stations.csv https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv


echo "Files downloaded and saved to data directory."
