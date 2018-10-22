-- ---------------------------------------------------------------------------
-- | ATENCAO, RODAR O SCRIPT DO JEITO QUE ELE TA.                                |
-- | ELE NAO TA 100% comentado, ta apenas com uns backups de informações.        |
-- ----------------------------------------------------------------------------


--            A            A              A             A              A
--            |            |              |             |              |
--            |            |              |             |              |
--            |            |              |             |              |
--            |            |              |             |              |
--            |            |              |             |              |


-- MySQL Workbench Forward Engineering
--
--SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
--SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
--SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
--
---- -----------------------------------------------------
---- Schema wine_ticket
---- -----------------------------------------------------
--DROP SCHEMA IF EXISTS `wine_ticket` ;
--
---- -----------------------------------------------------
---- Schema wine_ticket
---- -----------------------------------------------------
--CREATE SCHEMA IF NOT EXISTS `wine_ticket` ;
--SHOW WARNINGS;
---- -----------------------------------------------------
---- Schema wine_ticket
---- -----------------------------------------------------
--DROP SCHEMA IF EXISTS `wine_ticket` ;
--
---- -----------------------------------------------------
---- Schema wine_ticket
---- -----------------------------------------------------
--CREATE SCHEMA IF NOT EXISTS `wine_ticket` ;
--SHOW WARNINGS;
--USE `wine_ticket` ;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`estado`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`estado` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `nome` VARCHAR(45) NOT NULL,
--  `uf` CHAR(2) NOT NULL,
--  PRIMARY KEY (`id`))
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`cidade`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`cidade` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `nome` VARCHAR(128) NOT NULL,
--  `estado_id` INT NULL,
--  PRIMARY KEY (`id`),
--  INDEX `fk_cidade_1_idx` (`estado_id` ASC) ,
--  CONSTRAINT `fk_cidade_1`
--    FOREIGN KEY (`estado_id`)
--    REFERENCES `wine_ticket`.`estado` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE)
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`endereco`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`endereco` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `cep` VARCHAR(12) NULL,
--  `logradouro` VARCHAR(64) NULL,
--  `numero` VARCHAR(16) NULL,
--  `complemento` VARCHAR(128) NULL,
--  `bairro` VARCHAR(64) NULL,
--  `cidade_id` INT NULL,
--  `observacoes` VARCHAR(256) NULL,
--  PRIMARY KEY (`id`),
--  INDEX `fk_endereco_1_idx` (`cidade_id` ASC) ,
--  CONSTRAINT `fk_endereco_1`
--    FOREIGN KEY (`cidade_id`)
--    REFERENCES `wine_ticket`.`cidade` (`id`)
--    ON DELETE NO ACTION
--    ON UPDATE NO ACTION)
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`pagamento`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`pagamento` (
--  `id` INT NOT NULL,
--  `agencia` VARCHAR(32) NULL,
--  `conta` VARCHAR(32) NULL,
--  `banco` VARCHAR(45) NULL,
--  `nome` VARCHAR(64) NULL,
--  `cpfcnpj` VARCHAR(32) NULL,
--  `ispoupanca` TINYINT NULL,
--  `operacao` VARCHAR(16) NULL,
--  PRIMARY KEY (`id`),
--  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`empresa_parceira`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`empresa_parceira` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `cnpj` VARCHAR(45) NULL,
--  `nome_fantasia` VARCHAR(45) NULL,
--  `razao_social` VARCHAR(45) NULL,
--  `nome_para_contato` VARCHAR(45) NULL,
--  `telefones` VARCHAR(45) NULL,
--  `email` VARCHAR(45) NULL,
--  `endereco_id` INT NULL,
--  `pagamento_id` INT NULL,
--  `ativa` INT NOT NULL DEFAULT 1,
--  `observacoes` VARCHAR(256) NULL,
--  PRIMARY KEY (`id`),
--  INDEX `fk_empresa_do_tecnico_2_idx` (`pagamento_id` ASC) ,
--  INDEX `fk_empresa_parceira_1_idx` (`endereco_id` ASC) ,
--  CONSTRAINT `fk_empresa_parceira_1`
--    FOREIGN KEY (`endereco_id`)
--    REFERENCES `wine_ticket`.`endereco` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_empresa_parceira_2`
--    FOREIGN KEY (`pagamento_id`)
--    REFERENCES `wine_ticket`.`pagamento` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE)
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`funcionario_wine`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`funcionario_wine` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `nome` VARCHAR(45) NULL,
--  `email` VARCHAR(45) NULL,
--  `senha` VARCHAR(45) NULL,
--  PRIMARY KEY (`id`))
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`log`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`log` (
--  `id` INT NOT NULL AUTO_INCREMENT,
--  `operacao_id` INT NULL,
--  `operacao` VARCHAR(128) NULL,
--  `quem` VARCHAR(45) NULL,
--  `quando` DATETIME NULL,
--  `onde` VARCHAR(256) NULL,
--  PRIMARY KEY (`id`))
--ENGINE = InnoDB;
--
--SHOW WARNINGS;
--USE `wine_ticket` ;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`cliente`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`cliente` (
--  `id` INT(11) NOT NULL AUTO_INCREMENT,
--  `nome_fantasia` VARCHAR(64) NOT NULL,
--  `razao_social` VARCHAR(128) NULL DEFAULT NULL,
--  `cpfcnpj` VARCHAR(45) NULL,
--  `nome_para_contato` VARCHAR(45) NULL,
--  `inscricao_estadual` VARCHAR(45) NULL,
--  `inscricao_municipal` VARCHAR(45) NULL,
--  `telefones` VARCHAR(45) NULL,
--  `email` VARCHAR(45) NULL,
--  `nome_comprador` VARCHAR(45) NULL,
--  `email_comprador` VARCHAR(45) NULL,
--  `data_de_fundacao` VARCHAR(45) NULL,
--  `capital_social_atual` VARCHAR(45) NULL,
--  `registro_na_junta` VARCHAR(45) NULL,
--  `controle_acionario` VARCHAR(45) NULL,
--  `numero_de_empregados` VARCHAR(45) NULL,
--  `ramo_de_atividade` VARCHAR(45) NULL,
--  `informacoes_pagamento` VARCHAR(45) NULL,
--  `situacao` VARCHAR(45) NULL,
--  `endereco_id` INT NULL,
--  `observacoes` VARCHAR(45) NULL,
--  PRIMARY KEY (`id`),
--  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
--  INDEX `fk_client_1_idx` (`endereco_id` ASC) ,
--  CONSTRAINT `fk_client_1`
--    FOREIGN KEY (`endereco_id`)
--    REFERENCES `wine_ticket`.`endereco` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE)
--ENGINE = InnoDB
--AUTO_INCREMENT = 6
--DEFAULT CHARACTER SET = utf8;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`tecnico`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`tecnico` (
--  `id` INT(11) NOT NULL AUTO_INCREMENT,
--  `nome para contato` VARCHAR(45) NULL DEFAULT NULL,
--  `email` VARCHAR(64) NULL DEFAULT NULL,
--  `telefones` VARCHAR(256) NULL,
--  `cpf` VARCHAR(11) NULL,
--  `valor_visita_tecnica` VARCHAR(45) NULL,
--  `valor_km` VARCHAR(45) NULL,
--  `endereco_id` INT NULL,
--  `pagamento_id` INT NULL,
--  `empresa_do_tecnico_id` INT NULL,
--  `ativo` INT NULL,
--  `observacoes` VARCHAR(45) CHARACTER SET 'armscii8' NULL,
--  PRIMARY KEY (`id`),
--  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
--  INDEX `fk_tecnico_1_idx` (`endereco_id` ASC) ,
--  INDEX `fk_tecnico_2_idx` (`pagamento_id` ASC) ,
--  INDEX `fk_tecnico_3_idx` (`empresa_do_tecnico_id` ASC) ,
--  CONSTRAINT `fk_tecnico_1`
--    FOREIGN KEY (`endereco_id`)
--    REFERENCES `wine_ticket`.`endereco` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_tecnico_2`
--    FOREIGN KEY (`pagamento_id`)
--    REFERENCES `wine_ticket`.`pagamento` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_tecnico_3`
--    FOREIGN KEY (`empresa_do_tecnico_id`)
--    REFERENCES `wine_ticket`.`empresa_parceira` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE)
--ENGINE = InnoDB
--AUTO_INCREMENT = 3
--DEFAULT CHARACTER SET = utf8;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`ticket_status`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`ticket_status` (
--  `id` INT(11) NOT NULL AUTO_INCREMENT,
--  `status` VARCHAR(45) NOT NULL,
--  `description` VARCHAR(128) NULL DEFAULT NULL,
--  PRIMARY KEY (`id`),
--  UNIQUE INDEX `ticket_status_id_UNIQUE` (`id` ASC) )
--ENGINE = InnoDB
--AUTO_INCREMENT = 5
--DEFAULT CHARACTER SET = utf8;
--
--SHOW WARNINGS;
--
---- -----------------------------------------------------
---- Table `wine_ticket`.`ticket`
---- -----------------------------------------------------
--CREATE TABLE IF NOT EXISTS `wine_ticket`.`ticket` (
--  `ticket_id` INT(10) NOT NULL AUTO_INCREMENT,
--  `cliente_id` INT(11) NULL DEFAULT NULL,
--  `tecnico_id` INT(11) NULL DEFAULT NULL,
--  `ticket_cliente_id` VARCHAR(45) NULL DEFAULT NULL,
--  `data_criacao` DATETIME NULL DEFAULT NULL,
--  `observacoes` VARCHAR(256) NULL DEFAULT NULL,
--  `preco_cliente` FLOAT NULL DEFAULT NULL,
--  `preco_tecnico` FLOAT NULL DEFAULT NULL,
--  `ticket_status_id` INT(11) NULL DEFAULT NULL,
--  `data_agendamento` VARCHAR(45) NULL,
--  `endereco_id` INT NULL,
--  PRIMARY KEY (`ticket_id`),
--  UNIQUE INDEX `call_id_UNIQUE` (`ticket_id` ASC) ,
--  INDEX `fk_ticket_1_idx` (`endereco_id` ASC) ,
--  INDEX `fk_ticket_2_idx` (`cliente_id` ASC) ,
--  INDEX `fk_ticket_3_idx` (`ticket_status_id` ASC) ,
--  INDEX `fk_ticket_4_idx` (`tecnico_id` ASC) ,
--  CONSTRAINT `fk_ticket_1`
--    FOREIGN KEY (`endereco_id`)
--    REFERENCES `wine_ticket`.`endereco` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_ticket_2`
--    FOREIGN KEY (`cliente_id`)
--    REFERENCES `wine_ticket`.`cliente` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_ticket_3`
--    FOREIGN KEY (`ticket_status_id`)
--    REFERENCES `wine_ticket`.`ticket_status` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE,
--  CONSTRAINT `fk_ticket_4`
--    FOREIGN KEY (`tecnico_id`)
--    REFERENCES `wine_ticket`.`tecnico` (`id`)
--    ON DELETE RESTRICT
--    ON UPDATE CASCADE)
--ENGINE = InnoDB
--DEFAULT CHARACTER SET = utf8;
--
--SHOW WARNINGS;
--
--SET SQL_MODE=@OLD_SQL_MODE;
--SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
--SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


CREATE USER IF NOT EXISTS 'wine_dbadmin'@'%' IDENTIFIED BY 'wine_DS35uqgTFa';

GRANT ALL PRIVILEGES ON `wine_ticket` . * TO 'wine_dbadmin'@'%';

FLUSH PRIVILEGES;