# Dokumenthanteringssystem

Detta är ett skolprojekt som är byggt med [Next.js](https://nextjs.org/).

## Bakgrund till projektet
Du har fått en kund som vill bygga ett eget system för att skapa digitala dokument. Kunden vill kunna se en översiktslista med alla skapade dokument, skapa nya, redigera och ta bort de som redan finns där. När kunden tittar på ett skapat dokument så skall det finnas möjlighet att se dokumentet både “live”, dvs utan redigeringsläget, samt i redigeringsläge.

## Bygga och köra projektet

För att bygga och köra projektet lokalt, följ stegen nedan:

1. **Klona projektet**  
   Klona detta projekt till din lokala maskin genom att köra följande kommando i din terminal:
   ```bash
    git clone https://github.com/ThereseHagwall/documentsystem.git
2. **Navigera till projektmappen**  
  Gå till projektmappen genom att köra
    ```bash
    cd documentsystem
3. **Öppna din favorit IDE, t.ex. vs Code**
    ```bash
     code .
4. **Skapa en .env.local-fil**  
   Skapa en .env-fil i rotmappen och lägg till din databas-koppling. Du behöver också skapa ett konto på [tinyCloud](https://www.tiny.cloud/) om du inte vill få upp ett litet meddelande om att det fattas en nykel till api när du använder editorn.  
    ```bash
    DB_PORT = YOUR_KEY_HERE
    DB_HOST = YOUR_KEY_HERE
    DB_NAME = YOUR_KEY_HERE
    DB_USER = YOUR_KEY_HERE
    DB_PASSWORD = YOUR_KEY_HERE
    NEXT_PUBLIC_TINY_API_KEY = YOUR_KEY_HERE
5. **Installera beroenden**
   ```bash
   npm install
6. **Bygga klienten och starta servern**
    ```bash
    npm run dev

Öppna [http://localhost:3000](http://localhost:3000) för att se din applikation.

