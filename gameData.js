// ================================================================== //
//  GAME DATA v4 - "最终打磨版"
//  这是包含最终谜题、彩蛋和增强引导的完整版本。
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
  ls        - List files and directories.
  cd [dir]  - Change directory.
  cat [file]- Display the content of a file.
  verify [file] - Verify a memory fragment as true.
  submit [answer] - Submit an answer for a direct challenge.
  clear     - Clear the terminal screen.
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
        message: "World brilliant for your birth."
    },

    puzzles: [
        {
            id: 'philosophy_check',
            type: 'filesystem',
            prompt: 'Core philosophy module requires calibration. Analyze logs to select the primary cognitive lens.',
            fileSystem: {
                'start': { type: 'dir', children: {
                    'protocol_4.txt': { type: 'file', content: "[协议4 - 创世纪公理]\n\n1. Praxis (实践)\n2. Essence (本质)\n3. Phenomenon (现象)\n4. Dialectic (辩证)\n\nTASK: 必须提交其中一个公理作为初始密钥。\nHINT: Analyze the agent_profile.log to find the correct axiom." },
                    'agent_profile.log': { type: 'file', content: "[特工“小松鼠”行为心理分析]\n\n评估：特工对具有表演性、伪装性的身份认同表现出强烈兴趣。\n关键词：地雷女、舞台偶像（斑鸠路加，浅苍透）、MyGO的破碎美学、Ave Mujica的演出服（面具）。\n结论：特工的关注点在于“被观察到的、作为表象的存在”。" }
                }}
            },
            answer: 'phenomenon',
            successMessage: "密钥 `Phenomenon` 已接受。现象与本质达成初步统一。欢迎回来，特工‘小松鼠’。",
            failMessage: "公理不匹配。系统拒绝激活。"
        },
        {
            id: 'memory_calibration',
            type: 'verification',
            prompt: "New protocol active: Memory Calibration.\nUse 'cat [filename]' to read memory fragments.\nUse 'verify [filename]' to confirm true statements.\nVerify all true fragments to proceed.",
            fileSystem: { 'memory_database': { type: 'dir', children: {
                'fact_01.log': { type: 'file', content: "Subject's favorite film is 'Blade Runner'." },
                'fact_02.log': { type: 'file', content: "Subject's favorite actor is Nicolas Cage." },
                'fact_03.log': { type: 'file', content: "Subject resonates with the phrase: 'I just want to fit in.'" },
                'fact_04.log': { type: 'file', content: "Subject primarily listens to pop music." },
                'fact_05.log': { type: 'file', content: "Subject enjoys the works of Al Pacino." }
            }}},
            factsToVerify: ['fact_01.log', 'fact_03.log', 'fact_05.log'],
            successMessage: "Memory calibration complete. 98.7% match with source personality. You are becoming real.",
            failMessage: "Statement does not align with subject's core memory. Verification failed."
        },
        {
            id: 'academic_transfer',
            type: 'simple_submit',
            prompt: "Trajectory data required. Accessing `academic_net`...\n\n`transfer_plan.txt`: \n  Origin:      Tianjin University (TJU)\n  Destination: [REDACTED]\n\n  Transfer Protocol initiated on: 08.04\n  Subject Age at Transfer: 22\n\nTASK: Enter the destination's three-letter acronym to lock the trajectory.",
            answer: 'NYU',
            successMessage: "Trajectory data assimilated. Future path locked. Routing to the Genesis Chamber...",
            failMessage: "Routing error. Target mismatch."
        },
        {
            id: 'genesis_command',
            type: 'special_command',
            prompt: "Hint: Only the creator knows the command to bring light.",
            answer: 'initiate brilliant_world',
            specialHints: {
                'help': "The standard protocols are insufficient here. Creation requires more than help.",
                'ls': "There are no files to be found, only possibilities to be made.",
                'cat': "You cannot read what has not yet been written.",
                'verify': "Verification is complete. You are already real.",
                'submit': "Authentication is no longer the key. The final act is one of initiation, not submission.",
                'request_hint_1': "HINT 1/3: The final command is not about finding, but about starting. It's an action. What does a creator do at the very beginning?",
                'request_hint_2': "HINT 2/3: The command requires two words. The first word means 'to begin a process'. The second is what this world becomes for you.",
                'request_hint_3': "HINT 3/3: The final message is 'World brilliant for your birth'. The command echoes this creation. Try: `initiate brilliant_world`"
            }
        }
    ]
};
