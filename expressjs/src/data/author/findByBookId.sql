SELECT *
FROM [author]
WHERE [enable] = 1
    AND [author_id] IN (
        SELECT author_id
        FROM [author_book]
        WHERE [book_id] = @book_id
    );