/* =============================================================================
 * ArcGIGuess — Configuration
 * =============================================================================
 * This is the ONLY file you should need to edit to make ArcGIGuess your own.
 *
 * ArcGIGuess is a "guess where it is" geography game built on the ArcGIS Maps SDK
 * for JavaScript. Players are shown a landmark's name and photo and must click
 * the map where they think it is. Points are awarded based on how close they get.
 *
 * Everything the game needs — the web map, the layer of landmarks, scoring rules,
 * languages, on-screen text, branding, and the optional leaderboard — is defined
 * below. Change the values, refresh the page, and the game updates.
 *
 * The object is exposed as a global (window.ARCGIGUESS_CONFIG) and is read by
 * script.js. Keep this file loaded BEFORE script.js in index.html.
 * ========================================================================== */

window.ARCGIGUESS_CONFIG = {
    /* -------------------------------------------------------------------------
     * 1. BRANDING
     * ---------------------------------------------------------------------- */

    // The name of your game. Shown in the browser tab, share card, and messages.
    appName: "NCN Map Quiz",

    // A short tagline used in the page title and as the default share-card footer.
    tagline: "A fun map quiz to test your knowledge of the NCN",

    // Text shown at the bottom of the shareable results card.
    // Set to null to fall back to `tagline`.
    shareCardFooter: null,

    // Note: the logo, guess-pin, and README/social screenshot are plain files
    // in the /assets folder — just REPLACE them (keeping the same filenames)
    // rather than pointing config at new paths:
    //   assets/logo.svg        the start-screen & results-card logo
    //   assets/pin.svg         the marker dropped where the player guesses
    //   assets/screenshot.png  the README image and social link-preview

    /* -------------------------------------------------------------------------
     * 2. THE MAP & LANDMARK DATA
     * ---------------------------------------------------------------------- */

    // The portal that hosts your web map. Leave null to use ArcGIS Online.
    // To use ArcGIS Enterprise, set this to your portal's URL, e.g.
    // "https://gis.example.com/portal". The web map, its layers, and any
    // sign-in prompts will all target this portal.
    portalUrl: null,

    // The ArcGIS web map that provides the basemap the player sees.
    // This is the item ID of a web map in ArcGIS Online / Enterprise.
    // If the web map is private, ArcGIS will automatically prompt the player
    // to sign in when the app loads.
    webMapItemId: "9eea057537bf4096a1bf48c3537b0860",

    // The title of the layer (inside the web map above) that holds your
    // landmarks. This layer is hidden during play — its features are the
    // "answers". Each feature should be a polygon (the landmark's footprint).
    landmarkLayerTitle: "Map Quiz",

    // Field names on the landmark layer.
    //   idField   — the unique ID field (used to fetch each landmark's photo).
    //   The per-language name fields are defined in the `languages` array below.
    landmarkIdField: "OBJECTID",

    // How many landmarks to play per game. Set to null to use every landmark
    // in the layer. If you have 40 landmarks and set this to 10, each game
    // picks 10 at random.
    roundsPerGame: null,

    // Whether to randomize landmark order each game. Set to false to always
    // play them in the layer's natural order (handy for a guided/curated tour).
    shuffleLandmarks: false,

    // Let players bail out mid-game: accept their current score (remaining
    // landmarks count as missed) and jump straight to the results screen.
    // Set to false to require finishing every round.
    allowFinishEarly: true,

    /* -------------------------------------------------------------------------
     * 3. SCORING
     * ---------------------------------------------------------------------- */
    // The intro text shown to players is generated automatically from these
    // values, so the explanation can never drift out of sync with the rules.
    //
    // How it works: a guess inside the landmark polygon (or within `bucketMeters`
    // of it) scores the full `pointsForHit`. Beyond that, the player loses
    // `penaltyPerBucket` point(s) for every `bucketMeters` they are off, never
    // dropping below `minScore`.
    scoring: {
        pointsForHit: 10, // Points for a perfect / very close guess.
        bucketMeters: 5000, // Size of each distance "band", in meters.
        penaltyPerBucket: 1, // Points lost per band you are off.
        minScore: 0, // The lowest a single round can score.
    },

    /* -------------------------------------------------------------------------
     * 4. LANGUAGES
     * ---------------------------------------------------------------------- */
    // ArcGIGuess is multilingual. The first language in this array is the default.
    // A toggle button lets players switch between them. To go English-only,
    // simply delete the second entry. To use a different second language,
    // replace the Arabic entry with your own.
    //
    // Each language defines:
    //   code             — a short language code (used for <html lang> and Survey123).
    //   dir              — text direction: "ltr" or "rtl".
    //   toggleLabel      — what the switch-language button says while THIS
    //                      language is active (usually the name of the OTHER language).
    //   landmarkNameField— the field on the landmark layer holding the name in
    //                      this language.
    //   surveyLang       — (optional) language code to pass to the Survey123
    //                      form so it opens in this language. Leave null if not needed.
    //   strings          — every piece of on-screen text, in this language.
    //                      Placeholders in {curly braces} are filled in by the app.
    languages: [
        {
            code: "en",
            dir: "ltr",
            toggleLabel: "العربية",
            landmarkNameField: "Question",
            surveyLang: null,
            strings: {
                welcomeTitle: "Welcome to our NCN map quiz!",
                // {scoringSummary} is generated from the `scoring` block above.
                welcomeDesc:
                    "Test your knowledge! For each question, find the correct location, zoom in, and click on the map to submit your answer<br><br>{scoringSummary}",
                // Template for the auto-generated scoring explanation.
                // Placeholders: {points} {bucket} {penalty} {min}
                scoringSummaryTemplate:
                    "- Find it (or within {bucket}m): <strong>+{points} points</strong><br>- Then <strong>-{penalty} point</strong> for every {bucket}m you're off, down to {min}",
                startButton: "Start Quiz",
                loadingText: "Loading Quizzy Questions...",
                findLandmarkText: "Question:",
                scoreDisplay: "Score: {score}",
                roundDisplay: "Round {current} / {total}",
                confirmButton: "Confirm Guess",
                correctTitle: "Correct!",
                correctMessage:
                    "Well done! You earned <strong>+{roundScore} points</strong>.",
                incorrectTitle: "Oh, so close!",
                incorrectMessage:
                    "You were <strong>{distance}m</strong> away. You earned <strong>{roundScore} points</strong>. Here's the correct location.",
                nextButton: "Next Question",
                finishEarlyButton: "Finish early",
                finishEarlyConfirm: "Tap again to end game",
                gameOverButton: "Show Results",
                gameOverTitle: "Game Over!",
                finalScoreText: "Here are your results:",
                totalScoreLabel: "Total Score",
                accuracyLabel: "Accuracy",
                foundLabel: "Locations Found",
                playAgainButton: "Play Again",
                shareButton: "Share Results",
                // {score}, {appName}, and {url} (from social.url) are available.
                shareText:
                    "I scored {score} points in {appName}! How much can you score? Play at {url}",
                shareCardTitle: "My {appName} Score!",
                shareCardScoreLabel: "Total Score",
                shareCardAccuracyLabel: "Accuracy",
                shareModalTitle: "Share Your Results!",
                shareModalDesc:
                    "Right-click or long-press the image to save and share it.",
                webMapError: "Could not load the web map. Please check the ID.",
                layerError:
                    "Could not find the landmark layer in the web map. Check the layer title in config.js.",
                submitScoreButton: "Submit Score",
                viewLeaderboardButton: "Leaderboard",
                submitModalTitle: "Submit Your Score",
                leaderboardModalTitle: "Top Scorers",
                leaderboardLoadingText: "Loading leaderboard...",
                leaderboardError:
                    "Could not load leaderboard data. Please try again later.",
                noScores: "No scores submitted yet.",
                points: "points",
            },
        },
  
    ],

    /* -------------------------------------------------------------------------
     * 5. SOCIAL SHARING (link previews)
     * ---------------------------------------------------------------------- */
    // Controls the preview card shown when your game's LINK is shared on
    // WhatsApp, LinkedIn, Facebook, X/Twitter, Slack, iMessage, etc.
    //
    // ⚠️ IMPORTANT: those services scrape your page WITHOUT running JavaScript,
    // so they read the <meta> tags in index.html — not this file. The values
    // below are mirrored into those tags at runtime (handy for local use and
    // JS-aware tools), but for guaranteed link previews you should ALSO paste
    // the same values into the matching <meta> tags in index.html <head>.
    // See the README's "Social sharing" section.
    social: {
        // Headline shown on the preview card.
        title: "NCN Map Quiz — Can you find the locations?",
        // One-line description under the headline.
        description:
            "A quick geo-guessing game: we ask you a question, you pin it on the map. How well do you know the NCN?",
        // Preview image. Use an ABSOLUTE URL for reliable previews.
        // Recommended size: ~1200×630px. Reusing the README screenshot here.
        image: "https://aelhussiny.github.io/ArcGIGuess/assets/screenshot.png",
        // The public URL where the game is hosted (used for og:url).
        url: "https://aelhussiny.github.io/ArcGIGuess",
        // Your X/Twitter handle including the @ (optional).
        twitterHandle: "",
    },

    /* -------------------------------------------------------------------------
     * 6. LEADERBOARD (optional)
     * ---------------------------------------------------------------------- */
    // ArcGIGuess can let players submit their score through an ArcGIS Survey123
    // form and view a public leaderboard. This is completely optional.
    //
    // Set `enabled: false` to hide the "Submit Score" and "Leaderboard" buttons
    // entirely — the game works fine without it.
    //
    // To use it you need:
    //   1. A Survey123 form that collects a name and a score.
    //   2. A public (or shared) view of that form's feature layer to read scores from.
    leaderboard: {
        enabled: true,

        // The share URL of your Survey123 form.
        survey123Url:
            "https://arcg.is/18bTry5",

        // The Survey123 field to pre-fill with the player's score.
        // Format is "field:<your_field_name>".
        submitScoreFieldId: "field:score",

        // The FeatureServer query endpoint used to READ the leaderboard.
        // Point this at a public view of your survey's results layer.
        dataApiUrl:
            "https://services5.arcgis.com/1ZHcUS1lwPTg4ms0/arcgis/rest/services/survey123_1f7a4006065d4351815d2a7a120373ea/FeatureServer",

        // The fields in that layer used to display the leaderboard.
        firstNameField: "name",
        scoreField: "score",

        // How many top scores to show.
        topN: 10,
    },
};
