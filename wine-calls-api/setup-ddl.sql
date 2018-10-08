
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema wine_chamados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wine_chamados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wine_chamados` DEFAULT CHARACTER SET utf8 ;
USE `wine_chamados` ;

-- -----------------------------------------------------
-- Table `wine_chamados`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wine_chamados`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wine_chamados`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wine_chamados`.`company` (
  `cnpj` VARCHAR(14) NOT NULL,
  `name` VARCHAR(64) NULL,
  `address` VARCHAR(128) NULL,
  `site` VARCHAR(64) NULL,
  `email` VARCHAR(128) NULL,
  `phone` VARCHAR(128) NULL,
  PRIMARY KEY (`cnpj`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wine_chamados`.`technician`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wine_chamados`.`technician` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE USER IF NOT EXISTS 'wine_dbadmin'@'%' IDENTIFIED BY 'wine_DS35uqgTFa';

GRANT ALL PRIVILEGES ON `wine` . * TO 'wine_dbadmin'@'%';

FLUSH PRIVILEGES;
