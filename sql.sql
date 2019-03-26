{ vratic, vrabel1224 }
{ mysql: Vrabel1224 }

// USER:
CREATE TABLE users (id smallint unsigned not null auto_increment, name varchar(20) not null, password varchar(255) not null, token varchar(255), constraint pk_users primary key (id));
INSERT INTO users (name, password) VALUES ('vratic', '$2y$10$MWx/PGuQnzn63RWU07bsquY6K2t7X4rorlRdFrtTbPU1yiiGXq3lG'); 

// MENU:
CREATE TABLE menu (id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_menu primary key (id));
INSERT INTO menu (name) VALUES ('test menu');

// MENU ITEM:
CREATE TABLE menuItem (
    id smallint unsigned not null auto_increment, 
    name varchar(255) not null, 
    idMenu smallint unsigned not null,
    description varchar(255),
    price int,
    vaha int
    constraint pk_menuitem primary key (id));


INSERT INTO menuItem (name, idMenu, description, price, vaha) VALUES ('test menu Item meal', 1, 'lorem ipsum lorem ipsum, lorem ipsum', 123, 200);

select * from menuItem INNER JOIN menu ON menuItem.idMenu = menu.id WHERE menu.id = 1;