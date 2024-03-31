# for CRUD operations

from skilltrackerapp import db
from datetime import datetime
from sqlalchemy import text
from flask import session, make_response, redirect, url_for, jsonify
import bcrypt

# Получаем запрос с фильтром по id
def get_contact_req_by_id(id):
    stmt = text(f"SELECT * FROM contactrequests WHERE id = {id}")
    result = db.session.execute(stmt).fetchone()
    if result:
        return dict(result._asdict())
    else:
        return None

# Получаем список всех запросов.
def get_contact_req_all():
    try:
        result = []  # создаем пустой список
        # Получаем итерируемый объект, где содержатся все строки таблицы contactrequests
        stmt = text("SELECT * FROM contactrequests")
        rows = db.session.execute(stmt).fetchall()
        # Каждую строку конвертируем в словарь
        for row in rows:
            row_dict = dict(row._mapping.items())
            result.append(row_dict)
        # Возвращаем словарь с ключом 'contactrequests', где значение - это список словарей с информацией
        return {'contactrequests': result}
    except Exception as e:
        # Обработка ошибок
        return {'error': str(e)}



# Получаем все запросы по имени автора
def get_contact_req_by_author(firstname):
    result = []
    stmt = text(f"SELECT * FROM contactrequests WHERE firstname = '{firstname}'")
    rows = db.session.execute(stmt).fetchall()
    for row in rows:
        row_dict = dict(row._mapping.items())
        result.append(row_dict)
        # result.append(dict(row))
    return {'contactrequests': result}





# Создать новый запрос
def create_contact_req(json_data):
    try:
        cur_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")     # текущая дата и время

        # Используйте text() для объявления текстового SQL-выражения
        stmt = text("INSERT INTO contactrequests (firstname, email, reqtype, reqtext, createdAt, updatedAt) "
                    "VALUES (:firstname, :email, :reqtype, :reqtext, :createdAt, :updatedAt)")

        # Выполните SQL-выражение с использованием параметров
        db.session.execute(stmt, {
            'firstname': json_data['firstname'],
            'email': json_data['email'],
            'reqtype': json_data['reqtype'],
            'reqtext': json_data['reqtext'],
            'createdAt': cur_time,
            'updatedAt': cur_time
        })

        # Подтвердите изменения в БД
        db.session.commit()

        # Возвращаем результат
        return {'message': "ContactRequest Created!"}

    except Exception as e:
        # Откатываем изменения в БД
        db.session.rollback()
        # Возвращаем dict с ключом 'error' и текстом ошибки
        return {'message': str(e)}





# Удалить запрос по id в таблице
def delete_contact_req_by_id(id):
    try:
        # DELETE запрос в БД
        stmt = text(f"DELETE FROM contactrequests WHERE id = {id}")
        db.session.execute(stmt)
        db.session.commit()
        return {'message': "ContactRequest Deleted!"}
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}

# Обновить текст запроса по id в таблице
def update_contact_req_by_id(id, json_data):
    try:
        cur_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # текущая дата и время
        # UPDATE запрос в БД
        stmt = text(f"UPDATE contactrequests SET reqtext = '{json_data['reqtext']}', "f"updatedAt = '{cur_time}' WHERE id = {id}")
        db.session.execute(stmt)
        db.session.commit()
        return {'message': "ContactRequest Updated!"}
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}