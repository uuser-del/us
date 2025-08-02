// ================================================================== //
//  GAME ENGINE v4 - "最终版"
//  支持多谜题类型，包含增强引导和验证系统
// ================================================================== //

document.addEventListener('DOMContentLoaded', () => {
    const history = document.getElementById('history');
    const commandInput = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');
    const prompt = document.getElementById('prompt');

    let commandHistory = [], historyIndex = -1, currentPuzzleIndex = 0;
    let cwd, cwdPath = [], verifiedFacts = new Set();
    let finalPuzzleFailCount = 0, hintRequestCount = 0;

    function print(message, className) {
        const p = document.createElement('p');
        p.innerHTML = message.replace(/\n/g, '<br>');
        if (className) p.className = className;
        history.appendChild(p);
    }

    function updatePrompt() {
        const puzzle = currentPuzzle();
        let path = '';
        if (puzzle.type === 'filesystem' || puzzle.type === 'verification') {
            path = ` ~/${cwdPath.slice(1).join('/')}`;
        }
        prompt.textContent = `[agent@local${path}]$`;
    }

    function printCommand(command) {
        print(`${prompt.textContent} ${command}`, 'output-command');
    }

    function currentPuzzle() {
        return gameData.puzzles[currentPuzzleIndex];
    }

    function advanceToNextPuzzle() {
        currentPuzzleIndex++;
        if (currentPuzzleIndex < gameData.puzzles.length) {
            startPuzzle(currentPuzzle());
        } else {
            winGame();
        }
    }

    function winGame() {
        history.innerHTML = '';
        print(gameData.finalReward.art);
        print(gameData.finalReward.message, 'output-system');
        commandInput.disabled = true;
        prompt.style.display = 'none';
    }

    function startPuzzle(puzzle) {
        if (puzzle.prompt) print(puzzle.prompt, 'output-system');
        
        if (puzzle.type === 'filesystem' || puzzle.type === 'verification') {
            const rootDirName = Object.keys(puzzle.fileSystem)[0];
            cwd = puzzle.fileSystem[rootDirName];
            cwdPath = [rootDirName];
        }

        if (puzzle.type === 'verification') {
            verifiedFacts.clear();
        }
        
        finalPuzzleFailCount = 0;
        hintRequestCount = 0;
        updatePrompt();
    }

    function handleCommand(command) {
        printCommand(command);
        const [cmd, ...args] = command.trim().split(' ').filter(Boolean);
        const puzzle = currentPuzzle();

        if (puzzle.type === 'special_command') {
            handleFinalPuzzle(command);
            return;
        }

        switch (cmd) {
            case 'help': print(gameData.helpMessage); break;
            case 'clear': history.innerHTML = ''; break;
            case 'submit': handleSubmit(args.join(' ')); break;
            case 'verify': handleVerify(args.join(' ')); break;
            case 'ls': handleLs(); break;
            case 'cat': handleCat(args.join(' ')); break;
            case 'cd': handleCd(args.join(' ')); break;
            case undefined: break;
            default: print(`Error: command not found: ${cmd}`, 'output-error');
        }
        updatePrompt();
    }

    function handleSubmit(answer) {
        const puzzle = currentPuzzle();
        if (puzzle.type !== 'filesystem' && puzzle.type !== 'simple_submit') {
             print(`Error: 'submit' is not a valid command here.`, 'output-error');
             return;
        }
        if (answer.toLowerCase() === puzzle.answer.toLowerCase()) {
            if (puzzle.successMessage) print(puzzle.successMessage, 'output-system');
            advanceToNextPuzzle();
        } else {
            if (puzzle.failMessage) print(puzzle.failMessage, 'output-error');
        }
    }

    function handleVerify(filename) {
        const puzzle = currentPuzzle();
        if (puzzle.type !== 'verification') {
            print(`Error: 'verify' is not a valid command here.`, 'output-error');
            return;
        }

        if (!filename) { print('Usage: verify [filename]', 'output-system'); return; }
        
        const file = cwd.children[filename];
        if (!file) {
            print(`Error: No such file: ${filename}`, 'output-error');
            return;
        }

        if (puzzle.factsToVerify.includes(filename)) {
            if (verifiedFacts.has(filename)) {
                print(`Fact '${filename}' already verified.`, 'output-system');
            } else {
                verifiedFacts.add(filename);
                print(`Fact confirmed. Assimilating... [${verifiedFacts.size}/${puzzle.factsToVerify.length}]`, 'output-system');

                if (verifiedFacts.size === puzzle.factsToVerify.length) {
                    if (puzzle.successMessage) print(puzzle.successMessage, 'output-system');
                    advanceToNextPuzzle();
                }
            }
        } else {
            if (puzzle.failMessage) print(puzzle.failMessage, 'output-error');
        }
    }

    function checkFilesystemAccess() {
        const type = currentPuzzle().type;
        if (type !== 'filesystem' && type !== 'verification') {
            print('Error: Filesystem commands not available in this context.', 'output-error');
            return false;
        }
        return true;
    }

    function handleLs() { if (checkFilesystemAccess()) print(Object.keys(cwd.children).map(key => cwd.children[key].type === 'dir' ? `${key}/` : key).join('\n')); }
    function handleCat(filename) { if (checkFilesystemAccess()) { if (!filename) { print('Usage: cat [filename]', 'output-system'); return; } const file = cwd.children[filename]; if (file?.type === 'file') print(file.content); else print(`Error: No such file: ${filename}`, 'output-error'); }}
    function handleCd(dirname) {
        if (!checkFilesystemAccess()) return;
        if (!dirname) { print('Usage: cd [dirname]', 'output-system'); return; }
        if (dirname === '..') { if (cwdPath.length > 1) cwdPath.pop(); }
        else { const dir = cwd.children[dirname]; if (dir?.type === 'dir') cwdPath.push(dirname); else { print(`Error: No such directory: ${dirname}`, 'output-error'); return; } }
        let newCwd = currentPuzzle().fileSystem;
        cwdPath.forEach(p => newCwd = newCwd[p] ?? newCwd.children[p]);
        cwd = newCwd;
    }

    function handleFinalPuzzle(command) {
        const puzzle = currentPuzzle();
        const [cmd] = command.trim().split(' ');
        if (command.toLowerCase() === puzzle.answer) { winGame(); return; }
        if (cmd === 'request_hint') { hintRequestCount++; const hintKey = `request_hint_${hintRequestCount}`; print(puzzle.specialHints[hintKey] || "No more hints available.", 'output-system'); return; }
        print(puzzle.specialHints[cmd] || `Command '${command}' not recognized in this context.`, 'output-error');
        finalPuzzleFailCount++;
        if (finalPuzzleFailCount === 3) print("\nSystem Integrity Check: You seem to be stuck. The 'request_hint' protocol is now available.", "output-system");
    }

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim() !== '') {
            const command = commandInput.value; handleCommand(command); commandHistory.unshift(command); historyIndex = -1; commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); if (historyIndex < commandHistory.length - 1) { historyIndex++; commandInput.value = commandHistory[historyIndex]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); if (historyIndex > 0) { historyIndex--; commandInput.value = commandHistory[historyIndex]; } else { historyIndex = -1; commandInput.value = ''; }
        }
    });
    
    terminal.addEventListener('click', () => commandInput.focus());
    print(gameData.welcomeMessage);
    startPuzzle(currentPuzzle());
});
