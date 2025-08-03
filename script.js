// ================================================================== //
//  GAME ENGINE v9.0 - "最终安可版"
// ================================================================== //

document.addEventListener('DOMContentLoaded', () => {
    const history = document.getElementById('history');
    const commandInput = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');
    const prompt = document.getElementById('prompt');

    let commandHistory = [], historyIndex = -1, currentPuzzleIndex = 0;
    let cwd, cwdPath = [], gameState = 'playing'; // 'playing', 'shutdown', 'encore'

    function print(message, className) {
        const p = document.createElement('p');
        p.innerHTML = message.replace(/\n/g, '<br>');
        if (className) p.className = className;
        history.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function updatePrompt() {
        const puzzle = currentPuzzle();
        let path = '';
        if (puzzle && puzzle.type === 'filesystem') {
            path = ` ~/${cwdPath.slice(1).join('/')}`;
        } else if (puzzle && puzzle.id === 'genesis_protocol') {
            path = ' /';
        }
        prompt.textContent = `[agent@local${path}]$`;
    }

    function printCommand(command) {
        print(`${prompt.textContent} ${command}`, 'output-command');
    }

    function currentPuzzle() {
        return gameData.puzzles[currentPuzzleIndex];
    }
    
    function findPuzzleById(id) {
        return gameData.puzzles.find(p => p.id === id);
    }

    function advanceToNextPuzzle() {
        if(currentPuzzle().isDynamic) {
            winGame();
            return;
        }
        currentPuzzleIndex++;
        if (currentPuzzleIndex < gameData.puzzles.length) {
            startPuzzle(currentPuzzle());
        } else {
            winGame();
        }
    }

    async function winGame() {
        history.innerHTML = '';
        print(gameData.finalReward.art);
        await sleep(500);
        print(gameData.finalReward.message, 'output-system');
        await sleep(1000);
        print(gameData.finalReward.closingSequence, 'output-system');
        
        // 保存进度到本地存储
        saveProgress();
        
        commandInput.disabled = true;
        prompt.style.display = 'none';
        
        // Encore sequence
        await sleep(3000);
        gameState = 'encore';
        print(gameData.encore.prompt, 'output-system');
        commandInput.disabled = false;
        prompt.textContent = '>';
        prompt.style.display = 'inline';
    }
    
    function saveProgress() {
        const progress = {
            completed: true,
            completionDate: new Date().toISOString(),
            trophyId: 'Trophy-2025.08.04',
            agent: '小松鼠',
            message: 'World brilliant for your birth.',
            version: 'v9.1'
        };
        
        try {
            localStorage.setItem('birthday_protocol_progress', JSON.stringify(progress));
            console.log('Progress saved to localStorage');
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }
    
    function loadProgress() {
        try {
            const saved = localStorage.getItem('birthday_protocol_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                if (progress.completed) {
                    return progress;
                }
            }
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
        return null;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function startPuzzle(puzzle) {
        if (puzzle.prompt) print(puzzle.prompt, 'output-system');
        if (puzzle.type === 'filesystem') {
            const rootDirName = Object.keys(puzzle.fileSystem)[0];
            cwd = puzzle.fileSystem[rootDirName];
            cwdPath = [rootDirName];
        }
        updatePrompt();
    }

    function handleCommand(command) {
        if (gameState === 'encore') {
            handleEncore(command);
            return;
        }

        printCommand(command);
        const [cmd, ...args] = command.trim().split(' ').filter(Boolean);
        const puzzle = currentPuzzle();

        if (puzzle.type === 'special_command_gate') {
            if (command.toLowerCase() === puzzle.triggerCommand) {
                print(puzzle.errorMessage, 'output-error');
                const nextPuzzle = findPuzzleById(puzzle.nextPuzzleId);
                if (nextPuzzle) {
                    currentPuzzleIndex = gameData.puzzles.indexOf(nextPuzzle);
                    startPuzzle(currentPuzzle());
                }
            } else {
                print(`Error: command not found: ${command}`, 'output-error');
            }
            return;
        }

        switch (cmd) {
            case 'help': print(gameData.helpMessage); break;
            case 'clear': history.innerHTML = ''; break;
            case 'submit': handleSubmit(args.join(' ')); break;
            case 'ls': handleLs(args[0]); break;
            case 'cat': handleCat(args.join(' ')); break;
            case 'cd': handleCd(args.join(' ')); break;
            case 'initiate': if (args.join(' ') === 'world') handleCommand('initiate world'); else print(`Error: Unknown protocol '${args.join(' ')}'`, 'output-error'); break;
            case undefined: break;
            default: print(`Error: command not found: ${cmd}`, 'output-error');
        }
        updatePrompt();
    }
    
    function handleEncore(command) {
        print(`> ${command}`, 'output-command');
        if (command.toLowerCase() === gameData.encore.trigger) {
            print(gameData.encore.log, 'output-system');
        } else {
            print("Command not recognized.", "output-error");
        }
        commandInput.disabled = true;
        prompt.style.display = 'none';
    }

    function handleSubmit(answer) {
        const puzzle = currentPuzzle();
        if (!puzzle.answer) { print(`Error: 'submit' is not a valid command here.`, 'output-error'); return; }
        if (answer.toLowerCase() === puzzle.answer.toLowerCase()) {
            if (puzzle.successMessage) print(puzzle.successMessage, 'output-system');
            if (puzzle.isDynamic) winGame(); else advanceToNextPuzzle();
        } else {
            if (puzzle.failMessage) print(puzzle.failMessage, 'output-error');
        }
    }
    
    function checkFilesystemAccess() {
        const type = currentPuzzle().type;
        if (type !== 'filesystem') { print('Error: Filesystem commands not available in this context.', 'output-error'); return false; }
        return true;
    }

    function handleLs(arg) { if (checkFilesystemAccess()) { let showHidden = arg === '-a'; const children = cwd.children; const items = Object.keys(children).filter(key => showHidden || !key.startsWith('.')).map(key => children[key].type === 'dir' ? `${key}/` : key); print(items.join('\n')); }}
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
    
    // 检查是否有已保存的进度
    const savedProgress = loadProgress();
    if (savedProgress) {
        print(`[SYSTEM_RESTORE] 检测到已封存的进度记录。`);
        print(`Trophy ID: ${savedProgress.trophyId}`);
        print(`Agent: ${savedProgress.agent}`);
        print(`Completion Date: ${new Date(savedProgress.completionDate).toLocaleString()}`);
        print(`Message: "${savedProgress.message}"`);
        print(`Version: ${savedProgress.version}`);
        print(`\n[NOTE] 此会话已被永久封存。如需重新体验，请清除浏览器数据。`);
        commandInput.disabled = true;
        prompt.style.display = 'none';
        return;
    }
    
    print(gameData.welcomeMessage);
    startPuzzle(currentPuzzle());
});
