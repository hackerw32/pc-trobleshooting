// Diagnostic Data Structure - Bilingual Support
const diagnosticData = {
    // English Data
    en: {
        start: {
            label: "INITIAL DIAGNOSTIC",
            question: "What happens when you press the power button?",
            options: [
                { text: "Nothing at all (No lights, no fans)", next: "no_power" },
                { text: "Lights/fans on but black screen", next: "no_post" },
                { text: "System crashes, restarts, or blue screens", next: "instability" },
                { text: "Error: 'No Bootable Device' or 'Disk Error'", next: "boot_fail" },
                { text: "Computer is very slow or freezing", next: "performance" },
                { text: "Unusual noises or overheating", next: "physical" }
            ]
        },

        no_power: {
            label: "POWER SUPPLY CHECK",
            question: "Is the power cable connected and the PSU switch (on the back) turned ON?",
            options: [
                { text: "Yes, everything is connected properly", next: "res_power_hardware" },
                { text: "Not sure / Haven't checked", next: "res_power_basics" },
                { text: "It's a laptop", next: "laptop_power" }
            ]
        },

        laptop_power: {
            label: "LAPTOP POWER CHECK",
            question: "Does the charging LED light up when you plug in the charger?",
            options: [
                { text: "Yes, charging light works", next: "res_laptop_battery" },
                { text: "No lights at all", next: "res_laptop_charger" }
            ]
        },

        no_post: {
            label: "DISPLAY CHECK",
            question: "Have you verified that the monitor is working and properly connected?",
            options: [
                { text: "Yes, monitor and cables are fine", next: "no_post_confirmed" },
                { text: "Not sure / Haven't checked", next: "res_display_check" }
            ]
        },

        no_post_confirmed: {
            label: "POST FAILURE ANALYSIS",
            question: "Do you hear any beep codes from the motherboard?",
            options: [
                { text: "Yes, I hear a series of beeps", next: "res_beeps" },
                { text: "No beeps, just fans spinning", next: "ram_check" }
            ]
        },

        ram_check: {
            label: "MEMORY CHECK",
            question: "Have you recently installed new RAM or changed hardware?",
            options: [
                { text: "Yes, I recently changed something", next: "res_reseat_hardware" },
                { text: "No, it was working fine before", next: "res_ram_gpu" }
            ]
        },

        instability: {
            label: "STABILITY ANALYSIS",
            question: "When do the crashes or blue screens occur?",
            options: [
                { text: "Randomly, even when idle", next: "random_crash" },
                { text: "Only during gaming or heavy tasks", next: "res_heat_gpu" },
                { text: "During specific programs", next: "software_crash" },
                { text: "Right after Windows starts", next: "res_driver_startup" }
            ]
        },

        random_crash: {
            label: "RANDOM CRASH DIAGNOSIS",
            question: "Have you recently updated drivers or installed new software?",
            options: [
                { text: "Yes, I updated/installed something recently", next: "res_software_conflict" },
                { text: "No recent changes", next: "res_ram_logic" }
            ]
        },

        software_crash: {
            label: "SOFTWARE FAULT ISOLATION",
            question: "Does it happen with multiple programs or just one specific app?",
            options: [
                { text: "Multiple different programs", next: "res_ram_logic" },
                { text: "Only one specific program", next: "res_software_specific" }
            ]
        },

        boot_fail: {
            label: "BOOT DEVICE CHECK",
            question: "Is the hard drive/SSD detected in BIOS settings?",
            options: [
                { text: "Yes, it shows up in BIOS", next: "boot_order" },
                { text: "No, not detected anywhere", next: "res_disk_dead" }
            ]
        },

        boot_order: {
            label: "BOOT PRIORITY",
            question: "Is the correct drive set as the first boot device in BIOS?",
            options: [
                { text: "Yes, boot order is correct", next: "res_file_system" },
                { text: "Not sure / Need to check", next: "res_boot_order" }
            ]
        },

        performance: {
            label: "PERFORMANCE DIAGNOSIS",
            question: "When did the slowness start?",
            options: [
                { text: "After Windows update", next: "res_update_issue" },
                { text: "Gradual over time", next: "maintenance_check" },
                { text: "Suddenly, without reason", next: "res_malware_check" }
            ]
        },

        maintenance_check: {
            label: "SYSTEM MAINTENANCE",
            question: "How old is your storage drive (HDD/SSD)?",
            options: [
                { text: "More than 5 years old", next: "res_disk_health" },
                { text: "Less than 5 years / Not sure", next: "res_cleanup" }
            ]
        },

        physical: {
            label: "PHYSICAL HARDWARE CHECK",
            question: "What kind of unusual behavior are you experiencing?",
            options: [
                { text: "Loud fan noise or grinding sounds", next: "res_fan_issue" },
                { text: "System gets very hot", next: "res_thermal" },
                { text: "Clicking or beeping from hard drive", next: "res_disk_failing" }
            ]
        },

        // RESULTS
        res_display_check: {
            severity: "info",
            title: "Display Connection Check",
            content: `<p>A black screen doesn't always mean a POST failure. Before deeper diagnosis, verify your display setup:</p>
                <ul>
                    <li><strong>Check the cable:</strong> Ensure HDMI, DisplayPort, or VGA cable is firmly connected at both ends</li>
                    <li><strong>Correct port:</strong> If you have a dedicated GPU, connect the monitor to the GPU ports (not the motherboard ports)</li>
                    <li><strong>Monitor input:</strong> Press the Input/Source button on your monitor to select the correct input (HDMI, DP, etc.)</li>
                    <li><strong>Try another cable:</strong> Cables can fail - test with a different one if available</li>
                    <li><strong>Test the monitor:</strong> Connect to another device (laptop, console) to verify it works</li>
                    <li><strong>Try another port:</strong> If your GPU has multiple outputs, try a different one</li>
                </ul>
                <p><strong>If the monitor works fine with another device,</strong> go back and select "Yes, monitor and cables are fine" to continue diagnosis.</p>`,
            tools: []
        },

        res_power_basics: {
            severity: "info",
            title: "Basic Power Check",
            content: `<p>Start with these fundamental checks:</p>
                <ul>
                    <li>Verify the power cable is firmly connected to both the wall outlet and the power supply</li>
                    <li>Check if the power outlet works by testing with another device</li>
                    <li>Ensure the PSU switch on the back of the computer is set to "I" (ON position)</li>
                    <li>If using a power strip, make sure it's turned on</li>
                </ul>
                <p><strong>For Laptops:</strong> Try a "power reset" - remove battery and AC adapter, hold power button for 30 seconds, then reconnect and try again.</p>`,
            tools: [
                { name: "Power Supply Calculator", desc: "Calculate required PSU wattage", url: "https://outervision.com/power-supply-calculator" }
            ]
        },

        res_power_hardware: {
            severity: "critical",
            title: "Power Supply or Motherboard Failure",
            content: `<p>If the power cable and switch are correct but nothing happens, this indicates a critical hardware failure:</p>
                <ul>
                    <li><strong>Power Supply Unit (PSU):</strong> Most common culprit. PSUs can fail suddenly.</li>
                    <li><strong>Motherboard:</strong> Could have a short circuit or component failure.</li>
                    <li><strong>Power Button:</strong> The front panel connector may be loose or damaged.</li>
                </ul>
                <p><strong>Troubleshooting steps:</strong></p>
                <ul>
                    <li>Try the "paperclip test" to verify PSU functionality</li>
                    <li>Check for any burnt smell or visible damage on motherboard</li>
                    <li>Test with a known-working PSU if available</li>
                    <li>Verify front panel connections to motherboard</li>
                </ul>`,
            tools: [
                { name: "PSU Paperclip Test Guide", desc: "Test if PSU is functional", url: "https://www.silverstonetek.com/downloads/QA/PSU/PSU-Paper%20Clip-EN.pdf" }
            ]
        },

        res_laptop_battery: {
            severity: "warning",
            title: "Laptop Battery or Power Management Issue",
            content: `<p>The charging light works, but the laptop won't start. This suggests:</p>
                <ul>
                    <li>Dead or failing battery that can't hold charge</li>
                    <li>Power management circuit failure</li>
                    <li>Internal hardware fault preventing boot</li>
                </ul>
                <p><strong>Try these steps:</strong></p>
                <ul>
                    <li>Remove the battery (if removable) and try running on AC power only</li>
                    <li>Perform a hard reset: Hold power button for 30-60 seconds</li>
                    <li>Try booting with all peripherals disconnected</li>
                    <li>Check if Caps Lock light responds when pressed</li>
                </ul>
                <p><strong>If the laptop starts working:</strong> Use the tool below to check your battery health and determine if it needs replacement.</p>`,
            tools: [
                { name: "BatteryInfoView", desc: "Check battery health once laptop is running", url: "https://www.nirsoft.net/utils/battery_information_view.html" }
            ]
        },

        res_laptop_charger: {
            severity: "critical",
            title: "Power Adapter or Charging Port Failure",
            content: `<p>No charging light means power isn't reaching the laptop:</p>
                <ul>
                    <li><strong>Dead power adapter:</strong> Most common and easiest to fix</li>
                    <li><strong>Damaged charging port:</strong> Physical damage or loose connection</li>
                    <li><strong>DC-in jack failure:</strong> Internal connector may be broken</li>
                </ul>
                <p><strong>Diagnosis:</strong></p>
                <ul>
                    <li>Test the adapter with a multimeter (should show rated voltage)</li>
                    <li>Try a known-working adapter of the same model</li>
                    <li>Inspect charging port for physical damage or debris</li>
                    <li>Check if the adapter cable is damaged or frayed</li>
                </ul>`,
            tools: []
        },

        res_beeps: {
            severity: "warning",
            title: "BIOS Beep Code Diagnosis",
            content: `<p>Your motherboard is using beep codes to tell you what's wrong. The number and pattern of beeps indicates the specific issue.</p>
                <p><strong>Common beep patterns (AMI BIOS):</strong></p>
                <ul>
                    <li><strong>1 long, 2 short:</strong> Video card / display adapter error</li>
                    <li><strong>Continuous beeping:</strong> Memory (RAM) not detected or failure</li>
                    <li><strong>1 long, 3 short:</strong> Video card not detected</li>
                    <li><strong>Repeating short beeps:</strong> Memory refresh failure or power issue</li>
                    <li><strong>Single short beep:</strong> Normal POST - system is OK</li>
                </ul>
                <p><strong>Important:</strong> Beep codes vary significantly between BIOS manufacturers (AMI, Award, Phoenix, UEFI). The patterns above are for AMI BIOS. Use the tool below to decode your specific beep pattern based on your motherboard's BIOS manufacturer.</p>`,
            tools: [
                { name: "Beep Codes Database", desc: "Decode BIOS beep codes", url: "https://www.computerhope.com/beep.htm" }
            ]
        },

        res_reseat_hardware: {
            severity: "warning",
            title: "Hardware Reseating Required",
            content: `<p>Recent hardware changes can cause poor connections. Follow these steps:</p>
                <ul>
                    <li><strong>Power off completely</strong> and unplug the power cable</li>
                    <li><strong>Remove and reinstall RAM sticks:</strong> Clean contacts with isopropyl alcohol or eraser</li>
                    <li><strong>Reseat the graphics card:</strong> Make sure it clicks firmly into the PCIe slot</li>
                    <li><strong>Check all power connectors:</strong> CPU power (4/8-pin), motherboard (24-pin), GPU power</li>
                    <li><strong>Clear CMOS:</strong> Remove the battery for 5 minutes or use the reset jumper</li>
                </ul>
                <p>Try booting with only essential hardware (CPU, one RAM stick, no GPU if CPU has integrated graphics).</p>`,
            tools: [
                { name: "PC Building Guide", desc: "Step-by-step hardware installation", url: "https://www.youtube.com/watch?v=v7MYOpFONCU" }
            ]
        },

        res_ram_gpu: {
            severity: "critical",
            title: "POST Failure - RAM or GPU Issue",
            content: `<p>The system powers on but fails the Power-On Self Test (POST). This is typically caused by:</p>
                <ul>
                    <li><strong>Faulty or improperly seated RAM</strong></li>
                    <li><strong>Graphics card not properly connected</strong></li>
                    <li><strong>Incompatible hardware</strong></li>
                </ul>
                <p><strong>Troubleshooting steps:</strong></p>
                <ul>
                    <li>Try booting with one RAM stick at a time in different slots</li>
                    <li>Remove GPU and use integrated graphics (if available)</li>
                    <li>Clean RAM and GPU contacts with isopropyl alcohol</li>
                    <li>Ensure all power connectors are firmly attached</li>
                    <li>Clear CMOS/BIOS settings</li>
                </ul>`,
            tools: [
                { name: "RAM Installation Guide", desc: "How to properly install memory", url: "https://www.crucial.com/articles/about-memory/how-to-install-ram" }
            ]
        },

        res_ram_logic: {
            severity: "critical",
            title: "Memory (RAM) or Driver Failure",
            content: `<p>Random crashes and BSODs without recent changes can indicate hardware or driver issues:</p>
                <p><strong>Common BSOD codes and their causes:</strong></p>
                <ul>
                    <li><strong>MEMORY_MANAGEMENT:</strong> Usually points to faulty RAM</li>
                    <li><strong>IRQL_NOT_LESS_OR_EQUAL:</strong> Often caused by faulty drivers (network, GPU, antivirus), but can also indicate RAM issues</li>
                    <li><strong>KERNEL_DATA_INPAGE_ERROR:</strong> Can indicate disk or RAM problems</li>
                    <li><strong>PAGE_FAULT_IN_NONPAGED_AREA:</strong> RAM or driver issue</li>
                </ul>
                <p><strong>Diagnosis steps (in order):</strong></p>
                <ul>
                    <li>Use BlueScreenView to identify the exact BSOD error code and faulting driver</li>
                    <li>If a specific driver is listed as the cause, update or roll back that driver first</li>
                    <li>Run <code>sfc /scannow</code> and <code>DISM /Online /Cleanup-Image /RestoreHealth</code> to check for Windows corruption</li>
                    <li>Run MemTest86 for at least 4 full passes (8+ hours) to test RAM</li>
                    <li>Test each RAM stick individually in different slots</li>
                    <li>Check Windows Event Viewer for memory or hardware errors</li>
                    <li>Replace any RAM stick that shows errors in MemTest86</li>
                </ul>`,
            tools: [
                { name: "MemTest86", desc: "Professional memory diagnostic tool", url: "https://www.memtest86.com/" },
                { name: "BlueScreenView", desc: "Analyze Windows crash dumps", url: "https://www.nirsoft.net/utils/blue_screen_view.html" },
                { name: "Windows Memory Diagnostic", desc: "Built-in Windows memory test", url: "ms-settings:troubleshoot" }
            ]
        },

        res_heat_gpu: {
            severity: "warning",
            title: "Thermal or GPU Stability Issue",
            content: `<p>Crashes during gaming or heavy workloads suggest thermal throttling or GPU instability:</p>
                <p><strong>Common causes:</strong></p>
                <ul>
                    <li>Inadequate cooling (dust buildup, failed fans)</li>
                    <li>Thermal paste dried out</li>
                    <li>Overclocking instability</li>
                    <li>Insufficient power supply</li>
                    <li>GPU driver issues</li>
                </ul>
                <p><strong>Monitoring and fixing:</strong></p>
                <ul>
                    <li>Monitor temperatures with HWiNFO during stress tests</li>
                    <li>Clean all fans and heatsinks (compressed air)</li>
                    <li>Reapply thermal paste if CPU/GPU temps exceed 85°C</li>
                    <li>Update GPU drivers (clean install with DDU)</li>
                    <li>Test GPU stability with FurMark</li>
                </ul>`,
            tools: [
                { name: "HWiNFO64", desc: "Real-time temperature monitoring", url: "https://www.hwinfo.com/" },
                { name: "FurMark", desc: "GPU stress testing", url: "https://geeks3d.com/furmark/" },
                { name: "MSI Afterburner", desc: "GPU monitoring and control", url: "https://www.msi.com/Landing/afterburner" },
                { name: "DDU", desc: "Clean GPU driver uninstaller", url: "https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" }
            ]
        },

        res_driver_startup: {
            severity: "warning",
            title: "Driver or Startup Program Conflict",
            content: `<p>Crashes immediately after Windows loads indicate driver or startup program issues:</p>
                <ul>
                    <li><strong>Bad driver:</strong> Recently updated or corrupted driver</li>
                    <li><strong>Startup program:</strong> Conflicting or malicious software</li>
                    <li><strong>System file corruption:</strong> Windows integrity issues</li>
                </ul>
                <p><strong>Fix steps:</strong></p>
                <ul>
                    <li>Boot into Safe Mode: Hold <strong>Shift</strong> and click <strong>Restart</strong>, then Troubleshoot → Advanced Options → Startup Settings (note: F8 does NOT work by default in Windows 10/11)</li>
                    <li>Use Device Manager to roll back recent driver updates</li>
                    <li>Disable startup programs via Task Manager → Startup tab</li>
                    <li>Run System File Checker: <code>sfc /scannow</code></li>
                    <li>Run DISM repair: <code>DISM /Online /Cleanup-Image /RestoreHealth</code></li>
                    <li>Use System Restore to revert to working state</li>
                </ul>`,
            tools: [
                { name: "Autoruns", desc: "Advanced startup program manager", url: "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns" },
                { name: "DriverView", desc: "View all installed drivers", url: "https://www.nirsoft.net/utils/driverview.html" }
            ]
        },

        res_software_conflict: {
            severity: "warning",
            title: "Software or Driver Conflict",
            content: `<p>Recent software changes causing instability can be resolved:</p>
                <ul>
                    <li>Uninstall recently added programs via Control Panel</li>
                    <li>Roll back problematic drivers in Device Manager</li>
                    <li>Use System Restore to return to a stable state</li>
                    <li>Check Windows Update history for problematic updates</li>
                    <li>Run in Safe Mode to identify the culprit</li>
                </ul>
                <p>If a Windows Update caused issues, you can temporarily hide it until a fix is released.</p>`,
            tools: [
                { name: "System Restore", desc: "Revert Windows to previous state", url: "ms-settings:recovery" },
                { name: "Revo Uninstaller", desc: "Complete software removal", url: "https://www.revouninstaller.com/" }
            ]
        },

        res_software_specific: {
            severity: "info",
            title: "Application-Specific Issue",
            content: `<p>If crashes only occur with one program, the issue is likely with that application:</p>
                <ul>
                    <li><strong>Reinstall the program:</strong> Complete uninstall and clean reinstall</li>
                    <li><strong>Update to latest version:</strong> Check for patches and updates</li>
                    <li><strong>Check compatibility:</strong> Verify it supports your Windows version</li>
                    <li><strong>Run as administrator:</strong> Some programs need elevated privileges</li>
                    <li><strong>Disable antivirus temporarily:</strong> May be blocking the program</li>
                    <li><strong>Check event logs:</strong> Windows Event Viewer shows detailed crash info</li>
                </ul>`,
            tools: [
                { name: "Event Viewer", desc: "Windows system logs (run eventvwr.msc from Start)", url: "https://learn.microsoft.com/en-us/shows/inside/event-viewer" },
                { name: "Dependencies", desc: "Modern dependency analyzer (replaces Dependency Walker)", url: "https://github.com/lucasg/Dependencies" }
            ]
        },

        res_file_system: {
            severity: "warning",
            title: "Boot Sector or File System Corruption",
            content: `<p>The drive is detected but can't boot. This indicates:</p>
                <ul>
                    <li>Corrupted boot sector or MBR/GPT</li>
                    <li>Missing or damaged bootloader (Windows Boot Manager)</li>
                    <li>File system errors (NTFS corruption)</li>
                </ul>
                <p><strong>Repair methods:</strong></p>
                <ul>
                    <li><strong>Automatic Repair:</strong> Boot from Windows installation media → Repair Your Computer</li>
                    <li><strong>For Legacy BIOS/MBR systems:</strong>
                        <ul>
                            <li><code>bootrec /fixmbr</code> - Fix master boot record</li>
                            <li><code>bootrec /fixboot</code> - Write new boot sector</li>
                            <li><code>bootrec /rebuildbcd</code> - Rebuild boot configuration</li>
                        </ul>
                    </li>
                    <li><strong>For UEFI/GPT systems (most modern PCs):</strong>
                        <ul>
                            <li><code>bootrec /rebuildbcd</code> - Rebuild boot configuration</li>
                            <li><code>bcdboot C:\\Windows /s S: /f UEFI</code> - Rebuild UEFI bootloader (S: = EFI partition)</li>
                        </ul>
                    </li>
                    <li><code>chkdsk C: /f /r</code> - Scan and repair disk errors</li>
                    <li>Check disk health with CrystalDiskInfo before repairs</li>
                </ul>
                <p><strong>Note:</strong> <code>bootrec /fixboot</code> may return "Access is denied" on some Windows 10/11 installations. Use <code>bcdboot</code> instead in that case.</p>`,
            tools: [
                { name: "CrystalDiskInfo", desc: "Check drive health (S.M.A.R.T.)", url: "https://crystalmark.info/en/software/crystaldiskinfo/" },
                { name: "Windows Media Creation Tool", desc: "Create recovery USB", url: "https://www.microsoft.com/software-download/windows11" },
                { name: "EaseUS Partition Master", desc: "Partition repair tool", url: "https://www.easeus.com/partition-manager/" }
            ]
        },

        res_boot_order: {
            severity: "info",
            title: "Boot Priority Configuration",
            content: `<p>The system may be trying to boot from the wrong device:</p>
                <ul>
                    <li>Restart and enter BIOS/UEFI (usually Del, F2, F12, or Esc during startup)</li>
                    <li>Find the "Boot" or "Boot Order" section</li>
                    <li>Move your Windows drive to the top of the boot priority list</li>
                    <li>Disable "Fast Boot" if the option exists</li>
                    <li>Save changes and exit (usually F10)</li>
                </ul>
                <p><strong>If you see a USB or optical drive listed first,</strong> the system may be trying to boot from empty media.</p>`,
            tools: []
        },

        res_disk_dead: {
            severity: "critical",
            title: "Storage Drive Failure",
            content: `<p>If the drive doesn't appear in BIOS at all, it's likely completely dead:</p>
                <p><strong>Possible causes:</strong></p>
                <ul>
                    <li>Physical hard drive failure (mechanical or electronic)</li>
                    <li>Dead SSD controller</li>
                    <li>Loose or damaged cables (SATA/M.2)</li>
                    <li>Failed motherboard SATA port</li>
                </ul>
                <p><strong>Last-resort checks:</strong></p>
                <ul>
                    <li>Try different SATA cables and ports</li>
                    <li>For M.2 drives, reseat in the slot</li>
                    <li>Test the drive in another computer or USB adapter</li>
                    <li>Listen for clicking sounds (mechanical failure)</li>
                </ul>
                <p><strong>If the drive is truly dead,</strong> professional data recovery services may be your only option (very expensive). Always maintain backups!</p>`,
            tools: [
                { name: "Hard Disk Sentinel", desc: "Advanced drive diagnostics", url: "https://www.hdsentinel.com/" },
                { name: "Victoria HDD", desc: "Low-level drive repair tool", url: "https://hdd.by/victoria/" }
            ]
        },

        res_update_issue: {
            severity: "warning",
            title: "Windows Update Causing Issues",
            content: `<p>Recent Windows updates can sometimes cause performance problems:</p>
                <ul>
                    <li><strong>Roll back the update:</strong> Settings → Update & Security → View Update History → Uninstall Updates</li>
                    <li><strong>Pause updates temporarily:</strong> Give Microsoft time to release a fix</li>
                    <li><strong>Check Windows Update history:</strong> Note the KB number of recent updates</li>
                    <li><strong>Search online:</strong> Check if others report issues with that update</li>
                </ul>
                <p>You can also try resetting Windows Update components with the official troubleshooter.</p>`,
            tools: [
                { name: "Windows Update Troubleshooter", desc: "Fix update issues", url: "ms-settings:troubleshoot" },
                { name: "Update History", desc: "View installed updates", url: "ms-settings:windowsupdate-history" }
            ]
        },

        res_cleanup: {
            severity: "info",
            title: "System Cleanup and Optimization",
            content: `<p>General slowness can often be resolved with routine maintenance:</p>
                <ul>
                    <li><strong>Disk Cleanup:</strong> Remove temporary files and old Windows installations</li>
                    <li><strong>Defragment HDD:</strong> (SSD owners: skip this, use TRIM instead)</li>
                    <li><strong>Disable startup programs:</strong> Task Manager → Startup tab</li>
                    <li><strong>Scan for malware:</strong> Use Windows Defender or Malwarebytes</li>
                    <li><strong>Update all drivers:</strong> Especially chipset and GPU</li>
                    <li><strong>Check for bloatware:</strong> Uninstall unnecessary programs</li>
                    <li><strong>Increase virtual memory:</strong> If RAM is low</li>
                </ul>`,
            tools: [
                { name: "Windows Disk Cleanup", desc: "Built-in cleanup (run cleanmgr from Start)", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cleanmgr" },
                { name: "Malwarebytes", desc: "Malware scanner", url: "https://www.malwarebytes.com/" },
                { name: "TreeSize Free", desc: "Disk space analyzer", url: "https://www.jam-software.com/treesize_free" }
            ]
        },

        res_disk_health: {
            severity: "warning",
            title: "Aging Storage Drive",
            content: `<p>Hard drives over 5 years old are at high risk of failure. SSDs also degrade over time:</p>
                <ul>
                    <li><strong>Check S.M.A.R.T. status:</strong> Use CrystalDiskInfo to see drive health</li>
                    <li><strong>Look for warning signs:</strong>
                        <ul>
                            <li>Slow boot times</li>
                            <li>Frequent freezing</li>
                            <li>Strange clicking or grinding noises (HDD)</li>
                            <li>Sudden disappearance of files</li>
                        </ul>
                    </li>
                    <li><strong>Backup immediately:</strong> If health is declining, back up all data NOW</li>
                    <li><strong>Consider replacement:</strong> Upgrade to a modern SSD for better performance</li>
                </ul>
                <p><strong>Pro tip:</strong> Clone your drive to a new one before it fails completely.</p>`,
            tools: [
                { name: "CrystalDiskInfo", desc: "S.M.A.R.T. monitoring", url: "https://crystalmark.info/en/software/crystaldiskinfo/" },
                { name: "Clonezilla", desc: "Free open-source drive cloning", url: "https://clonezilla.org/" },
                { name: "Hard Disk Sentinel", desc: "Advanced health monitoring", url: "https://www.hdsentinel.com/" }
            ]
        },

        res_malware_check: {
            severity: "warning",
            title: "Potential Malware Infection",
            content: `<p>Sudden performance drops without obvious cause may indicate malware:</p>
                <ul>
                    <li><strong>Full system scan:</strong> Run Windows Defender full scan</li>
                    <li><strong>Use specialized tools:</strong> Malwarebytes, HitmanPro, or AdwCleaner</li>
                    <li><strong>Check for cryptominers:</strong> Monitor GPU/CPU usage when idle</li>
                    <li><strong>Review startup programs:</strong> Look for suspicious entries</li>
                    <li><strong>Check browser extensions:</strong> Remove unknown or suspicious ones</li>
                    <li><strong>Reset browsers:</strong> Clear cache and reset settings if needed</li>
                </ul>
                <p><strong>Prevention:</strong> Keep Windows and antivirus updated, avoid pirated software, and be cautious with email attachments.</p>`,
            tools: [
                { name: "Malwarebytes", desc: "Anti-malware scanner", url: "https://www.malwarebytes.com/" },
                { name: "HitmanPro", desc: "Second-opinion malware scanner", url: "https://www.hitmanpro.com/" },
                { name: "AdwCleaner", desc: "Remove adware and PUPs", url: "https://www.malwarebytes.com/adwcleaner" },
                { name: "Process Explorer", desc: "Advanced task manager", url: "https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer" }
            ]
        },

        res_fan_issue: {
            severity: "warning",
            title: "Fan or Cooling System Problem",
            content: `<p>Loud or unusual fan noises indicate cooling issues:</p>
                <ul>
                    <li><strong>Dust buildup:</strong> Clean all fans with compressed air</li>
                    <li><strong>Failing fan bearings:</strong> Replace noisy fans before they stop working</li>
                    <li><strong>Cable obstruction:</strong> Check if cables are hitting fan blades</li>
                    <li><strong>High temperatures:</strong> Monitor temps to ensure fans are working effectively</li>
                </ul>
                <p><strong>Fan maintenance:</strong></p>
                <ul>
                    <li>Power off and unplug before cleaning</li>
                    <li>Use compressed air from multiple angles</li>
                    <li>Don't let fans spin freely during cleaning (hold them)</li>
                    <li>Consider fan replacement if noise persists</li>
                </ul>`,
            tools: [
                { name: "FanControl", desc: "Modern fan speed control software", url: "https://getfancontrol.com/" },
                { name: "HWiNFO", desc: "Hardware monitoring", url: "https://www.hwinfo.com/" }
            ]
        },

        res_thermal: {
            severity: "critical",
            title: "Overheating - Thermal Emergency",
            content: `<p>Excessive heat can damage components permanently. Take immediate action:</p>
                <ul>
                    <li><strong>Immediate shutdown if temps exceed 95°C</strong></li>
                    <li><strong>Check thermal paste:</strong> May need replacement (especially if 3+ years old)</li>
                    <li><strong>Verify cooler mounting:</strong> Ensure CPU cooler is properly attached</li>
                    <li><strong>Clean all heatsinks:</strong> Dust blocks airflow dramatically</li>
                    <li><strong>Improve case airflow:</strong> Add fans or reorganize cables</li>
                    <li><strong>Ambient temperature:</strong> Ensure adequate room ventilation</li>
                </ul>
                <p><strong>Safe temperature ranges:</strong></p>
                <ul>
                    <li>CPU idle: 30-50°C | Load: 65-85°C (some modern CPUs can safely reach 90-95°C)</li>
                    <li>GPU idle: 30-45°C | Load: 65-85°C</li>
                </ul>
                <p><strong>Note:</strong> Check your specific CPU/GPU manufacturer specs for maximum safe temperatures. Modern Intel CPUs (12th-14th gen) often run hotter by design.</p>`,
            tools: [
                { name: "HWiNFO64", desc: "Real-time temperature monitoring", url: "https://www.hwinfo.com/" },
                { name: "Core Temp", desc: "CPU temperature monitor", url: "https://www.alcpu.com/CoreTemp/" },
                { name: "Thermal Paste Guide", desc: "How to apply thermal paste", url: "https://www.youtube.com/watch?v=JYwHB2P6GmM" }
            ]
        },

        res_disk_failing: {
            severity: "critical",
            title: "Hard Drive Mechanical Failure",
            content: `<p>Clicking, beeping, or grinding sounds from a hard drive indicate imminent failure:</p>
                <p><strong>DO NOT CONTINUE USING THE DRIVE!</strong></p>
                <ul>
                    <li>Clicking = Read/write head hitting platter (catastrophic)</li>
                    <li>Beeping = Spindle motor failure</li>
                    <li>Grinding = Bearing failure or head crash</li>
                </ul>
                <p><strong>Immediate actions:</strong></p>
                <ul>
                    <li>Power down immediately to prevent further damage</li>
                    <li>Do NOT run repair tools or disk checks</li>
                    <li>If data is critical, contact professional data recovery</li>
                    <li>If data is backed up, replace the drive immediately</li>
                </ul>
                <p><strong>Prevention:</strong> Always maintain 3-2-1 backup strategy (3 copies, 2 different media, 1 offsite).</p>`,
            tools: [
                { name: "Data Recovery Services", desc: "Professional recovery options", url: "https://www.krollontrack.com/" },
                { name: "Backup Guide", desc: "3-2-1 backup strategy", url: "https://www.backblaze.com/blog/the-3-2-1-backup-strategy/" }
            ]
        }
    },

    // Greek Data (Ελληνικά)
    el: {
        start: {
            label: "ΑΡΧΙΚΗ ΔΙΑΓΝΩΣΗ",
            question: "Τι συμβαίνει όταν πατάτε το κουμπί ενεργοποίησης;",
            options: [
                { text: "Απολύτως τίποτα (Καμία λαμπίτσα, καμία ένδειξη)", next: "no_power" },
                { text: "Ανάβουν λαμπάκια/ανεμιστήρες αλλά μαύρη οθόνη", next: "no_post" },
                { text: "Το σύστημα κολλάει, κάνει επανεκκινήσεις ή μπλε οθόνες", next: "instability" },
                { text: "Σφάλμα: 'No Bootable Device' ή 'Disk Error'", next: "boot_fail" },
                { text: "Ο υπολογιστής είναι πολύ αργός ή παγώνει", next: "performance" },
                { text: "Ασυνήθιστοι θόρυβοι ή υπερθέρμανση", next: "physical" }
            ]
        },

        no_power: {
            label: "ΕΛΕΓΧΟΣ ΤΡΟΦΟΔΟΣΙΑΣ",
            question: "Είναι το καλώδιο ρεύματος συνδεδεμένο και ο διακόπτης του τροφοδοτικού (πίσω) ΟΝ;",
            options: [
                { text: "Ναι, όλα είναι σωστά συνδεδεμένα", next: "res_power_hardware" },
                { text: "Δεν είμαι σίγουρος / Δεν το έλεγξα", next: "res_power_basics" },
                { text: "Είναι laptop", next: "laptop_power" }
            ]
        },

        laptop_power: {
            label: "ΕΛΕΓΧΟΣ ΤΡΟΦΟΔΟΣΙΑΣ LAPTOP",
            question: "Ανάβει η λυχνία φόρτισης όταν συνδέετε τον φορτιστή;",
            options: [
                { text: "Ναι, η λυχνία φόρτισης δουλεύει", next: "res_laptop_battery" },
                { text: "Όχι, καμία λυχνία", next: "res_laptop_charger" }
            ]
        },

        no_post: {
            label: "ΕΛΕΓΧΟΣ ΟΘΟΝΗΣ",
            question: "Έχετε επιβεβαιώσει ότι η οθόνη λειτουργεί και είναι σωστά συνδεδεμένη;",
            options: [
                { text: "Ναι, η οθόνη και τα καλώδια είναι εντάξει", next: "no_post_confirmed" },
                { text: "Δεν είμαι σίγουρος / Δεν το έλεγξα", next: "res_display_check" }
            ]
        },

        no_post_confirmed: {
            label: "ΑΝΑΛΥΣΗ ΑΠΟΤΥΧΙΑΣ POST",
            question: "Ακούγονται χαρακτηριστικοί ήχοι (beeps) από τη μητρική;",
            options: [
                { text: "Ναι, ακούγεται σειρά από beeps", next: "res_beeps" },
                { text: "Όχι beeps, μόνο ανεμιστήρες", next: "ram_check" }
            ]
        },

        ram_check: {
            label: "ΕΛΕΓΧΟΣ ΜΝΗΜΗΣ",
            question: "Έχετε τοποθετήσει πρόσφατα νέα RAM ή αλλάξει hardware;",
            options: [
                { text: "Ναι, άλλαξα κάτι πρόσφατα", next: "res_reseat_hardware" },
                { text: "Όχι, δούλευε κανονικά πριν", next: "res_ram_gpu" }
            ]
        },

        instability: {
            label: "ΑΝΑΛΥΣΗ ΣΤΑΘΕΡΟΤΗΤΑΣ",
            question: "Πότε συμβαίνουν τα crashes ή οι μπλε οθόνες;",
            options: [
                { text: "Τυχαία, ακόμα και σε ηρεμία", next: "random_crash" },
                { text: "Μόνο σε παιχνίδια ή βαριές εργασίες", next: "res_heat_gpu" },
                { text: "Κατά τη διάρκεια συγκεκριμένων προγραμμάτων", next: "software_crash" },
                { text: "Αμέσως μετά την εκκίνηση των Windows", next: "res_driver_startup" }
            ]
        },

        random_crash: {
            label: "ΔΙΑΓΝΩΣΗ ΤΥΧΑΙΩΝ CRASHES",
            question: "Έχετε ενημερώσει drivers ή εγκαταστήσει νέο λογισμικό πρόσφατα;",
            options: [
                { text: "Ναι, ενημέρωσα/εγκατέστησα κάτι πρόσφατα", next: "res_software_conflict" },
                { text: "Όχι, καμία πρόσφατη αλλαγή", next: "res_ram_logic" }
            ]
        },

        software_crash: {
            label: "ΑΠΟΜΟΝΩΣΗ ΣΦΑΛΜΑΤΟΣ ΛΟΓΙΣΜΙΚΟΥ",
            question: "Συμβαίνει σε πολλά προγράμματα ή μόνο σε ένα συγκεκριμένο;",
            options: [
                { text: "Πολλά διαφορετικά προγράμματα", next: "res_ram_logic" },
                { text: "Μόνο ένα συγκεκριμένο πρόγραμμα", next: "res_software_specific" }
            ]
        },

        boot_fail: {
            label: "ΕΛΕΓΧΟΣ ΜΟΝΑΔΑΣ ΕΚΚΙΝΗΣΗΣ",
            question: "Εμφανίζεται ο σκληρός δίσκος/SSD στις ρυθμίσεις του BIOS;",
            options: [
                { text: "Ναι, φαίνεται στο BIOS", next: "boot_order" },
                { text: "Όχι, δεν εντοπίζεται πουθενά", next: "res_disk_dead" }
            ]
        },

        boot_order: {
            label: "ΠΡΟΤΕΡΑΙΟΤΗΤΑ ΕΚΚΙΝΗΣΗΣ",
            question: "Είναι ο σωστός δίσκος πρώτος στη σειρά εκκίνησης του BIOS;",
            options: [
                { text: "Ναι, η σειρά εκκίνησης είναι σωστή", next: "res_file_system" },
                { text: "Δεν είμαι σίγουρος / Πρέπει να ελέγξω", next: "res_boot_order" }
            ]
        },

        performance: {
            label: "ΔΙΑΓΝΩΣΗ ΕΠΙΔΟΣΕΩΝ",
            question: "Πότε ξεκίνησε η βραδύτητα;",
            options: [
                { text: "Μετά από ενημέρωση των Windows", next: "res_update_issue" },
                { text: "Σταδιακά με την πάροδο του χρόνου", next: "maintenance_check" },
                { text: "Ξαφνικά, χωρίς λόγο", next: "res_malware_check" }
            ]
        },

        maintenance_check: {
            label: "ΣΥΝΤΗΡΗΣΗ ΣΥΣΤΗΜΑΤΟΣ",
            question: "Πόσο παλιός είναι ο δίσκος σας (HDD/SSD);",
            options: [
                { text: "Πάνω από 5 χρόνια", next: "res_disk_health" },
                { text: "Λιγότερο από 5 χρόνια / Δεν είμαι σίγουρος", next: "res_cleanup" }
            ]
        },

        physical: {
            label: "ΕΛΕΓΧΟΣ ΦΥΣΙΚΟΥ HARDWARE",
            question: "Τι είδους ασυνήθιστη συμπεριφορά παρατηρείτε;",
            options: [
                { text: "Δυνατοί θόρυβοι ανεμιστήρα ή τριξίματα", next: "res_fan_issue" },
                { text: "Το σύστημα γίνεται πολύ ζεστό", next: "res_thermal" },
                { text: "Κλικ ή μπιπ από τον σκληρό δίσκο", next: "res_disk_failing" }
            ]
        },

        // Greek Results
        res_display_check: {
            severity: "info",
            title: "Έλεγχος Σύνδεσης Οθόνης",
            content: `<p>Μια μαύρη οθόνη δεν σημαίνει πάντα αποτυχία POST. Πριν προχωρήσετε σε βαθύτερη διάγνωση, ελέγξτε τη σύνδεση της οθόνης:</p>
                <ul>
                    <li><strong>Ελέγξτε το καλώδιο:</strong> Βεβαιωθείτε ότι το HDMI, DisplayPort ή VGA καλώδιο είναι σταθερά συνδεδεμένο και στις δύο άκρες</li>
                    <li><strong>Σωστή θύρα:</strong> Αν έχετε αποκλειστική GPU, συνδέστε την οθόνη στις θύρες της GPU (όχι στις θύρες της μητρικής)</li>
                    <li><strong>Είσοδος οθόνης:</strong> Πατήστε το κουμπί Input/Source στην οθόνη σας για να επιλέξετε τη σωστή είσοδο (HDMI, DP, κλπ.)</li>
                    <li><strong>Δοκιμάστε άλλο καλώδιο:</strong> Τα καλώδια μπορεί να χαλάσουν - δοκιμάστε με διαφορετικό αν έχετε</li>
                    <li><strong>Τεστ οθόνης:</strong> Συνδέστε σε άλλη συσκευή (laptop, κονσόλα) για να επιβεβαιώσετε ότι λειτουργεί</li>
                    <li><strong>Δοκιμάστε άλλη θύρα:</strong> Αν η GPU σας έχει πολλές εξόδους, δοκιμάστε διαφορετική</li>
                </ul>
                <p><strong>Αν η οθόνη λειτουργεί κανονικά με άλλη συσκευή,</strong> γυρίστε πίσω και επιλέξτε "Ναι, η οθόνη και τα καλώδια είναι εντάξει" για να συνεχίσετε τη διάγνωση.</p>`,
            tools: []
        },

        res_power_basics: {
            severity: "info",
            title: "Βασικός Έλεγχος Ρεύματος",
            content: `<p>Ξεκινήστε με αυτούς τους θεμελιώδεις ελέγχους:</p>
                <ul>
                    <li>Βεβαιωθείτε ότι το καλώδιο ρεύματος είναι καλά συνδεδεμένο τόσο στην πρίζα όσο και στο τροφοδοτικό</li>
                    <li>Ελέγξτε αν η πρίζα λειτουργεί δοκιμάζοντας με άλλη συσκευή</li>
                    <li>Βεβαιωθείτε ότι ο διακόπτης του τροφοδοτικού στο πίσω μέρος του υπολογιστή είναι στη θέση "I" (ON)</li>
                    <li>Αν χρησιμοποιείτε πολύπριζο, βεβαιωθείτε ότι είναι ανοιχτό</li>
                </ul>
                <p><strong>Για Laptops:</strong> Δοκιμάστε "power reset" - αφαιρέστε μπαταρία και τροφοδοτικό, κρατήστε το κουμπί power πατημένο για 30 δευτερόλεπτα, και ξανασυνδέστε.</p>`,
            tools: [
                { name: "Υπολογιστής Τροφοδοσίας", desc: "Υπολογίστε την απαιτούμενη ισχύ PSU", url: "https://outervision.com/power-supply-calculator" }
            ]
        },

        res_power_hardware: {
            severity: "critical",
            title: "Βλάβη Τροφοδοτικού ή Μητρικής",
            content: `<p>Αν το καλώδιο και ο διακόπτης είναι σωστά αλλά δεν γίνεται τίποτα, υποδηλώνει κρίσιμη βλάβη hardware:</p>
                <ul>
                    <li><strong>Τροφοδοτικό (PSU):</strong> Πιο συχνό πρόβλημα. Τα τροφοδοτικά μπορούν να αστοχήσουν ξαφνικά.</li>
                    <li><strong>Μητρική πλακέτα:</strong> Μπορεί να έχει βραχυκύκλωμα ή βλάβη εξαρτήματος.</li>
                    <li><strong>Κουμπί ενεργοποίησης:</strong> Ο συνδετήρας του μπροστινού πάνελ μπορεί να είναι χαλαρός ή κατεστραμμένος.</li>
                </ul>
                <p><strong>Βήματα διάγνωσης:</strong></p>
                <ul>
                    <li>Δοκιμάστε το "paperclip test" για να επιβεβαιώσετε τη λειτουργία του PSU</li>
                    <li>Ελέγξτε για καμένη μυρωδιά ή ορατή ζημιά στη μητρική</li>
                    <li>Δοκιμάστε με γνωστό καλό τροφοδοτικό αν είναι διαθέσιμο</li>
                    <li>Επιβεβαιώστε τις συνδέσεις του μπροστινού πάνελ στη μητρική</li>
                </ul>`,
            tools: [
                { name: "Οδηγός PSU Paperclip Test", desc: "Ελέγξτε αν λειτουργεί το PSU", url: "https://www.silverstonetek.com/downloads/QA/PSU/PSU-Paper%20Clip-EN.pdf" }
            ]
        },

        res_laptop_battery: {
            severity: "warning",
            title: "Πρόβλημα Μπαταρίας ή Διαχείρισης Ενέργειας Laptop",
            content: `<p>Η λυχνία φόρτισης λειτουργεί, αλλά το laptop δεν ανοίγει. Αυτό υποδηλώνει:</p>
                <ul>
                    <li>Νεκρή ή ελαττωματική μπαταρία που δεν κρατάει φορτίο</li>
                    <li>Βλάβη κυκλώματος διαχείρισης ενέργειας</li>
                    <li>Εσωτερική βλάβη hardware που εμποδίζει την εκκίνηση</li>
                </ul>
                <p><strong>Δοκιμάστε αυτά τα βήματα:</strong></p>
                <ul>
                    <li>Αφαιρέστε τη μπαταρία (αν αφαιρείται) και δοκιμάστε μόνο με τροφοδοσία AC</li>
                    <li>Κάντε hard reset: Κρατήστε το κουμπί power για 30-60 δευτερόλεπτα</li>
                    <li>Δοκιμάστε εκκίνηση με όλα τα περιφερειακά αποσυνδεδεμένα</li>
                    <li>Ελέγξτε αν το φως Caps Lock ανταποκρίνεται όταν πατιέται</li>
                </ul>
                <p><strong>Αν το laptop αρχίσει να λειτουργεί:</strong> Χρησιμοποιήστε το παρακάτω εργαλείο για να ελέγξετε την υγεία της μπαταρίας και αν χρειάζεται αντικατάσταση.</p>`,
            tools: [
                { name: "BatteryInfoView", desc: "Έλεγχος υγείας μπαταρίας μόλις λειτουργήσει το laptop", url: "https://www.nirsoft.net/utils/battery_information_view.html" }
            ]
        },

        res_laptop_charger: {
            severity: "critical",
            title: "Βλάβη Τροφοδοτικού ή Θύρας Φόρτισης",
            content: `<p>Καμία λυχνία φόρτισης σημαίνει ότι το ρεύμα δεν φτάνει στο laptop:</p>
                <ul>
                    <li><strong>Νεκρό τροφοδοτικό:</strong> Πιο συχνό και εύκολο στη διόρθωση</li>
                    <li><strong>Κατεστραμμένη θύρα φόρτισης:</strong> Φυσική βλάβη ή χαλαρή σύνδεση</li>
                    <li><strong>Βλάβη υποδοχής DC-in:</strong> Ο εσωτερικός συνδετήρας μπορεί να είναι σπασμένος</li>
                </ul>
                <p><strong>Διάγνωση:</strong></p>
                <ul>
                    <li>Δοκιμάστε το τροφοδοτικό με πολύμετρο (πρέπει να δείχνει την ονομαστική τάση)</li>
                    <li>Δοκιμάστε γνωστό καλό τροφοδοτικό του ίδιου μοντέλου</li>
                    <li>Ελέγξτε τη θύρα φόρτισης για φυσική ζημιά ή σκουπίδια</li>
                    <li>Ελέγξτε αν το καλώδιο του τροφοδοτικού είναι κατεστραμμένο ή φθαρμένο</li>
                </ul>`,
            tools: []
        },

        res_beeps: {
            severity: "warning",
            title: "Διάγνωση μέσω Beep Codes του BIOS",
            content: `<p>Η μητρική σας χρησιμοποιεί beep codes για να σας πει τι πάει στραβά. Ο αριθμός και το μοτίβο των ήχων υποδεικνύει το συγκεκριμένο πρόβλημα.</p>
                <p><strong>Συνηθισμένα μοτίβα beep (AMI BIOS):</strong></p>
                <ul>
                    <li><strong>1 μακρύ, 2 σύντομα:</strong> Σφάλμα κάρτας γραφικών / προσαρμογέα οθόνης</li>
                    <li><strong>Συνεχόμενο μπιπ:</strong> Μνήμη (RAM) δεν ανιχνεύθηκε ή αστοχία</li>
                    <li><strong>1 μακρύ, 3 σύντομα:</strong> Κάρτα γραφικών δεν εντοπίστηκε</li>
                    <li><strong>Επαναλαμβανόμενα σύντομα μπιπ:</strong> Αστοχία ανανέωσης μνήμης ή πρόβλημα τροφοδοσίας</li>
                    <li><strong>Ένα σύντομο μπιπ:</strong> Κανονικό POST - το σύστημα είναι OK</li>
                </ul>
                <p><strong>Σημαντικό:</strong> Τα beep codes διαφέρουν σημαντικά μεταξύ κατασκευαστών BIOS (AMI, Award, Phoenix, UEFI). Τα παραπάνω μοτίβα αφορούν AMI BIOS. Χρησιμοποιήστε το παρακάτω εργαλείο για να αποκωδικοποιήσετε το συγκεκριμένο μοτίβο σας βάσει του κατασκευαστή BIOS της μητρικής σας.</p>`,
            tools: [
                { name: "Βάση Δεδομένων Beep Codes", desc: "Αποκωδικοποίηση beep codes BIOS", url: "https://www.computerhope.com/beep.htm" }
            ]
        },

        res_reseat_hardware: {
            severity: "warning",
            title: "Απαιτείται Επανατοποθέτηση Hardware",
            content: `<p>Πρόσφατες αλλαγές hardware μπορούν να προκαλέσουν κακές συνδέσεις. Ακολουθήστε αυτά τα βήματα:</p>
                <ul>
                    <li><strong>Σβήστε εντελώς</strong> και αποσυνδέστε το καλώδιο ρεύματος</li>
                    <li><strong>Αφαιρέστε και επανατοποθετήστε τις μνήμες RAM:</strong> Καθαρίστε τις επαφές με isopropyl alcohol ή γόμα</li>
                    <li><strong>Επανατοποθετήστε την κάρτα γραφικών:</strong> Βεβαιωθείτε ότι κάνει κλικ σταθερά στη θύρα PCIe</li>
                    <li><strong>Ελέγξτε όλους τους συνδετήρες τροφοδοσίας:</strong> CPU power (4/8-pin), μητρική (24-pin), GPU power</li>
                    <li><strong>Καθαρίστε το CMOS:</strong> Αφαιρέστε την μπαταρία για 5 λεπτά ή χρησιμοποιήστε το jumper reset</li>
                </ul>
                <p>Δοκιμάστε εκκίνηση μόνο με το απαραίτητο hardware (CPU, μία RAM, χωρίς GPU αν η CPU έχει ενσωματωμένα γραφικά).</p>`,
            tools: [
                { name: "Οδηγός Κατασκευής PC", desc: "Βήμα-βήμα εγκατάσταση hardware", url: "https://www.youtube.com/watch?v=v7MYOpFONCU" }
            ]
        },

        res_ram_gpu: {
            severity: "critical",
            title: "Αποτυχία POST - Πρόβλημα RAM ή GPU",
            content: `<p>Το σύστημα ανοίγει αλλά αποτυγχάνει στο Power-On Self Test (POST). Συνήθως προκαλείται από:</p>
                <ul>
                    <li><strong>Ελαττωματική ή λανθασμένα τοποθετημένη RAM</strong></li>
                    <li><strong>Κάρτα γραφικών δεν είναι σωστά συνδεδεμένη</strong></li>
                    <li><strong>Ασύμβατο hardware</strong></li>
                </ul>
                <p><strong>Βήματα διάγνωσης:</strong></p>
                <ul>
                    <li>Δοκιμάστε εκκίνηση με μία RAM τη φορά σε διαφορετικές θύρες</li>
                    <li>Αφαιρέστε το GPU και χρησιμοποιήστε ενσωματωμένα γραφικά (αν υπάρχουν)</li>
                    <li>Καθαρίστε τις επαφές RAM και GPU με isopropyl alcohol</li>
                    <li>Βεβαιωθείτε ότι όλοι οι συνδετήρες τροφοδοσίας είναι σταθερά συνδεδεμένοι</li>
                    <li>Καθαρίστε τις ρυθμίσεις CMOS/BIOS</li>
                </ul>`,
            tools: [
                { name: "Οδηγός Εγκατάστασης RAM", desc: "Πώς να εγκαταστήσετε σωστά μνήμη", url: "https://www.crucial.com/articles/about-memory/how-to-install-ram" }
            ]
        },

        res_ram_logic: {
            severity: "critical",
            title: "Βλάβη Μνήμης (RAM) ή Driver",
            content: `<p>Τυχαία crashes και BSODs χωρίς πρόσφατες αλλαγές μπορεί να υποδηλώνουν πρόβλημα hardware ή driver:</p>
                <p><strong>Συνηθισμένοι κωδικοί BSOD και αιτίες:</strong></p>
                <ul>
                    <li><strong>MEMORY_MANAGEMENT:</strong> Συνήθως δείχνει ελαττωματική RAM</li>
                    <li><strong>IRQL_NOT_LESS_OR_EQUAL:</strong> Συχνά προκαλείται από ελαττωματικούς drivers (δικτύου, GPU, antivirus), αλλά μπορεί να υποδηλώνει και πρόβλημα RAM</li>
                    <li><strong>KERNEL_DATA_INPAGE_ERROR:</strong> Μπορεί να υποδηλώνει πρόβλημα δίσκου ή RAM</li>
                    <li><strong>PAGE_FAULT_IN_NONPAGED_AREA:</strong> Πρόβλημα RAM ή driver</li>
                </ul>
                <p><strong>Βήματα διάγνωσης (με σειρά):</strong></p>
                <ul>
                    <li>Χρησιμοποιήστε το BlueScreenView για να εντοπίσετε τον ακριβή κωδικό BSOD και τον ελαττωματικό driver</li>
                    <li>Αν εμφανίζεται συγκεκριμένος driver ως αιτία, ενημερώστε ή επαναφέρετε αυτόν τον driver πρώτα</li>
                    <li>Τρέξτε <code>sfc /scannow</code> και <code>DISM /Online /Cleanup-Image /RestoreHealth</code> για έλεγχο καταστροφής Windows</li>
                    <li>Τρέξτε το MemTest86 για τουλάχιστον 4 πλήρεις περάσεις (8+ ώρες) για έλεγχο RAM</li>
                    <li>Δοκιμάστε κάθε RAM ξεχωριστά σε διαφορετικές θύρες</li>
                    <li>Ελέγξτε το Windows Event Viewer για σφάλματα μνήμης ή hardware</li>
                    <li>Αντικαταστήστε οποιαδήποτε μνήμη που εμφανίζει σφάλματα στο MemTest86</li>
                </ul>`,
            tools: [
                { name: "MemTest86", desc: "Επαγγελματικό εργαλείο διάγνωσης μνήμης", url: "https://www.memtest86.com/" },
                { name: "BlueScreenView", desc: "Ανάλυση crash dumps των Windows", url: "https://www.nirsoft.net/utils/blue_screen_view.html" },
                { name: "Windows Memory Diagnostic", desc: "Ενσωματωμένο test μνήμης Windows", url: "ms-settings:troubleshoot" }
            ]
        },

        res_heat_gpu: {
            severity: "warning",
            title: "Πρόβλημα Θερμοκρασίας ή Σταθερότητας GPU",
            content: `<p>Crashes κατά τη διάρκεια gaming ή βαριών εργασιών υποδηλώνουν thermal throttling ή αστάθεια GPU:</p>
                <p><strong>Συνηθισμένες αιτίες:</strong></p>
                <ul>
                    <li>Ανεπαρκής ψύξη (συσσώρευση σκόνης, χαλασμένοι ανεμιστήρες)</li>
                    <li>Στεγνή θερμοαγώγιμη πάστα</li>
                    <li>Αστάθεια overclocking</li>
                    <li>Ανεπαρκές τροφοδοτικό</li>
                    <li>Προβλήματα drivers GPU</li>
                </ul>
                <p><strong>Παρακολούθηση και διόρθωση:</strong></p>
                <ul>
                    <li>Παρακολουθήστε θερμοκρασίες με HWiNFO κατά τη διάρκεια stress tests</li>
                    <li>Καθαρίστε όλους τους ανεμιστήρες και ψύκτρες (πεπιεσμένος αέρας)</li>
                    <li>Επανεφαρμόστε θερμοαγώγιμη πάστα αν οι θερμοκρασίες CPU/GPU υπερβαίνουν τους 85°C</li>
                    <li>Ενημερώστε drivers GPU (καθαρή εγκατάσταση με DDU)</li>
                    <li>Δοκιμάστε σταθερότητα GPU με FurMark</li>
                </ul>`,
            tools: [
                { name: "HWiNFO64", desc: "Παρακολούθηση θερμοκρασίας σε πραγματικό χρόνο", url: "https://www.hwinfo.com/" },
                { name: "FurMark", desc: "Stress testing GPU", url: "https://geeks3d.com/furmark/" },
                { name: "MSI Afterburner", desc: "Παρακολούθηση και έλεγχος GPU", url: "https://www.msi.com/Landing/afterburner" },
                { name: "DDU", desc: "Καθαρή απεγκατάσταση drivers GPU", url: "https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" }
            ]
        },

        res_driver_startup: {
            severity: "warning",
            title: "Σύγκρουση Driver ή Προγράμματος Εκκίνησης",
            content: `<p>Crashes αμέσως μετά τη φόρτωση των Windows υποδηλώνουν προβλήματα driver ή προγράμματος εκκίνησης:</p>
                <ul>
                    <li><strong>Κακός driver:</strong> Πρόσφατα ενημερωμένος ή κατεστραμμένος driver</li>
                    <li><strong>Πρόγραμμα εκκίνησης:</strong> Λογισμικό που έρχεται σε σύγκρουση ή κακόβουλο</li>
                    <li><strong>Κατεστραμμένα αρχεία συστήματος:</strong> Προβλήματα ακεραιότητας Windows</li>
                </ul>
                <p><strong>Βήματα επισκευής:</strong></p>
                <ul>
                    <li>Εκκίνηση σε Safe Mode: Κρατήστε <strong>Shift</strong> και πατήστε <strong>Restart</strong>, μετά Troubleshoot → Advanced Options → Startup Settings (σημείωση: το F8 ΔΕΝ λειτουργεί σε Windows 10/11 by default)</li>
                    <li>Χρησιμοποιήστε το Device Manager για να επαναφέρετε πρόσφατες ενημερώσεις drivers</li>
                    <li>Απενεργοποιήστε προγράμματα εκκίνησης μέσω Task Manager → καρτέλα Startup</li>
                    <li>Τρέξτε το System File Checker: <code>sfc /scannow</code></li>
                    <li>Τρέξτε επισκευή DISM: <code>DISM /Online /Cleanup-Image /RestoreHealth</code></li>
                    <li>Χρησιμοποιήστε το System Restore για επαναφορά σε λειτουργική κατάσταση</li>
                </ul>`,
            tools: [
                { name: "Autoruns", desc: "Προηγμένος διαχειριστής προγραμμάτων εκκίνησης", url: "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns" },
                { name: "DriverView", desc: "Προβολή όλων των εγκατεστημένων drivers", url: "https://www.nirsoft.net/utils/driverview.html" }
            ]
        },

        res_software_conflict: {
            severity: "warning",
            title: "Σύγκρουση Λογισμικού ή Driver",
            content: `<p>Πρόσφατες αλλαγές λογισμικού που προκαλούν αστάθεια μπορούν να λυθούν:</p>
                <ul>
                    <li>Απεγκαταστήστε πρόσφατα προστιθέμενα προγράμματα μέσω Control Panel</li>
                    <li>Επαναφέρετε προβληματικούς drivers στο Device Manager</li>
                    <li>Χρησιμοποιήστε το System Restore για επιστροφή σε σταθερή κατάσταση</li>
                    <li>Ελέγξτε το ιστορικό Windows Update για προβληματικές ενημερώσεις</li>
                    <li>Τρέξτε σε Safe Mode για να εντοπίσετε τον ένοχο</li>
                </ul>
                <p>Αν μια ενημέρωση των Windows προκάλεσε προβλήματα, μπορείτε να την αποκρύψετε προσωρινά μέχρι να κυκλοφορήσει διόρθωση.</p>`,
            tools: [
                { name: "System Restore", desc: "Επαναφορά Windows σε προηγούμενη κατάσταση", url: "ms-settings:recovery" },
                { name: "Revo Uninstaller", desc: "Πλήρης αφαίρεση λογισμικού", url: "https://www.revouninstaller.com/" }
            ]
        },

        res_software_specific: {
            severity: "info",
            title: "Πρόβλημα Συγκεκριμένης Εφαρμογής",
            content: `<p>Αν τα crashes συμβαίνουν μόνο με ένα πρόγραμμα, το πρόβλημα είναι πιθανώς με αυτή την εφαρμογή:</p>
                <ul>
                    <li><strong>Επανεγκαταστήστε το πρόγραμμα:</strong> Πλήρης απεγκατάσταση και καθαρή επανεγκατάσταση</li>
                    <li><strong>Ενημερώστε στην τελευταία έκδοση:</strong> Ελέγξτε για patches και ενημερώσεις</li>
                    <li><strong>Ελέγξτε συμβατότητα:</strong> Επιβεβαιώστε ότι υποστηρίζει την έκδοση των Windows σας</li>
                    <li><strong>Τρέξτε ως administrator:</strong> Μερικά προγράμματα χρειάζονται αυξημένα δικαιώματα</li>
                    <li><strong>Απενεργοποιήστε προσωρινά το antivirus:</strong> Μπορεί να μπλοκάρει το πρόγραμμα</li>
                    <li><strong>Ελέγξτε event logs:</strong> Το Windows Event Viewer δείχνει λεπτομερείς πληροφορίες crash</li>
                </ul>`,
            tools: [
                { name: "Event Viewer", desc: "Αρχεία καταγραφής συστήματος Windows (τρέξτε eventvwr.msc από Start)", url: "https://learn.microsoft.com/en-us/shows/inside/event-viewer" },
                { name: "Dependencies", desc: "Σύγχρονος αναλυτής εξαρτήσεων (αντικαθιστά το Dependency Walker)", url: "https://github.com/lucasg/Dependencies" }
            ]
        },

        res_file_system: {
            severity: "warning",
            title: "Κατεστραμμένος Boot Sector ή File System",
            content: `<p>Ο δίσκος ανιχνεύεται αλλά δεν μπορεί να κάνει boot. Αυτό υποδηλώνει:</p>
                <ul>
                    <li>Κατεστραμμένος boot sector ή MBR/GPT</li>
                    <li>Λείπει ή είναι κατεστραμμένο το bootloader (Windows Boot Manager)</li>
                    <li>Σφάλματα file system (κατεστραμμένο NTFS)</li>
                </ul>
                <p><strong>Μέθοδοι επισκευής:</strong></p>
                <ul>
                    <li><strong>Automatic Repair:</strong> Εκκίνηση από μέσο εγκατάστασης Windows → Repair Your Computer</li>
                    <li><strong>Για Legacy BIOS/MBR συστήματα:</strong>
                        <ul>
                            <li><code>bootrec /fixmbr</code> - Διόρθωση master boot record</li>
                            <li><code>bootrec /fixboot</code> - Εγγραφή νέου boot sector</li>
                            <li><code>bootrec /rebuildbcd</code> - Ανακατασκευή boot configuration</li>
                        </ul>
                    </li>
                    <li><strong>Για UEFI/GPT συστήματα (τα περισσότερα σύγχρονα PC):</strong>
                        <ul>
                            <li><code>bootrec /rebuildbcd</code> - Ανακατασκευή boot configuration</li>
                            <li><code>bcdboot C:\\Windows /s S: /f UEFI</code> - Ανακατασκευή UEFI bootloader (S: = EFI partition)</li>
                        </ul>
                    </li>
                    <li><code>chkdsk C: /f /r</code> - Σάρωση και επισκευή σφαλμάτων δίσκου</li>
                    <li>Ελέγξτε την υγεία του δίσκου με CrystalDiskInfo πριν τις επισκευές</li>
                </ul>
                <p><strong>Σημείωση:</strong> Η εντολή <code>bootrec /fixboot</code> μπορεί να επιστρέψει "Access is denied" σε ορισμένες εγκαταστάσεις Windows 10/11. Χρησιμοποιήστε <code>bcdboot</code> αντ' αυτού σε αυτήν την περίπτωση.</p>`,
            tools: [
                { name: "CrystalDiskInfo", desc: "Έλεγχος υγείας δίσκου (S.M.A.R.T.)", url: "https://crystalmark.info/en/software/crystaldiskinfo/" },
                { name: "Windows Media Creation Tool", desc: "Δημιουργία USB ανάκτησης", url: "https://www.microsoft.com/software-download/windows11" },
                { name: "EaseUS Partition Master", desc: "Εργαλείο επισκευής partitions", url: "https://www.easeus.com/partition-manager/" }
            ]
        },

        res_boot_order: {
            severity: "info",
            title: "Διαμόρφωση Προτεραιότητας Εκκίνησης",
            content: `<p>Το σύστημα μπορεί να προσπαθεί να κάνει boot από λάθος συσκευή:</p>
                <ul>
                    <li>Επανεκκινήστε και εισέλθετε στο BIOS/UEFI (συνήθως Del, F2, F12, ή Esc κατά την εκκίνηση)</li>
                    <li>Βρείτε την ενότητα "Boot" ή "Boot Order"</li>
                    <li>Μετακινήστε τον δίσκο των Windows στην κορυφή της λίστας προτεραιότητας boot</li>
                    <li>Απενεργοποιήστε το "Fast Boot" αν υπάρχει η επιλογή</li>
                    <li>Αποθηκεύστε τις αλλαγές και βγείτε (συνήθως F10)</li>
                </ul>
                <p><strong>Αν βλέπετε USB ή οπτικό δίσκο πρώτο,</strong> το σύστημα μπορεί να προσπαθεί να κάνει boot από άδειο μέσο.</p>`,
            tools: []
        },

        res_disk_dead: {
            severity: "critical",
            title: "Αστοχία Δίσκου Αποθήκευσης",
            content: `<p>Αν ο δίσκος δεν εμφανίζεται καθόλου στο BIOS, είναι πιθανώς εντελώς νεκρός:</p>
                <p><strong>Πιθανές αιτίες:</strong></p>
                <ul>
                    <li>Φυσική αστοχία σκληρού δίσκου (μηχανική ή ηλεκτρονική)</li>
                    <li>Νεκρός ελεγκτής SSD</li>
                    <li>Χαλαρά ή κατεστραμμένα καλώδια (SATA/M.2)</li>
                    <li>Χαλασμένη θύρα SATA της μητρικής</li>
                </ul>
                <p><strong>Τελευταίοι έλεγχοι:</strong></p>
                <ul>
                    <li>Δοκιμάστε διαφορετικά καλώδια και θύρες SATA</li>
                    <li>Για δίσκους M.2, επανατοποθετήστε στη θύρα</li>
                    <li>Δοκιμάστε τον δίσκο σε άλλο υπολογιστή ή adapter USB</li>
                    <li>Ακούστε για ήχους κλικ (μηχανική αστοχία)</li>
                </ul>
                <p><strong>Αν ο δίσκος είναι πραγματικά νεκρός,</strong> επαγγελματικές υπηρεσίες ανάκτησης δεδομένων μπορεί να είναι η μόνη επιλογή (πολύ ακριβό). Πάντα να έχετε αντίγραφα ασφαλείας!</p>`,
            tools: [
                { name: "Hard Disk Sentinel", desc: "Προηγμένη διαγνωστική δίσκου", url: "https://www.hdsentinel.com/" },
                { name: "Victoria HDD", desc: "Εργαλείο επισκευής χαμηλού επιπέδου", url: "https://hdd.by/victoria/" }
            ]
        },

        res_update_issue: {
            severity: "warning",
            title: "Ενημέρωση Windows Προκαλεί Προβλήματα",
            content: `<p>Πρόσφατες ενημερώσεις Windows μπορεί μερικές φορές να προκαλέσουν προβλήματα επιδόσεων:</p>
                <ul>
                    <li><strong>Επαναφέρετε την ενημέρωση:</strong> Settings → Update & Security → View Update History → Uninstall Updates</li>
                    <li><strong>Παύστε προσωρινά τις ενημερώσεις:</strong> Δώστε χρόνο στη Microsoft να κυκλοφορήσει διόρθωση</li>
                    <li><strong>Ελέγξτε το ιστορικό Windows Update:</strong> Σημειώστε τον αριθμό KB των πρόσφατων ενημερώσεων</li>
                    <li><strong>Αναζητήστε online:</strong> Ελέγξτε αν άλλοι αναφέρουν προβλήματα με αυτή την ενημέρωση</li>
                </ul>
                <p>Μπορείτε επίσης να δοκιμάσετε να επαναρυθμίσετε τα στοιχεία του Windows Update με το επίσημο troubleshooter.</p>`,
            tools: [
                { name: "Windows Update Troubleshooter", desc: "Διόρθωση προβλημάτων ενημέρωσης", url: "ms-settings:troubleshoot" },
                { name: "Ιστορικό Ενημερώσεων", desc: "Προβολή εγκατεστημένων ενημερώσεων", url: "ms-settings:windowsupdate-history" }
            ]
        },

        res_cleanup: {
            severity: "info",
            title: "Καθαρισμός και Βελτιστοποίηση Συστήματος",
            content: `<p>Η γενική βραδύτητα μπορεί συχνά να λυθεί με τακτική συντήρηση:</p>
                <ul>
                    <li><strong>Disk Cleanup:</strong> Αφαίρεση προσωρινών αρχείων και παλιών εγκαταστάσεων Windows</li>
                    <li><strong>Ανασυγκρότηση HDD:</strong> (Κάτοχοι SSD: παραλείψτε αυτό, χρησιμοποιήστε TRIM)</li>
                    <li><strong>Απενεργοποίηση προγραμμάτων εκκίνησης:</strong> Task Manager → καρτέλα Startup</li>
                    <li><strong>Σάρωση για malware:</strong> Χρησιμοποιήστε Windows Defender ή Malwarebytes</li>
                    <li><strong>Ενημέρωση όλων των drivers:</strong> Ειδικά chipset και GPU</li>
                    <li><strong>Έλεγχος για bloatware:</strong> Απεγκαταστήστε περιττά προγράμματα</li>
                    <li><strong>Αύξηση εικονικής μνήμης:</strong> Αν η RAM είναι χαμηλή</li>
                </ul>`,
            tools: [
                { name: "Windows Disk Cleanup", desc: "Ενσωματωμένος καθαρισμός (τρέξτε cleanmgr από Start)", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cleanmgr" },
                { name: "Malwarebytes", desc: "Σαρωτής malware", url: "https://www.malwarebytes.com/" },
                { name: "TreeSize Free", desc: "Αναλυτής χώρου δίσκου", url: "https://www.jam-software.com/treesize_free" }
            ]
        },

        res_disk_health: {
            severity: "warning",
            title: "Γερασμένος Δίσκος Αποθήκευσης",
            content: `<p>Σκληροί δίσκοι άνω των 5 ετών είναι σε υψηλό κίνδυνο αστοχίας. Τα SSD επίσης υποβαθμίζονται με τον χρόνο:</p>
                <ul>
                    <li><strong>Ελέγξτε την κατάσταση S.M.A.R.T.:</strong> Χρησιμοποιήστε το CrystalDiskInfo για να δείτε την υγεία του δίσκου</li>
                    <li><strong>Αναζητήστε προειδοποιητικά σημάδια:</strong>
                        <ul>
                            <li>Αργοί χρόνοι εκκίνησης</li>
                            <li>Συχνό πάγωμα</li>
                            <li>Περίεργα κλικ ή τριξίματα (HDD)</li>
                            <li>Ξαφνική εξαφάνιση αρχείων</li>
                        </ul>
                    </li>
                    <li><strong>Αντίγραφο ασφαλείας άμεσα:</strong> Αν η υγεία μειώνεται, κάντε backup ΤΩΡΑ</li>
                    <li><strong>Σκεφτείτε αντικατάσταση:</strong> Αναβαθμίστε σε σύγχρονο SSD για καλύτερη απόδοση</li>
                </ul>
                <p><strong>Pro tip:</strong> Κλωνοποιήστε τον δίσκο σας σε νέο πριν αποτύχει εντελώς.</p>`,
            tools: [
                { name: "CrystalDiskInfo", desc: "Παρακολούθηση S.M.A.R.T.", url: "https://crystalmark.info/en/software/crystaldiskinfo/" },
                { name: "Clonezilla", desc: "Δωρεάν open-source κλωνοποίηση δίσκου", url: "https://clonezilla.org/" },
                { name: "Hard Disk Sentinel", desc: "Προηγμένη παρακολούθηση υγείας", url: "https://www.hdsentinel.com/" }
            ]
        },

        res_malware_check: {
            severity: "warning",
            title: "Πιθανή Μόλυνση από Malware",
            content: `<p>Ξαφνικές πτώσεις απόδοσης χωρίς προφανή αιτία μπορεί να υποδηλώνουν malware:</p>
                <ul>
                    <li><strong>Πλήρης σάρωση συστήματος:</strong> Τρέξτε πλήρη σάρωση Windows Defender</li>
                    <li><strong>Χρησιμοποιήστε εξειδικευμένα εργαλεία:</strong> Malwarebytes, HitmanPro, ή AdwCleaner</li>
                    <li><strong>Ελέγξτε για cryptominers:</strong> Παρακολουθήστε τη χρήση GPU/CPU σε αδράνεια</li>
                    <li><strong>Ελέγξτε προγράμματα εκκίνησης:</strong> Αναζητήστε ύποπτες εγγραφές</li>
                    <li><strong>Ελέγξτε επεκτάσεις browser:</strong> Αφαιρέστε άγνωστες ή ύποπτες</li>
                    <li><strong>Επαναφέρετε browsers:</strong> Καθαρίστε cache και επαναφέρετε ρυθμίσεις αν χρειάζεται</li>
                </ul>
                <p><strong>Πρόληψη:</strong> Κρατήστε Windows και antivirus ενημερωμένα, αποφύγετε πειρατικό λογισμικό και προσέξτε τα συνημμένα email.</p>`,
            tools: [
                { name: "Malwarebytes", desc: "Σαρωτής anti-malware", url: "https://www.malwarebytes.com/" },
                { name: "HitmanPro", desc: "Δεύτερη γνώμη σάρωσης malware", url: "https://www.hitmanpro.com/" },
                { name: "AdwCleaner", desc: "Αφαίρεση adware και PUPs", url: "https://www.malwarebytes.com/adwcleaner" },
                { name: "Process Explorer", desc: "Προηγμένος task manager", url: "https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer" }
            ]
        },

        res_fan_issue: {
            severity: "warning",
            title: "Πρόβλημα Ανεμιστήρα ή Συστήματος Ψύξης",
            content: `<p>Δυνατοί ή ασυνήθιστοι θόρυβοι ανεμιστήρα υποδηλώνουν προβλήματα ψύξης:</p>
                <ul>
                    <li><strong>Συσσώρευση σκόνης:</strong> Καθαρίστε όλους τους ανεμιστήρες με πεπιεσμένο αέρα</li>
                    <li><strong>Χαλασμένα ρουλεμάν ανεμιστήρα:</strong> Αντικαταστήστε θορυβώδεις ανεμιστήρες πριν σταματήσουν να δουλεύουν</li>
                    <li><strong>Εμπόδιο καλωδίου:</strong> Ελέγξτε αν καλώδια χτυπούν τα πτερύγια του ανεμιστήρα</li>
                    <li><strong>Υψηλές θερμοκρασίες:</strong> Παρακολουθήστε θερμοκρασίες για να βεβαιωθείτε ότι οι ανεμιστήρες δουλεύουν αποτελεσματικά</li>
                </ul>
                <p><strong>Συντήρηση ανεμιστήρα:</strong></p>
                <ul>
                    <li>Σβήστε και αποσυνδέστε πριν τον καθαρισμό</li>
                    <li>Χρησιμοποιήστε πεπιεσμένο αέρα από πολλές γωνίες</li>
                    <li>Μην αφήνετε τους ανεμιστήρες να γυρίζουν ελεύθερα κατά τον καθαρισμό (κρατήστε τους)</li>
                    <li>Σκεφτείτε αντικατάσταση ανεμιστήρα αν ο θόρυβος παραμένει</li>
                </ul>`,
            tools: [
                { name: "FanControl", desc: "Σύγχρονο λογισμικό ελέγχου ανεμιστήρων", url: "https://getfancontrol.com/" },
                { name: "HWiNFO", desc: "Παρακολούθηση hardware", url: "https://www.hwinfo.com/" }
            ]
        },

        res_thermal: {
            severity: "critical",
            title: "Υπερθέρμανση - Θερμική Κατάσταση Έκτακτης Ανάγκης",
            content: `<p>Η υπερβολική θερμότητα μπορεί να καταστρέψει εξαρτήματα μόνιμα. Λάβετε άμεση δράση:</p>
                <ul>
                    <li><strong>Άμεσο shutdown αν οι θερμοκρασίες υπερβαίνουν τους 95°C</strong></li>
                    <li><strong>Ελέγξτε θερμοαγώγιμη πάστα:</strong> Μπορεί να χρειάζεται αντικατάσταση (ειδικά αν είναι 3+ ετών)</li>
                    <li><strong>Επιβεβαιώστε τη στερέωση ψύκτρας:</strong> Βεβαιωθείτε ότι η ψύκτρα CPU είναι σωστά τοποθετημένη</li>
                    <li><strong>Καθαρίστε όλες τις ψύκτρες:</strong> Η σκόνη μπλοκάρει τη ροή αέρα δραματικά</li>
                    <li><strong>Βελτιώστε τη ροή αέρα case:</strong> Προσθέστε ανεμιστήρες ή αναδιοργανώστε καλώδια</li>
                    <li><strong>Θερμοκρασία περιβάλλοντος:</strong> Βεβαιωθείτε για επαρκή εξαερισμό δωματίου</li>
                </ul>
                <p><strong>Ασφαλείς περιοχές θερμοκρασίας:</strong></p>
                <ul>
                    <li>CPU idle: 30-50°C | Φορτίο: 65-85°C (ορισμένοι σύγχρονοι επεξεργαστές φτάνουν ασφαλώς τους 90-95°C)</li>
                    <li>GPU idle: 30-45°C | Φορτίο: 65-85°C</li>
                </ul>
                <p><strong>Σημείωση:</strong> Ελέγξτε τις προδιαγραφές του κατασκευαστή CPU/GPU σας για τις μέγιστες ασφαλείς θερμοκρασίες. Οι σύγχρονοι Intel επεξεργαστές (12ης-14ης γενιάς) συχνά τρέχουν πιο ζεστά by design.</p>`,
            tools: [
                { name: "HWiNFO64", desc: "Παρακολούθηση θερμοκρασίας σε πραγματικό χρόνο", url: "https://www.hwinfo.com/" },
                { name: "Core Temp", desc: "Παρακολούθηση θερμοκρασίας CPU", url: "https://www.alcpu.com/CoreTemp/" },
                { name: "Οδηγός Θερμοαγώγιμης Πάστας", desc: "Πώς να εφαρμόσετε θερμοαγώγιμη πάστα", url: "https://www.youtube.com/watch?v=JYwHB2P6GmM" }
            ]
        },

        res_disk_failing: {
            severity: "critical",
            title: "Μηχανική Αστοχία Σκληρού Δίσκου",
            content: `<p>Ήχοι κλικ, μπιπ ή τριξίματα από σκληρό δίσκο υποδηλώνουν επικείμενη αστοχία:</p>
                <p><strong>ΜΗΝ ΣΥΝΕΧΙΣΕΤΕ ΝΑ ΧΡΗΣΙΜΟΠΟΙΕΙΤΕ ΤΟΝ ΔΙΣΚΟ!</strong></p>
                <ul>
                    <li>Κλικ = Κεφαλή ανάγνωσης/εγγραφής χτυπάει πλάκα (καταστροφικό)</li>
                    <li>Μπιπ = Αστοχία κινητήρα άξονα</li>
                    <li>Τρίξιμο = Αστοχία ρουλεμάν ή crash κεφαλής</li>
                </ul>
                <p><strong>Άμεσες ενέργειες:</strong></p>
                <ul>
                    <li>Σβήστε άμεσα για να αποτρέψετε περαιτέρω ζημιά</li>
                    <li>ΜΗΝ τρέξετε εργαλεία επισκευής ή ελέγχους δίσκου</li>
                    <li>Αν τα δεδομένα είναι κρίσιμα, επικοινωνήστε με επαγγελματική ανάκτηση δεδομένων</li>
                    <li>Αν υπάρχει backup δεδομένων, αντικαταστήστε τον δίσκο άμεσα</li>
                </ul>
                <p><strong>Πρόληψη:</strong> Πάντα διατηρείτε στρατηγική backup 3-2-1 (3 αντίγραφα, 2 διαφορετικά μέσα, 1 εκτός χώρου).</p>`,
            tools: [
                { name: "Υπηρεσίες Ανάκτησης Δεδομένων", desc: "Επιλογές επαγγελματικής ανάκτησης", url: "https://www.krollontrack.com/" },
                { name: "Οδηγός Backup", desc: "Στρατηγική backup 3-2-1", url: "https://www.backblaze.com/blog/the-3-2-1-backup-strategy/" }
            ]
        }
    }
};
