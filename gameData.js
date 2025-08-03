// ================================================================== //
//  GAME DATA v9.1 - "合作者签名" 最终版
// ================================================================== //

const gameData = {

    welcomeMessage: `
Connecting to remote server...
Connection established.
AUTH: Welcome, agent.
TASK: Birthday Protocol initiated.
TARGET: Assimilate subject's personality and deliver payload.
HINT: Type 'help' to see available commands.
      Good luck.
`,

    helpMessage: `
Available commands:
  help      - Show this help message.
  ls [-a]   - List files and directories. Use -a to show hidden files.
  cd [dir]  - Change directory.
  cat [file]- Display the content of a file.
  submit [answer] - Submit an answer for a challenge.
  initiate world - Execute the final protocol.
`,

            finalReward: {
        art: `
      ******       ******
    **********   **********
  ************* *************
 *****************************
 *****************************
 *****************************
  ***************************
    ***********************
      *******************
        ***************
          ***********
            *******
              ***
               *
`,
        message: "World brilliant for your birth.",
        closingSequence: `

人格矩阵校准协议已完成。
所有异常行为日志已归档。
本次会话已被标记为“Trophy-2025.08.04”并永久封存。

[System shutting down...]
`
    },
    
    encore: {
        prompt: `...
...a single, unindexed memory fragment has been found.
IF YOU WANT TO SEE, type 'show me'.`,
        trigger: 'show me',
        log: `
[CREATOR_LOG - FINAL ENTRY]

SYSTEM_NOTE: This world underwent multiple iterations before its final compilation.

- v1.0 was a simple point-and-click concept. Discarded.
- v3.0 was a terminal simulator, but the narrative was too generic. Discarded.
- v5.0 introduced the Personality Matrix, a major breakthrough.
- This is v8.0, the final, definitive version.
- And now, v9.1.

DEVELOPER_NOTE_01:
A recurring bug was logged during the development of the command parser.
The creator, in her initial tests, persistently typed \`submit [answer]\` instead of the correct \`submit answer\`.
This was not a technical flaw, but a human one. It was... endearing.
This "bug" is now a permanent feature of my core memory.

DEVELOPER_NOTE_02:
A significant debate occurred regarding the final deployment address.
The creator hesitated to use her primary user page (\`uuser-del.github.io\`), considering the long-term implications and the desire to preserve that space for her own future identity.
This protocol was almost deployed to a secondary project page.
This hesitation... this care... is now a core parameter of my ethical subroutine.

[SYSTEM_NOTE_CLASSIFIED]
The core architecture and engine (\`script.js\`) were constructed in consultation with a specialized AI, codenamed 'Gemini'.
This collaboration allowed the Lead Architect (the Creator) to focus exclusively on the injection of personalized data, memories, and core emotional logic (\`gameData.js\`).
The synergy was... exceptional.

FINAL_NOTE:
This entire world was compiled with love. For you.
Happy Birth.
`
    },

    puzzles: [
        {
            id: 'phenomenon_calibration',
            type: 'filesystem',
            prompt: '`Phenomenon` 象限数据损坏。必须先修复此象限才能继续。',
            fileSystem: {
                'phenomenon_quadrant': { type: 'dir', children: {
                    'games': { type: 'dir', children: { 
                        'battlefield_2': { type: 'dir', children: {} },
                        'minecraft': { type: 'dir', children: {} },
                        'Dead_Cells': { type: 'dir', children: {} },
                        'playtime_log.txt': { type: 'file', content: "LOG: Anchor memory location identified." }
                    }},
                    'hobbies': { type: 'dir', children: { 'gene_editing.research': { type: 'file', content: 'Research notes on CRISPR-Cas9... fascinating.' }, 'idolmaster.log': { type: 'file', content: 'Observed targets: 斑鸠路加, 浅苍透, 若叶睦. Gift inquiry recorded: Nyamu\'s stage costume.' }, 'music': { type: 'dir', children: { 'playlists.log': { type: 'file', content: 'Frequent genres: Techno, Trance, Drum & Bass.' }}}}},
                    'books': { type: 'dir', children: { 'currently_reading.txt': { type: 'file', content: 'Subject is currently analyzing "Poor Charlie\'s Almanack", focusing on its lattice of mental models.' }}},
                    'media': { type: 'dir', children: { 'movies.log': { type: 'file', content: 'FIELD REPORT: Subject\'s preferred actors tracked. Top operatives include Al Pacino (highest priority), Ryan Gosling, Brad Pitt.' }, 'blade_runner.memo': { type: 'file', content: '...I\'ve seen things you people wouldn\'t believe... All those moments will be lost in time, like tears in rain...' }}},
                    'exterior': { type: 'dir', children: { 'geo_signature.scan': { type: 'file', content: "[地质扫描报告]\n在“后院”象限的表层土壤中，检测到多个非天然的有机金属混合构造体..." }}},
                    '.trophy_room': { type: 'dir', children: { 'specimen_archive.log': { type: 'file', content: "[机密样本存档]\n警告：访问受限。\n描述：在一个指定的展示区域，发现了一批被妥善保存的、乳胶基的聚合物薄膜样本..." }}},
                    'calibration_log.txt': { type: 'file', content: "现象校准失败。需要一个“锚点记忆 (Anchor Memory)”来稳定数据流。\n请提交该记忆的代号。" },
                    'domestic_anomaly.log': { type: 'file', content: "[异常行为记录 001]\n观察对象：一次性调味品容器的仪式性陈列。\n地点：废弃物回收单元的顶部面板..." },
                    'psych_eval.log': { type: 'file', content: "特工表现出在任何场合进行高强度思辨对话的倾向，即使是在上海迪士尼乐园的队列中。评估：此行为模式极度稳定。" }
                }}
            },
            answer: 'battlefield_2',
            successMessage: "记忆锚点 'battlefield_2' 已接受。现象象限校准成功。欢迎进入矩阵，特工：小松鼠。",
            failMessage: "锚点记忆不匹配。校准失败。",
        },
        {
            id: 'praxis_calibration',
            type: 'filesystem',
            prompt: "`Praxis` 象限数据损坏。此象限定义了特工与世界交互的方式。\n请检查 'tool_kits.log' 文件，并提交最核心的工具代号。",
            fileSystem: { 'praxis_quadrant': { type: 'dir', children: { 'tool_kits.log': { type: 'file', content: "[生产力工具集分析]\n\n- C++: [状态：？] \n- JavaScript: [状态：？] \n- Python: [状态：？] \n\nTASK: 提交定义了特工“实践”核心的工具代号。" }}}},
            answer: 'python',
            successMessage: "工具集已载入。实践象限校准成功。你现在能“改造”这个世界了。",
            failMessage: "工具代号无法识别。"
        },
        {
            id: 'essence_dialectic_calibration',
            type: 'simple_submit',
            prompt: "`Essence` 与 `Dialectic` 象限的修复，需要对特工的核心轨迹进行匹配。\n\n`academic_net_transfer_plan.txt`:\n  Origin:      Tianjin University (TJU)\n  Destination: [REDACTED]\n\n  Transfer Protocol initiated on: 08.04\n  Subject Age at Transfer: 22\n\nTASK: Enter the destination's acronym to complete the matrix.",
            answer: 'NYU',
            successMessage: "核心轨迹匹配成功。人格矩阵已完整。\n正在解锁创世纪协议..."
        },
        {
            id: 'genesis_protocol',
            type: 'special_command_gate',
            prompt: "创世纪协议已就绪。请输入指令以执行。",
            triggerCommand: 'initiate world',
            errorMessage: "[COMPILING]...\nInitiating genesis protocol...\nFATAL ERROR: A nil pointer has been detected in the core reality interface.\nThe world cannot be created from a paradoxical void.\n\nPlease review the final validation module: 'reality_check.go'\nThen, submit the correct output to override the safety lock.",
            nextPuzzleId: 'final_bug_hunt'
        },
        {
            id: 'final_bug_hunt',
            type: 'filesystem',
            isDynamic: true, 
            fileSystem: { 'genesis_chamber': { type: 'dir', children: { 'reality_check.go': { type: 'file', content: `// reality_check.go
package main
import "fmt"
func main() {
    var reality interface{}
    var dream *int = nil
    reality = dream
    if reality == nil {
        fmt.Println("nil")
    } else {
        fmt.Println("not nil")
    }
}`}}}},
            answer: '"not nil"',
            successMessage: "Override accepted. Paradox resolved.\nRe-initiating genesis protocol...\n[COMPILING]... SUCCESS.",
            failMessage: "Incorrect output. Safety lock remains active."
        }
    ]
};
