#!/bin/bash

source fastapi/Scripts/activate
uvicorn main:app --reload