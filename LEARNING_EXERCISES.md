<!-- LC_TASK_LINKS_START -->
# Task Links

- [x] **fs_import**: [server.js:4](vscode://dr-offig.learning-copilot/openTaskLink?path=c%3A%5CUsers%5Cmjbis%5CDocuments%5CGitHub%5CDES307_Journal%5Cserver.js&line=4) <!-- LC_TASK_LINK|server.js|fs_import -->

<!-- LC_TASK_LINKS_END -->

---

# Learning Exercises: Adding the fs Module Import

## Overview
Your server was crashing when trying to fetch markdown notes because the `fs` module was never imported. Node.js requires explicit module imports at the top of your file before you can use those functions. This exercise focuses on understanding why `fs` is needed and how to properly import it.

## Task
**Task ID: `fs_import`** - Add the missing `fs` module import statement at line 4 in `server.js`. Use the same pattern as the other `require()` statements already in the file.

## Comprehension Questions

[CQ1] Why does the `/api/notes` endpoint need the `fs` module?

[CQ2] What would happen if you tried to run `node server.js` and call the `/api/notes` endpoint without importing the `fs` module?

[CQ3] Look at the existing `require()` statements in the file. What is the pattern for importing Node.js modules?

[CQ4] The `fs` module is called a "built-in" module. What does that mean, and how is it different from the `express` module?

[CQ5] In the `/api/notes` endpoint, two `fs` functions are used: `fs.readdir()` and `fs.readFileSync()`. What does each one do?

[CQ6] After you add the `fs` import, what should you do to verify that your fix works?