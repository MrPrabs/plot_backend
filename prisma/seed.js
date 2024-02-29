const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // User
    const user = await prisma.user.create({
        data: {
            username: "john_doe",
            email: "john@example.com",
            password_hash: "hashedpassword",
            profile_picture: "https://example.com/profile.jpg",
            user_type: "leaser", // Assume 'leaser', 'subleaser', 'administrator'
        },
    });

    // Parking Lot
    const parkingLot = await prisma.parkingLot.create({
        data: {
            name: "Downtown Lot",
            address: "123 Main St",
            description: "Close to downtown shops and offices.",
            latitude: 34.0522,
            longitude: -118.2437,
            total_spots: 50,
            spot_numbering: true,
            owner_id: user.user_id,
        },
    });

    // Parking Spot
    const parkingSpot = await prisma.parkingSpot.create({
        data: {
            lot_id: parkingLot.lot_id,
            spot_number: 1,
            reservable: true,
            description: "Covered spot",
            is_reserved: false,
            price: 5.00,
        },
    });

    // Reservation
    const reservation = await prisma.reservation.create({
        data: {
            spot_id: parkingSpot.spot_id,
            user_id: user.user_id,
            start_time: new Date("2023-01-01T09:00:00Z"),
            end_time: new Date("2023-01-01T17:00:00Z"),
            status: "confirmed",
        },
    });

    // Review
    const review = await prisma.review.create({
        data: {
            lot_id: parkingLot.lot_id,
            user_id: user.user_id,
            rating: 5,
            comment: "Great location, secure and well-lit.",
            created_at: new Date(),
        },
    });

    // Message
    const message = await prisma.message.create({
        data: {
            sender_id: user.user_id,
            receiver_id: user.user_id, // For simplicity, using the same user
            message_text: "Is the spot still available?",
            created_at: new Date(),
        },
    });

    // Sublease Agreement
    const subleaseAgreement = await prisma.subleaseAgreement.create({
        data: {
            original_leaser_id: user.user_id,
            subleaser_id: user.user_id, // For simplicity, using the same user
            spot_id: parkingSpot.spot_id,
            start_date: new Date("2023-01-01"),
            end_date: new Date("2023-06-01"),
            status: "active",
        },
    });

    console.log({ user, parkingLot, parkingSpot, reservation, review, message, subleaseAgreement });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
