-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.11 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for erp
CREATE DATABASE IF NOT EXISTS `erp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `erp`;

-- Dumping structure for table erp.branch
CREATE TABLE IF NOT EXISTS `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `branchname` varchar(500) NOT NULL,
  `branchaddress` varchar(1000) DEFAULT NULL,
  `phoneno` varchar(255) DEFAULT NULL,
  `faxno` varchar(255) DEFAULT NULL,
  `emailaddress` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_branch_companyid` (`company_id`),
  CONSTRAINT `fk_branch_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.branch: ~1 rows (approximately)
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT IGNORE INTO `branch` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `branchname`, `branchaddress`, `phoneno`, `faxno`, `emailaddress`, `website`, `company_id`) VALUES
	(1, b'1', NULL, '2017-11-15 12:52:11', NULL, '2017-11-16 10:08:36', 'sample branch', NULL, NULL, NULL, NULL, NULL, 1);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;

-- Dumping structure for table erp.chartofaccounts
CREATE TABLE IF NOT EXISTS `chartofaccounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `chart_of_account_name` varchar(255) NOT NULL,
  `chartofaccount_groupid` int(11) NOT NULL,
  `chart_of_account_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chartofaccounts_usersid` (`user_id`),
  KEY `fk_chartofaccounts_branchid` (`branch_id`),
  KEY `fk_chartofaccounts_userroleid` (`userrole_id`),
  KEY `fk_chartofaccounts_companyid` (`company_id`),
  KEY `fk_chartofaccounts_chartofaccountgroupid` (`chartofaccount_groupid`),
  CONSTRAINT `fk_chartofaccounts_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_chartofaccounts_chartofaccountgroupid` FOREIGN KEY (`chartofaccount_groupid`) REFERENCES `chartofaccounts_group` (`id`),
  CONSTRAINT `fk_chartofaccounts_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_chartofaccounts_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_chartofaccounts_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.chartofaccounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `chartofaccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `chartofaccounts` ENABLE KEYS */;

-- Dumping structure for table erp.chartofaccounts_group
CREATE TABLE IF NOT EXISTS `chartofaccounts_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_type_id` int(11) NOT NULL,
  `predef_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chartofaccounts_group_usersid` (`user_id`),
  KEY `fk_chartofaccounts_group_branchid` (`branch_id`),
  KEY `fk_chartofaccounts_group_userroleid` (`userrole_id`),
  KEY `fk_chartofaccounts_group_companyid` (`company_id`),
  KEY `fk_chartofaccounts_group_grouptype` (`group_type_id`),
  CONSTRAINT `fk_chartofaccounts_group_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_chartofaccounts_group_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_chartofaccounts_group_grouptype` FOREIGN KEY (`group_type_id`) REFERENCES `system_constant_values` (`id`),
  CONSTRAINT `fk_chartofaccounts_group_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_chartofaccounts_group_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.chartofaccounts_group: ~0 rows (approximately)
/*!40000 ALTER TABLE `chartofaccounts_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `chartofaccounts_group` ENABLE KEYS */;

-- Dumping structure for table erp.company
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `company` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.company: ~1 rows (approximately)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT IGNORE INTO `company` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `company`) VALUES
	(1, b'1', NULL, '2017-11-16 10:08:29', NULL, '2017-11-16 10:08:29', 'sample company');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

-- Dumping structure for table erp.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_coa_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customers_usersid` (`user_id`),
  KEY `fk_customers_branchid` (`branch_id`),
  KEY `fk_customers_userroleid` (`userrole_id`),
  KEY `fk_customers_companyid` (`company_id`),
  KEY `fk_customers_coadid` (`customer_coa_id`),
  CONSTRAINT `fk_customers_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_customers_coadid` FOREIGN KEY (`customer_coa_id`) REFERENCES `chartofaccounts` (`id`),
  CONSTRAINT `fk_customers_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_customers_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_customers_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.customers: ~0 rows (approximately)
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Dumping structure for table erp.customer_address
CREATE TABLE IF NOT EXISTS `customer_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `line1` varchar(1000) NOT NULL,
  `line2` varchar(1000) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `zip` varchar(1000) NOT NULL,
  `primary_phone` varchar(15) NOT NULL,
  `secondary_phone` varchar(15) NOT NULL,
  `primary_email` varchar(100) NOT NULL,
  `secondary_email` varchar(100) NOT NULL,
  `website` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer_address_usersid` (`user_id`),
  KEY `fk_customer_address_branchid` (`branch_id`),
  KEY `fk_customer_address_userroleid` (`userrole_id`),
  KEY `fk_customer_address_companyid` (`company_id`),
  KEY `fk_customer_address_customerid` (`customer_id`),
  CONSTRAINT `fk_customer_address_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_customer_address_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_customer_address_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `fk_customer_address_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_customer_address_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.customer_address: ~0 rows (approximately)
