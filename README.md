Murray's Big Plan
Version: 1.10.0
Status: Active Development
Owner: Murray Chalmers
Production Branch: main

Activity totals (v1.10.0)

The former Projects/Ideas/Training/Life row is replaced by seven all-time activity tiles. Walks, Cycled, Skis and Rowing use saved WinterFit records imported from Garmin through Android Health Connect. Workouts counts saved WinterFit strength sessions (not every imported activity). Connect WinterFit opens the private signed-in app; Share totals with Dashboard sends aggregate values only. Shared totals are saved in this browser and show their timestamp and history-coverage limitation. Missing distance remains unavailable rather than being counted as zero.

Paddled uses PaddleTrack: combined OC1 + OC6 session count and kilometres across all seasons in its imported web snapshot. Connect PaddleTrack opens its sharing page. Export a fresh web sync file from your phone and import it into PaddleTrack Web first; share combined totals afterward. Repeated workout IDs count once and conflicting repeats require correction. Review/excluded records are omitted. OC6 Performance Tracker is not used.

Remy Walks reads the existing read-only Remy cloud snapshot and displays its export time. Refresh Remy totals retries it. No source app data is changed by sharing. Browser-local Dashboard totals do not sync between devices. Complete lifetime coverage depends on available/imported source history; sharing is manual, not background sync.

WinterFit phone update: Phone Update/WinterFit-v2.5.1-import-fix.apk in the local project folder. Update the existing app in place. Its signing certificate matches the earlier supplied WinterFit APK. Export a backup first; never uninstall or clear storage to bypass an update problem. Then Menu → Health Connect → Allow older activity history (if supported), allow workout stats access, Refresh workouts, then Desktop sync → Sync this phone. In the hosted Dashboard click Connect WinterFit and share totals. Older-history access is optional; without it the reader checks the last 30 days and preserves previously imported history. Owner confirmed the 2.5.1 import shortcut works and imported activities appear on both phone and computer. Dashboard sharing acceptance remains to be checked.

A personal productivity command center built around Microsoft 365, designed to provide a complete daily briefing from a single screen.

Vision
Murray's Big Plan is intended to function as a personal life-management cockpit.

The goal is simple:

One screen, one glance, one place to run life.

When opened each morning, the dashboard should immediately answer:

What do I need to do today?
What meetings are coming up?
What is overdue?
What deserves my attention next?
How long until important future events?
Where do I go to manage my major projects?
The dashboard emphasizes:

Calendar-first planning
Minimal clicks
Fast load times
Microsoft ecosystem integration
Clear executive-style briefing information
Architecture
The project intentionally avoids complex frameworks and build systems.

Current architecture:

index.html
Everything is contained within a single file:

HTML
CSS
JavaScript
Microsoft Graph integration
Microsoft Authentication
Benefits:

Easy maintenance
Easy backups
Simple deployment
Portable architecture
No build pipeline required
Technology Stack
Front End
HTML5
CSS3
Vanilla JavaScript
Authentication
Microsoft Authentication Library (MSAL)
Data Sources
Microsoft Graph API
Microsoft To Do
Outlook Calendar
Hosting
GitHub Pages
Authentication
Authentication uses Microsoft Entra ID through MSAL.

Currently requested permissions:

openid
profile
User.Read
Calendars.Read
Tasks.Read
Authentication workflow:

User Sign-In
       ↓
Acquire Token
       ↓
Microsoft Graph
       ↓
Dashboard Data
Dashboard Features
Today's Briefing
Provides a summary of:

Active tasks
Tasks due today
Overdue tasks
Upcoming calendar events
Example:

15 active tasks
3 due today
2 overdue
10 events upcoming
Next Event
Displays:

Next upcoming calendar appointment
Meeting start time
Live countdown until start
KPI Cards
My Day
Total active task count.

Overdue
Total overdue tasks.

Upcoming Events
Upcoming Outlook calendar events.

Countdown
Days remaining until a custom target date.

Default event:

Belgium Trip
December 1, 2026
Task Management
Task information is pulled from Microsoft To Do.

Tasks are categorized into:

Overdue
🔴 Overdue
Due Today
🟡 Due Today
Upcoming
🟢 Upcoming
Completed tasks are excluded.

Calendar Management
Calendar information is retrieved from Microsoft Graph.

Current behavior:

Reads next 7 days
Displays upcoming events
Calculates event counts
Determines next event
Creates countdown timer
Launchpad Links
The dashboard provides quick access to major management systems.

Projects
Project management workspace.

Ideas
Idea capture and planning.

Training
Fitness and training systems.

Life
Personal life administration.

All links are customizable through Settings.

Settings
Settings are stored using browser Local Storage.

Current configurable values:

projectsUrl
ideasUrl
trainingUrl
lifeUrl
countdownName
countdownTarget
Settings are currently device-specific.

No cloud synchronization exists.

Repository Structure
murray-dashboard/
│
├── README.md
└── index.html
Deployment
Production
Branch:

main
Recommended Development Branch
next-release
Recommended workflow:

Develop
    ↓
Commit
    ↓
Push to next-release
    ↓
Test
    ↓
Merge to main
    ↓
Production Release
Recovery Procedure
If the dashboard becomes corrupted:

Recover index.html
Verify Azure App Registration settings
Verify Graph API permissions
Redeploy to GitHub Pages
Because the application is a single file, restoration is straightforward.

Guiding Principles
Future development should remain aligned with the original vision.

Calendar First
The dashboard should prioritize visibility into time commitments.

Executive Briefing
Important information should be available immediately after opening the page.

Single Screen
Avoid unnecessary navigation.

Simplicity
New features should add value without adding significant complexity.

Microsoft Centric
When possible, integrations should remain within the Microsoft ecosystem.

Future Roadmap
Potential future enhancements include:

Garmin-style KPI cards
Enhanced executive briefing
AI-generated daily summaries
Weather integration
Travel countdown improvements
OneNote integration
Productivity analytics
Historical trends
Quick task creation
Mobile optimization
Additional Microsoft Graph integrations
Version History
v1.9.3
Current production version.

Idea capture opens the existing Idea Garden and waits for its save receipt. Allow popups and sign in to Idea Garden when asked. The Dashboard keeps a local copy; Add to garden transfers older saved ideas or safely retries an unconfirmed save without overwriting garden edits. Open Idea Garden is linked directly. Deleting a Dashboard copy does not delete the garden copy. Both apps use browser storage; use Idea Garden Save to OneDrive for a cloud snapshot. No cross-device automatic sync is provided.

v1.9.2
Previous production version.

Adds standalone idea capture with destination labels and confirmed deletion, styled to match the dashboard. Ideas are saved only in this browser under murray-dashboard-ideas-v1; no transfer to Launchpad, Idea Garden, ProjectTrack, or OneDrive is performed. Clearing browser data removes saved ideas.

v1.9.1
Previous production version.

Features include:

Microsoft Sign-In
Today's Briefing
Next Event Card
Calendar Integration
Microsoft To Do Integration
KPI Dashboard Cards
Countdown Widget
Settings Dialog
Launchpad Buttons
Last Refreshed Indicator
Long-Term Goal
Create a personal life operating system that combines:

Tasks
Calendar
Planning
Projects
Travel
Training
Life Management
into a single dashboard that can be reviewed in under 30 seconds and acted upon immediately.

Project Motto
One screen. One glance. One place to run life.