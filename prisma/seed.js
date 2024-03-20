const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Create administrators
    const admin1 = await prisma.user.create({
      data: {
        username: 'admin1',
        email: 'admin1@example.com',
        password_hash: 'password1',
        user_type: 'administrator'
      }
    });

    const admin2 = await prisma.user.create({
      data: {
        username: 'admin2',
        email: 'admin2@example.com',
        password_hash: 'password2',
        user_type: 'administrator'
      }
    });

    console.log('Created administrators:', [admin1, admin2]);

    // Create parking lots and associate them with the correct owners
    const parkingLots = [
      { name: 'Lot 1', address: '511 W Dayton St, Madison, WI, 53703', total_spots: 5, spot_numbering: true, owner_id: admin1.user_id, latitude: 43.071120, longitude: -89.392950 },
      { name: 'Lot 2', address: '129 S Carroll St, Madison, WI 53703', total_spots: 5, spot_numbering: true, owner_id: admin2.user_id, latitude: 43.072490, longitude: -89.383350 },
      { name: 'Lot 3', address: '1440 Monroe St, Madison, WI 53711', total_spots: 5, spot_numbering: true, owner_id: admin1.user_id, latitude: 43.053509, longitude: -89.434372 }
    ];

    // Assuming createMany doesn't return the created records, hardcode lot IDs if necessary
    await prisma.parkingLot.createMany({
      data: parkingLots,
      skipDuplicates: true
    });

    // Create parking spots
    // Assuming the creation of parking lots with IDs 1, 2, and 3
    const parkingSpots = [
        // Assuming lot_id values are 1, 2, 3 for "Lot 1", "Lot 2", "Lot 3" respectively
        { lot_id: 1, spot_number: 1, reservable: false, price: 15 },
        { lot_id: 1, spot_number: 2, reservable: false, price: 15 },
        { lot_id: 1, spot_number: 3, reservable: false, price: 15 },
        { lot_id: 1, spot_number: 4, reservable: true, price: 15 },
        { lot_id: 1, spot_number: 5, reservable: true, price: 15 },
        { lot_id: 2, spot_number: 1, reservable: false, price: 15 },
        { lot_id: 2, spot_number: 2, reservable: false, price: 15 },
        { lot_id: 2, spot_number: 3, reservable: false, price: 15 },
        { lot_id: 2, spot_number: 4, reservable: true, price: 15 },
        { lot_id: 2, spot_number: 5, reservable: true, price: 15 },
        { lot_id: 3, spot_number: 1, reservable: false, price: 15 },
        { lot_id: 3, spot_number: 2, reservable: false, price: 15 },
        { lot_id: 3, spot_number: 3, reservable: false, price: 15 },
        { lot_id: 3, spot_number: 4, reservable: true, price: 15 },
        { lot_id: 3, spot_number: 5, reservable: true, price: 15 }
      ];
      
    // Populate the rest of your parkingSpots array as needed

    // Assuming parkingSpots are successfully created with sequential IDs

    // Create leasers for parking spots, ensuring unique emails
    const createdLeasers = [
        { username: 'leaser1_1', email: 'leaser1_1@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser1_2', email: 'leaser1_2@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser1_3', email: 'leaser1_3@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser1_4', email: 'leaser1_4@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser1_5', email: 'leaser1_5@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser2_1', email: 'leaser2_1@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser2_2', email: 'leaser2_2@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser2_3', email: 'leaser2_3@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser2_4', email: 'leaser2_4@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser2_5', email: 'leaser2_5@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser3_1', email: 'leaser3_1@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser3_2', email: 'leaser3_2@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser3_3', email: 'leaser3_3@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser3_4', email: 'leaser3_4@example.com', password_hash: 'leaserpassword', user_type: 'leaser' },
        { username: 'leaser3_5', email: 'leaser3_5@example.com', password_hash: 'leaserpassword', user_type: 'leaser' }
      ];
      

    // Ensure each leaser is created with a unique email and username
    for (let leaser of createdLeasers) {
      await prisma.user.create({
        data: leaser
      });
    }
    // Insert the created parking spots into the database
    await prisma.parkingSpot.createMany({
        data: parkingSpots,
        skipDuplicates: true // Assuming you want to skip duplicates
    });
  
  console.log('Parking spots created.');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