/*!40000 ALTER TABLE `customer_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_address` ENABLE KEYS */;

-- Dumping structure for table erp.dummy
CREATE TABLE IF NOT EXISTS `dummy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dummy_usersid` (`user_id`),
  KEY `fk_dummy_branchid` (`branch_id`),
  KEY `fk_dummy_userroleid` (`userrole_id`),
  KEY `fk_dummy_companyid` (`company_id`),
  CONSTRAINT `fk_dummy_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_dummy_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_dummy_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_dummy_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.dummy: ~0 rows (approximately)
/*!40000 ALTER TABLE `dummy` DISABLE KEYS */;
/*!40000 ALTER TABLE `dummy` ENABLE KEYS */;

-- Dumping structure for table erp.products_dtl
CREATE TABLE IF NOT EXISTS `products_dtl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `product_hdr_id` int(11) NOT NULL,
  `product_specification_hdr_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_dtl_users_id` (`user_id`),
  KEY `fk_product_dtl_product_hdr_id` (`product_hdr_id`),
  KEY `fk_product_dtl_productspechdr_id` (`product_specification_hdr_id`),
  KEY `fk_product_dtl_branchid` (`branch_id`),
  KEY `fk_product_dtl_companyid` (`company_id`),
  KEY `fk_product_dtl_userroleid` (`userrole_id`),
  CONSTRAINT `fk_product_dtl_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_product_dtl_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_product_dtl_product_hdr_id` FOREIGN KEY (`product_hdr_id`) REFERENCES `products_hdr` (`id`),
  CONSTRAINT `fk_product_dtl_productspechdr_id` FOREIGN KEY (`product_specification_hdr_id`) REFERENCES `product_specification_hdr` (`id`),
  CONSTRAINT `fk_product_dtl_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_product_dtl_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.products_dtl: ~0 rows (approximately)
/*!40000 ALTER TABLE `products_dtl` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_dtl` ENABLE KEYS */;

-- Dumping structure for table erp.products_hdr
CREATE TABLE IF NOT EXISTS `products_hdr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `uom_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `is_stockable` bit(1) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_uom_id` (`uom_id`),
  KEY `fk_products_usersid` (`user_id`),
  KEY `fk_products_branchid` (`branch_id`),
  KEY `fk_products_userroleid` (`userrole_id`),
  KEY `fk_products_companyid` (`company_id`),
  KEY `fk_products_productcategoryid` (`product_category_id`),
  CONSTRAINT `fk_products_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_products_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_products_productcategoryid` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`id`),
  CONSTRAINT `fk_products_uom_id` FOREIGN KEY (`uom_id`) REFERENCES `uom` (`id`),
  CONSTRAINT `fk_products_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_products_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.products_hdr: ~0 rows (approximately)
/*!40000 ALTER TABLE `products_hdr` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_hdr` ENABLE KEYS */;

-- Dumping structure for table erp.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category_usersid` (`user_id`),
  KEY `fk_product_category_companyid` (`company_id`),
  KEY `fk_product_category_branchid` (`branch_id`),
  KEY `fk_product_category_userroleid` (`userrole_id`),
  CONSTRAINT `fk_product_category_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_product_category_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_product_category_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_product_category_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.product_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for table erp.product_specification_dtl
