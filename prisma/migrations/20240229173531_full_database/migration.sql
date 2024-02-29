/*
  Warnings:

  - The primary key for the `ParkingSpot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `available` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerHour` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ParkingSpot` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `is_reserved` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_id` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservable` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('leaser', 'subleaser', 'administrator');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('pending', 'confirmed', 'canceled');

-- CreateEnum
CREATE TYPE "AgreementStatus" AS ENUM ('pending', 'active', 'terminated');

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_ownerId_fkey";

-- AlterTable
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_pkey",
DROP COLUMN "available",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "location",
DROP COLUMN "ownerId",
DROP COLUMN "pricePerHour",
DROP COLUMN "updatedAt",
ADD COLUMN     "is_reserved" BOOLEAN NOT NULL,
ADD COLUMN     "lot_id" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reservable" BOOLEAN NOT NULL,
ADD COLUMN     "reserved_by" INTEGER,
ADD COLUMN     "spot_id" SERIAL NOT NULL,
ADD COLUMN     "spot_number" INTEGER,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("spot_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_type" "UserType" NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "ParkingLot" (
    "lot_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "total_spots" INTEGER NOT NULL,
    "spot_numbering" BOOLEAN NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("lot_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservation_id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "message_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "SubleaseAgreement" (
    "agreement_id" SERIAL NOT NULL,
    "original_leaser_id" INTEGER NOT NULL,
    "subleaser_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "AgreementStatus" NOT NULL,

    CONSTRAINT "SubleaseAgreement_pkey" PRIMARY KEY ("agreement_id")
);

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_reserved_by_fkey" FOREIGN KEY ("reserved_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "ParkingLot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "ParkingSpot"("spot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "ParkingLot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubleaseAgreement" ADD CONSTRAINT "SubleaseAgreement_original_leaser_id_fkey" FOREIGN KEY ("original_leaser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubleaseAgreement" ADD CONSTRAINT "SubleaseAgreement_subleaser_id_fkey" FOREIGN KEY ("subleaser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubleaseAgreement" ADD CONSTRAINT "SubleaseAgreement_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "ParkingSpot"("spot_id") ON DELETE RESTRICT ON UPDATE CASCADE;
