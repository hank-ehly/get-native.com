SET @yesterday = ?;

DELETE FROM writing_answers WHERE study_session_id IN (
		SELECT id
		FROM study_sessions
		WHERE is_completed = false AND created_at < @yesterday
);

DELETE FROM study_sessions
WHERE is_completed = false AND created_at < @yesterday;