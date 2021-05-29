SELECT *
FROM [category]
WHERE [enable] = 1
    AND [category_id] IN (
        SELECT category_id
        FROM [category_book]
        WHERE [book_id] = @book_id
    );