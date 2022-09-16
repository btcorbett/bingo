from flask import Flask, request, render_template
from threading import Thread
import random

app = Flask('')


@app.route('/')
def home():
    numbers = generate_numbers()
    return render_template('index.html',
                           phrase=list('bingo'.upper()),
                           numbers=numbers)


def run():
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)


def t_serve():
    t = Thread(target=run)
    t.start()


t_serve()


def generate_numbers(cols=5, size=75):
    numbers = []
    for i in range(0, cols):
        colnums = []
        numstart = int((size / 5) * i) + 1
        numend = int(numstart + (size / 5))
        nums = list(range(numstart, numend))
        for j in range(0, 5):
            if i == 2 and j == 2:
                colnums.append('♥')
            else:
                addnum = nums[random.randint(0, len(nums) - 1)]
                colnums.append(addnum)
                try:
                    nums.remove(addnum)
                except:
                    return 'error'
        numbers.append(colnums)
    return numbers
