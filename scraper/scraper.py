from selenium import webdriver
from selenium.webdriver.common.by import By
import json

FIRST_VALID_YEAR = 2013
FINALS_ROUNDS_COUNT = 4
BASE_URL = "https://www.nrl.com/draw/?competition=111"
OUTPUT_FILE = "scores.json"

options = webdriver.ChromeOptions()
options.page_load_strategy = "eager"
driver = webdriver.Chrome(options=options)

score_dict = {

}

def get_round_urls(round: int, season: int) -> list:
    driver.get(f"{BASE_URL}&round={round}&season={season}")
    match_anchors = driver.find_elements(By.CLASS_NAME, "match--highlighted")
    return [anchor.get_attribute("href") for anchor in match_anchors]

def get_game_score(url: str) -> tuple:
    driver.get(url)

    #Random games where nrl.com forgot to put the match data in
    if "2020/round-8/titans-v-sharks/" in url:
        return (10, 12)
    if "2021/round-7/storm-v-warriors/" in url:
        return (26, 4)
    if "2021/round-13/knights-v-eels/" in url:
        return (0, 22)
    if "2021/round-19/cowboys-v-storm/" in url:
        return (6, 10)

    match_summary_divs = driver.find_elements(By.CLASS_NAME, "match-centre-summary-group__title")
    half_time_content = match_summary_divs[-1].text
    home_score = half_time_content.splitlines()[1]
    away_score = half_time_content.splitlines()[3]
    return (home_score, away_score)

def final_round(season: int) -> int:
    driver.get(f"{BASE_URL}&round=1&season={season}")
    filter_dropdown_div = driver.find_element(By.CLASS_NAME, "filter-dropdown__options--round")
    children = filter_dropdown_div.find_elements(By.XPATH, "./*")
    return len(children) - FINALS_ROUNDS_COUNT

for season in range(FIRST_VALID_YEAR, 2026):

    score_dict[season] = {}
    LAST_ROUND = final_round(season)

    for round in range(1, LAST_ROUND + 1):

        score_dict[season][round] = {}
        urls = get_round_urls(round, season)

        for game in range (len(urls)):
            scores = get_game_score(urls[game])
            score_dict[season][round][game] = {
                "home": scores[0],
                "away": scores[1]
            }

with open(OUTPUT_FILE, "w") as file:
    json.dump(score_dict, OUTPUT_FILE, indent=4)