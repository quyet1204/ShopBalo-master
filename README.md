# Project: SHOPBALO

Github Project: [https://github.com/quyet1204/ShopBalo-master]

### BackEnd: Laravel

- Composer : https://getcomposer.org/download/
- Laravel:9
- Php: 8.\*

### FrontEnd: Reactjs

- Node: 16
- Reactjs: 18
- Bookstrap: 5

### Database: MySQL

- Xampp Server : https://www.apachefriends.org/

<h5>Class Diagram</h5>

![img.png](ReadmeFolder/shopbalo.png)

## Setup Project

## 1.Back End

### 1.1 Install packages:

```
composer install
```

### 1.2 Setup .env in Laravel

```
cp .env.example .env
```

#### Edit your .env:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1    // your host name
DB_PORT=3306         // mysql port
DB_DATABASE=bookstore // database name
DB_USERNAME=root      // database username
DB_PASSWORD=   // database password
```

#### Generate key for project:

```
php artisan key:generate
```

### 1.3 Setup Database

```
php artisan migrate
php artisan db:seed
```

### 1.4 Setup Storage

```
php artisan storage:link
```

## 2. Run Project

```
php artisan serve
```

## 2.Front End

### 2.1 Install packages:

```
cd fe_shop_balo
npm install
```

### 2.2 Structure front end configuration:

```
src
|__adapter
|__api
|__asset
|__components
|__css
|__layouts
|__pages
|__redux
|__routers
|__utils
```

### 2.2 Run Project

```
npm start
```

## 3.Database

### 3.1 Setup Database

```
Create database ${name_database}
```

## 4.Features

### 4.1 Admin

```
Admin
|__Dashboard
|__Category
|__Product
|__Promotion
|__Order
|__Staff
|__Customer
|__Review
|__Decentralization
```

### 4.2 Client

```

```

## 5. URL

### 5.1 Front End

- FE Admin: http://localhost:3000/admin/
- FE Client: http://localhost:3000/

### 5.2 Back End API

- BE: http://127.0.0.1:8000/api/

## 6. GUI

### 6.1 Admin

#### Dashboard

#### Manage Product

#### Manage Staff

### To be continued
