from typing import List
from pandas import read_csv
from fuzzywuzzy import fuzz, process

class PoengProcessing:

    def __init__(self, csv_path):
        self.df = read_csv(csv_path)

    def get_poengrense_fuzzy(self,query: str = ""):
        return process.extract(query, self.choices(), limit=5)

    def get_full_poengrenser(self,study: str):
        df = self.df
        return df.loc[(df['Studienavn'] == study) & (df['Opptaksfase'] == 'Hovedopptak') & (df['Kvote'].isin(('ORD','ORDF'))) & (df['År']==2020)]

    def get_poengrenser(self, study: str):
        return self.get_full_poengrenser(study)[['Studienavn', 'Studiested', 'Poenggrense', 'Kvote']]

    def get_locations_from_study(self, study:str):
        return self.get_full_poengrenser(study)[['Studiested']].drop_duplicates().values

    def choices(self):
        return [item for sublist in self.df[['Studienavn']].drop_duplicates().values.tolist() for item in sublist]

