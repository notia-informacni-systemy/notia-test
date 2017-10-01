# Zadání testovacího projektu
- Úkolem je si vyzkoušet vývoj full-stack aplikace, tedy frontend, backend a databázovou část
- Zadání je spíše volnějšího rázu, lze si vymyslet, přidat nebo změnit cokoliv

### Osnova
Jedná se o aplikaci na zpracování (expedici) objednávek.

**Situace:** Expedient je ve skladu a balí objednávku. Vezme papír s vytištěnou objednávkou a sejme její čarový EAN kód.
V aplikaci uvidí seznam položek, které musí zabalit. Bere je tedy postupně do ruky, "odpípne" je čtečkou kódů a dá do balíku.
Až zabalí všechny, objednávku uzavře.

1. Uživatel, který je identifikován svým EAN kódem, se nejprve přihlásí do aplikace
   - Informace o přihlášeném uživateli budou od této doby zobrazené v horní části obrazovky (viz *doc/example.jpg*) 
2. Uživatel napíše (zadá čtečkou kódů) do vyhledávacího pole EAN kód objednávky
   - Načtou se položky objednávky a zobrazí se v seznamu (viz *doc/example.jpg*)
3. Do vyhledávacího pole bude nyní uživatel zadávat EAN kód jednotlivých položek v objednávce.
   - Pokud se jedná o položku, jejíž množství je vyšší než 1, zobrazí se číselník, kde se musí zadat počet položek, které se ve 
   skutečnosti balí 
     - Situace: Mám v objednávce položku A s množstvím 2. V ruce mám však jen jednu položku A. Číselníkem 
   tak potvrdím, že jsem zatím zabalil pouze 1 položku A, tím pádem ještě 1 zbývá
4. Po zabalení všech položek se tlačítkem uzavře objednávka. U položek a u objednávky se uloží, který uživatel je expedoval.
   - Pokud má uživatel speciální oprávnění (sloupec *superuser* v databázi), může ukončit nekompletní objednávku


![Ukázka](example.jpg)

### Databáze
- Databáze je PostgreSQL. Konfigurace připojení je popsána v README.md.
- O heslo je mi třeba napsat na (adam . podrouzek (zavinac) gmail . com)

![Schéma databáze](database.png)
