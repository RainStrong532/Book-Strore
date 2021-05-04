SELECT r.role_name, r.role_id
FROM [role] AS [r]
WHERE r.role_name = @role_name;