SELECT m.*, p.firstname, p.avatar, p.account_id FROM [message] AS [m]
INNER JOIN [profile] AS [p] ON m.account_id = p.account_id
WHERE [conversation_id] = @conversation_id;