CREATE TABLE IF NOT EXISTS `product_specification_dtl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `product_specification_hdr_id` int(11) NOT NULL,
  `specification_component_id` int(11) NOT NULL,
  `specification_value` double NOT NULL,
  `uom_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_specification_dtl_users_id` (`user_id`),
  KEY `fk_product_specification_dtl_hdr_id` (`product_specification_hdr_id`),
  KEY `fk_product_specification_dtl_speccomponent_id` (`specification_component_id`),
  KEY `fk_product_specification_dtl_uom_id` (`uom_id`),
  KEY `fk_product_specification_dtl_company_id` (`company_id`),
  KEY `fk_product_specification_dtl_branchid` (`branch_id`),
  KEY `fk_product_specification_dtl_userroleid` (`userrole_id`),
  CONSTRAINT `fk_product_specification_dtl_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_product_specification_dtl_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_product_specification_dtl_hdr_id` FOREIGN KEY (`product_specification_hdr_id`) REFERENCES `product_specification_hdr` (`id`),
  CONSTRAINT `fk_product_specification_dtl_speccomponent_id` FOREIGN KEY (`specification_component_id`) REFERENCES `specification_components` (`id`),
  CONSTRAINT `fk_product_specification_dtl_uom_id` FOREIGN KEY (`uom_id`) REFERENCES `uom` (`id`),
  CONSTRAINT `fk_product_specification_dtl_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_product_specification_dtl_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.product_specification_dtl: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_specification_dtl` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_specification_dtl` ENABLE KEYS */;

-- Dumping structure for table erp.product_specification_hdr
CREATE TABLE IF NOT EXISTS `product_specification_hdr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `specification_name` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_specification_hdr_users_id` (`user_id`),
  KEY `fk_product_specification_hdr_company_id` (`company_id`),
  KEY `fk_product_specification_hdr_branchid` (`branch_id`),
  KEY `fk_product_specification_hdr_userroleid` (`userrole_id`),
  CONSTRAINT `fk_product_specification_hdr_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_product_specification_hdr_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_product_specification_hdr_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_product_specification_hdr_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.product_specification_hdr: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_specification_hdr` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_specification_hdr` ENABLE KEYS */;

-- Dumping structure for table erp.specification_components
CREATE TABLE IF NOT EXISTS `specification_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `component_name` varchar(255) NOT NULL,
  `component_code` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_specificationcomponent_users_id` (`user_id`),
  KEY `fk_specificationcomponent_companyid` (`company_id`),
  KEY `fk_specificationcomponent_branchid` (`branch_id`),
  KEY `fk_specificationcomponent_userroleid` (`userrole_id`),
  CONSTRAINT `fk_specificationcomponent_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_specificationcomponent_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_specificationcomponent_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_specificationcomponent_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.specification_components: ~10 rows (approximately)
/*!40000 ALTER TABLE `specification_components` DISABLE KEYS */;
INSERT IGNORE INTO `specification_components` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `user_id`, `component_name`, `component_code`, `company_id`, `branch_id`, `userrole_id`) VALUES
	(1, b'1', NULL, '2017-10-27 20:53:13', 1, '2017-11-16 10:27:35', 1, 'Thickness', '', 1, 1, 1),
	(4, b'1', NULL, '2017-10-27 21:27:22', 1, '2017-11-16 10:27:35', 1, 'Width', '', 1, 1, 1),
	(5, b'1', NULL, '2017-10-27 21:27:39', 1, '2017-11-16 10:27:35', 1, 'Lengthd', '', 1, 1, 1),
	(6, b'1', NULL, '2017-10-27 21:27:56', 1, '2017-11-16 10:27:35', 1, 'Size', '', 1, 1, 1),
	(7, b'1', NULL, '2017-10-27 21:28:13', 1, '2017-11-16 10:27:35', 1, 'Color', '', 1, 1, 1),
	(8, b'1', NULL, '2017-10-27 21:28:26', NULL, '2017-11-16 10:27:35', 1, 'fs', '', 1, 1, 1),
	(10, b'1', NULL, '2017-10-27 21:28:43', NULL, '2017-11-16 10:27:35', 1, 'h', '', 1, 1, 1),
	(11, b'1', NULL, '2017-10-27 21:28:50', NULL, '2017-11-16 10:27:35', 1, 'i', '', 1, 1, 1),
	(12, b'1', NULL, '2017-10-27 21:28:56', NULL, '2017-11-16 10:27:35', 1, 'j', '', 1, 1, 1),
	(14, b'1', NULL, '2017-10-27 21:30:07', NULL, '2017-11-16 10:27:35', 1, 'l', '', 1, 1, 1);
