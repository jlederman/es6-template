-- Create a new database called 'backendApiDatabase'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'backendApiDatabase'
)
CREATE DATABASE backendApiDatabase
GO

-- Create a new table called '[defaultTable]' in schema '[dbo]'
-- Drop the table if it already exists
USE backendApiDatabase
IF OBJECT_ID('[dbo].[defaultTable]', 'U') IS NOT NULL
DROP TABLE [dbo].[defaultTable]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[defaultTable]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [userName] NVARCHAR(50) NOT NULL,
    [password] NVARCHAR(50) NOT NULL
    -- Specify more columns here
);
GO

USE [backendApiDatabase]
GO
CREATE LOGIN [api] WITH PASSWORD=N'test', DEFAULT_DATABASE=[backendApiDatabase]
GO
CREATE USER [api] FOR LOGIN [api]
GO
ALTER USER [api] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [api]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [api]
GO

-- Insert rows into table 'login' in schema '[dbo]'
use backendApiDatabase
INSERT INTO [dbo].[defaultTable]
( -- Columns to insert data into
 [Id], [userName], [password]
)
VALUES
( -- First row: values for the columns in the list above
 1, 'test', 'test'
)
-- Add more rows here
GO
