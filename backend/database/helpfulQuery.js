/*

INSERT INTO public."Current-Reservation-Table"(
	"transactionNumber", "userID", "seatID", "wasMuted", "reservationDate")
	VALUES ('12324', 'abced', '24', false, '2023-02-12');



    INSERT INTO public."All-Reservation-Table"(
	"userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted")
	SELECT "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted"
    FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<'2023-02-28';
*/