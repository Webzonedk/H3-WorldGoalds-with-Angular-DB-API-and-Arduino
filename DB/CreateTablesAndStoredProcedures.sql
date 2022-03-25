CREATE TABLE tempData (
	id SERIAL NOT NULL UNIQUE PRIMARY KEY,
	humidity FLOAT,
	temperature FLOAT,
	logTime TIMESTAMP
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



CREATE OR REPLACE FUNCTION getdata()
	RETURNS SETOF tempdata AS $$	
	BEGIN
		RETURN QUERY SELECT * FROM tempdata;
	END
	$$
	LANGUAGE plpgsql;
	
	SELECT * FROM getdata();
	
