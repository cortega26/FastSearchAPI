# FastSearchAPI

Efficient FastAPI implementation for searching JSON data by name, lastname, RUT, and age filters. Seamlessly filter and retrieve specific individuals or apply complex criteria. Simplify data retrieval with FastSearchAPI.

## Usage

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/FastSearchAPI.git

2. pip install -r requirements.txt
   ```shell
   pip install -r requirements.txt

3. Start the FastAPI server
   ```shell
   uvicorn main:app --reload

4. Open your browser and navigate to http://localhost:8000/docs to access the Swagger UI documentation and interact with the API.



## API Endpoints
`GET /search`: Search JSON data based on specified criteria.
Query Parameters:
  - `name`: Filter by name (optional).
  - `lastname`: Filter by lastname (optional).
  - `rut`: Filter by RUT (optional).
  - `age_min`: Filter by minimum age (optional).
  - `age_max`: Filter by maximum age (optional).

After receiving the results, you can click on the headers (name, lastname, RUT, or age) to sort the results in ascending order. Clicking on the headers again will sort the results in descending order.


## Example Request
```http
GET /search?name=John&age_min=25&age_max=40
```


## Example Response
```json
{
  "results": [
    {
      "name": "John",
      "lastname": "Doe",
      "rut": "12345678-9",
      "age": 30
    },
    {
      "name": "John",
      "lastname": "Smith",
      "rut": "19876543-2",
      "age": 35
    }
  ]
}
```


## Licence

This project is licensed under the MIT License. See the LICENSE file for more information.

