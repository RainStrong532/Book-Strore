USE [Book Store];
INSERT INTO [message]([content], [image_id], [account_id], [conversation_id], [type])
VALUES(@content, @image_id, @account_id, @conversation_id, @type);
SELECT DISTINCT SCOPE_IDENTITY() AS [message_id] FROM [message];
