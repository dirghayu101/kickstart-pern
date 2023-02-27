/**
 
So, we have 6 tables with us: 4 are space tables, 1 common spaces table and 1 is reservation table.

Here are the function of each table:

-> 4 space table: hold information about seats in each of the four category. Columns are: seatID, isBookedBoolean, reservedUserID, bookingStartTime and bookingEndTime.

-> reservation table: This will hold the active reservations of the system. Let's say a user need to fetch his active bookings, he can refer this table.
Columns are: userID, seatID and transactionNumber.

-> Spaces: This will be used to control the cart functionality. A user can only add as many spaces available for reservation.
Columns are: spaceType, totalSeats, seatsReserved and seatsAvailable.

-> All-Reservation-Table: Based on the need I have created this table. It will hold all the reservations.

Here are the points I need to take note of: 

Point 1-> First of all I will create a utility function to populate database. Specifically the 4 space table. And also a utility function to delete all rows in the database.

Point 2-> I will also fill up the space table with the information from the four table and then also create a delete function for space table.

Point 3-> I will create a single function to insert rows in individual space tables and common space tables. Also a single delete function for a similar function.

Point 4-> Test the above function. One important thing, I should be able to specify the number of seats to setup all the table. The admin can increase and decrease the number of spaces they are going to provide and can handle so from the admin panel.

Point 5-> We need to define what we mean by successful reservation in our database.
The definition of a successful reservation is the reservation where payment status is success.
 */