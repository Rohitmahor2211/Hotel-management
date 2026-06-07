const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Booking = require('../models/bookingModel');
const Room = require('../models/roomsModel');

const hasDateCollision = async (roomId, checkIn, checkOut) => {
    return Booking.findOne({
        roomId,
        status: "confirmed",
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) }
    });
};

async function runTest() {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected.");

        // 1. Create a dummy room
        const testRoom = await Room.create({
            room_no: "TEST-999",
            title: "Automated Test Room",
            price: 1000,
            description: "Used for automated date overlap tests",
            capacity: 2,
            status: "available"
        });

        console.log(`Created test room: ${testRoom._id}`);

        // 2. Create an initial booking (e.g., June 10 to June 15)
        const checkIn1 = new Date('2026-06-10');
        const checkOut1 = new Date('2026-06-15');
        
        const booking1 = await Booking.create({
            roomId: testRoom._id,
            guestName: "Test Guest 1",
            guestEmail: "test1@example.com",
            guestPhone: "1234567890",
            checkIn: checkIn1,
            checkOut: checkOut1,
            guests: 2,
            totalPrice: 5000,
            status: "confirmed",
            paymentStatus: "paid"
        });

        console.log(`Created first booking: ${booking1._id} (${checkIn1.toDateString()} - ${checkOut1.toDateString()})`);

        // 3. Test Cases
        const testCases = [
            { name: "Exact Overlap", in: '2026-06-10', out: '2026-06-15', expected: true },
            { name: "Partial Overlap (Start)", in: '2026-06-08', out: '2026-06-12', expected: true },
            { name: "Partial Overlap (End)", in: '2026-06-14', out: '2026-06-18', expected: true },
            { name: "Inside Overlap", in: '2026-06-11', out: '2026-06-14', expected: true },
            { name: "Outside Overlap", in: '2026-06-05', out: '2026-06-20', expected: true },
            { name: "No Overlap (Before)", in: '2026-06-05', out: '2026-06-09', expected: false },
            { name: "No Overlap (After)", in: '2026-06-16', out: '2026-06-20', expected: false },
            { name: "Touch (Check-out = Check-in)", in: '2026-06-05', out: '2026-06-10', expected: false },
            { name: "Touch (Check-in = Check-out)", in: '2026-06-15', out: '2026-06-20', expected: false },
        ];

        let failedTests = 0;

        for (const tc of testCases) {
            const result = await hasDateCollision(testRoom._id, tc.in, tc.out);
            const foundOverlap = !!result;
            
            if (foundOverlap === tc.expected) {
                console.log(`✅ PASSED: ${tc.name}`);
            } else {
                console.log(`❌ FAILED: ${tc.name} | Expected override: ${tc.expected}, Got: ${foundOverlap}`);
                failedTests++;
            }
        }

        // Cleanup
        console.log("Cleaning up test data...");
        await Booking.deleteOne({ _id: booking1._id });
        await Room.deleteOne({ _id: testRoom._id });

        if (failedTests === 0) {
            console.log("\n✨ ALL DATE OVERLAP TESTS PASSED! ✨");
            process.exit(0);
        } else {
            console.log(`\n🚨 ${failedTests} test(s) failed.`);
            process.exit(1);
        }

    } catch (error) {
        console.error("Test execution failed:", error);
        process.exit(1);
    }
}

runTest();
