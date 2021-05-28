SELECT TOP 1 *
FROM [book]
WHERE [book_id] = @book_id
    AND [enable] = 1;