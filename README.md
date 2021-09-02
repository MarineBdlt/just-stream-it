### General Information

Project 6 of the OpenClassrooms python application developer course. The objectives of this project are the development of the Front-End part of an application with HTML, CSS and JavaScript and interaction with a REST API. The site created lists top rated movies to watch under different categories and has a user experience close to the netflix interface.

## Installation

Create a folder, go to the file with your terminal and download the project with the following command : `$ git clone https://github.com/MarineBdlt/Projet6--OP.git`

This locally-executable API can be installed and executed from [http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/) using the following steps.

### Option 1: Installation and execution with pipenv

For this method, it is necessary to have pipenv already installed on your python installation. If pipenv is not already installed on your computer, refer to [this page](docs/pipenv/installation-en.md).

1. Clone this repository using `$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` (you can also download the code using [as a zip file](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Install project dependencies with `pipenv install` 
4. Create and populate project database with `pipenv run python manage.py create_db`
5. Run the server with `pipenv run python manage.py runserver`

When the server is running after step 5 of the procedure, the OCMovies API can
be requested from endpoints starting with the following base URL: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/titles/).

Steps 1-4 are only required for initial installation. For subsequent launches
of the API, you only have to execute step 5 from the root folder of the project.

### Option 2: Installation and execution without pipenv (using venv and pip)

1. Clone this repository using `$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` (you can also download the code using [as a zip file](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Create a virtual environment for the project with `$ py -m venv env` on windows or `$ python3 -m venv env` on macos or linux.cd ./
4. Activate the virtual environment with `$ env\Scripts\activate` on windows or `$ source env/bin/activate` on macos or linux.
5. Install project dependencies with `$ pip install -r requirements.txt`
6. Create and populate the project database with `$ python manage.py create_db`
7. Run the server with `$ python manage.py runserver`

When the server is running after step 7 of the procedure, the OCMovies API can be requested from endpoints starting with the following base URL: http://localhost:8000/api/v1/titles/.

Steps 1-3 and 5-6 are only required for initial installation. For subsequent launches of the API, you only have to execute steps 4 and 7 from the root folder of the project.

### Startup
Open the index.html file to experience the application.

### Made with
Sublime Text

### Author
@MarineBdlt
