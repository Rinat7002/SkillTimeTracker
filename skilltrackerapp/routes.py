# -*- coding: utf-8 -*-
# Подключаем объект приложения Flask из __init__.py
from skilltrackerapp import app #,db
# Подключаем библиотеку для "рендеринга" html-шаблонов из папки templates
from flask import render_template, make_response, request, Response, jsonify, json


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Главная')

@app.route('/skills')
def skills():
    return render_template('skills-page.html', title='Мои навыки')

@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html', title='О нас')