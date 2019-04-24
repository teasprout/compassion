import csv

import threading

import boto3

from PIL import Image

from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *

import picture_checker as pc
#['Board #', 'Artist Name', 'Grade', 'School / Workshop Location', 'Facilitator Name', 'Artist Statement', 'Contact Info', 'Notes']

class Art:
    def __init__(self, number, name="", grade="",  artist_statement="", image_path="", location=""):
        self.number = number
        self.grade = grade
        self.artist_statement = artist_statement
        self.image_path = image_path
        self.views = 0
        self.image = ""
        self.search_file_path(image_path)
        self.location = location
        if grade == "":
            self.grade = "Community Member"

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
                    'id': int(self.get_number()),
                    'grade': self.grade,
                    'statement': self.artist_statement,
                    'location': self.location,
                    'likes': '0',
                    'views': '0'
                }
            )
            print(self.get_number(), "successfully uploaded")
        except:
            print("Error occured while uploading to database", int(self.get_number()))
            print("blockID:" + self.get_number())
            print("grade:" + self.grade)
            print("statement:" + self.artist_statement)


    def __str__(self):
        return str(self.get_number() + self.grade + self.artist_statement  + self.location + self.image_path)

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        if other.get_number() != self.get_number:
            return False

def load_csv(csv_path, image_path):
    art = {}
    with open(csv_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count > 1:
                number = row[0]
                if number == "" or number in art:
                    line_count += 1

                    continue
                    print("\nNumbering error found on line:", line_count, "Number:", number)
                    if number in art:
                        print("Duplicate blocks found for number", number)
                    print(row)
                a = Art(
                    number=row[0], 
                    name=row[1].lstrip(' '), 
                    grade=row[2].lstrip(' '), 
                    artist_statement=row[5].lstrip(' '),
                    image_path=image_path,
                    location=row[-1]
                )
                print(a)
                art[number] = a
            line_count += 1
    return art         

def cross_reference(artists, pictures):
    for block_id in artist.keys():
        if block_id not in pictures.keys():
            print("Block " + str(block_id) + " is logged in the spreadsheet but doesn't have a picture\n")
    for block_id in pictures.keys():
        if block_id not in artists.keys():
            try:
                print(int(block_id))
            except:
                continue
           print("Block " +  str(block_id) + " has a picture but no entry in the spreadsheet\n")
 

def upload_to_aws(art):
    client = boto3.resource('dynamodb')
    table = client.Table('BlockTable')
    for k,v in art.items():
        print("Uploading: ", k)
        threading.Thread(target=v.upload_to_aws(table)).start()

def main(csv_path="Complete List of Artists and Artist Statements 4.12.19.csv", image_path="MASTER INFORMATION/TCP MASTER PHOTOS/"):
    art_dictionary = load_csv(csv_path, image_path)
    pictures = pc.load_pictures(image_path)
 
    upload_to_aws(art_dictionary)

if __name__ == "__main__":
    main()
