#!/bin/bash
#!/bin/bash

set -m

echo "start Express"
./startExpress.sh &

echo "start Vue"
./startVue.sh
