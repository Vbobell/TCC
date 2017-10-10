create table admin(
	id_admin serial NOT NULL primary key,  
    name_admin varchar(30) DEFAULT NULL, 
    registre varchar(10) DEFAULT NULL,
    user_level smallint DEFAULT NULL,
    password varchar(30) DEFAULT 123456
);


