# Remember Radio Off v1.0

A lightweight CLEO Redux mod for **Grand Theft Auto: San Andreas Classic**.

## What it does

The next vehicle follows how CJ left the previous vehicle:

- Leave a vehicle with **Radio Off** selected → the next vehicle is switched to **Radio Off** once after CJ gets seated.
- Leave a vehicle with **any radio station playing** → the next vehicle is left completely alone.

After the one-time entry action, the mod stops touching the radio. You can turn the radio back on, change stations, or turn it off again normally.

## Example

1. Turn the radio Off in Car A and exit.
2. Enter Car B → its radio switches Off once.
3. Leave Car B with the radio Off.
4. Enter Car C → its radio switches Off once.
5. Turn a station back on in Car C and exit.
6. Enter Car D → the mod does nothing.

## Features

- No continuous radio forcing.
- No per-vehicle station memory.
- No cheat flag.
- Ignores `No Radio` / transient channel states.
- Works from CJ's last valid radio state while fully seated.
- Lightweight 50 ms loop.
- Compatible with fast vehicle entry/exit workflows used by the SA Enhancement Pack.

## Requirements

- GTA San Andreas Classic / 1.0
- CLEO Redux

## Installation

Copy:

`RememberRadioOff.js`

into:

`GTA San Andreas\CLEO\`

Remove older test versions of Remember Radio Off before installing v1.0.

## Uninstall

Delete `RememberRadioOff.js` from the CLEO folder.

## Version history

### v1.0
- First stable release.
- Remembers only CJ's last radio preference when leaving a vehicle.
- Radio Off causes the next vehicle to switch Off once.
- Leaving with a real station playing disables the next-car Off action.
- Removed experimental per-car station memory.
- Removed continuous enforcement and debug logging.
