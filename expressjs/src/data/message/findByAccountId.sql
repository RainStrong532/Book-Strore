SELECT m.*, p.firstname, p.avartar, p.account_id FROM [message] AS [m]
INNER JOIN [profile] AS [p] on m.account_id = p.account_id
WHERE [account_id] = @account_id;