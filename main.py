from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import Optional
import json

app = FastAPI()
app.mount("/static", StaticFiles(directory="./static"), name="static")


async def perform_search(
    name: Optional[str] = None,
    lastname: Optional[str] = None,
    rut: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None
):

    with open('data.json') as file:
        data = json.load(file)

    results = data

    if name:
        results = [person for person in results if name.lower() in person['nombre'].lower()]

    if lastname:
        results = [person for person in results if lastname.lower() in person['apellido'].lower()]

    if rut:
        results = [person for person in results if rut.lower() in person['rut'].lower()]

    if min_age:
        results = [person for person in results if person['edad'] >= min_age]

    if max_age:
        results = [person for person in results if person['edad'] <= max_age]

    return results


@app.get("/")
def get_index():
    return FileResponse("index.html")


@app.get("/search")
async def search(
    name: Optional[str] = None,
    lastname: Optional[str] = None,
    rut: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None
):
    results = await perform_search(
        name=name,
        lastname=lastname,
        rut=rut,
        min_age=min_age,
        max_age=max_age
    )
    return results