/*!40000 ALTER TABLE `specification_components` ENABLE KEYS */;

-- Dumping structure for table erp.stockadjustment_hdr
CREATE TABLE IF NOT EXISTS `stockadjustment_hdr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `adjustment_date` datetime NOT NULL,
  `document_no` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stockadjustment_hdr_usersid` (`user_id`),
  KEY `fk_stockadjustment_hdr_branchid` (`branch_id`),
  KEY `fk_stockadjustment_hdr_userroleid` (`userrole_id`),
  KEY `fk_stockadjustment_hdr_companyid` (`company_id`),
  CONSTRAINT `fk_stockadjustment_hdr_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_stockadjustment_hdr_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_stockadjustment_hdr_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_stockadjustment_hdr_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.stockadjustment_hdr: ~0 rows (approximately)
/*!40000 ALTER TABLE `stockadjustment_hdr` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockadjustment_hdr` ENABLE KEYS */;

-- Dumping structure for table erp.stock_dtl
CREATE TABLE IF NOT EXISTS `stock_dtl` (
  `id` int(11) NOT NULL,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stockhdrid` int(11) NOT NULL,
  `product_hdr_id` int(11) NOT NULL,
  `product_dtl_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rate` double NOT NULL,
  `company_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stockdtl_stockhdrid` (`stockhdrid`),
  KEY `fk_stockdtl_producthdr_id` (`product_hdr_id`),
  KEY `fk_stockdtl_productdtl_id` (`product_dtl_id`),
  KEY `fk_stock_dtl_companyid` (`company_id`),
  KEY `fk_stock_dtl_branchid` (`branch_id`),
  KEY `fk_stock_dtl_userroleid` (`userrole_id`),
  KEY `fk_stock_dtl_usersid` (`users_id`),
  CONSTRAINT `fk_stock_dtl_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_stock_dtl_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_stock_dtl_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_stock_dtl_usersid` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_stockdtl_productdtl_id` FOREIGN KEY (`product_dtl_id`) REFERENCES `products_dtl` (`id`),
  CONSTRAINT `fk_stockdtl_producthdr_id` FOREIGN KEY (`product_hdr_id`) REFERENCES `products_hdr` (`id`),
  CONSTRAINT `fk_stockdtl_stockhdrid` FOREIGN KEY (`stockhdrid`) REFERENCES `stock_hdr` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.stock_dtl: ~0 rows (approximately)
/*!40000 ALTER TABLE `stock_dtl` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_dtl` ENABLE KEYS */;

-- Dumping structure for table erp.stock_hdr
CREATE TABLE IF NOT EXISTS `stock_hdr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(100) NOT NULL,
  `parenttablekey` int(11) NOT NULL,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date` datetime NOT NULL,
  `document_no` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tablename_parenttablekey` (`tablename`,`parenttablekey`),
  KEY `fk_stock_hdr_usersid` (`users_id`),
  KEY `fk_stock_hdr_companyid` (`company_id`),
  KEY `fk_stock_hdr_branchid` (`branch_id`),
  KEY `fk_stock_hdr_userroleid` (`userrole_id`),
  CONSTRAINT `fk_stock_hdr_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_stock_hdr_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_stock_hdr_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_stock_hdr_usersid` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.stock_hdr: ~0 rows (approximately)
/*!40000 ALTER TABLE `stock_hdr` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_hdr` ENABLE KEYS */;

-- Dumping structure for table erp.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_suppliers_usersid` (`user_id`),
  KEY `fk_suppliers_branchid` (`branch_id`),
  KEY `fk_suppliers_userroleid` (`userrole_id`),
  KEY `fk_suppliers_companyid` (`company_id`),
  CONSTRAINT `fk_suppliers_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_suppliers_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_suppliers_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_suppliers_usersid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table erp.suppliers: ~0 rows (approximately)
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;

-- Dumping structure for table erp.system_constant_keys
CREATE TABLE IF NOT EXISTS `system_constant_keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `constant_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.system_constant_keys: ~1 rows (approximately)
/*!40000 ALTER TABLE `system_constant_keys` DISABLE KEYS */;
INSERT IGNORE INTO `system_constant_keys` (`id`, `constant_key`) VALUES
	(1, 'Account_Group_Type');
/*!40000 ALTER TABLE `system_constant_keys` ENABLE KEYS */;

-- Dumping structure for table erp.system_constant_values
CREATE TABLE IF NOT EXISTS `system_constant_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL DEFAULT '0',
  `constant_value` varchar(255) NOT NULL DEFAULT '0',
  `systemconstant_key_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_systemconstantvalues_keyid` (`systemconstant_key_id`),
  CONSTRAINT `fk_systemconstantvalues_keyid` FOREIGN KEY (`systemconstant_key_id`) REFERENCES `system_constant_keys` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.system_constant_values: ~1 rows (approximately)
/*!40000 ALTER TABLE `system_constant_values` DISABLE KEYS */;
INSERT IGNORE INTO `system_constant_values` (`id`, `code`, `constant_value`, `systemconstant_key_id`) VALUES
	(1, 'Asset', 'Asset', 1);
/*!40000 ALTER TABLE `system_constant_values` ENABLE KEYS */;

-- Dumping structure for table erp.system_roles
CREATE TABLE IF NOT EXISTS `system_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `role_code` varchar(50) NOT NULL,
  `rolename` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.system_roles: ~3 rows (approximately)
/*!40000 ALTER TABLE `system_roles` DISABLE KEYS */;
INSERT IGNORE INTO `system_roles` (`id`, `isactive`, `role_code`, `rolename`) VALUES
	(1, b'1', 'App_Admin', 'Application Admin'),
	(2, b'1', 'Branch_Admin', 'Organisation Admin'),
	(3, b'1', 'Branch_User', 'Organisation User');
/*!40000 ALTER TABLE `system_roles` ENABLE KEYS */;

-- Dumping structure for table erp.uom
CREATE TABLE IF NOT EXISTS `uom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `uomname` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_uom_users_id` (`user_id`),
  KEY `fk_uom_companyid` (`company_id`),
  KEY `fk_uom_branchid` (`branch_id`),
  KEY `fk_uom_userroleid` (`userrole_id`),
  CONSTRAINT `fk_uom_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_uom_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_uom_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`),
  CONSTRAINT `fk_uom_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.uom: ~1 rows (approximately)
/*!40000 ALTER TABLE `uom` DISABLE KEYS */;
INSERT IGNORE INTO `uom` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `user_id`, `uomname`, `company_id`, `branch_id`, `userrole_id`) VALUES
	(1, b'1', NULL, '2017-11-13 09:54:39', NULL, '2017-11-24 11:35:45', 1, 'Meter', 1, 1, 1);
/*!40000 ALTER TABLE `uom` ENABLE KEYS */;

-- Dumping structure for table erp.userroles
CREATE TABLE IF NOT EXISTS `userroles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_code` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userroles_branchid` (`branch_id`),
  KEY `fk_userroles_companyid` (`company_id`),
  CONSTRAINT `fk_userroles_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_userroles_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.userroles: ~1 rows (approximately)
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT IGNORE INTO `userroles` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `role_code`, `role_name`, `branch_id`, `company_id`) VALUES
	(1, b'1', NULL, '2017-11-16 10:10:19', NULL, '2017-11-16 10:10:58', NULL, 'sample role', 1, 1);
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;

-- Dumping structure for table erp.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `createdby` int(11) DEFAULT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedby` int(11) DEFAULT NULL,
  `updatedtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  `account_expiy_date` datetime NOT NULL,
  `branch_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `userrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_branchid` (`branch_id`),
  KEY `fk_users_companyid` (`company_id`),
  KEY `fk_users_userroleid` (`userrole_id`),
  CONSTRAINT `fk_users_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  CONSTRAINT `fk_users_companyid` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_users_userroleid` FOREIGN KEY (`userrole_id`) REFERENCES `userroles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table erp.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `isactive`, `createdby`, `createdtime`, `updatedby`, `updatedtime`, `username`, `password`, `account_expiy_date`, `branch_id`, `company_id`, `userrole_id`) VALUES
	(1, b'1', NULL, '2017-10-19 21:01:36', NULL, '2017-11-16 10:20:30', 'admin', 'admin', '0000-00-00 00:00:00', 1, 1, 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
