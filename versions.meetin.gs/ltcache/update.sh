#!/bin/bash
git pull
echo ""
date


echo "**** Fetching reps"
echo "curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolareps:kfvvkelbtpphgzrd' > reps.json"
ls -la reps.json
curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolareps:kfvvkelbtpphgzrd' > reps.json
ls -la reps.json

echo ""
date
echo "**** Fetching offices"
echo "curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolaoffices:yukyyamgamjgdsjz' > offices.json"
ls -la offices.json
curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolaoffices:yukyyamgamjgdsjz' > offices.json
ls -la offices.json

echo ""
date
echo "**** Fetching admins"
echo "curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolaadmins:npunaoxuziaausdg' > admins.json"
ls -la admins.json
curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolaadmins:npunaoxuziaausdg' > admins.json
ls -la admins.json

echo ""
date
echo "**** Fetching translations"
echo "curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolatranslations:gkyaawkzqaybxsni' > translations.json"
ls -la translations.json
curl -s 'https://meetings-gapier.appspot.com/fetch?worksheet_token=lahitapiolatranslations:gkyaawkzqaybxsni' > translations.json
ls -la translations.json

echo ""
date
echo ""
echo "**** Adding versions and committing to git..."
echo ""
git add .
git commit -m 'updated ltreps'
echo ""
echo "If the version listings look good, just run 'git push'"
