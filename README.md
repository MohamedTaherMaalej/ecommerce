# Préparation d'environnement
## React

* Install dependencies and start
```
npm install
npm start
```
#### Base de données


* Installer MySQLinstaller
```
Installer sqlserver
MySQL Workbench
```
## Dans MySQLWorkbench
* Créer une base de données
```
create database ecommerce;
use ecommerce;
```
## Spring Boot
* Modifier le fichier application.properties
```
disk.upload.basepath=<choisir l'emplacement>
spring.datasource.url=jdbc:mysql://localhost:3306/<nom de la bdd>
spring.datasource.username=<nom d'utilisateur>
spring.datasource.password=<mot de passe>

```
