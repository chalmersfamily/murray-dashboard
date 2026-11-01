Murray's Big Plan
Version: 1.9.2
Status: Active Development
Owner: Murray Chalmers
Production Branch: main

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
v1.9.2
Current production version.

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

