# [Poenggrenser](https://poenggrenser.xyz)
Enkel måte å sjekke hva poengrensene er. Kun for 2019

## Hensikt
Hensikten med dette prosjektet var å se hva jeg kunnne gjøre med begrenset tid. Nettsiden har en del bugs men skal funke ganske greit til bruket. 

## Arkitektur
* Flask applikasjon deployet til Elastic Beanstalk med Application Load Balancer for HTTPS
* Typescript/React deployet til Netlify 
* Bruker pandas for å gjøre det enklere å jobbe med rader og kolonner, fuzzywuzzy for fuzzy søk og som nevnt Flask for å gjøre det til en webapplikasjon


## One Day Project
For øyeblikket er tjenesten hostet på gratisplanen til Heroku. Derfor går backenden i dvale og forespørsler kan ofte ta opp til 30 sekunder hvis den ikke har møtt noe trafikk på en stund. 

[poengrenser.xyz](https://poenggrenser.xyz)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5f24691-0645-4d6d-9f06-a983d94d41dc/deploy-status)](https://app.netlify.com/sites/epic-almeida-dc8e18/deploys)


