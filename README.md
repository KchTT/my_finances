# MY FINANCE APP

The infrastructure is Dockerized and you can find the docker compose fild in the repository. \
The Mysql database file is in the repository

## Frontend

- **Vite & React**
- **React router V6** for Routing
- **Tailwind** for styling
- **Redux toolkit** to manage some global state
- **Moment** library to manage dates objects
- **Axios** to manage the api connection 
- **Apexcharts** for the charts 
- **Toastify** to some alerts


## Enviroment Variables Files

**/**
>
MYSQL_ROOT_PASSWORD=XXXXXX \
MYSQL_DATABASE=my_finances \
MYSQL_USER=XXX \
MYSQL_PASSWORD=XXXXXX \
MYSQL_LOCAL_PORT=3333 \
MYSQL_DOCKER_PORT=3306 \
API_LOCAL_PORT=7900 \
API_DOCKER_PORT=7820 \
ACCESS_TOKEN_SECRET = XXXXXX \
SECRET_TOKEN = XXXXXX \
SECRET_NUM = XXXXXX \
APP_LOCAL_PORT=2985 \
APP_DOCKER_PORT=7901
>

**/api**
>
STAT="dev" \
HTTP_PORT=7820 \
HTTPS_PORT=2991 \
ACCESS_TOKEN_SECRET = XXXXXX \
REFRESH_TOKEN_SECRET = XXXXXX \
SECRET_TOKEN = XXXXXX \
SECRET_NUM = XXXXXX \
M_HOST = "localhost" \
M_USER = XXXXXX \
M_PASS = XXXXXX \
M_DB= my_finances \
M_PORT=3333 \
M_HOST_DEV = 172.17.0.1 \
M_USER_DEV = XXXXXX \
M_DB_DEV = my_finances \
M_PASS_DEV = XXXXXX \
M_PORT_DEV = 3333
>

**/app_server**
>
VERSION=dev \
HTTP_PORT=2985 \
HTTPS_PORT=2986
>

## MYSQL Note

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); 

## Posible Upgrades

- Refactor app code into custome hooks.
- Services error handling frontend
- More secure passwords
- Validate props types at componentes
- More endpoint tests
- Send user data via SSL
- Filter categories select using operation property on client depending the selection and status property on server
- Add reset password via email
- Alert limits via email 

- [Api Documentation](https://github.com/KchTT/my_finances/tree/main/api/documentation)
- [Screens](https://github.com/KchTT/my_finances/tree/main/screens)