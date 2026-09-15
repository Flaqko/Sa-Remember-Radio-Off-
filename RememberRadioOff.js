/// <reference path="./.config/sa.d.ts" />

// Remember Radio Off v1.0
// GTA San Andreas Classic - CLEO Redux
//
// The next vehicle follows how CJ left the previous vehicle:
//
// - Leave with Radio Off -> next vehicle is switched Off once.
// - Leave with any radio station playing -> next vehicle is left alone.
//
// The script never continuously forces the radio and does not remember
// individual vehicle stations.

const RADIO_NO_RADIO = -1;
const RADIO_OFF = 12;
const ENTRY_FORCE_DELAY_MS = 450;

const player = new Player(0);

let nextVehicleShouldBeOff = false;
let wasSeated = false;
let entryStartedAt = 0;
let entryActionDone = true;
let lastSeatedChannel = RADIO_NO_RADIO;

while (true) {
    wait(50);

    if (!player.isPlaying()) {
        wasSeated = false;
        entryStartedAt = 0;
        entryActionDone = true;
        lastSeatedChannel = RADIO_NO_RADIO;
        nextVehicleShouldBeOff = false;
        continue;
    }

    const cj = player.getChar();
    const seated = cj.isSittingInAnyCar();

    // CJ has just become fully seated in a vehicle.
    if (seated && !wasSeated) {
        entryStartedAt = TIMERA;
        entryActionDone = false;
        lastSeatedChannel = Audio.GetRadioChannel();
    }

    if (seated) {
        const channel = Audio.GetRadioChannel();

        // Ignore No Radio (-1) / transient states.
        if (channel !== RADIO_NO_RADIO) {
            lastSeatedChannel = channel;
        }

        // Apply the previous vehicle's OFF preference once per entry.
        if (
            !entryActionDone &&
            (TIMERA - entryStartedAt) >= ENTRY_FORCE_DELAY_MS
        ) {
            entryActionDone = true;

            if (nextVehicleShouldBeOff) {
                const currentChannel = Audio.GetRadioChannel();

                if (
                    currentChannel !== RADIO_NO_RADIO &&
                    currentChannel !== RADIO_OFF
                ) {
                    Audio.SetRadioChannel(RADIO_OFF);
                    lastSeatedChannel = RADIO_OFF;
                } else if (currentChannel === RADIO_OFF) {
                    lastSeatedChannel = RADIO_OFF;
                }
            }
        }
    }

    // CJ has just stopped being fully seated.
    else if (!seated && wasSeated) {
        // Only the last valid seated state controls the next vehicle.
        nextVehicleShouldBeOff = (lastSeatedChannel === RADIO_OFF);

        entryActionDone = true;
        lastSeatedChannel = RADIO_NO_RADIO;
    }

    wasSeated = seated;
}
