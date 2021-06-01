SELECT r.role_name
FROM [account] AS [a]
    INNER JOIN [account_role] AS ar ON a.account_id = ar.account_id
    INNER JOIN [role] AS r ON ar.role_id = r.role_id
WHERE a.account_id = @account_id;