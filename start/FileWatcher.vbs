Set WshShell=WScript.CreateObject("WSCript.shell")
WshShell.CurrentDirectory = "C:\FileWatcher\start"
RetCode=WshShell.Run("hiddenStart.vbs",0,False)