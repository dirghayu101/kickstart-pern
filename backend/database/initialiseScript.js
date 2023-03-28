const databaseConnection = require("../database/connection");

const queryString = `

CREATE TABLE IF NOT EXISTS public."Admin"
(
    "Password" character varying COLLATE pg_catalog."default",
    "Admin-Username" character varying COLLATE pg_catalog."default"
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Admin" OWNER to postgres;

DELETE FROM public."Admin";

INSERT INTO public."Admin"(
    "Password", "Admin-Username")
    VALUES ('$2a$10$yMveWYwz85XnWp8wKHPNQ.eFru4aTFSteLRzH.xhzEIKuK/ckD3AO', 'kickstart-admin');

CREATE TABLE IF NOT EXISTS public."User"
(
    "userID" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" bigint NOT NULL,
    "mailID" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "firstName" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY ("userID"),
    CONSTRAINT "Email should be unique." UNIQUE ("mailID", "userID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Current-Reservation-Table"
(
    "userID" character varying COLLATE pg_catalog."default" NOT NULL,
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "reservationID" character varying COLLATE pg_catalog."default" NOT NULL,
    "transactionNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    "bookingTime" timestamp without time zone NOT NULL DEFAULT 'now()',
    "reservationDate" date NOT NULL,
    "wasMuted" boolean NOT NULL DEFAULT 'false',
    CONSTRAINT "Current-Reservation-Table_pkey" PRIMARY KEY ("reservationID"),
    CONSTRAINT "Present-Future-Time-Constraint" CHECK ("reservationDate" >= CURRENT_DATE) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Current-Reservation-Table"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."All-Reservation-Table"
(
    "transactionNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    "userID" character varying COLLATE pg_catalog."default" NOT NULL,
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "reservationID" character varying COLLATE pg_catalog."default" NOT NULL,
    "wasMuted" boolean NOT NULL DEFAULT 'false',
    "reservationDate" date NOT NULL,
    "bookingTime" timestamp without time zone NOT NULL,
    "reservationStatus" boolean NOT NULL DEFAULT 'true',
    CONSTRAINT "All-Reservation-Table_pkey" PRIMARY KEY ("reservationID")
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."All-Reservation-Table"
    OWNER to postgres;
    
CREATE TABLE IF NOT EXISTS public."Conference-Room"
(
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "isBookedBoolean" boolean NOT NULL DEFAULT 'false',
    "reservedUserID" character varying[] COLLATE pg_catalog."default",
    "bookingTime" timestamp without time zone DEFAULT 'now()',
    "transactionNumber" character varying COLLATE pg_catalog."default",
    "reservationDates" date[],
    CONSTRAINT "Conference-Room_pkey" PRIMARY KEY ("seatID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Conference-Room"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Cubicle"
(
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "isBookedBoolean" boolean NOT NULL DEFAULT 'false',
    "reservedUserID" character varying[] COLLATE pg_catalog."default",
    "bookingTime" timestamp without time zone DEFAULT '2023-03-10 10:05:06.086476'::timestamp without time zone,
    "transactionNumber" character varying COLLATE pg_catalog."default",
    "reservationDates" date[],
    CONSTRAINT "Cubicle_pkey" PRIMARY KEY ("seatID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Cubicle"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Hot-Seat"
(
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "isBookedBoolean" boolean NOT NULL DEFAULT 'false',
    "reservedUserID" character varying[] COLLATE pg_catalog."default",
    "bookingTime" timestamp without time zone DEFAULT '2023-03-10 10:05:38.568586'::timestamp without time zone,
    "transactionNumber" character varying COLLATE pg_catalog."default",
    "reservationDates" date[],
    CONSTRAINT "Hot-Seat_pkey" PRIMARY KEY ("seatID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Hot-Seat"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Private-Office"
(
    "seatID" character varying COLLATE pg_catalog."default" NOT NULL,
    "isBookedBoolean" boolean NOT NULL DEFAULT 'false',
    "reservedUserID" character varying[] COLLATE pg_catalog."default",
    "bookingTime" timestamp without time zone,
    "transactionNumber" character varying COLLATE pg_catalog."default",
    "reservationDates" date[],
    CONSTRAINT "Private-Office_pkey" PRIMARY KEY ("seatID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Private-Office"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Reservation-Feedback"
(
    "userID" character varying COLLATE pg_catalog."default",
    "seatNum" character varying COLLATE pg_catalog."default",
    rating integer,
    comment character varying COLLATE pg_catalog."default",
    "time" timestamp without time zone DEFAULT 'now()'
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Reservation-Feedback"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Reset-Password"
(
    "userID" character varying COLLATE pg_catalog."default" NOT NULL,
    "resetPasswordToken" character varying COLLATE pg_catalog."default" NOT NULL,
    "resetPasswordExpire" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Reset-Password_pkey" PRIMARY KEY ("userID"),
    CONSTRAINT "Reset-Password_userID_fkey" FOREIGN KEY ("userID")
        REFERENCES public."User" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Reset-Password"
    OWNER to postgres;
`;

const checkScript = `SELECT * FROM pg_database WHERE datname = 'Kickstart-MERN-Database'`;

const createDBScript = `CREATE DATABASE "Kickstart-MERN-Database"
WITH
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'C'
LC_CTYPE = 'C'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = False;`;

module.exports.initializeDatabase = async () => {
  const { rows: result } = await databaseConnection.query(checkScript);
  if (!result.length) {
    await databaseConnection.query(createDBScript)
  }
  await databaseConnection.query(queryString);
};
