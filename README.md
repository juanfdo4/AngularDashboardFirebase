## Angular 11 + Dashboard + firebase

Esta version esta realizada bajo el template de CoreUI:
https://github.com/coreui/coreui-free-angular-admin-template

Demo: https://angulardashboardfirebase.web.app/

Puedes aportar o donar en este enlace: https://paypal.me/juanfdo4

## Dashboard
![Alt text](https://github.com/juanfdo4/AngularDashboardFirebase/blob/main/images/dashboard.png?raw=true?raw=true "Title")

## Login
![Alt text](https://github.com/juanfdo4/AngularDashboardFirebase/blob/main/images/login.png?raw=true?raw=true?raw=true "Title")

Modificaciones realizadas:

Se implementa autenticacion con modolo de firebase solo debe modificar el archivo de environment.ts con la informacion que te suministra firebase:

``` bash
export const environment = {
  production: false,
  firebase : {
    apiKey: "**********",
    authDomain: "**************",
    databaseURL: "***********",
    projectId: "**********",
    storageBucket: "***********",
    messagingSenderId: "**************",
    appId: "*****************",
    measurementId: "*************"
  }
};

```

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/juanfdo4/AngularDashboardFirebase.git my-project
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


