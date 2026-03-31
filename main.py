from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from torchvision import datasets, transforms
import random

app = FastAPI()

mnist_test = datasets.MNIST(
    root="data",
    train=False,
    download=True,
    transform=transforms.ToTensor(),
)

@app.get("/number")
async def get_number():
    return (7)

@app.get("/random-image")
async def get_image():
    idx = random.randint(0, len(mnist_test) - 1)
    image,label = mnist_test[idx]
    return {"image": image.squeeze(0).tolist(), "label": label}

app.mount("/", StaticFiles(directory="static", html=True), name="static")