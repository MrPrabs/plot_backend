/*
  Warnings:

  - You are about to drop the column `is_reserved` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `reserved_by` on the `ParkingSpot` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('available', 'booked');

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_reserved_by_fkey";

-- AlterTable
ALTER TABLE "ParkingSpot" DROP COLUMN "is_reserved",
DROP COLUMN "reserved_by";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "availability_id" INTEGER;

-- CreateTable
CREATE TABLE "SpotAvailability" (
    "availability_id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "AvailabilityStatus" NOT NULL,

    CONSTRAINT "SpotAvailability_pkey" PRIMARY KEY ("availability_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotAvailability_spot_id_start_time_end_time_key" ON "SpotAvailability"("spot_id", "start_time", "end_time");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "SpotAvailability"("availability_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotAvailability" ADD CONSTRAINT "SpotAvailability_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "ParkingSpot"("spot_id") ON DELETE RESTRICT ON UPDATE CASCADE;
