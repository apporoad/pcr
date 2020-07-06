#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

argName = %1%
argLeft = %2%
argTop = %3%

ifWinExist % argName
winactivate
else
MsgBox 确保 %argName% 已经打开, "提示"


Send, {LControl Down}
Send, {8}
Send, {LControl up}

ifWinExist ahk_class LDOperationRecorderWindow
winactivate

SLEEP,500
MouseMove, 0, 0, 0, R
MouseClick, left ,% argLeft,% argTop

SLEEP, 200
ifWinExist ahk_class LDOperationRecorderWindow
WinClose ; 哈哈

return