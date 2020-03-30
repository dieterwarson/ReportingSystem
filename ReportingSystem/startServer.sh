#!/bin/bash

chmod +x /srv/psopv-2020-groep1/ReportingSystem/startExpress.sh
chmod +x /srv/psopv-2020-groep1/ReportingSystem/startVue.sh


set -m

echo "start Express"
./startExpress.sh &

echo "start Vue"
./startVue.sh
