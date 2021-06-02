SELECT m.*, p.firstname, p.avatar FROM [message] AS [m]
INNER JOIN [profile] AS [p] ON m.account_id = p.account_id
WHERE m.conversation_id = @conversation_id
AND m.enable = 1
ORDER BY m.create_date DESC
OFFSET @offset ROWS
FETCH NEXT @limit ROWS ONLY;