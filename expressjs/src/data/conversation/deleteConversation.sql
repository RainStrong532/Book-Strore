UPDATE [conversation] SET [enable] = 0
WHERE [conversation_id] = @conversation_id;
UPDATE [message] SET [enable] = 0 WHERE [conversation_id] = @conversation_id;
