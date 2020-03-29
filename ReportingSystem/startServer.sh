#!/bin/bash

cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemExpress &&
npm run start:dev &
cd ../..
cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemVue &&
npm run serve &
