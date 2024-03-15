# -*- coding: utf-8 -*-
# Подключаем объект приложения Flask из __init__.py
from skilltrackerapp import app, db
# Подключаем библиотеку для "рендеринга" html-шаблонов из папки templates
from flask import render_template, make_response, request, Response, jsonify, json

