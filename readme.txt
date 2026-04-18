Objection Crusher AI - Local Run Instructions

1) Save these files in the same folder:
   - index.html
   - styles.css
   - app.js
   - readme.txt

2) Open index.html directly in your browser.
   - Double-click index.html, OR
   - Right click > Open with Chrome / Edge / Firefox.

3) (Optional, recommended) Run a local server for best browser compatibility:
   - If you have Python installed, run:
     python3 -m http.server 5500
   - Then open:
     http://localhost:5500

4) Use the form and click "Crush the Objection".
   - The app simulates a 2-second API loading state.
   - It then renders 3 objection-handling response cards.
   - Each card supports Copy and Share actions.

Notes:
- Tailwind CSS is loaded via CDN in index.html (no build step).
- All frontend logic is in app.js using vanilla JavaScript.
- User inputs are stored in a single appState.userInput object for easy API integration later.
