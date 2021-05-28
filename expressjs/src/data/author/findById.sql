SELECT *
FROM [author]
WHERE [enable] = 1
    AND [author_id] = @author_id;