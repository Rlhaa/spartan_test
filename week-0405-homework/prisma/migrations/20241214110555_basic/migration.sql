/*
  Warnings:

  - The primary key for the `palyer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `palyer` table. All the data in the column will be lost.
  - You are about to drop the `myteam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `palyerId` to the `palyer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `palyer` DROP FOREIGN KEY `palyer_Id_fkey`;

-- AlterTable
ALTER TABLE `palyer` DROP PRIMARY KEY,
    DROP COLUMN `Id`,
    ADD COLUMN `palyerId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`palyerId`);

-- DropTable
DROP TABLE `myteam`;
