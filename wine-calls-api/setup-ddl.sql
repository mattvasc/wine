-- PARTE I
CREATE SCHEMA IF NOT EXISTS `wine_ticket` ;



CREATE USER IF NOT EXISTS 'wine_dbadmin'@'%' IDENTIFIED BY 'wine_DS35uqgTFa';

GRANT ALL PRIVILEGES ON `wine_ticket` . * TO 'wine_dbadmin'@'%';

FLUSH PRIVILEGES;