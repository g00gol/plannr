FROM python:3.8

WORKDIR /server
COPY . .
COPY .env .env

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
ENV NAME World

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
