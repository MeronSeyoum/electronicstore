// Remove this line: import mysql from 'mysql2/promise';
import mysql from "mysql2/promise";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  try {
    const connectionParams = serverRuntimeConfig.dbConfig;

    const connection = await mysql.createConnection(connectionParams);

    // create a query to fetch data
    const get_exp_query = `
    SELECT 
         pc.id, 
         pc.name AS category_name, 
         pc.image_url
    FROM                
	     electronic_shop.product_category AS pc
	JOIN
		 electronic_shop.product AS p ON pc.id = p.category_id
	GROUP BY 
         pc.id
	HAVING 
         COUNT(p.id) >= 1    
    `;

    // we can use this array to pass parameters to the SQL query
    let values = [];

    // execute the query and retrieve the results
    const [results] = await connection.execute(get_exp_query, values);

    // close the connection when done
    connection.end();

    // Return the results as a JSON API response using `res.json()`
    res.status(200).json(results);
  } catch (err) {
    console.error("ERROR: API - ", err.message);
    // Return the error message as a JSON API response with appropriate status code using `res.status()` and `res.json()`
    res.status(500).json({ error: err.message });
  }
}
