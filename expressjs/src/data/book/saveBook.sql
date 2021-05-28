USE [Book Store];
INSERT INTO [book](
        [book_name],
        [description],
        [price],
        [quantity],
        [discount],
        [publish_year]
    )
VALUES(
        @book_name,
        @description,
        @price,
        @quantity,
        @discount,
        @publish_year
    );
SELECT SCOPE_IDENTITY() AS [book_id]
FROM [book];