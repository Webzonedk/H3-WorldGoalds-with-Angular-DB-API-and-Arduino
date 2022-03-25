CREATE TABLE tempData (
	id SERIAL NOT NULL UNIQUE PRIMARY KEY,
	humidity FLOAT,
	temperature FLOAT,
	logTime TIMESTAMP DEFAULT LOCALTIMESTAMP
);


DROP TABLE tempData;


CREATE OR REPLACE PROCEDURE insertdata(
	humidity FLOAT,
	temperature FLOAT)
	
	LANGUAGE plpgsql
	AS $$
	BEGIN
	
	INSERT INTO tempData(humidity, temperature)
	VALUES(humidity, temperature);
		
	COMMIT;
	END;$$



CREATE OR REPLACE PROCEDURE getdata()
	
	LANGUAGE plpgsql
	AS $$
	BEGIN
	
	SELECT * FROM tempData;
		
	COMMIT;
	END;$$
