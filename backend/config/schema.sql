-- Admin table

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT
);



-- Stages & Statuses managed by admin
CREATE TABLE Stages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Statuses (
    id SERIAL PRIMARY KEY,
    stage_id INT REFERENCES stages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL
);

-- Roles & Candidates for users
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password TEXT,
    email VARCHAR(255) UNIQUE,
    role_id INT REFERENCES roles(id),
    stage_id INT REFERENCES stages(id)
);
