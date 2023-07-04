# FastSearchAPI

Efficient FastAPI implementation for searching JSON data by name, lastname, RUT, and age filters. Seamlessly filter and retrieve specific individuals or apply complex criteria. Simplify data retrieval with FastSearchAPI.

## Usage

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/FastSearchAPI.git

2. pip install -r requirements.txt
   ```shell
   pip install -r requirements.txt

3. Start the FastAPI server:
   ```
   uvicorn main:app --reload

4. Open your browser and navigate to http://localhost:8000/docs to access the Swagger UI documentation and interact with the API.


##API Endpoints
GET /search: Search JSON data based on specified criteria.
Query Parameters:
  - name: Filter by name (optional).
  - lastname: Filter by lastname (optional).
  - rut: Filter by RUT (optional).
  - age_min: Filter by minimum age (optional).
  - age_max: Filter by maximum age (optional).
