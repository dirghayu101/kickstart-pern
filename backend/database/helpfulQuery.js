/*
	NOTE: Current reservation table insertion query:

	INSERT INTO public."Current-Reservation-Table"(
	"userID", "seatID", "transactionNumber", "reservationDate", "wasMuted")
	VALUES ('8af38fbc-5670-478b-849c-3f67f198c1e6', 11003, 'baguvix', '2023-03-09', false);


	NOTE: This query is to get all the users which also have entries in the current reservation table i.e. users with active reservation

	# FIRST APPROACH:
	SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
	FROM public."User" as "user", public."Current-Reservation-Table" as "currentReserveTable" 
WHERE "user"."userID"="currentReserveTable"."userID";

# SECOND APPROACH
SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
	FROM public."User" as "user"
	INNER JOIN public."Current-Reservation-Table" as "currentReservationTable"
	on "user"."userID" = "currentReservationTable"."userID";

	NOTE: This query is to get all the users which also have entries in the all reservation table i.e. users who ever  performed any form of reservation via the website.

	# First Approach
SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
	FROM public."User" as "user", public."All-Reservation-Table" as "allReserveTable" 
WHERE "user"."userID"="allReserveTable"."userID";
		
	# Second Approach
SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
	FROM public."User" as "user"
	INNER JOIN public."All-Reservation-Table" as "allReservationTable"
	on "user"."userID" = "allReservationTable"."userID";

*/
