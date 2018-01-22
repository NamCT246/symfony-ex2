# symfony-ex2

* Requirements:
  Mysql, Mysql server, yarn/npm
  
* **Install dependencies** 
```PHP 
composer install
```
&
```yarn
yarn install 
```

* **Build assets**
```yarn
yarn run encore dev
```

* **Setup Mysql**
Create the mysqldb named ex2, password **ruderoot**

* **Setup database**
```Doctrine
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```
* **Run server** 
```PHP
php -S localhost:8000 -t public
```
