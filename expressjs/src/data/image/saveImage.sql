USE [Book Store];
INSERT INTO [image]([name])
VALUES (@name);
SELECT * FROM [image] WHERE [image_id] = SCOPE_IDENTITY();