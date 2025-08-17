set -e # Exit early if any command fails
exec node src/app.js "$@"
# This script is used to run the Node.js application for the pack-rat project.
# It sets the script to exit immediately if any command fails and then executes the main application file
# with any arguments passed to this script.
# Ensure that the Node.js environment is properly set up before running this script.
# The script assumes that the main application file is located at src/app.js.
# Usage: ./run.sh [arguments]
# This will start the application with the specified port.  