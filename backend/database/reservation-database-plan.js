/*
Requirements: 
-> Single Reservation info
-> Multiple reservation info based on date and seat type filter.
-> All current active reservations.
-> Current active reservation based on space type.
-> All reservations of a particular user.
-> All active reservations of a particular user.
-> All reservations of a single seat.
-> All current reservations of a single seat.
-> A particular space type reservation based on different params like all reservation which are active of a current space type.


There will be following parameters in sendActiveReservationInformation route:
1. space = {conference, cubicle, private office, hot seat, all} --> default will be all.
3. status = { all, update} --> default will be all.
4.1. sDate = startDate
4.2. eDate = endDate
5. tNum = this will send information about a single unique reservation. Information about its transaction number, date, status, user related.
6. uID = all reservations of this user. Active and past depends on the previous parameters.
7. seatID = all reservations of a single seat.


There will be following parameters in sendOldReservationInformation route:
1. space = {conference, cubicle, private office, hot seat, all} --> default will be all.
3. status = {all, past, cancel, update} --> default will be active.
4.1. sDate = startDate
4.2. eDate = endDate         
NOTE: By default the last 7 days will be shown.
5. tNum = this will send information about a single unique reservation. Information about its transaction number, date, status, user related.
6. uID = all reservations of this user. Active and past depends on the previous parameters.
7. seatID = all reservations of a single seat.

NOTE: I need to put some validator to check if the get request is correct. If the database answers with error there it should be based on the response.
*/


/*
sendUserInformation -> This method which will respond to queries related to user will return the following information based on params:
-> All users in the database.
-> Users with active reservation currently.
-> All the users who ever performed reservation.
-> single user based on their ID.
*/

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