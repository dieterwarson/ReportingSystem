# psopv-2020-groep1

### Start the project with docker:
`docker build . -t group1/psopv:latest`
`docker run -d -p 8080:3000 --name rs group1/psopv:latest`

### Start for developement:
`docker build -t group1/psopvdev:latest -f DockerfileDev .`
`docker run -d -p 8080:3000 -v /LOCAL_DIRECTORY/psopv-2020-groep1:/psopv-2020-groep1 --name rsdev group1/psopvdev:latest`

