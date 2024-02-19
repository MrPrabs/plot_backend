-- Create Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    user_type VARCHAR(255) NOT NULL
);

-- Create Parking Lots table
CREATE TABLE Parking_Lots (
    lot_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    total_spots INTEGER NOT NULL,
    spot_numbering BOOLEAN NOT NULL,
    owner_id INTEGER REFERENCES Users(user_id)
);

-- Create Parking Spots table
CREATE TABLE Parking_Spots (
    spot_id SERIAL PRIMARY KEY,
    lot_id INTEGER REFERENCES Parking_Lots(lot_id),
    spot_number INTEGER,
    reservable BOOLEAN NOT NULL,
    is_reserved BOOLEAN NOT NULL,
    reserved_by INTEGER REFERENCES Users(user_id),
    price NUMERIC
);

-- Create Reservations table
CREATE TABLE Reservations (
    reservation_id SERIAL PRIMARY KEY,
    spot_id INTEGER REFERENCES Parking_Spots(spot_id),
    user_id INTEGER REFERENCES Users(user_id),
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(255)
);

-- Create Reviews and Ratings table
CREATE TABLE Reviews_and_Ratings (
    review_id SERIAL PRIMARY KEY,
    lot_id INTEGER REFERENCES Parking_Lots(lot_id),
    user_id INTEGER REFERENCES Users(user_id),
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE
);

-- Create Messages and Communication table
CREATE TABLE Messages_and_Communication (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES Users(user_id),
    receiver_id INTEGER REFERENCES Users(user_id),
    message_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE
);

-- Create Sublease Agreements table
CREATE TABLE Sublease_Agreements (
    agreement_id SERIAL PRIMARY KEY,
    original_leaser_id INTEGER REFERENCES Users(user_id),
    subleaser_id INTEGER REFERENCES Users(user_id),
    spot_id INTEGER REFERENCES Parking_Spots(spot_id),
    start_date DATE,
    end_date DATE,
    status VARCHAR(255)
);
