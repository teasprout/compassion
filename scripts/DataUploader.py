import csv

import threading

import boto3

from PIL import Image

from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
#['Board #', 'Artist Name', 'Grade', 'School / Workshop Location', 'Facilitator Name', 'Artist Statement', 'Contact Info', 'Notes']

class Art:
    def __init__(self, number, name="", grade="",  artist_statement="", image_path=""):
        self.number = number
        self.grade = grade
        self.artist_statement = artist_statement
        self.image_path = image_path
        self.views = 0
        self.image = ""
        self.search_file_path(image_path)

    def set_artist_statement(self, artist_statement):
        self.artist_state = artist_statement

    def set_image_path(self, image_path):
        self.image_path

    def get_number(self):
        return self.number

    def get_artist_statement(self):
        return self.artist_statement

    def get_image_path(self, image_path):
        return self.image_path

    def search_file_path(self, folder_path):
        try:
            self.image = open(folder_path + self.number + ".jpg", 'r')
        except FileNotFoundError:
            return 0
        return 1
   
    def all_fields_are_valid(self):
        if self.get_number() == "":
            return False;
        if self.grade == "":
            return False
        if self.statement == "":
            return False
        return True
 
    def exists_in_aws(self, table):
        try:
            response = table.get_item(
                Key={
                    'blockID': int(self.get_number())
                }
            )
            item = response['Item']
        except: 
            return False
        
        return True

    def upload_to_aws(self, table):
        try:
            
            table.put_item(
                Item={
                    'blockID': int(self.get_number()),
                    'grade': self.grade,
                    'statement': self.artist_statement,
                    'location': 'TBD',
                    'likes': '0',
                    'views': '0'
                }
            )
        except:
            print("Error occured while uploading to database", int(self.get_number()))
            print("blockID:" + self.get_number())
            print("grade:" + self.grade)
            print("statement:" + self.artist_statement)


    def __str__(self):
        return str(self.get_number() + self.name + self.grade + self.artist_statement + self.image_path)

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        if other.get_number() == self.get_number() and \
            other.grade == self.grade and \
            other.artist_statement == self.artist_statement:
            return True
        return False            

def process_csv_line(row, line_count, previously_processed_art, image_path):
    number = row[0]
    if number == "":
        print("Numbering error found on line:", line_count, "Number:", number)
        return None
    
    art = Art(
        number=row[0], 
        name=row[1].lstrip(' '), 
        grade=row[2].lstrip(' '), 
        artist_statement=row[5].lstrip(' '),
        image_path=image_path)

    if number in previously_processed_art:
        print("Duplicate blocks found for number", number)
        print(row)
        if previously_processed_art[number] == art:
            print("Resolved duplicated block")
        else:
            del previously_processed_art[number]
    return art

def load_csv(csv_path, image_path):
    art = {}
    with open(csv_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count > 1:
                block = process_csv_line(row, line_count, art, image_path)
                if block is not None: 
                    art[block.get_number()] = block
            line_count += 1
    return art         

def upload_to_aws(art):
    client = boto3.resource('dynamodb')
    table = client.Table('bzncompassion19')
    for k,v in art.items():
        threading.Thread(target=v.upload_to_aws(table)).start()

def main(csv_path="1_25_19.csv", image_path="~/Drive/Classes/Fall 18/Capstone/MASTER INFORMATION/TCP MASTER PHOTOS/"):
    art = load_csv(csv_path, image_path)
##    upload_to_aws(art)

if __name__ == "__main__":
    main()
