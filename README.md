## Angular 11 + Dashnoard + firebase

Esta version esta realizada bajo el template de CoreUI:
https://github.com/coreui/coreui-free-angular-admin-template

Modificaciones realizadas:

Se implementa autenticacion con modolo de firebase solo debe modificar el archivo de environment.ts con la informacion que te suministra firebase:

$ export const environment = {
$   production: false,
$   firebase : {
$     apiKey: "**********",
$     authDomain: "**************",
$     databaseURL: "***********",
$     projectId: "**********",
$     storageBucket: "***********",
$     messagingSenderId: "**************",
$     appId: "*****************",
$     measurementId: "*************"
$   }
$ };


## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/coreui/coreui-free-angular-admin-template.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:4200.
$ ng serve

# build for production with minification
$ ng build
```


